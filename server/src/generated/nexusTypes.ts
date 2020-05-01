import * as prisma from '@prisma/client';
import { core } from '@nexus/schema';
import { GraphQLResolveInfo } from 'graphql';

// Types helpers
  type IsModelNameExistsInGraphQLTypes<
  ReturnType extends any
> = ReturnType extends core.GetGen<'objectNames'> ? true : false;

type NexusPrismaScalarOpts = {
  alias?: string;
};

type Pagination = {
  first?: boolean;
  last?: boolean;
  before?: boolean;
  after?: boolean;
  skip?: boolean;
};

type RootObjectTypes = Pick<
  core.GetGen<'rootTypes'>,
  core.GetGen<'objectNames'>
>;

/**
 * Determine if `B` is a subset (or equivalent to) of `A`.
*/
type IsSubset<A, B> = keyof A extends never
  ? false
  : B extends A
  ? true
  : false;

type OmitByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? never : Key }[keyof T]
>;

type GetSubsetTypes<ModelName extends any> = keyof OmitByValue<
  {
    [P in keyof RootObjectTypes]: ModelName extends keyof ModelTypes
      ? IsSubset<RootObjectTypes[P], ModelTypes[ModelName]> extends true
        ? RootObjectTypes[P]
        : never
      : never;
  },
  never
>;

type SubsetTypes<ModelName extends any> = GetSubsetTypes<
  ModelName
> extends never
  ? `ERROR: No subset types are available. Please make sure that one of your GraphQL type is a subset of your t.model('<ModelName>')`
  : GetSubsetTypes<ModelName>;

type DynamicRequiredType<ReturnType extends any> = IsModelNameExistsInGraphQLTypes<
  ReturnType
> extends true
  ? { type?: SubsetTypes<ReturnType> }
  : { type: SubsetTypes<ReturnType> };

type GetNexusPrismaInput<
  ModelName extends any,
  MethodName extends any,
  InputName extends 'filtering' | 'ordering'
> = ModelName extends keyof NexusPrismaInputs
  ? MethodName extends keyof NexusPrismaInputs[ModelName]
    ? NexusPrismaInputs[ModelName][MethodName][InputName]
    : never
  : never;

/**
 *  Represents arguments required by Prisma Client JS that will
 *  be derived from a request's input (args, context, and info)
 *  and omitted from the GraphQL API. The object itself maps the
 *  names of these args to a function that takes an object representing
 *  the request's input and returns the value to pass to the prisma
 *  arg of the same name.
 */
export type LocalComputedInputs<MethodName extends any> = Record<
  string,
  (params: LocalMutationResolverParams<MethodName>) => unknown
>

export type GlobalComputedInputs = Record<
  string,
  (params: GlobalMutationResolverParams) => unknown
>

type BaseMutationResolverParams = {
  info: GraphQLResolveInfo
  ctx: Context
}

export type GlobalMutationResolverParams = BaseMutationResolverParams & {
  args: Record<string, any> & { data: unknown }
}

export type LocalMutationResolverParams<
  MethodName extends any
> = BaseMutationResolverParams & {
  args: MethodName extends keyof core.GetGen2<'argTypes', 'Mutation'>
    ? core.GetGen3<'argTypes', 'Mutation', MethodName>
    : any
}

export type Context = core.GetGen<'context'>

type NexusPrismaRelationOpts<
  ModelName extends any,
  MethodName extends any,
  ReturnType extends any
> = GetNexusPrismaInput<
  // If GetNexusPrismaInput returns never, it means there are no filtering/ordering args for it.
  ModelName,
  MethodName,
  'filtering'
> extends never
  ? {
      alias?: string;
      computedInputs?: LocalComputedInputs<MethodName>;
    } & DynamicRequiredType<ReturnType>
  : {
      alias?: string;
      computedInputs?: LocalComputedInputs<MethodName>;
      filtering?:
        | boolean
        | Partial<
            Record<
              GetNexusPrismaInput<ModelName, MethodName, 'filtering'>,
              boolean
            >
          >;
      ordering?:
        | boolean
        | Partial<
            Record<
              GetNexusPrismaInput<ModelName, MethodName, 'ordering'>,
              boolean
            >
          >;
      pagination?: boolean | Pagination;
    } & DynamicRequiredType<ReturnType>;

