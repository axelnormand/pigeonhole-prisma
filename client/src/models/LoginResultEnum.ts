/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum LoginResult {
  SUCCESS="SUCCESS",
INVALID="INVALID",
ERROR="ERROR"
}

/**
* LoginResult
*/
export const LoginResultEnum = types.enumeration("LoginResult", [
        "SUCCESS",
  "INVALID",
  "ERROR",
      ])
