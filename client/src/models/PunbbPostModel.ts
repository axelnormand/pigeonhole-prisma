import { Instance } from "mobx-state-tree"
import { PunbbPostModelBase } from "./PunbbPostModel.base"

/* The TypeScript type of an instance of PunbbPostModel */
export interface PunbbPostModelType extends Instance<typeof PunbbPostModel.Type> {}

/* A graphql query fragment builders for PunbbPostModel */
export { selectFromPunbbPost, punbbPostModelPrimitives, PunbbPostModelSelector } from "./PunbbPostModel.base"

/**
 * PunbbPostModel
 */
export const PunbbPostModel = PunbbPostModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
