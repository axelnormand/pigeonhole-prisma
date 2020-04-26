import { Instance } from "mobx-state-tree"
import { PunbbUserModelBase } from "./PunbbUserModel.base"

/* The TypeScript type of an instance of PunbbUserModel */
export interface PunbbUserModelType extends Instance<typeof PunbbUserModel.Type> {}

/* A graphql query fragment builders for PunbbUserModel */
export { selectFromPunbbUser, punbbUserModelPrimitives, PunbbUserModelSelector } from "./PunbbUserModel.base"

/**
 * PunbbUserModel
 */
export const PunbbUserModel = PunbbUserModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
