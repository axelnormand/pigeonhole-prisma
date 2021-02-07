import { Instance } from "mobx-state-tree"
import { PunbbUserthreadModelBase } from "./PunbbUserthreadModel.base"

/* The TypeScript type of an instance of PunbbUserthreadModel */
export interface PunbbUserthreadModelType extends Instance<typeof PunbbUserthreadModel.Type> {}

/* A graphql query fragment builders for PunbbUserthreadModel */
export { selectFromPunbbUserthread, punbbUserthreadModelPrimitives, PunbbUserthreadModelSelector } from "./PunbbUserthreadModel.base"

/**
 * PunbbUserthreadModel
 */
export const PunbbUserthreadModel = PunbbUserthreadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
