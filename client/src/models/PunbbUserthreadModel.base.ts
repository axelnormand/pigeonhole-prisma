/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PunbbUserthreadBase
 * auto generated base class for the model PunbbUserthreadModel.
 */
export const PunbbUserthreadModelBase = ModelBase
  .named('PunbbUserthread')
  .props({
    __typename: types.optional(types.literal("punbb_userthread"), "punbb_userthread"),
    forum: types.union(types.undefined, types.integer),
    last_read: types.union(types.undefined, types.null, types.integer),
    posted: types.union(types.undefined, types.boolean),
    thread: types.union(types.undefined, types.integer),
    user: types.union(types.undefined, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PunbbUserthreadModelSelector extends QueryBuilder {
  get forum() { return this.__attr(`forum`) }
  get last_read() { return this.__attr(`last_read`) }
  get posted() { return this.__attr(`posted`) }
  get thread() { return this.__attr(`thread`) }
  get user() { return this.__attr(`user`) }
}
export function selectFromPunbbUserthread() {
  return new PunbbUserthreadModelSelector()
}

export const punbbUserthreadModelPrimitives = selectFromPunbbUserthread().forum.last_read.posted.thread.user
