/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from "../context"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  punbb_forumWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  punbb_postWhereUniqueInput: { // input type
    id?: number | null; // Int
    topic_id?: number | null; // Int
  }
  punbb_topicWhereUniqueInput: { // input type
    forum_id?: number | null; // Int
    id?: number | null; // Int
    moved_to?: number | null; // Int
  }
}

export interface NexusGenEnums {
  LoginResult: "ERROR" | "INVALID" | "SUCCESS"
}

export interface NexusGenRootTypes {
  AuthPayload: { // root type
    loginResult: NexusGenEnums['LoginResult']; // LoginResult!
    token?: string | null; // String
  }
  Mutation: {};
  Query: {};
  punbb_category: { // root type
    cat_name: string; // String!
    disp_position: number; // Int!
    id: number; // Int!
  }
  punbb_forum: { // root type
    cat_id: number; // Int!
    disp_position: number; // Int!
    forum_desc?: string | null; // String
    forum_name: string; // String!
    id: number; // Int!
    last_post?: number | null; // Int
    last_post_id?: number | null; // Int
    last_poster?: string | null; // String
    num_posts: number; // Int!
    num_topics: number; // Int!
  }
  punbb_post: { // root type
    edited?: number | null; // Int
    edited_by?: string | null; // String
    id: number; // Int!
    message: string; // String!
    posted: number; // Int!
    poster_id: number; // Int!
  }
  punbb_topic: { // root type
    closed: boolean; // Boolean!
    forum_id: number; // Int!
    id: number; // Int!
    last_post: number; // Int!
    last_post_id: number; // Int!
    last_poster?: string | null; // String
    posted: number; // Int!
    poster: string; // String!
    sticky: boolean; // Boolean!
    subject: string; // String!
  }
  punbb_user: { // root type
    id: number; // Int!
    last_post?: number | null; // Int
    last_visit: number; // Int!
    registered: number; // Int!
    signature?: string | null; // String
    username: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  punbb_forumWhereUniqueInput: NexusGenInputs['punbb_forumWhereUniqueInput'];
  punbb_postWhereUniqueInput: NexusGenInputs['punbb_postWhereUniqueInput'];
  punbb_topicWhereUniqueInput: NexusGenInputs['punbb_topicWhereUniqueInput'];
  LoginResult: NexusGenEnums['LoginResult'];
}

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    loginResult: NexusGenEnums['LoginResult']; // LoginResult!
    token: string | null; // String
  }
  Mutation: { // field return type
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Query: { // field return type
    categories: NexusGenRootTypes['punbb_category'][]; // [punbb_category!]!
    me: NexusGenRootTypes['punbb_user'] | null; // punbb_user
    posts: NexusGenRootTypes['punbb_post'][]; // [punbb_post!]!
    searchPosts: NexusGenRootTypes['punbb_post'][]; // [punbb_post!]!
    topics: NexusGenRootTypes['punbb_topic'][]; // [punbb_topic!]!
  }
  punbb_category: { // field return type
    cat_name: string; // String!
    disp_position: number; // Int!
    id: number; // Int!
    punbb_forums: NexusGenRootTypes['punbb_forum'][]; // [punbb_forum!]!
  }
  punbb_forum: { // field return type
    cat_id: number; // Int!
    disp_position: number; // Int!
    forum_desc: string | null; // String
    forum_name: string; // String!
    id: number; // Int!
    last_post: number | null; // Int
    last_post_id: number | null; // Int
    last_poster: string | null; // String
    num_posts: number; // Int!
    num_topics: number; // Int!
    punbb_topics: NexusGenRootTypes['punbb_topic'][]; // [punbb_topic!]!
  }
  punbb_post: { // field return type
    edited: number | null; // Int
    edited_by: string | null; // String
    id: number; // Int!
    message: string; // String!
    posted: number; // Int!
    poster_id: number; // Int!
    punbb_user: NexusGenRootTypes['punbb_user']; // punbb_user!
  }
  punbb_topic: { // field return type
    closed: boolean; // Boolean!
    forum_id: number; // Int!
    id: number; // Int!
    last_post: number; // Int!
    last_post_id: number; // Int!
    last_poster: string | null; // String
    posted: number; // Int!
    poster: string; // String!
    punbb_posts: NexusGenRootTypes['punbb_post'][]; // [punbb_post!]!
    sticky: boolean; // Boolean!
    subject: string; // String!
  }
  punbb_user: { // field return type
    id: number; // Int!
    last_post: number | null; // Int
    last_visit: number; // Int!
    registered: number; // Int!
    signature: string | null; // String
    username: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      password: string; // String!
      username: string; // String!
    }
  }
  Query: {
    posts: { // args
      topic_id: number; // Int!
    }
    searchPosts: { // args
      searchString?: string | null; // String
    }
    topics: { // args
      forum_id: number; // Int!
    }
  }
  punbb_category: {
    punbb_forums: { // args
      after?: NexusGenInputs['punbb_forumWhereUniqueInput'] | null; // punbb_forumWhereUniqueInput
      before?: NexusGenInputs['punbb_forumWhereUniqueInput'] | null; // punbb_forumWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  punbb_forum: {
    punbb_topics: { // args
      after?: NexusGenInputs['punbb_topicWhereUniqueInput'] | null; // punbb_topicWhereUniqueInput
      before?: NexusGenInputs['punbb_topicWhereUniqueInput'] | null; // punbb_topicWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  punbb_topic: {
    punbb_posts: { // args
      after?: NexusGenInputs['punbb_postWhereUniqueInput'] | null; // punbb_postWhereUniqueInput
      before?: NexusGenInputs['punbb_postWhereUniqueInput'] | null; // punbb_postWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthPayload" | "Mutation" | "Query" | "punbb_category" | "punbb_forum" | "punbb_post" | "punbb_topic" | "punbb_user";

export type NexusGenInputNames = "punbb_forumWhereUniqueInput" | "punbb_postWhereUniqueInput" | "punbb_topicWhereUniqueInput";

export type NexusGenEnumNames = "LoginResult";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}