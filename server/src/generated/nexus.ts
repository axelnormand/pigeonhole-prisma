/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    model: NexusPrisma<TypeName, 'model'>
    crud: any
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
  }
  punbb_topicWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  LoginResult: "ERROR" | "INVALID" | "SUCCESS"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    loginResult?: NexusGenEnums['LoginResult'] | null; // LoginResult
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
    poster: string; // String!
    poster_id: number; // Int!
  }
  punbb_topic: { // root type
    closed: boolean; // Boolean!
    forum_id: number; // Int!
    id: number; // Int!
    last_post: number; // Int!
    last_post_id: number; // Int!
    last_poster?: string | null; // String
    num_replies: number; // Int!
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
  punbb_userthread: { // root type
    forum: number; // Int!
    last_read?: number | null; // Int
    posted: boolean; // Boolean!
    thread: number; // Int!
    user: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    loginResult: NexusGenEnums['LoginResult'] | null; // LoginResult
    token: string | null; // String
  }
  Mutation: { // field return type
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
  }
  Query: { // field return type
    categories: Array<NexusGenRootTypes['punbb_category'] | null> | null; // [punbb_category]
    me: NexusGenRootTypes['punbb_user'] | null; // punbb_user
    posts: Array<NexusGenRootTypes['punbb_post'] | null> | null; // [punbb_post]
    recentTopics: Array<NexusGenRootTypes['punbb_topic'] | null> | null; // [punbb_topic]
    searchPosts: Array<NexusGenRootTypes['punbb_post'] | null> | null; // [punbb_post]
    topics: Array<NexusGenRootTypes['punbb_topic'] | null> | null; // [punbb_topic]
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
    poster: string; // String!
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
    num_replies: number; // Int!
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
  punbb_userthread: { // field return type
    forum: number; // Int!
    last_read: number | null; // Int
    posted: boolean; // Boolean!
    thread: number; // Int!
    user: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    loginResult: 'LoginResult'
    token: 'String'
  }
  Mutation: { // field return type name
    login: 'AuthPayload'
  }
  Query: { // field return type name
    categories: 'punbb_category'
    me: 'punbb_user'
    posts: 'punbb_post'
    recentTopics: 'punbb_topic'
    searchPosts: 'punbb_post'
    topics: 'punbb_topic'
  }
  punbb_category: { // field return type name
    cat_name: 'String'
    disp_position: 'Int'
    id: 'Int'
    punbb_forums: 'punbb_forum'
  }
  punbb_forum: { // field return type name
    cat_id: 'Int'
    disp_position: 'Int'
    forum_desc: 'String'
    forum_name: 'String'
    id: 'Int'
    last_post: 'Int'
    last_post_id: 'Int'
    last_poster: 'String'
    num_posts: 'Int'
    num_topics: 'Int'
    punbb_topics: 'punbb_topic'
  }
  punbb_post: { // field return type name
    edited: 'Int'
    edited_by: 'String'
    id: 'Int'
    message: 'String'
    posted: 'Int'
    poster: 'String'
    poster_id: 'Int'
    punbb_user: 'punbb_user'
  }
  punbb_topic: { // field return type name
    closed: 'Boolean'
    forum_id: 'Int'
    id: 'Int'
    last_post: 'Int'
    last_post_id: 'Int'
    last_poster: 'String'
    num_replies: 'Int'
    posted: 'Int'
    poster: 'String'
    punbb_posts: 'punbb_post'
    sticky: 'Boolean'
    subject: 'String'
  }
  punbb_user: { // field return type name
    id: 'Int'
    last_post: 'Int'
    last_visit: 'Int'
    registered: 'Int'
    signature: 'String'
    username: 'String'
  }
  punbb_userthread: { // field return type name
    forum: 'Int'
    last_read: 'Int'
    posted: 'Boolean'
    thread: 'Int'
    user: 'Int'
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
      cursor?: number | null; // Int
      take?: number | null; // Int
      topic_id: number; // Int!
    }
    recentTopics: { // args
      cursor?: number | null; // Int
      take?: number | null; // Int
    }
    searchPosts: { // args
      cursor?: number | null; // Int
      searchString: string; // String!
      take?: number | null; // Int
    }
    topics: { // args
      cursor?: number | null; // Int
      forum_id: number; // Int!
      take?: number | null; // Int
    }
  }
  punbb_category: {
    punbb_forums: { // args
      after?: NexusGenInputs['punbb_forumWhereUniqueInput'] | null; // punbb_forumWhereUniqueInput
      before?: NexusGenInputs['punbb_forumWhereUniqueInput'] | null; // punbb_forumWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  punbb_forum: {
    punbb_topics: { // args
      after?: NexusGenInputs['punbb_topicWhereUniqueInput'] | null; // punbb_topicWhereUniqueInput
      before?: NexusGenInputs['punbb_topicWhereUniqueInput'] | null; // punbb_topicWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  punbb_topic: {
    punbb_posts: { // args
      after?: NexusGenInputs['punbb_postWhereUniqueInput'] | null; // punbb_postWhereUniqueInput
      before?: NexusGenInputs['punbb_postWhereUniqueInput'] | null; // punbb_postWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
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
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}