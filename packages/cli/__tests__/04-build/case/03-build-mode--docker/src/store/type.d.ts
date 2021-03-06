import { GlobalMutations, GlobalActions } from '.'

declare namespace VuexStore {
  /**
   * vuex store
   *  * typescript namespace
   */
  namespace Tstore {
    /**
     * vuex state
     */
    type state = {
      count: number
      api: {
        get: boolean
        post: boolean
      }
      user: {
        test: string
      }
    }
    /**
     * vuex getters
     */
    type getters = {
      hasUser: boolean
    }

    /**
     * vuex Mutation-tree
     */
    type Mutations = GlobalMutations

    /**
     * vuex Action-tree
     */
    type Actions = GlobalActions
  }
}

export = VuexStore
