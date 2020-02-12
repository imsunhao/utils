// import loaderUtils from 'loader-utils'
// import { TRemoveCodeBlockOptions } from '..'

export class WebpackHelper {
  static hotReload(
    webpackModule: any,
    getWebpackRequrieContext: () => any,
    hotUpdateCallback: (inject: { requrie: (path: string) => any }) => void
  ) {
    if (__IS_SERVER__) return
    const context = getWebpackRequrieContext()
    const paths = context.keys().map((path: any) => context.resolve(path))
    __webpack_require__.c[webpackModule.id].hot.accept([context.id, ...paths], () => {
      const context = getWebpackRequrieContext()
      const requrie = (path: string) => {
        const file = context(path)
        return file.default || file
      }
      hotUpdateCallback({ requrie })
    })
  }

}
