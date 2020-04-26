/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PunbbForumBase
 * auto generated base class for the model PunbbForumModel.
 */
export const PunbbForumModelBase = ModelBase
  .named('PunbbForum')
  .props({
    __typename: types.optional(types.literal("punbb_forum"), "punbb_forum"),
    id: types.union(types.undefined, types.integer),
    forum_name: types.union(types.undefined, types.string),
    forum_desc: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PunbbForumModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get forum_name() { return this.__attr(`forum_name`) }
  get forum_desc() { return this.__attr(`forum_desc`) }
}
export function selectFromPunbbForum() {
  return new PunbbForumModelSelector()
}

export const punbbForumModelPrimitives = selectFromPunbbForum().forum_name.forum_desc