type IsScalar<TypeName extends any> = TypeName extends core.GetGen<'scalarNames'>
  ? true
  : false;

type IsObject<Name extends any> = Name extends core.GetGen<'objectNames'>
  ? true
  : false

type IsEnum<Name extends any> = Name extends core.GetGen<'enumNames'>
  ? true
  : false

type IsInputObject<Name extends any> = Name extends core.GetGen<'inputNames'>
  ? true
  : false

/**
 * The kind that a GraphQL type may be.
 */
type Kind = 'Enum' | 'Object' | 'Scalar' | 'InputObject'

/**
 * Helper to safely reference a Kind type. For example instead of the following
 * which would admit a typo:
 *
 * ```ts
 * type Foo = Bar extends 'scalar' ? ...
 * ```
 *
 * You can do this which guarantees a correct reference:
 *
 * ```ts
 * type Foo = Bar extends AKind<'Scalar'> ? ...
 * ```
 *
 */
type AKind<T extends Kind> = T

type GetKind<Name extends any> = IsEnum<Name> extends true
  ? 'Enum'
  : IsScalar<Name> extends true
  ? 'Scalar'
  : IsObject<Name> extends true
  ? 'Object'
  : IsInputObject<Name> extends true
  ? 'InputObject'
  // FIXME should be `never`, but GQL objects named differently
  // than backing type fall into this branch
  : 'Object'

type NexusPrismaFields<ModelName extends keyof NexusPrismaTypes> = {
  [MethodName in keyof NexusPrismaTypes[ModelName]]: NexusPrismaMethod<
    ModelName,
    MethodName,
    GetKind<NexusPrismaTypes[ModelName][MethodName]> // Is the return type a scalar?
  >;
};

type NexusPrismaMethod<
  ModelName extends keyof NexusPrismaTypes,
  MethodName extends keyof NexusPrismaTypes[ModelName],
  ThisKind extends Kind,
  ReturnType extends any = NexusPrismaTypes[ModelName][MethodName]
> =
  ThisKind extends AKind<'Enum'>
  ? () => NexusPrismaFields<ModelName>
  : ThisKind extends AKind<'Scalar'>
  ? (opts?: NexusPrismaScalarOpts) => NexusPrismaFields<ModelName> // Return optional scalar opts
  : IsModelNameExistsInGraphQLTypes<ReturnType> extends true // If model name has a mapped graphql types
  ? (
      opts?: NexusPrismaRelationOpts<ModelName, MethodName, ReturnType>
    ) => NexusPrismaFields<ModelName> // Then make opts optional
  : (
      opts: NexusPrismaRelationOpts<ModelName, MethodName, ReturnType>
    ) => NexusPrismaFields<ModelName>; // Else force use input the related graphql type -> { type: '...' }

type GetNexusPrismaMethod<
  TypeName extends string
> = TypeName extends keyof NexusPrismaMethods
  ? NexusPrismaMethods[TypeName]
  : <CustomTypeName extends keyof ModelTypes>(
      typeName: CustomTypeName
    ) => NexusPrismaMethods[CustomTypeName];

type GetNexusPrisma<
  TypeName extends string,
  ModelOrCrud extends 'model' | 'crud'
> = ModelOrCrud extends 'model'
  ? TypeName extends 'Mutation'
    ? never
    : TypeName extends 'Query'
    ? never
    : GetNexusPrismaMethod<TypeName>
  : ModelOrCrud extends 'crud'
  ? TypeName extends 'Mutation'
    ? GetNexusPrismaMethod<TypeName>
    : TypeName extends 'Query'
    ? GetNexusPrismaMethod<TypeName>
    : never
  : never;
  

