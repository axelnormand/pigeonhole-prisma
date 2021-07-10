import { Instance } from "mobx-state-tree"
import { PostsResultModelBase } from "./PostsResultModel.base"

/* The TypeScript type of an instance of PostsResultModel */
export interface PostsResultModelType extends Instance<typeof PostsResultModel.Type> {}

/* A graphql query fragment builders for PostsResultModel */
export { selectFromPostsResult, postsResultModelPrimitives, PostsResultModelSelector } from "./PostsResultModel.base"

/**
 * PostsResultModel
 */
export const PostsResultModel = PostsResultModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
