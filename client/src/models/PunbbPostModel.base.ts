/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PunbbPostBase
 * auto generated base class for the model PunbbPostModel.
 */
export const PunbbPostModelBase = ModelBase
  .named('PunbbPost')
  .props({
    __typename: types.optional(types.literal("punbb_post"), "punbb_post"),
    id: types.union(types.undefined, types.integer),
    poster_id: types.union(types.undefined, types.integer),
    message: types.union(types.undefined, types.string),
    posted: types.union(types.undefined, types.integer),
    edited: types.union(types.undefined, types.null, types.integer),
    edited_by: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PunbbPostModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poster_id() { return this.__attr(`poster_id`) }
  get message() { return this.__attr(`message`) }
  get posted() { return this.__attr(`posted`) }
  get edited() { return this.__attr(`edited`) }
  get edited_by() { return this.__attr(`edited_by`) }
}
export function selectFromPunbbPost() {
  return new PunbbPostModelSelector()
}

export const punbbPostModelPrimitives = selectFromPunbbPost().poster_id.message.posted.edited.edited_by