/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PunbbCategoryModel, PunbbCategoryModelType } from "./PunbbCategoryModel"
import { PunbbCategoryModelSelector } from "./PunbbCategoryModel.base"
import { PunbbTopicModel, PunbbTopicModelType } from "./PunbbTopicModel"
import { PunbbTopicModelSelector } from "./PunbbTopicModel.base"
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
    cat_id: types.union(types.undefined, types.integer),
    punbb_category: types.union(types.undefined, types.late((): any => PunbbCategoryModel)),
    punbb_topics: types.union(types.undefined, types.array(types.late((): any => PunbbTopicModel))),
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
  get cat_id() { return this.__attr(`cat_id`) }
  punbb_category(builder?: string | PunbbCategoryModelSelector | ((selector: PunbbCategoryModelSelector) => PunbbCategoryModelSelector)) { return this.__child(`punbb_category`, PunbbCategoryModelSelector, builder) }
  punbb_topics(builder?: string | PunbbTopicModelSelector | ((selector: PunbbTopicModelSelector) => PunbbTopicModelSelector)) { return this.__child(`punbb_topics`, PunbbTopicModelSelector, builder) }
}
export function selectFromPunbbForum() {
  return new PunbbForumModelSelector()
}

export const punbbForumModelPrimitives = selectFromPunbbForum().forum_name.forum_desc.cat_id
