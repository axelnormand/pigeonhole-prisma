/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { PunbbUserModel, PunbbUserModelType } from "./PunbbUserModel"
import { punbbUserModelPrimitives, PunbbUserModelSelector } from "./PunbbUserModel.base"
import { PunbbForumModel, PunbbForumModelType } from "./PunbbForumModel"
import { punbbForumModelPrimitives, PunbbForumModelSelector } from "./PunbbForumModel.base"
import { PunbbTopicModel, PunbbTopicModelType } from "./PunbbTopicModel"
import { punbbTopicModelPrimitives, PunbbTopicModelSelector } from "./PunbbTopicModel.base"
import { PunbbPostModel, PunbbPostModelType } from "./PunbbPostModel"
import { punbbPostModelPrimitives, PunbbPostModelSelector } from "./PunbbPostModel.base"
import { AuthPayloadModel, AuthPayloadModelType } from "./AuthPayloadModel"
import { authPayloadModelPrimitives, AuthPayloadModelSelector } from "./AuthPayloadModel.base"

import { LoginResult } from "./LoginResultEnum"

/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {

}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['punbb_user', () => PunbbUserModel], ['punbb_forum', () => PunbbForumModel], ['punbb_topic', () => PunbbTopicModel], ['punbb_post', () => PunbbPostModel], ['AuthPayload', () => AuthPayloadModel]], [], "js"))
  .props({

  })
  .actions(self => ({
    queryMe(variables?: {  }, resultSelector: string | ((qb: PunbbUserModelSelector) => PunbbUserModelSelector) = punbbUserModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ me: PunbbUserModelType}>(`query me { me {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbUserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryForums(variables?: {  }, resultSelector: string | ((qb: PunbbForumModelSelector) => PunbbForumModelSelector) = punbbForumModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ forums: PunbbForumModelType[]}>(`query forums { forums {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbForumModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryTopics(variables: { forumId: number }, resultSelector: string | ((qb: PunbbTopicModelSelector) => PunbbTopicModelSelector) = punbbTopicModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ topics: PunbbTopicModelType[]}>(`query topics($forumId: Int!) { topics(forum_id: $forumId) {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbTopicModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    querySearchPosts(variables: { searchString?: string }, resultSelector: string | ((qb: PunbbPostModelSelector) => PunbbPostModelSelector) = punbbPostModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ searchPosts: PunbbPostModelType[]}>(`query searchPosts($searchString: String) { searchPosts(searchString: $searchString) {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbPostModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateLogin(variables: { username: string, password: string }, resultSelector: string | ((qb: AuthPayloadModelSelector) => AuthPayloadModelSelector) = authPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ login: AuthPayloadModelType}>(`mutation login($username: String!, $password: String!) { login(username: $username, password: $password) {
        ${typeof resultSelector === "function" ? resultSelector(new AuthPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
