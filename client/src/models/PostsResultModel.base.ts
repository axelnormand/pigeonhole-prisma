/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PunbbPostModel } from "./PunbbPostModel"
import { PunbbPostModelSelector } from "./PunbbPostModel.base"
import { RootStoreType } from "./index"


/**
 * PostsResultBase
 * auto generated base class for the model PostsResultModel.
 */
export const PostsResultModelBase = ModelBase
  .named('PostsResult')
  .props({
    __typename: types.optional(types.literal("PostsResult"), "PostsResult"),
    items: types.union(types.undefined, types.null, types.array(types.union(types.null, types.late((): any => PunbbPostModel)))),
    topicName: types.union(types.undefined, types.null, types.string),
    currentPage: types.union(types.undefined, types.null, types.integer),
    totalPages: types.union(types.undefined, types.null, types.integer),
    totalItems: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PostsResultModelSelector extends QueryBuilder {
  get topicName() { return this.__attr(`topicName`) }
  get currentPage() { return this.__attr(`currentPage`) }
  get totalPages() { return this.__attr(`totalPages`) }
  get totalItems() { return this.__attr(`totalItems`) }
  items(builder?: string | PunbbPostModelSelector | ((selector: PunbbPostModelSelector) => PunbbPostModelSelector)) { return this.__child(`items`, PunbbPostModelSelector, builder) }
}
export function selectFromPostsResult() {
  return new PostsResultModelSelector()
}

export const postsResultModelPrimitives = selectFromPostsResult().topicName.currentPage.totalPages.totalItems
