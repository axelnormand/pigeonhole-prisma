/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PunbbUserBase
 * auto generated base class for the model PunbbUserModel.
 */
export const PunbbUserModelBase = ModelBase
  .named('PunbbUser')
  .props({
    __typename: types.optional(types.literal("punbb_user"), "punbb_user"),
    id: types.union(types.undefined, types.integer),
    username: types.union(types.undefined, types.string),
    signature: types.union(types.undefined, types.null, types.string),
    registered: types.union(types.undefined, types.integer),
    last_visit: types.union(types.undefined, types.integer),
    last_post: types.union(types.undefined, types.null, types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PunbbUserModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get username() { return this.__attr(`username`) }
  get signature() { return this.__attr(`signature`) }
  get registered() { return this.__attr(`registered`) }
  get last_visit() { return this.__attr(`last_visit`) }
  get last_post() { return this.__attr(`last_post`) }
}
export function selectFromPunbbUser() {
  return new PunbbUserModelSelector()
}

export const punbbUserModelPrimitives = selectFromPunbbUser().username.signature.registered.last_visit.last_post
