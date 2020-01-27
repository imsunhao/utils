import execa from 'execa'
import minimist from 'minimist'
import { catchError } from './utils/error'
import { MinorCommandSettingList, MinorCommandKey } from './type'

const minorCommandSettingList: Partial<MinorCommandSettingList<MinorCommandKey>> = {
  create: {
    send: false
  }
}

const defaultMinorCommandSetting = {
  send: true
}

export class Run {
  run(bin: string, args: string[] = [], opts: execa.Options<string> = {}) {
    return execa(bin, args, { env: process.env, stdio: 'inherit', ...opts })
  }

  runNode(args: string[] = [], opts: execa.Options<string> = {}) {
    args = __DEBUG__ ? [`--inspect-brk=${__DEBUG_PORT__}`] : args
    return this.run('node', args, opts)
  }

  /**
   * 启用 Nodejs 并使用 IPC 进程通讯
   */
  runNodeIPC(args: string[] = [], opts: execa.Options<string> = {}) {
    return this.runNode(args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], ...opts })
  }

  runCommand(command: MinorCommandKey, opts: execa.Options<string> = {}) {
    const path = !__PRODUCTION__ ? 'packages/cli/dist' : 'node_modules/@web-steps/cli/dist'
    return this.runNodeIPC([`${path}/${command}.js`], opts)
  }
}

export class Args {
  args: any

  /**
   * 根目录 地址
   */
  rootDir: string

  /**
   * 配置文件的相对路径
   *
   * - 配置文件 JSON 类型, 例如 web-steps.json
   */
  config: string

  minorCommand: MinorCommandKey

  isHelp: boolean

  constructor() {
    const args: any = (this.args = minimist(process.argv.slice(2)))

    this.rootDir = args['root-dir'] || process.cwd()
    this.config = args.config || 'web-steps.json'
    this.minorCommand = args._[0]
    this.isHelp = args.help || args.h
  }
}

const run = new Run()
const args = new Args()

async function main() {
  const minorCommand = args.minorCommand
  if (minorCommand) {
    const minorCommandSetting = minorCommandSettingList[minorCommand] || defaultMinorCommandSetting
    const childProcess = run.runCommand(minorCommand)
    if (minorCommandSetting.send) {
      const config = require('@web-steps/config').config
      await config.init(args)
      childProcess.send({ name: 'args', payload: args })
      childProcess.send({ name: 'config', payload: config.config })
      childProcess.send({ name: 'setting', payload: config.setting })
      childProcess.disconnect()
    }
  }
}

export function start() {
  main().catch(err => catchError(err))
}
