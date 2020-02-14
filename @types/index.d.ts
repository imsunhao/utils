import { Args as TArgs } from '../packages/cli/src'
import { Config as TConfig } from '../packages/config/src'
import { MessageBus } from 'packages/shared'
import webpack from 'webpack'
import MFS from 'memory-fs'

declare namespace WebSteps {
  type Args = TArgs
  type Config = TConfig

  type ProcessMessage = {
    messageKey: string
    payload?: any
  }

  type TSSRMessageBus = {
    /**
     * 虚拟文件处理系统
     */
    'memory-fs': (payload: { mfs: MFS }) => void

    /**
     * 完整的配置文件
     */
    config: (payload: { config: TConfig }) => void

    /**
     * SSR compiler 准备就绪
     */
    'SSR-compiler': (payload: { compiler: webpack.Compiler; webpackConfig: webpack.Configuration }) => void
  }

  type SSRMessageBus = MessageBus<TSSRMessageBus>
}

export = WebSteps
