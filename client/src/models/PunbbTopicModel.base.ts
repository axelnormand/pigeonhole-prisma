/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PunbbForumModel, PunbbForumModelType } from "./PunbbForumModel"
import { PunbbForumModelSelector } from "./PunbbForumModel.base"
import { PunbbPostModel, PunbbPostModelType } from "./PunbbPostModel"
import { PunbbPostModelSelector } from "./PunbbPostModel.base"
import { RootStoreType } from "./index"


/**
 * PunbbTopicBase
 * auto generated base class for the model PunbbTopicModel.
 */
export const PunbbTopicModelBase = ModelBase
  .named('PunbbTopic')
  .props({
    __typename: types.optional(types.literal("punbb_topic"), "punbb_topic"),
    id: types.union(types.undefined, types.integer),
    poster: types.union(types.undefined, types.string),
    subject: types.union(types.undefined, types.string),
    posted: types.union(types.undefined, types.integer),
    closed: types.union(types.undefined, types.boolean),
    sticky: types.union(types.undefined, types.boolean),
    last_post: types.union(types.undefined, types.integer),
    last_post_id: types.union(types.undefined, types.integer),
    last_poster: types.union(types.undefined, types.null, types.string),
    num_replies: types.union(types.undefined, types.integer),
    forum_id: types.union(types.undefined, types.integer),
    punbb_forum: types.union(types.undefined, types.late((): any => PunbbForumModel)),
    punbb_posts: types.union(types.undefined, types.array(types.late((): any => PunbbPostModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PunbbTopicModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get poster() { return this.__attr(`poster`) }
  get subject() { return this.__attr(`subject`) }
  get posted() { return this.__attr(`posted`) }
  get closed() { return this.__attr(`closed`) }
  get sticky() { return this.__attr(`sticky`) }
  get last_post() { return this.__attr(`last_post`) }
  get last_post_id() { return this.__attr(`last_post_id`) }
  get last_poster() { return this.__attr(`last_poster`) }
  get num_replies() { return this.__attr(`num_replies`) }
  get forum_id() { return this.__attr(`forum_id`) }
  punbb_forum(builder?: string | PunbbForumModelSelector | ((selector: PunbbForumModelSelector) => PunbbForumModelSelector)) { return this.__child(`punbb_forum`, PunbbForumModelSelector, builder) }
  punbb_posts(builder?: string | PunbbPostModelSelector | ((selector: PunbbPostModelSelector) => PunbbPostModelSelector)) { return this.__child(`punbb_posts`, PunbbPostModelSelector, builder) }
}
export function selectFromPunbbTopic() {
  return new PunbbTopicModelSelector()
}

export const punbbTopicModelPrimitives = selectFromPunbbTopic().poster.subject.posted.closed.sticky.last_post.last_post_id.last_poster.num_replies.forum_id
