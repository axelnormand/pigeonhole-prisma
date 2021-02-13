/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { PunbbUserModel, PunbbUserModelType } from "./PunbbUserModel"
import { punbbUserModelPrimitives, PunbbUserModelSelector } from "./PunbbUserModel.base"
import { PunbbCategoryModel, PunbbCategoryModelType } from "./PunbbCategoryModel"
import { punbbCategoryModelPrimitives, PunbbCategoryModelSelector } from "./PunbbCategoryModel.base"
import { PunbbForumModel, PunbbForumModelType } from "./PunbbForumModel"
import { punbbForumModelPrimitives, PunbbForumModelSelector } from "./PunbbForumModel.base"
import { PunbbTopicModel, PunbbTopicModelType } from "./PunbbTopicModel"
import { punbbTopicModelPrimitives, PunbbTopicModelSelector } from "./PunbbTopicModel.base"
import { PunbbPostModel, PunbbPostModelType } from "./PunbbPostModel"
import { punbbPostModelPrimitives, PunbbPostModelSelector } from "./PunbbPostModel.base"
import { AuthPayloadModel, AuthPayloadModelType } from "./AuthPayloadModel"
import { authPayloadModelPrimitives, AuthPayloadModelSelector } from "./AuthPayloadModel.base"
import { PunbbUserthreadModel, PunbbUserthreadModelType } from "./PunbbUserthreadModel"
import { punbbUserthreadModelPrimitives, PunbbUserthreadModelSelector } from "./PunbbUserthreadModel.base"


import { LoginResult } from "./LoginResultEnum"

export type PunbbForumWhereUniqueInput = {
  id?: number
}
export type PunbbTopicWhereUniqueInput = {
  id?: number
}
export type PunbbPostWhereUniqueInput = {
  id?: number
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {

}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryMe="queryMe",
queryCategories="queryCategories",
queryRecentTopics="queryRecentTopics",
queryTopics="queryTopics",
queryPosts="queryPosts",
querySearchPosts="querySearchPosts"
}
export enum RootStoreBaseMutations {
mutateLogin="mutateLogin",
mutateUpdatePushToken="mutateUpdatePushToken"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['punbb_user', () => PunbbUserModel], ['punbb_category', () => PunbbCategoryModel], ['punbb_forum', () => PunbbForumModel], ['punbb_topic', () => PunbbTopicModel], ['punbb_post', () => PunbbPostModel], ['AuthPayload', () => AuthPayloadModel], ['punbb_userthread', () => PunbbUserthreadModel]], [], "js"))
  .props({

  })
  .actions(self => ({
    queryMe(variables?: {  }, resultSelector: string | ((qb: PunbbUserModelSelector) => PunbbUserModelSelector) = punbbUserModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ me: PunbbUserModelType}>(`query me { me {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbUserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryCategories(variables?: {  }, resultSelector: string | ((qb: PunbbCategoryModelSelector) => PunbbCategoryModelSelector) = punbbCategoryModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ categories: PunbbCategoryModelType[]}>(`query categories { categories {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbCategoryModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryRecentTopics(variables: { cursor?: number, take?: number }, resultSelector: string | ((qb: PunbbTopicModelSelector) => PunbbTopicModelSelector) = punbbTopicModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ recentTopics: PunbbTopicModelType[]}>(`query recentTopics($cursor: Int, $take: Int) { recentTopics(cursor: $cursor, take: $take) {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbTopicModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryTopics(variables: { forumId: number, cursor?: number, take?: number }, resultSelector: string | ((qb: PunbbTopicModelSelector) => PunbbTopicModelSelector) = punbbTopicModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ topics: PunbbTopicModelType[]}>(`query topics($forumId: Int!, $cursor: Int, $take: Int) { topics(forum_id: $forumId, cursor: $cursor, take: $take) {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbTopicModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPosts(variables: { topicId: number, cursor?: number, take?: number }, resultSelector: string | ((qb: PunbbPostModelSelector) => PunbbPostModelSelector) = punbbPostModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ posts: PunbbPostModelType[]}>(`query posts($topicId: Int!, $cursor: Int, $take: Int) { posts(topic_id: $topicId, cursor: $cursor, take: $take) {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbPostModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    querySearchPosts(variables: { searchString: string, cursor?: number, take?: number }, resultSelector: string | ((qb: PunbbPostModelSelector) => PunbbPostModelSelector) = punbbPostModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ searchPosts: PunbbPostModelType[]}>(`query searchPosts($searchString: String!, $cursor: Int, $take: Int) { searchPosts(searchString: $searchString, cursor: $cursor, take: $take) {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbPostModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateLogin(variables: { username: string, password: string }, resultSelector: string | ((qb: AuthPayloadModelSelector) => AuthPayloadModelSelector) = authPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ login: AuthPayloadModelType}>(`mutation login($username: String!, $password: String!) { login(username: $username, password: $password) {
        ${typeof resultSelector === "function" ? resultSelector(new AuthPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdatePushToken(variables: { token: string }, resultSelector: string | ((qb: PunbbUserModelSelector) => PunbbUserModelSelector) = punbbUserModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updatePushToken: PunbbUserModelType}>(`mutation updatePushToken($token: String!) { updatePushToken(token: $token) {
        ${typeof resultSelector === "function" ? resultSelector(new PunbbUserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
