import { TLogArg } from '../type'

export class Log {
  private args: TLogArg

  private packageName: string
  packagePrefix: string

  constructor(packageName: string, args: TLogArg) {
    this.packageName = packageName
    this.packagePrefix = `[@web-steps/${this.packageName}]`
    this.args = args

    if (packageName !== 'cli') {
      this.debug(`\n\n${this.packagePrefix} start!\n\n`)
    }
  }

  info(...args: any[]) {
    console.log.apply(undefined, args)
  }

  log(...args: any[]) {
    console.log.apply(undefined, args)
  }

  debug(...args: any[]) {
    console.debug.apply(undefined, [...args])
  }

  success(...args: any[]) {
    console.log.apply(undefined, [this.packagePrefix, ...args])
  }

  fatal(...args: any[]) {
    console.error.apply(undefined, [this.packagePrefix, ...args])
  }

  warn(...args: any[]) {
    console.log.apply(undefined, [this.packagePrefix, 'warning', ...args])
  }

  error(...args: any[]) {
    console.error.apply(undefined, args)
    throw new Error(`${this.packagePrefix} ${args.join(' ')}`)
  }

  catchError(...errors: any) {
    console.error.apply(undefined, errors)
    this.debug(`\n\n${this.packagePrefix} catchError!\n\n`)
    if (this.args.env === 'production') {
      process.exit(1)
    }
  }
}