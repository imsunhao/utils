import { log } from './'
import { config } from '@web-steps/config'
import { Args, ProcessMessage, TSSRMessageBus } from '@types'
import { MessageBus } from 'shared/message-bus'
import { processOnMessage } from 'shared/node'
import { start as serverStart } from '@web-steps/server'
import { start as compilerStart } from '@web-steps/compiler'
import { checkHelper } from 'shared/log'
import { COMMON_HELPER_INFO } from 'shared/setting'

const helperInfo = `
- ENV (可接受-环境变量)
  PORT:                  启动端口号 string | number
                         - 最高优先级
${COMMON_HELPER_INFO}
- UNIQUE
  port:                  启动端口号 string | number
                         - 优先级 仅低于 ENV 中 PORT
`

export function start(args: Args) {
  checkHelper(args, {
    majorCommand: {
      name: 'dev',
      info: helperInfo
    },
    minorCommand: []
  })

  async function main() {
    args.env = 'development'
    const env = args.env

    await config.init(args)

    if (args.target === 'SSR') {
      const messageBus = new MessageBus<TSSRMessageBus>()
      const { src, injectContext, port, dev, INJECT_ENV } = config.config
      const SSR = src.SSR
      const { credentials } = dev
      serverStart(
        {
          server: SSR.server,
          setting: config.setting,
          dll: src.DLL,
          injectContext: undefined,
          port,
          credentials,
          INJECT_ENV,
          env
        },
        { messageBus }
      )
      compilerStart(
        {
          webpackConfigs: [injectContext as any, SSR.server.lifeCycle as any, SSR.client.webpack, SSR.server.webpack],
          env
        },
        { messageBus, notTestExit: true }
      )
      messageBus.emit('config', { config })
    }

    process.on('unhandledRejection', error => {
      console.error('unhandledRejection', error)
    })

    if (!('send' in process) || !__TEST__) {
    } else {
      processOnMessage(process, (payload: ProcessMessage) => {
        log.debug(log.packagePrefix, 'process', payload.key)
        if (payload.key === 'e2e') {
          process.exit(0)
        }
      })
    }

    await new Promise(r => {})
  }
  main().catch(e => log.catchError(e))
}
