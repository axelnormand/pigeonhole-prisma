import { Instance } from "mobx-state-tree"
import { UpdateResultModelBase } from "./UpdateResultModel.base"

/* The TypeScript type of an instance of UpdateResultModel */
export interface UpdateResultModelType extends Instance<typeof UpdateResultModel.Type> {}

/* A graphql query fragment builders for UpdateResultModel */
export { selectFromUpdateResult, updateResultModelPrimitives, UpdateResultModelSelector } from "./UpdateResultModel.base"

/**
 * UpdateResultModel
 */
export const UpdateResultModel = UpdateResultModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
