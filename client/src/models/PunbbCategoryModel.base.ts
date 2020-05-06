/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PunbbForumModel, PunbbForumModelType } from "./PunbbForumModel"
import { PunbbForumModelSelector } from "./PunbbForumModel.base"
import { RootStoreType } from "./index"


/**
 * PunbbCategoryBase
 * auto generated base class for the model PunbbCategoryModel.
 */
export const PunbbCategoryModelBase = ModelBase
  .named('PunbbCategory')
  .props({
    __typename: types.optional(types.literal("punbb_category"), "punbb_category"),
    id: types.union(types.undefined, types.integer),
    cat_name: types.union(types.undefined, types.string),
    disp_position: types.union(types.undefined, types.integer),
    punbb_forums: types.union(types.undefined, types.array(types.late((): any => PunbbForumModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PunbbCategoryModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get cat_name() { return this.__attr(`cat_name`) }
  get disp_position() { return this.__attr(`disp_position`) }
  punbb_forums(builder?: string | PunbbForumModelSelector | ((selector: PunbbForumModelSelector) => PunbbForumModelSelector)) { return this.__child(`punbb_forums`, PunbbForumModelSelector, builder) }
}
export function selectFromPunbbCategory() {
  return new PunbbCategoryModelSelector()
}

export const punbbCategoryModelPrimitives = selectFromPunbbCategory().cat_name.disp_position
