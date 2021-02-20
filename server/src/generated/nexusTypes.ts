import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    first?: boolean
    last?: boolean
    before?: boolean
    after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'No custom scalars are used in your Prisma Schema.'

// Prisma model type definitions
interface PrismaModels {
  punbb_ban: Prisma.punbb_ban
  punbb_category: Prisma.punbb_category
  punbb_censoring: Prisma.punbb_censoring
  punbb_config: Prisma.punbb_config
  punbb_forum: Prisma.punbb_forum
  punbb_forum_perm: Prisma.punbb_forum_perm
  punbb_group: Prisma.punbb_group
  punbb_poll: Prisma.punbb_poll
  punbb_post: Prisma.punbb_post
  punbb_rank: Prisma.punbb_rank
  punbb_report: Prisma.punbb_report
  punbb_search_cache: Prisma.punbb_search_cache
  punbb_search_word: Prisma.punbb_search_word
  punbb_subscription: Prisma.punbb_subscription
  punbb_topic: Prisma.punbb_topic
  punbb_uploaded: Prisma.punbb_uploaded
  punbb_uploads_type: Prisma.punbb_uploads_type
  punbb_user: Prisma.punbb_user
  punbb_userthread: Prisma.punbb_userthread
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    punbbBans: {
      filtering: 'AND' | 'OR' | 'NOT' | 'email' | 'expire' | 'id' | 'ip' | 'message' | 'username'
      ordering: 'email' | 'expire' | 'id' | 'ip' | 'message' | 'username'
    }
    punbbCategories: {
      filtering: 'AND' | 'OR' | 'NOT' | 'cat_name' | 'disp_position' | 'id' | 'punbb_forums'
      ordering: 'cat_name' | 'disp_position' | 'id'
    }
    punbbCensorings: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'replace_with' | 'search_for'
      ordering: 'id' | 'replace_with' | 'search_for'
    }
    punbbConfigs: {
      filtering: 'AND' | 'OR' | 'NOT' | 'conf_name' | 'conf_value'
      ordering: 'conf_name' | 'conf_value'
    }
    punbbForums: {
      filtering: 'AND' | 'OR' | 'NOT' | 'cat_id' | 'disp_position' | 'forum_desc' | 'forum_name' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moderators' | 'num_posts' | 'num_topics' | 'redirect_url' | 'sort_by' | 'punbb_topics' | 'punbb_category' | 'punbb_userthread'
      ordering: 'cat_id' | 'disp_position' | 'forum_desc' | 'forum_name' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moderators' | 'num_posts' | 'num_topics' | 'redirect_url' | 'sort_by' | 'punbb_category'
    }
    punbbForumPerms: {
      filtering: 'AND' | 'OR' | 'NOT' | 'forum_id' | 'group_id' | 'post_polls' | 'post_replies' | 'post_topics' | 'read_forum'
      ordering: 'forum_id' | 'group_id' | 'post_polls' | 'post_replies' | 'post_topics' | 'read_forum'
    }
    punbbGroups: {
      filtering: 'AND' | 'OR' | 'NOT' | 'g_delete_posts' | 'g_delete_topics' | 'g_edit_posts' | 'g_edit_subjects_interval' | 'g_id' | 'g_post_flood' | 'g_post_polls' | 'g_post_replies' | 'g_post_topics' | 'g_read_board' | 'g_search' | 'g_search_flood' | 'g_search_users' | 'g_set_title' | 'g_title' | 'g_user_title'
      ordering: 'g_delete_posts' | 'g_delete_topics' | 'g_edit_posts' | 'g_edit_subjects_interval' | 'g_id' | 'g_post_flood' | 'g_post_polls' | 'g_post_replies' | 'g_post_topics' | 'g_read_board' | 'g_search' | 'g_search_flood' | 'g_search_users' | 'g_set_title' | 'g_title' | 'g_user_title'
    }
    punbbPolls: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'options' | 'pollid' | 'ptype' | 'voters' | 'votes'
      ordering: 'id' | 'options' | 'pollid' | 'ptype' | 'voters' | 'votes'
    }
    punbbPosts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'punbb_topic' | 'punbb_user'
      ordering: 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'punbb_topic' | 'punbb_user'
    }
    punbbRanks: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'min_posts' | 'rank'
      ordering: 'id' | 'min_posts' | 'rank'
    }
    punbbReports: {
      filtering: 'AND' | 'OR' | 'NOT' | 'created' | 'forum_id' | 'id' | 'message' | 'post_id' | 'reported_by' | 'topic_id' | 'zapped' | 'zapped_by'
      ordering: 'created' | 'forum_id' | 'id' | 'message' | 'post_id' | 'reported_by' | 'topic_id' | 'zapped' | 'zapped_by'
    }
    punbbSearchCaches: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'ident' | 'search_data'
      ordering: 'id' | 'ident' | 'search_data'
    }
    punbbSearchWords: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'word'
      ordering: 'id' | 'word'
    }
    punbbSubscriptions: {
      filtering: 'AND' | 'OR' | 'NOT' | 'topic_id' | 'user_id'
      ordering: 'topic_id' | 'user_id'
    }
    punbbTopics: {
      filtering: 'AND' | 'OR' | 'NOT' | 'closed' | 'forum_id' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moved_to' | 'no' | 'num_replies' | 'num_views' | 'posted' | 'poster' | 'question' | 'sticky' | 'subject' | 'yes' | 'punbb_forum' | 'punbb_posts' | 'punbb_userthread'
      ordering: 'closed' | 'forum_id' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moved_to' | 'no' | 'num_replies' | 'num_views' | 'posted' | 'poster' | 'question' | 'sticky' | 'subject' | 'yes' | 'punbb_forum'
    }
    punbbUploadeds: {
      filtering: 'AND' | 'OR' | 'NOT' | 'data' | 'descr' | 'downs' | 'file' | 'id' | 'size' | 'uid' | 'user' | 'user_stat'
      ordering: 'data' | 'descr' | 'downs' | 'file' | 'id' | 'size' | 'uid' | 'user' | 'user_stat'
    }
    punbbUploadsTypes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'exts' | 'id' | 'type'
      ordering: 'exts' | 'id' | 'type'
    }
    punbbUsers: {
      filtering: 'AND' | 'OR' | 'NOT' | 'activate_key' | 'activate_string' | 'admin_note' | 'aim' | 'disp_posts' | 'disp_topics' | 'email' | 'email_setting' | 'group_id' | 'icq' | 'id' | 'jabber' | 'language' | 'last_post' | 'last_visit' | 'location' | 'msn' | 'notify_with_post' | 'num_posts' | 'password' | 'read_topics' | 'realname' | 'registered' | 'registration_ip' | 'save_pass' | 'show_avatars' | 'show_img' | 'show_img_sig' | 'show_sig' | 'show_smilies' | 'signature' | 'style' | 'timezone' | 'title' | 'url' | 'username' | 'use_avatar' | 'yahoo' | 'punbb_posts' | 'punbb_userthread'
      ordering: 'activate_key' | 'activate_string' | 'admin_note' | 'aim' | 'disp_posts' | 'disp_topics' | 'email' | 'email_setting' | 'group_id' | 'icq' | 'id' | 'jabber' | 'language' | 'last_post' | 'last_visit' | 'location' | 'msn' | 'notify_with_post' | 'num_posts' | 'password' | 'read_topics' | 'realname' | 'registered' | 'registration_ip' | 'save_pass' | 'show_avatars' | 'show_img' | 'show_img_sig' | 'show_sig' | 'show_smilies' | 'signature' | 'style' | 'timezone' | 'title' | 'url' | 'username' | 'use_avatar' | 'yahoo'
    }
    punbbUserthreads: {
      filtering: 'AND' | 'OR' | 'NOT' | 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'punbb_topic' | 'punbb_forum' | 'punbb_user'
      ordering: 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'punbb_topic' | 'punbb_forum' | 'punbb_user'
    }
  },
  punbb_ban: {

  }
  punbb_category: {
    punbb_forums: {
      filtering: 'AND' | 'OR' | 'NOT' | 'cat_id' | 'disp_position' | 'forum_desc' | 'forum_name' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moderators' | 'num_posts' | 'num_topics' | 'redirect_url' | 'sort_by' | 'punbb_topics' | 'punbb_category' | 'punbb_userthread'
      ordering: 'cat_id' | 'disp_position' | 'forum_desc' | 'forum_name' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moderators' | 'num_posts' | 'num_topics' | 'redirect_url' | 'sort_by' | 'punbb_category'
    }
  }
  punbb_censoring: {

  }
  punbb_config: {

  }
  punbb_forum: {
    punbb_topics: {
      filtering: 'AND' | 'OR' | 'NOT' | 'closed' | 'forum_id' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moved_to' | 'no' | 'num_replies' | 'num_views' | 'posted' | 'poster' | 'question' | 'sticky' | 'subject' | 'yes' | 'punbb_forum' | 'punbb_posts' | 'punbb_userthread'
      ordering: 'closed' | 'forum_id' | 'id' | 'last_post' | 'last_poster' | 'last_post_id' | 'moved_to' | 'no' | 'num_replies' | 'num_views' | 'posted' | 'poster' | 'question' | 'sticky' | 'subject' | 'yes' | 'punbb_forum'
    }
    punbb_userthread: {
      filtering: 'AND' | 'OR' | 'NOT' | 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'punbb_topic' | 'punbb_forum' | 'punbb_user'
      ordering: 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'punbb_topic' | 'punbb_forum' | 'punbb_user'
    }
  }
  punbb_forum_perm: {

  }
  punbb_group: {

  }
  punbb_poll: {

  }
  punbb_post: {

  }
  punbb_rank: {

  }
  punbb_report: {

  }
  punbb_search_cache: {

  }
  punbb_search_word: {

  }
  punbb_subscription: {

  }
  punbb_topic: {
    punbb_posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'punbb_topic' | 'punbb_user'
      ordering: 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'punbb_topic' | 'punbb_user'
    }
    punbb_userthread: {
      filtering: 'AND' | 'OR' | 'NOT' | 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'punbb_topic' | 'punbb_forum' | 'punbb_user'
      ordering: 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'punbb_topic' | 'punbb_forum' | 'punbb_user'
    }
  }
  punbb_uploaded: {

  }
  punbb_uploads_type: {

  }
  punbb_user: {
    punbb_posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'punbb_topic' | 'punbb_user'
      ordering: 'edited' | 'edited_by' | 'hide_smilies' | 'id' | 'message' | 'posted' | 'poster' | 'poster_email' | 'poster_id' | 'poster_ip' | 'topic_id' | 'punbb_topic' | 'punbb_user'
    }
    punbb_userthread: {
      filtering: 'AND' | 'OR' | 'NOT' | 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'punbb_topic' | 'punbb_forum' | 'punbb_user'
      ordering: 'forum' | 'last_read' | 'posted' | 'thread' | 'user' | 'punbb_topic' | 'punbb_forum' | 'punbb_user'
    }
  }
  punbb_userthread: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
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
    updateManypunbb_ban: 'AffectedRowsOutput'
    deleteOnepunbb_ban: 'punbb_ban'
    deleteManypunbb_ban: 'AffectedRowsOutput'
    upsertOnepunbb_ban: 'punbb_ban'
    createOnepunbb_category: 'punbb_category'
    updateOnepunbb_category: 'punbb_category'
    updateManypunbb_category: 'AffectedRowsOutput'
    deleteOnepunbb_category: 'punbb_category'
    deleteManypunbb_category: 'AffectedRowsOutput'
    upsertOnepunbb_category: 'punbb_category'
    createOnepunbb_censoring: 'punbb_censoring'
    updateOnepunbb_censoring: 'punbb_censoring'
    updateManypunbb_censoring: 'AffectedRowsOutput'
    deleteOnepunbb_censoring: 'punbb_censoring'
    deleteManypunbb_censoring: 'AffectedRowsOutput'
    upsertOnepunbb_censoring: 'punbb_censoring'
    createOnepunbb_config: 'punbb_config'
    updateOnepunbb_config: 'punbb_config'
    updateManypunbb_config: 'AffectedRowsOutput'
    deleteOnepunbb_config: 'punbb_config'
    deleteManypunbb_config: 'AffectedRowsOutput'
    upsertOnepunbb_config: 'punbb_config'
    createOnepunbb_forum: 'punbb_forum'
    updateOnepunbb_forum: 'punbb_forum'
    updateManypunbb_forum: 'AffectedRowsOutput'
    deleteOnepunbb_forum: 'punbb_forum'
    deleteManypunbb_forum: 'AffectedRowsOutput'
    upsertOnepunbb_forum: 'punbb_forum'
    createOnepunbb_forum_perm: 'punbb_forum_perm'
    updateOnepunbb_forum_perm: 'punbb_forum_perm'
    updateManypunbb_forum_perm: 'AffectedRowsOutput'
    deleteOnepunbb_forum_perm: 'punbb_forum_perm'
    deleteManypunbb_forum_perm: 'AffectedRowsOutput'
    upsertOnepunbb_forum_perm: 'punbb_forum_perm'
    createOnepunbb_group: 'punbb_group'
    updateOnepunbb_group: 'punbb_group'
    updateManypunbb_group: 'AffectedRowsOutput'
    deleteOnepunbb_group: 'punbb_group'
    deleteManypunbb_group: 'AffectedRowsOutput'
    upsertOnepunbb_group: 'punbb_group'
    createOnepunbb_poll: 'punbb_poll'
    updateOnepunbb_poll: 'punbb_poll'
    updateManypunbb_poll: 'AffectedRowsOutput'
    deleteOnepunbb_poll: 'punbb_poll'
    deleteManypunbb_poll: 'AffectedRowsOutput'
    upsertOnepunbb_poll: 'punbb_poll'
    createOnepunbb_post: 'punbb_post'
    updateOnepunbb_post: 'punbb_post'
    updateManypunbb_post: 'AffectedRowsOutput'
    deleteOnepunbb_post: 'punbb_post'
    deleteManypunbb_post: 'AffectedRowsOutput'
    upsertOnepunbb_post: 'punbb_post'
    createOnepunbb_rank: 'punbb_rank'
    updateOnepunbb_rank: 'punbb_rank'
    updateManypunbb_rank: 'AffectedRowsOutput'
    deleteOnepunbb_rank: 'punbb_rank'
    deleteManypunbb_rank: 'AffectedRowsOutput'
    upsertOnepunbb_rank: 'punbb_rank'
    createOnepunbb_report: 'punbb_report'
    updateOnepunbb_report: 'punbb_report'
    updateManypunbb_report: 'AffectedRowsOutput'
    deleteOnepunbb_report: 'punbb_report'
    deleteManypunbb_report: 'AffectedRowsOutput'
    upsertOnepunbb_report: 'punbb_report'
    createOnepunbb_search_cache: 'punbb_search_cache'
    updateOnepunbb_search_cache: 'punbb_search_cache'
    updateManypunbb_search_cache: 'AffectedRowsOutput'
    deleteOnepunbb_search_cache: 'punbb_search_cache'
    deleteManypunbb_search_cache: 'AffectedRowsOutput'
    upsertOnepunbb_search_cache: 'punbb_search_cache'
    createOnepunbb_search_word: 'punbb_search_word'
    updateOnepunbb_search_word: 'punbb_search_word'
    updateManypunbb_search_word: 'AffectedRowsOutput'
    deleteOnepunbb_search_word: 'punbb_search_word'
    deleteManypunbb_search_word: 'AffectedRowsOutput'
    upsertOnepunbb_search_word: 'punbb_search_word'
    createOnepunbb_subscription: 'punbb_subscription'
    updateOnepunbb_subscription: 'punbb_subscription'
    updateManypunbb_subscription: 'AffectedRowsOutput'
    deleteOnepunbb_subscription: 'punbb_subscription'
    deleteManypunbb_subscription: 'AffectedRowsOutput'
    upsertOnepunbb_subscription: 'punbb_subscription'
    createOnepunbb_topic: 'punbb_topic'
    updateOnepunbb_topic: 'punbb_topic'
    updateManypunbb_topic: 'AffectedRowsOutput'
    deleteOnepunbb_topic: 'punbb_topic'
    deleteManypunbb_topic: 'AffectedRowsOutput'
    upsertOnepunbb_topic: 'punbb_topic'
    createOnepunbb_uploaded: 'punbb_uploaded'
    updateOnepunbb_uploaded: 'punbb_uploaded'
    updateManypunbb_uploaded: 'AffectedRowsOutput'
    deleteOnepunbb_uploaded: 'punbb_uploaded'
    deleteManypunbb_uploaded: 'AffectedRowsOutput'
    upsertOnepunbb_uploaded: 'punbb_uploaded'
    createOnepunbb_uploads_type: 'punbb_uploads_type'
    updateOnepunbb_uploads_type: 'punbb_uploads_type'
    updateManypunbb_uploads_type: 'AffectedRowsOutput'
    deleteOnepunbb_uploads_type: 'punbb_uploads_type'
    deleteManypunbb_uploads_type: 'AffectedRowsOutput'
    upsertOnepunbb_uploads_type: 'punbb_uploads_type'
    createOnepunbb_user: 'punbb_user'
    updateOnepunbb_user: 'punbb_user'
    updateManypunbb_user: 'AffectedRowsOutput'
    deleteOnepunbb_user: 'punbb_user'
    deleteManypunbb_user: 'AffectedRowsOutput'
    upsertOnepunbb_user: 'punbb_user'
    createOnepunbb_userthread: 'punbb_userthread'
    updateOnepunbb_userthread: 'punbb_userthread'
    updateManypunbb_userthread: 'AffectedRowsOutput'
    deleteOnepunbb_userthread: 'punbb_userthread'
    deleteManypunbb_userthread: 'AffectedRowsOutput'
    upsertOnepunbb_userthread: 'punbb_userthread'
  },
  punbb_ban: {
    email: 'String'
    expire: 'Int'
    id: 'Int'
    ip: 'String'
    message: 'String'
    username: 'String'
  }
  punbb_category: {
    cat_name: 'String'
    disp_position: 'Int'
    id: 'Int'
    punbb_forums: 'punbb_forum'
  }
  punbb_censoring: {
    id: 'Int'
    replace_with: 'String'
    search_for: 'String'
  }
  punbb_config: {
    conf_name: 'String'
    conf_value: 'String'
  }
  punbb_forum: {
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
    punbb_topics: 'punbb_topic'
    punbb_category: 'punbb_category'
    punbb_userthread: 'punbb_userthread'
  }
  punbb_forum_perm: {
    forum_id: 'Int'
    group_id: 'Int'
    post_polls: 'Boolean'
    post_replies: 'Boolean'
    post_topics: 'Boolean'
    read_forum: 'Boolean'
  }
  punbb_group: {
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
  }
  punbb_poll: {
    id: 'Int'
    options: 'String'
    pollid: 'Int'
    ptype: 'Int'
    voters: 'String'
    votes: 'String'
  }
  punbb_post: {
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
    punbb_user: 'punbb_user'
  }
  punbb_rank: {
    id: 'Int'
    min_posts: 'Int'
    rank: 'String'
  }
  punbb_report: {
    created: 'Int'
    forum_id: 'Int'
    id: 'Int'
    message: 'String'
    post_id: 'Int'
    reported_by: 'Int'
    topic_id: 'Int'
    zapped: 'Int'
    zapped_by: 'Int'
  }
  punbb_search_cache: {
    id: 'Int'
    ident: 'String'
    search_data: 'String'
  }
  punbb_search_word: {
    id: 'Int'
    word: 'String'
  }
  punbb_subscription: {
    topic_id: 'Int'
    user_id: 'Int'
  }
  punbb_topic: {
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
    punbb_posts: 'punbb_post'
    punbb_userthread: 'punbb_userthread'
  }
  punbb_uploaded: {
    data: 'Int'
    descr: 'String'
    downs: 'Int'
    file: 'String'
    id: 'Int'
    size: 'Int'
    uid: 'Int'
    user: 'String'
    user_stat: 'String'
  }
  punbb_uploads_type: {
    exts: 'String'
    id: 'Int'
    type: 'String'
  }
  punbb_user: {
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
    punbb_posts: 'punbb_post'
    punbb_userthread: 'punbb_userthread'
  }
  punbb_userthread: {
    forum: 'Int'
    last_read: 'Int'
    posted: 'Boolean'
    thread: 'Int'
    user: 'Int'
    punbb_topic: 'punbb_topic'
    punbb_forum: 'punbb_forum'
    punbb_user: 'punbb_user'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  punbb_ban: Typegen.NexusPrismaFields<'punbb_ban'>
  punbb_category: Typegen.NexusPrismaFields<'punbb_category'>
  punbb_censoring: Typegen.NexusPrismaFields<'punbb_censoring'>
  punbb_config: Typegen.NexusPrismaFields<'punbb_config'>
  punbb_forum: Typegen.NexusPrismaFields<'punbb_forum'>
  punbb_forum_perm: Typegen.NexusPrismaFields<'punbb_forum_perm'>
  punbb_group: Typegen.NexusPrismaFields<'punbb_group'>
  punbb_poll: Typegen.NexusPrismaFields<'punbb_poll'>
  punbb_post: Typegen.NexusPrismaFields<'punbb_post'>
  punbb_rank: Typegen.NexusPrismaFields<'punbb_rank'>
  punbb_report: Typegen.NexusPrismaFields<'punbb_report'>
  punbb_search_cache: Typegen.NexusPrismaFields<'punbb_search_cache'>
  punbb_search_word: Typegen.NexusPrismaFields<'punbb_search_word'>
  punbb_subscription: Typegen.NexusPrismaFields<'punbb_subscription'>
  punbb_topic: Typegen.NexusPrismaFields<'punbb_topic'>
  punbb_uploaded: Typegen.NexusPrismaFields<'punbb_uploaded'>
  punbb_uploads_type: Typegen.NexusPrismaFields<'punbb_uploads_type'>
  punbb_user: Typegen.NexusPrismaFields<'punbb_user'>
  punbb_userthread: Typegen.NexusPrismaFields<'punbb_userthread'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  