import { Instance } from 'mobx-state-tree';
import { PunbbCategoryModelBase } from './PunbbCategoryModel.base';

/* The TypeScript type of an instance of PunbbCategoryModel */
export interface PunbbCategoryModelType
  extends Instance<typeof PunbbCategoryModel.Type> {}

/* A graphql query fragment builders for PunbbCategoryModel */
export {
  selectFromPunbbCategory,
  punbbCategoryModelPrimitives,
  PunbbCategoryModelSelector,
} from './PunbbCategoryModel.base';

/**
 * PunbbCategoryModel
 */
export const PunbbCategoryModel = PunbbCategoryModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
}));
