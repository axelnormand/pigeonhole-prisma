/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * AuthPayloadBase
 * auto generated base class for the model AuthPayloadModel.
 */
export const AuthPayloadModelBase = ModelBase
  .named('AuthPayload')
  .props({
    __typename: types.optional(types.literal("AuthPayload"), "AuthPayload"),
    token: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class AuthPayloadModelSelector extends QueryBuilder {
  get token() { return this.__attr(`token`) }
}
export function selectFromAuthPayload() {
  return new AuthPayloadModelSelector()
}

export const authPayloadModelPrimitives = selectFromAuthPayload().token