// Generated
interface ModelTypes {
  punbb_ban: prisma.punbb_ban
  punbb_category: prisma.punbb_category
  punbb_censoring: prisma.punbb_censoring
  punbb_config: prisma.punbb_config
  punbb_forum: prisma.punbb_forum
  punbb_forum_perm: prisma.punbb_forum_perm
  punbb_group: prisma.punbb_group
  punbb_poll: prisma.punbb_poll
  punbb_post: prisma.punbb_post
  punbb_rank: prisma.punbb_rank
  punbb_report: prisma.punbb_report
  punbb_search_cache: prisma.punbb_search_cache
  punbb_search_word: prisma.punbb_search_word
  punbb_subscription: prisma.punbb_subscription
  punbb_topic: prisma.punbb_topic
  punbb_uploaded: prisma.punbb_uploaded
  punbb_uploads_type: prisma.punbb_uploads_type
  punbb_user: prisma.punbb_user
  punbb_userthread: prisma.punbb_userthread
}
  
interface NexusPrismaInputs {
  Query: {
    punbbBans: {
  filtering: 'email' | 'expire' | 'id' | 'ip' | 'message' | 'username' | 'AND' | 'OR' | 'NOT'
  ordering: 'email' | 'expire' | 'id' | 'ip' | 'message' | 'username'
}
    punbbCategories: {
  filtering: 'cat_name' | 'disp_position' | 'id' | 'AND' | 'OR' | 'NOT'
  ordering: 'cat_name' | 'disp_position' | 'id'
}
    punbbCensorings: {
  filtering: 'id' | 'replace_with' | 'search_for' | 'AND' | 'OR' | 'NOT'
  ordering: 'id' | 'replace_with' | 'search_for'
}
    punbbConfigs: {
  filtering: 'conf_name' | 'conf_value' | 'AND' | 'OR' | 'NOT'
  ordering: 'conf_name' | 'conf_value'
}
    punbbForums: {
  filtering: 'cat_id' | 'disp_position' | 'forum_desc' | 'forum_name' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moderators' | 'num_posts' | 'num_topics' | 'redirect_url' | 'sort_by' | 'punbb_topic' | 'AND' | 'OR' | 'NOT'
  ordering: 'cat_id' | 'disp_position' | 'forum_desc' | 'forum_name' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moderators' | 'num_posts' | 'num_topics' | 'redirect_url' | 'sort_by'
}
    punbbForumPerms: {
  filtering: 'forum_id' | 'group_id' | 'post_polls' | 'post_replies' | 'post_topics' | 'read_forum' | 'AND' | 'OR' | 'NOT'
  ordering: 'forum_id' | 'group_id' | 'post_polls' | 'post_replies' | 'post_topics' | 'read_forum'
}
    punbbGroups: {
  filtering: 'g_delete_posts' | 'g_delete_topics' | 'g_edit_posts' | 'g_edit_subjects_interval' | 'g_id' | 'g_post_flood' | 'g_post_polls' | 'g_post_replies' | 'g_post_topics' | 'g_read_board' | 'g_search' | 'g_search_flood' | 'g_search_users' | 'g_set_title' | 'g_title' | 'g_user_title' | 'AND' | 'OR' | 'NOT'
  ordering: 'g_delete_posts' | 'g_delete_topics' | 'g_edit_posts' | 'g_edit_subjects_interval' | 'g_id' | 'g_post_flood' | 'g_post_polls' | 'g_post_replies' | 'g_post_topics' | 'g_read_board' | 'g_search' | 'g_search_flood' | 'g_search_users' | 'g_set_title' | 'g_title' | 'g_user_title'
}
    punbbPolls: {
  filtering: 'id' | 'options' | 'pollid' | 'ptype' | 'voters' | 'votes' | 'AND' | 'OR' | 'NOT'
  ordering: 'id' | 'options' | 'pollid' | 'ptype' | 'voters' | 'votes'
}
    punbbPosts: {
  filtering: 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'AND' | 'OR' | 'NOT' | 'punbb_topic'
  ordering: 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'punbb_topic'
}
    punbbRanks: {
  filtering: 'id' | 'min_posts' | 'rank' | 'AND' | 'OR' | 'NOT'
  ordering: 'id' | 'min_posts' | 'rank'
}
    punbbReports: {
  filtering: 'created' | 'forum_id' | 'id' | 'message' | 'post_id' | 'reported_by' | 'topic_id' | 'zapped' | 'zapped_by' | 'AND' | 'OR' | 'NOT'
  ordering: 'created' | 'forum_id' | 'id' | 'message' | 'post_id' | 'reported_by' | 'topic_id' | 'zapped' | 'zapped_by'
}
    punbbSearchCaches: {
  filtering: 'id' | 'ident' | 'search_data' | 'AND' | 'OR' | 'NOT'
  ordering: 'id' | 'ident' | 'search_data'
}
    punbbSearchWords: {
  filtering: 'id' | 'word' | 'AND' | 'OR' | 'NOT'
  ordering: 'id' | 'word'
}
    punbbSubscriptions: {
  filtering: 'topic_id' | 'user_id' | 'AND' | 'OR' | 'NOT'
  ordering: 'topic_id' | 'user_id'
}
    punbbTopics: {
  filtering: 'closed' | 'forum_id' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moved_to' | 'no' | 'num_replies' | 'num_views' | 'posted' | 'poster' | 'question' | 'sticky' | 'subject' | 'yes' | 'punbb_post' | 'AND' | 'OR' | 'NOT' | 'punbb_forum'
  ordering: 'closed' | 'forum_id' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moved_to' | 'no' | 'num_replies' | 'num_views' | 'posted' | 'poster' | 'question' | 'sticky' | 'subject' | 'yes' | 'punbb_forum'
}
    punbbUploadeds: {
  filtering: 'data' | 'descr' | 'downs' | 'file' | 'id' | 'size' | 'uid' | 'user' | 'user_stat' | 'AND' | 'OR' | 'NOT'
  ordering: 'data' | 'descr' | 'downs' | 'file' | 'id' | 'size' | 'uid' | 'user' | 'user_stat'
}
    punbbUploadsTypes: {
  filtering: 'exts' | 'id' | 'type' | 'AND' | 'OR' | 'NOT'
  ordering: 'exts' | 'id' | 'type'
}
    punbbUsers: {
  filtering: 'activate_key' | 'activate_string' | 'admin_note' | 'aim' | 'disp_posts' | 'disp_topics' | 'email' | 'email_setting' | 'group_id' | 'icq' | 'id' | 'jabber' | 'language' | 'last_post' | 'last_visit' | 'location' | 'msn' | 'notify_with_post' | 'num_posts' | 'password' | 'read_topics' | 'realname' | 'registered' | 'registration_ip' | 'save_pass' | 'show_avatars' | 'show_img' | 'show_img_sig' | 'show_sig' | 'show_smilies' | 'signature' | 'style' | 'timezone' | 'title' | 'url' | 'username' | 'use_avatar' | 'yahoo' | 'AND' | 'OR' | 'NOT'
  ordering: 'activate_key' | 'activate_string' | 'admin_note' | 'aim' | 'disp_posts' | 'disp_topics' | 'email' | 'email_setting' | 'group_id' | 'icq' | 'id' | 'jabber' | 'language' | 'last_post' | 'last_visit' | 'location' | 'msn' | 'notify_with_post' | 'num_posts' | 'password' | 'read_topics' | 'realname' | 'registered' | 'registration_ip' | 'save_pass' | 'show_avatars' | 'show_img' | 'show_img_sig' | 'show_sig' | 'show_smilies' | 'signature' | 'style' | 'timezone' | 'title' | 'url' | 'username' | 'use_avatar' | 'yahoo'
}
    punbbUserthreads: {
  filtering: 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'AND' | 'OR' | 'NOT'
  ordering: 'forum' | 'last_read' | 'posted' | 'thread' | 'user'
}

  },
    punbb_ban: {


  },  punbb_category: {


  },  punbb_censoring: {


  },  punbb_config: {


  },  punbb_forum: {
    punbb_topic: {
  filtering: 'closed' | 'forum_id' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moved_to' | 'no' | 'num_replies' | 'num_views' | 'posted' | 'poster' | 'question' | 'sticky' | 'subject' | 'yes' | 'punbb_post' | 'AND' | 'OR' | 'NOT' | 'punbb_forum'
  ordering: 'closed' | 'forum_id' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moved_to' | 'no' | 'num_replies' | 'num_views' | 'posted' | 'poster' | 'question' | 'sticky' | 'subject' | 'yes' | 'punbb_forum'
}

  },  punbb_forum_perm: {


  },  punbb_group: {


  },  punbb_poll: {


  },  punbb_post: {


  },  punbb_rank: {


  },  punbb_report: {


  },  punbb_search_cache: {


  },  punbb_search_word: {


  },  punbb_subscription: {


  },  punbb_topic: {
    punbb_post: {
  filtering: 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'AND' | 'OR' | 'NOT' | 'punbb_topic'
  ordering: 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'punbb_topic'
}

  },  punbb_uploaded: {


  },  punbb_uploads_type: {


  },  punbb_user: {


  },  punbb_userthread: {


  }
}

