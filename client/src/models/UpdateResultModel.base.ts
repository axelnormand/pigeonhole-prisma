/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * UpdateResultBase
 * auto generated base class for the model UpdateResultModel.
 */
export const UpdateResultModelBase = ModelBase
  .named('UpdateResult')
  .props({
    __typename: types.optional(types.literal("UpdateResult"), "UpdateResult"),
    success: types.union(types.undefined, types.null, types.boolean),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class UpdateResultModelSelector extends QueryBuilder {
  get success() { return this.__attr(`success`) }
}
export function selectFromUpdateResult() {
  return new UpdateResultModelSelector()
}

export const updateResultModelPrimitives = selectFromUpdateResult().success
