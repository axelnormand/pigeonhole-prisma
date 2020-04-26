import { Instance } from "mobx-state-tree"
import { PunbbTopicModelBase } from "./PunbbTopicModel.base"

/* The TypeScript type of an instance of PunbbTopicModel */
export interface PunbbTopicModelType extends Instance<typeof PunbbTopicModel.Type> {}

/* A graphql query fragment builders for PunbbTopicModel */
export { selectFromPunbbTopic, punbbTopicModelPrimitives, PunbbTopicModelSelector } from "./PunbbTopicModel.base"

/**
 * PunbbTopicModel
 */
export const PunbbTopicModel = PunbbTopicModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
