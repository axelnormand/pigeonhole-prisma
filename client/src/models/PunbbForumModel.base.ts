/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
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
    num_posts: types.union(types.undefined, types.integer),
    num_topics: types.union(types.undefined, types.integer),
    last_post: types.union(types.undefined, types.null, types.integer),
    last_post_id: types.union(types.undefined, types.null, types.integer),
    last_poster: types.union(types.undefined, types.null, types.string),
    disp_position: types.union(types.undefined, types.integer),
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
  get num_posts() { return this.__attr(`num_posts`) }
  get num_topics() { return this.__attr(`num_topics`) }
  get last_post() { return this.__attr(`last_post`) }
  get last_post_id() { return this.__attr(`last_post_id`) }
  get last_poster() { return this.__attr(`last_poster`) }
  get disp_position() { return this.__attr(`disp_position`) }
  punbb_topics(builder?: string | PunbbTopicModelSelector | ((selector: PunbbTopicModelSelector) => PunbbTopicModelSelector)) { return this.__child(`punbb_topics`, PunbbTopicModelSelector, builder) }
}
export function selectFromPunbbForum() {
  return new PunbbForumModelSelector()
}

export const punbbForumModelPrimitives = selectFromPunbbForum().forum_name.forum_desc.cat_id.num_posts.num_topics.last_post.last_post_id.last_poster.disp_position
