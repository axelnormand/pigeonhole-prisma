/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PunbbUserModel, PunbbUserModelType } from "./PunbbUserModel"
import { PunbbUserModelSelector } from "./PunbbUserModel.base"
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
    topic_id: types.union(types.undefined, types.integer),
    message: types.union(types.undefined, types.string),
    posted: types.union(types.undefined, types.integer),
    poster: types.union(types.undefined, types.string),
    edited: types.union(types.undefined, types.null, types.integer),
    edited_by: types.union(types.undefined, types.null, types.string),
    punbb_user: types.union(types.undefined, types.late((): any => PunbbUserModel)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PunbbPostModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poster_id() { return this.__attr(`poster_id`) }
  get topic_id() { return this.__attr(`topic_id`) }
  get message() { return this.__attr(`message`) }
  get posted() { return this.__attr(`posted`) }
  get poster() { return this.__attr(`poster`) }
  get edited() { return this.__attr(`edited`) }
  get edited_by() { return this.__attr(`edited_by`) }
  punbb_user(builder?: string | PunbbUserModelSelector | ((selector: PunbbUserModelSelector) => PunbbUserModelSelector)) { return this.__child(`punbb_user`, PunbbUserModelSelector, builder) }
}
export function selectFromPunbbPost() {
  return new PunbbPostModelSelector()
}

export const punbbPostModelPrimitives = selectFromPunbbPost().poster_id.topic_id.message.posted.poster.edited.edited_by
