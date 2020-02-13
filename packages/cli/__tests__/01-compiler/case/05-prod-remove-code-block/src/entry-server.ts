import { createApp } from './app'
import { RouterReadyHelper, VuexStoreHelper } from '@web-steps/helper'

export default (context: any) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(async () => {
      await RouterReadyHelper.asyncData(router, { store, locals: { test: 'from server asyncData' } })
      VuexStoreHelper.injectStoreState(context, store)
      resolve(app)
    }, reject)
  })
}