interface NexusPrismaTypes {
  Query: {
    punbbBan: 'punbb_ban'
    punbbBans: 'punbb_ban'
    punbbCategory: 'punbb_category'
    punbbCategories: 'punbb_category'
    punbbCensoring: 'punbb_censoring'
    punbbCensorings: 'punbb_censoring'
    punbbConfig: 'punbb_config'
    punbbConfigs: 'punbb_config'
    punbbForum: 'punbb_forum'
    punbbForums: 'punbb_forum'
    punbbForumPerm: 'punbb_forum_perm'
    punbbForumPerms: 'punbb_forum_perm'
    punbbGroup: 'punbb_group'
    punbbGroups: 'punbb_group'
    punbbPoll: 'punbb_poll'
    punbbPolls: 'punbb_poll'
    punbbPost: 'punbb_post'
    punbbPosts: 'punbb_post'
    punbbRank: 'punbb_rank'
    punbbRanks: 'punbb_rank'
    punbbReport: 'punbb_report'
    punbbReports: 'punbb_report'
    punbbSearchCache: 'punbb_search_cache'
    punbbSearchCaches: 'punbb_search_cache'
    punbbSearchWord: 'punbb_search_word'
    punbbSearchWords: 'punbb_search_word'
    punbbSubscription: 'punbb_subscription'
    punbbSubscriptions: 'punbb_subscription'
    punbbTopic: 'punbb_topic'
    punbbTopics: 'punbb_topic'
    punbbUploaded: 'punbb_uploaded'
    punbbUploadeds: 'punbb_uploaded'
    punbbUploadsType: 'punbb_uploads_type'
    punbbUploadsTypes: 'punbb_uploads_type'
    punbbUser: 'punbb_user'
    punbbUsers: 'punbb_user'
    punbbUserthread: 'punbb_userthread'
    punbbUserthreads: 'punbb_userthread'

  },
  Mutation: {
    createOnepunbb_ban: 'punbb_ban'
    updateOnepunbb_ban: 'punbb_ban'
    updateManypunbb_ban: 'BatchPayload'
    deleteOnepunbb_ban: 'punbb_ban'
    deleteManypunbb_ban: 'BatchPayload'
    upsertOnepunbb_ban: 'punbb_ban'
    createOnepunbb_category: 'punbb_category'
    updateOnepunbb_category: 'punbb_category'
    updateManypunbb_category: 'BatchPayload'
    deleteOnepunbb_category: 'punbb_category'
    deleteManypunbb_category: 'BatchPayload'
    upsertOnepunbb_category: 'punbb_category'
    createOnepunbb_censoring: 'punbb_censoring'
    updateOnepunbb_censoring: 'punbb_censoring'
    updateManypunbb_censoring: 'BatchPayload'
    deleteOnepunbb_censoring: 'punbb_censoring'
    deleteManypunbb_censoring: 'BatchPayload'
    upsertOnepunbb_censoring: 'punbb_censoring'
    createOnepunbb_config: 'punbb_config'
    updateOnepunbb_config: 'punbb_config'
    updateManypunbb_config: 'BatchPayload'
    deleteOnepunbb_config: 'punbb_config'
    deleteManypunbb_config: 'BatchPayload'
    upsertOnepunbb_config: 'punbb_config'
    createOnepunbb_forum: 'punbb_forum'
    updateOnepunbb_forum: 'punbb_forum'
    updateManypunbb_forum: 'BatchPayload'
    deleteOnepunbb_forum: 'punbb_forum'
    deleteManypunbb_forum: 'BatchPayload'
    upsertOnepunbb_forum: 'punbb_forum'
    createOnepunbb_forum_perm: 'punbb_forum_perm'
    updateOnepunbb_forum_perm: 'punbb_forum_perm'
    updateManypunbb_forum_perm: 'BatchPayload'
    deleteOnepunbb_forum_perm: 'punbb_forum_perm'
    deleteManypunbb_forum_perm: 'BatchPayload'
    upsertOnepunbb_forum_perm: 'punbb_forum_perm'
    createOnepunbb_group: 'punbb_group'
    updateOnepunbb_group: 'punbb_group'
    updateManypunbb_group: 'BatchPayload'
    deleteOnepunbb_group: 'punbb_group'
    deleteManypunbb_group: 'BatchPayload'
    upsertOnepunbb_group: 'punbb_group'
    createOnepunbb_poll: 'punbb_poll'
    updateOnepunbb_poll: 'punbb_poll'
    updateManypunbb_poll: 'BatchPayload'
    deleteOnepunbb_poll: 'punbb_poll'
    deleteManypunbb_poll: 'BatchPayload'
    upsertOnepunbb_poll: 'punbb_poll'
    createOnepunbb_post: 'punbb_post'
    updateOnepunbb_post: 'punbb_post'
    updateManypunbb_post: 'BatchPayload'
    deleteOnepunbb_post: 'punbb_post'
    deleteManypunbb_post: 'BatchPayload'
    upsertOnepunbb_post: 'punbb_post'
    createOnepunbb_rank: 'punbb_rank'
    updateOnepunbb_rank: 'punbb_rank'
    updateManypunbb_rank: 'BatchPayload'
    deleteOnepunbb_rank: 'punbb_rank'
    deleteManypunbb_rank: 'BatchPayload'
    upsertOnepunbb_rank: 'punbb_rank'
    createOnepunbb_report: 'punbb_report'
    updateOnepunbb_report: 'punbb_report'
    updateManypunbb_report: 'BatchPayload'
    deleteOnepunbb_report: 'punbb_report'
    deleteManypunbb_report: 'BatchPayload'
    upsertOnepunbb_report: 'punbb_report'
    createOnepunbb_search_cache: 'punbb_search_cache'
    updateOnepunbb_search_cache: 'punbb_search_cache'
    updateManypunbb_search_cache: 'BatchPayload'
    deleteOnepunbb_search_cache: 'punbb_search_cache'
    deleteManypunbb_search_cache: 'BatchPayload'
    upsertOnepunbb_search_cache: 'punbb_search_cache'
    createOnepunbb_search_word: 'punbb_search_word'
    updateOnepunbb_search_word: 'punbb_search_word'
    updateManypunbb_search_word: 'BatchPayload'
    deleteOnepunbb_search_word: 'punbb_search_word'
    deleteManypunbb_search_word: 'BatchPayload'
    upsertOnepunbb_search_word: 'punbb_search_word'
    createOnepunbb_subscription: 'punbb_subscription'
    updateOnepunbb_subscription: 'punbb_subscription'
    updateManypunbb_subscription: 'BatchPayload'
    deleteOnepunbb_subscription: 'punbb_subscription'
    deleteManypunbb_subscription: 'BatchPayload'
    upsertOnepunbb_subscription: 'punbb_subscription'
    createOnepunbb_topic: 'punbb_topic'
    updateOnepunbb_topic: 'punbb_topic'
    updateManypunbb_topic: 'BatchPayload'
    deleteOnepunbb_topic: 'punbb_topic'
    deleteManypunbb_topic: 'BatchPayload'
    upsertOnepunbb_topic: 'punbb_topic'
    createOnepunbb_uploaded: 'punbb_uploaded'
    updateOnepunbb_uploaded: 'punbb_uploaded'
    updateManypunbb_uploaded: 'BatchPayload'
    deleteOnepunbb_uploaded: 'punbb_uploaded'
    deleteManypunbb_uploaded: 'BatchPayload'
    upsertOnepunbb_uploaded: 'punbb_uploaded'
    createOnepunbb_uploads_type: 'punbb_uploads_type'
    updateOnepunbb_uploads_type: 'punbb_uploads_type'
    updateManypunbb_uploads_type: 'BatchPayload'
    deleteOnepunbb_uploads_type: 'punbb_uploads_type'
    deleteManypunbb_uploads_type: 'BatchPayload'
    upsertOnepunbb_uploads_type: 'punbb_uploads_type'
    createOnepunbb_user: 'punbb_user'
    updateOnepunbb_user: 'punbb_user'
    updateManypunbb_user: 'BatchPayload'
    deleteOnepunbb_user: 'punbb_user'
    deleteManypunbb_user: 'BatchPayload'
    upsertOnepunbb_user: 'punbb_user'
    createOnepunbb_userthread: 'punbb_userthread'
    updateOnepunbb_userthread: 'punbb_userthread'
    updateManypunbb_userthread: 'BatchPayload'
    deleteOnepunbb_userthread: 'punbb_userthread'
    deleteManypunbb_userthread: 'BatchPayload'
    upsertOnepunbb_userthread: 'punbb_userthread'

  },
  punbb_ban: {
    email: 'String'
    expire: 'Int'
    id: 'Int'
    ip: 'String'
    message: 'String'
    username: 'String'

},  punbb_category: {
    cat_name: 'String'
    disp_position: 'Int'
    id: 'Int'

},  punbb_censoring: {
    id: 'Int'
    replace_with: 'String'
    search_for: 'String'

},  punbb_config: {
    conf_name: 'String'
    conf_value: 'String'

},  punbb_forum: {
    cat_id: 'Int'
    disp_position: 'Int'
    forum_desc: 'String'
    forum_name: 'String'
    id: 'Int'
    last_post: 'Int'
    last_poster: 'String'
    last_post_id: 'Int'
    moderators: 'String'
    num_posts: 'Int'
    num_topics: 'Int'
    redirect_url: 'String'
    sort_by: 'Boolean'
    punbb_topic: 'punbb_topic'

},  punbb_forum_perm: {
    forum_id: 'Int'
    group_id: 'Int'
    post_polls: 'Boolean'
    post_replies: 'Boolean'
    post_topics: 'Boolean'
    read_forum: 'Boolean'

},  punbb_group: {
    g_delete_posts: 'Boolean'
    g_delete_topics: 'Boolean'
    g_edit_posts: 'Boolean'
    g_edit_subjects_interval: 'Int'
    g_id: 'Int'
    g_post_flood: 'Int'
    g_post_polls: 'Boolean'
    g_post_replies: 'Boolean'
    g_post_topics: 'Boolean'
    g_read_board: 'Boolean'
    g_search: 'Boolean'
    g_search_flood: 'Int'
    g_search_users: 'Boolean'
    g_set_title: 'Boolean'
    g_title: 'String'
    g_user_title: 'String'

},  punbb_poll: {
    id: 'Int'
    options: 'String'
    pollid: 'Int'
    ptype: 'Int'
    voters: 'String'
    votes: 'String'

},  punbb_post: {
    edited: 'Int'
    edited_by: 'String'
    hide_smilies: 'Boolean'
    id: 'Int'
    message: 'String'
    posted: 'Int'
    poster: 'String'
    poster_email: 'String'
    poster_id: 'Int'
    poster_ip: 'String'
    topic_id: 'Int'
    punbb_topic: 'punbb_topic'

},  punbb_rank: {
    id: 'Int'
    min_posts: 'Int'
    rank: 'String'

},  punbb_report: {
    created: 'Int'
    forum_id: 'Int'
    id: 'Int'
    message: 'String'
    post_id: 'Int'
    reported_by: 'Int'
    topic_id: 'Int'
    zapped: 'Int'
    zapped_by: 'Int'

},  punbb_search_cache: {
    id: 'Int'
    ident: 'String'
    search_data: 'String'

},  punbb_search_word: {
    id: 'Int'
    word: 'String'

},  punbb_subscription: {
    topic_id: 'Int'
    user_id: 'Int'

},  punbb_topic: {
    closed: 'Boolean'
    forum_id: 'Int'
    id: 'Int'
    last_post: 'Int'
    last_poster: 'String'
    last_post_id: 'Int'
    moved_to: 'Int'
    no: 'String'
    num_replies: 'Int'
    num_views: 'Int'
    posted: 'Int'
    poster: 'String'
    question: 'String'
    sticky: 'Boolean'
    subject: 'String'
    yes: 'String'
    punbb_forum: 'punbb_forum'
    punbb_post: 'punbb_post'

},  punbb_uploaded: {
    data: 'Int'
    descr: 'String'
    downs: 'Int'
    file: 'String'
    id: 'Int'
    size: 'Int'
    uid: 'Int'
    user: 'String'
    user_stat: 'String'

},  punbb_uploads_type: {
    exts: 'String'
    id: 'Int'
    type: 'String'

},  punbb_user: {
    activate_key: 'String'
    activate_string: 'String'
    admin_note: 'String'
    aim: 'String'
    disp_posts: 'Int'
    disp_topics: 'Int'
    email: 'String'
    email_setting: 'Boolean'
    group_id: 'Int'
    icq: 'String'
    id: 'Int'
    jabber: 'String'
    language: 'String'
    last_post: 'Int'
    last_visit: 'Int'
    location: 'String'
    msn: 'String'
    notify_with_post: 'Boolean'
    num_posts: 'Int'
    password: 'String'
    read_topics: 'String'
    realname: 'String'
    registered: 'Int'
    registration_ip: 'String'
    save_pass: 'Boolean'
    show_avatars: 'Boolean'
    show_img: 'Boolean'
    show_img_sig: 'Boolean'
    show_sig: 'Boolean'
    show_smilies: 'Boolean'
    signature: 'String'
    style: 'String'
    timezone: 'Float'
    title: 'String'
    url: 'String'
    username: 'String'
    use_avatar: 'Boolean'
    yahoo: 'String'

},  punbb_userthread: {
    forum: 'Int'
    last_read: 'Int'
    posted: 'Boolean'
    thread: 'Int'
    user: 'Int'

}
}

