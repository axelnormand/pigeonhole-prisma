import { Instance } from "mobx-state-tree"
import { PunbbForumModelBase } from "./PunbbForumModel.base"

/* The TypeScript type of an instance of PunbbForumModel */
export interface PunbbForumModelType extends Instance<typeof PunbbForumModel.Type> {}

/* A graphql query fragment builders for PunbbForumModel */
export { selectFromPunbbForum, punbbForumModelPrimitives, PunbbForumModelSelector } from "./PunbbForumModel.base"

/**
 * PunbbForumModel
 */
export const PunbbForumModel = PunbbForumModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