interface NexusPrismaMethods {
  punbb_ban: NexusPrismaFields<'punbb_ban'>
  punbb_category: NexusPrismaFields<'punbb_category'>
  punbb_censoring: NexusPrismaFields<'punbb_censoring'>
  punbb_config: NexusPrismaFields<'punbb_config'>
  punbb_forum: NexusPrismaFields<'punbb_forum'>
  punbb_forum_perm: NexusPrismaFields<'punbb_forum_perm'>
  punbb_group: NexusPrismaFields<'punbb_group'>
  punbb_poll: NexusPrismaFields<'punbb_poll'>
  punbb_post: NexusPrismaFields<'punbb_post'>
  punbb_rank: NexusPrismaFields<'punbb_rank'>
  punbb_report: NexusPrismaFields<'punbb_report'>
  punbb_search_cache: NexusPrismaFields<'punbb_search_cache'>
  punbb_search_word: NexusPrismaFields<'punbb_search_word'>
  punbb_subscription: NexusPrismaFields<'punbb_subscription'>
  punbb_topic: NexusPrismaFields<'punbb_topic'>
  punbb_uploaded: NexusPrismaFields<'punbb_uploaded'>
  punbb_uploads_type: NexusPrismaFields<'punbb_uploads_type'>
  punbb_user: NexusPrismaFields<'punbb_user'>
  punbb_userthread: NexusPrismaFields<'punbb_userthread'>
  Query: NexusPrismaFields<'Query'>
  Mutation: NexusPrismaFields<'Mutation'>
}
  

declare global {
  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = GetNexusPrisma<TypeName, ModelOrCrud>;
}
  