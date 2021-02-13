export const STORE_INIT = "@@INIT";
export type STORE_INIT = typeof STORE_INIT;

export const INIT = "COLAB_INIT";
export type INIT = typeof INIT;

export const SET_SITE = "SET_SITE";
export type SET_SITE = typeof SET_SITE;

export const SET_AUTH = "SET_AUTH";
export type SET_AUTH = typeof SET_AUTH;

export const SET_CONFIG = "SET_CONFIG";
export type SET_CONFIG = typeof SET_CONFIG;

export const LOAD_SITE = "LOAD_SITE";
export type LOAD_SITE = typeof LOAD_SITE;

export const LOAD_CONFIG = "LOAD_CONFIG";
export type LOAD_CONFIG = typeof LOAD_CONFIG;

export const LOGOUT = "LOGOUT";
export type LOGOUT = typeof LOGOUT;

export const LOGIN = "LOGIN";
export type LOGIN = typeof LOGIN;

export const ROUTE = "ROUTE";
export type ROUTE = typeof ROUTE;

export const CONNECTED = "CONNECTED";
export type CONNECTED = typeof CONNECTED;

export const DISCONNECTED = "DISCONNECTED";
export type DISCONNECTED = typeof DISCONNECTED;

export const INIT_CONVERSATION = "INIT_CONVERSATION";
export type INIT_CONVERSATION = typeof INIT_CONVERSATION;

export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export type CREATE_CONVERSATION = typeof CREATE_CONVERSATION;

export const TRIM_CONVSERSATION = "TRIM_CONVSERSATION";
export type TRIM_CONVSERSATION = typeof TRIM_CONVSERSATION;

export const REMOVE_CONVERSATION = "REMOVE_CONVERSATION";
export type REMOVE_CONVERSATION = typeof REMOVE_CONVERSATION;

export const LOAD_CONVERSATION = "LOAD_CONVERSATION";
export type LOAD_CONVERSATION = typeof LOAD_CONVERSATION;

export const SET_CONVERSATION_PAGE = "SET_CONVERSATION_PAGE";
export type SET_CONVERSATION_PAGE = typeof SET_CONVERSATION_PAGE;

export const LOADING_CONVERSATION = "LOADING_CONVERSATION";
export type LOADING_CONVERSATION = typeof LOADING_CONVERSATION;

export const CONCAT_CONVERSATION = "CONCAT_CONVERSATION";
export type CONCAT_CONVERSATION = typeof CONCAT_CONVERSATION;

export const STORE_RELATED = "STORE_RELATED";
export type STORE_RELATED = typeof STORE_RELATED;

// Thread actions
export const GET_USER = "GET_USER";
export type GET_USER = typeof GET_USER;

export const PUT_USER = "PUT_USER";
export type PUT_USER = typeof PUT_USER;

export const PUT_USERS = "PUT_USERS";
export type PUT_USERS = typeof PUT_USERS;

export const UPDATE_USER = "UPDATE_USER";
export type UPDATE_USER = typeof UPDATE_USER;

export const PATCH_USER = "PATCH_USER";
export type PATCH_USER = typeof PATCH_USER;

export const PATCH_USERS = "PATCH_USERS";
export type PATCH_USERS = typeof PATCH_USERS;

export const REMOVE_USER = "REMOVE_USER";
export type REMOVE_USER = typeof REMOVE_USER;

export const FETCH_USERS = "FETCH_USERS";
export type FETCH_USERS = typeof FETCH_USERS;

export const USER_UPDATED = "USER_UPDATED";
export type USER_UPDATED = "USER_UPDATED";

export const SEND_INVITATIONS = "SEND_INVITATIONS";
export type SEND_INVITATIONS = typeof SEND_INVITATIONS;

export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export type UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

// Message actions
export const GET_MESSAGE = "GET_MESSAGE";
export type GET_MESSAGE = typeof GET_MESSAGE;

export const PUT_MESSAGE = "PUT_MESSAGE";
export type PUT_MESSAGE = typeof PUT_MESSAGE;

export const PUT_MESSAGES = "PUT_MESSAGES";
export type PUT_MESSAGES = typeof PUT_MESSAGES;

export const PATCH_MESSAGE = "PATCH_MESSAGE";
export type PATCH_MESSAGE = typeof PATCH_MESSAGE;

export const NEW_MESSAGE = "NEW_MESSAGE";
export type NEW_MESSAGE = typeof NEW_MESSAGE;

export const DELETE_MESSAGE = "DELETE_MESSAGE";
export type DELETE_MESSAGE = typeof DELETE_MESSAGE;

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export type UPDATE_MESSAGE = typeof UPDATE_MESSAGE;

export const REMOVE_MESSAGE = "REMVOE_MESSAGE";
export type REMOVE_MESSAGE = typeof REMOVE_MESSAGE;

export const FETCH_MESSAGES = "FETCH_MESSAGES";
export type FETCH_MESSAGES = typeof FETCH_MESSAGES;

export const MESSAGE_CREATED = "MESSAGE_CREATED";
export type MESSAGE_CREATED = typeof MESSAGE_CREATED;

export const MESSAGE_UPDATED = "MESSAGE_UPDATED";
export type MESSAGE_UPDATED = typeof MESSAGE_UPDATED;

export const MESSAGE_DELETED = "MESSAGE_DELETED";
export type MESSAGE_DELETED = typeof MESSAGE_DELETED;

export const POST_MESSAGE = "POST_MESSAGE";
export type POST_MESSAGE = typeof POST_MESSAGE;

export const FLAG_MESSAGE = "FLAG_MESSAGE";
export type FLAG_MESSAGE = typeof FLAG_MESSAGE;

export const PIN_MESSAGE = "PIN_MESSAGE";
export type PIN_MESSAGE = typeof PIN_MESSAGE;

export const UNFLAG_MESSAGE = "UNFLAG_MESSAGE";
export type UNFLAG_MESSAGE = typeof UNFLAG_MESSAGE;

export const UNPIN_MESSAGE = "UNPIN_MESSAGE";
export type UNPIN_MESSAGE = typeof UNPIN_MESSAGE;

export const REACT_MESSAGE = "REACT_MESSAGE";
export type REACT_MESSAGE = typeof REACT_MESSAGE;

export const UNREACT_MESSAGE = "UNREACT_MESSAGE";
export type UNREACT_MESSAGE = typeof UNREACT_MESSAGE;

export const USER_REACTED = "USER_REACTED";
export type USER_REACTED = typeof USER_REACTED;

export const USER_UNREACTED = "USER_UNREACTED";
export type USER_UNREACTED = typeof USER_UNREACTED;

// Thread actions
export const GET_THREAD = "GET_THREAD";
export type GET_THREAD = typeof GET_THREAD;

export const PUT_THREAD = "PUT_THREAD";
export type PUT_THREAD = typeof PUT_THREAD;

export const PUT_THREADS = "PUT_THREADS";
export type PUT_THREADS = typeof PUT_THREADS;

export const THREAD_ACTIVITY = "THREAD_ACTIVITY";
export type THREAD_ACTIVITY = typeof THREAD_ACTIVITY;

export const THREAD_CREATED = "THREAD_CREATED";
export type THREAD_CREATED = typeof THREAD_CREATED;

export const THREAD_UPDATED = "THREAD_UPDATED";
export type THREAD_UPDATED = typeof THREAD_UPDATED;

export const THREAD_DELETED = "THREAD_DELETED";
export type THREAD_DELETED = typeof THREAD_DELETED;

export const PATCH_THREAD = "PATCH_THREAD";
export type PATCH_THREAD = typeof PATCH_THREAD;

export const CREATE_THREAD = "CREATE_THREAD";
export type CREATE_THREAD = typeof CREATE_THREAD;

export const PATCH_THREADS = "PATCH_THREADS";
export type PATCH_THREADS = typeof PATCH_THREADS;

export const REMOVE_THREAD = "REMOVE_THREAD";
export type REMOVE_THREAD = typeof REMOVE_THREAD;

export const FETCH_THREADS = "FETCH_THREADS";
export type FETCH_THREADS = typeof FETCH_THREADS;

export const LOAD_THREAD = "LOAD_THREAD";
export type LOAD_THREAD = typeof LOAD_THREAD;

export const DEACTIVATE_THREAD = "DEACTIVATE_THREAD";
export type DEACTIVATE_THREAD = typeof DEACTIVATE_THREAD;

// Workspace actions
export const GET_WORKSPACE = "GET_WORKSPACE";
export type GET_WORKSPACE = typeof GET_WORKSPACE;

export const PUT_WORKSPACE = "PUT_WORKSPACE";
export type PUT_WORKSPACE = typeof PUT_WORKSPACE;

export const PUT_WORKSPACES = "PUT_WORKSPACES";
export type PUT_WORKSPACES = typeof PUT_WORKSPACES;

export const PATCH_WORKSPACE = "PATCH_WORKSPACE";
export type PATCH_WORKSPACE = typeof PATCH_WORKSPACE;

export const CREATE_WORKSPACE = "CREATE_WORKSPACE";
export type CREATE_WORKSPACE = typeof CREATE_WORKSPACE;

export const DELETE_WORKSPACE = "DELETE_WORKSPACE";
export type DELETE_WORKSPACE = typeof DELETE_WORKSPACE;

export const UPDATE_WORKSPACE = "UPDATE_WORKSPACE";
export type UPDATE_WORKSPACE = typeof UPDATE_WORKSPACE;

export const PATCH_WORKSPACES = "PATCH_WORKSPACES";
export type PATCH_WORKSPACES = typeof PATCH_WORKSPACES;

export const REMOVE_WORKSPACE = "REMOVE_WORKSPACE";
export type REMOVE_WORKSPACE = typeof REMOVE_WORKSPACE;

export const WORKSPACE_CREATED = "WORKSPACE_CREATED";
export type WORKSPACE_CREATED = typeof WORKSPACE_CREATED;

export const WORKSPACE_UPDATED = "WORKSPACE_UPDATED";
export type WORKSPACE_UPDATED = typeof WORKSPACE_UPDATED;

export const WORKSPACE_DELETED = "WORKSPACE_DELETED";
export type WORKSPACE_DELETED = typeof WORKSPACE_DELETED;

export const FETCH_WORKSPACES = "FETCH_WORKSPACES";
export type FETCH_WORKSPACES = typeof FETCH_WORKSPACES;

// Channel actions
export const LOAD_CHANNEL = "GET_CHANNEL";
export type LOAD_CHANNEL = typeof LOAD_CHANNEL;

export const CLEAR_CHANNEL = "CLEAR_CHANNEL";
export type CLEAR_CHANNEL = typeof CLEAR_CHANNEL;

export const PUT_CHANNEL = "PUT_CHANNEL";
export type PUT_CHANNEL = typeof PUT_CHANNEL;

export const PUT_CHANNELS = "PUT_CHANNELS";
export type PUT_CHANNELS = typeof PUT_CHANNELS;

export const PATCH_CHANNEL = "PATCH_CHANNEL";
export type PATCH_CHANNEL = typeof PATCH_CHANNEL;

export const CHANNEL_CREATED = "CHANNEL_CREATED";
export type CHANNEL_CREATED = typeof CHANNEL_CREATED;

export const CREATE_CHANNEL = "CREATE_CHANNEL";
export type CREATE_CHANNEL = typeof CREATE_CHANNEL;

export const DELETE_CHANNEL = "DELETE_CHANNEL";
export type DELETE_CHANNEL = typeof DELETE_CHANNEL;

export const LOAD_TOPICS = "LOAD_TOPICS";
export type LOAD_TOPICS = typeof LOAD_TOPICS;

export const CREATE_TOPIC = "CREATE_TOPIC";
export type CREATE_TOPIC = typeof CREATE_TOPIC;

export const UPDATE_TOPIC = "UPDATE_TOPIC";
export type UPDATE_TOPIC = typeof UPDATE_TOPIC;

export const DELETE_TOPIC = "DELETE_TOPIC";
export type DELETE_TOPIC = typeof DELETE_TOPIC;

export const UPDATE_CHANNEL = "UPDATE_CHANNEL";
export type UPDATE_CHANNEL = typeof UPDATE_CHANNEL;

export const JOIN_CHANNEL = "JOIN_CHANNEL";
export type JOIN_CHANNEL = typeof JOIN_CHANNEL;

export const PATCH_CHANNELS = "PATCH_CHANNELS";
export type PATCH_CHANNELS = typeof PATCH_CHANNELS;

export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export type REMOVE_CHANNEL = typeof REMOVE_CHANNEL;

export const FETCH_CHANNELS = "FETCH_CHANNELS";
export type FETCH_CHANNELS = typeof FETCH_CHANNELS;

export const ARCHIVE_CHANNEL = "ARCHIVE_CHANNEL";
export type ARCHIVE_CHANNEL = typeof ARCHIVE_CHANNEL;

export const UNARCHIVE_CHANNEL = "UNARCHIVE_CHANNEL";
export type UNARCHIVE_CHANNEL = typeof UNARCHIVE_CHANNEL;

export const CHANNEL_UPDATED = "CHANNEL_UPDATED";
export type CHANNEL_UPDATED = typeof CHANNEL_UPDATED;

export const CHANNEL_DELETED = "CHANNEL_DELETED";
export type CHANNEL_DELETED = typeof CHANNEL_DELETED;

export const CHANNEL_ARCHIVED = "CHANNEL_ARCHIVED";
export type CHANNEL_ARCHIVED = typeof CHANNEL_ARCHIVED;

export const CHANNEL_JOINED = "CHANNEL_JOINED";
export type CHANNEL_JOINED = typeof CHANNEL_JOINED;

export const CHANNEL_UNARCHIVED = "CHANNEL_UNARCHIVED";
export type CHANNEL_UNARCHIVED = typeof CHANNEL_UNARCHIVED;

// Column actions
export const GET_COLUMN = "GET_COLUMN";
export type GET_COLUMN = typeof GET_COLUMN;

export const CREATE_COLUMN = "CREATE_COLUMN";
export type CREATE_COLUMN = typeof CREATE_COLUMN;

export const PUT_COLUMN = "PUT_COLUMN";
export type PUT_COLUMN = typeof PUT_COLUMN;

export const STORE_COLUMN = "STORE_COLUMN";
export type STORE_COLUMN = typeof STORE_COLUMN;

export const STORE_COLUMNS = "STORE_COLUMNS";
export type STORE_COLUMNS = typeof STORE_COLUMNS;

export const MOVE_COLUMN = "MOVE_COLUMN";
export type MOVE_COLUMN = typeof MOVE_COLUMN;

export const PUT_COLUMNS = "PUT_COLUMNS";
export type PUT_COLUMNS = typeof PUT_COLUMNS;

export const PATCH_COLUMN = "PATCH_COLUMN";
export type PATCH_COLUMN = typeof PATCH_COLUMN;

export const DELETE_COLUMN = "DELETE_COLUMN";
export type DELETE_COLUMN = typeof DELETE_COLUMN;

export const PATCH_COLUMNS = "PATCH_COLUMNS";
export type PATCH_COLUMNS = typeof PATCH_COLUMNS;

export const UPDATE_COLUMN = "UPDATE_COLUMN";
export type UPDATE_COLUMN = typeof UPDATE_COLUMN;

export const LOAD_COLUMNS = "LOAD_COLUMNS";
export type LOAD_COLUMNS = typeof LOAD_COLUMNS;

export const REMOVE_COLUMN = "REMOVE_COLUMN";
export type REMOVE_COLUMN = typeof REMOVE_COLUMN;

export const FETCH_COLUMNS = "FETCH_COLUMNS";
export type FETCH_COLUMNS = typeof FETCH_COLUMNS;

export const ARCHIVE_COLUMN = "ARCHIVE_COLUMN";
export type ARCHIVE_COLUMN = typeof ARCHIVE_COLUMN;

export const UNARCHIVE_COLUMN = "UNARCHIVE_COLUMN";
export type UNARCHIVE_COLUMN = typeof UNARCHIVE_COLUMN;

export const COLUMNS_REORDERED = "COLUMNS_REORDERED";
export type COLUMNS_REORDERED = typeof COLUMNS_REORDERED;

export const COLUMN_CREATED = "COLUMN_CREATED";
export type COLUMN_CREATED = typeof COLUMN_CREATED;

export const COLUMN_UPDATED = "COLUMN_UPDATED";
export type COLUMN_UPDATED = typeof COLUMN_UPDATED;

export const COLUMN_DELETED = "COLUMN_DELETED";
export type COLUMN_DELETED = typeof COLUMN_DELETED;

export const COLUMN_ARCHIVED = "COLUMN_ARCHIVED";
export type COLUMN_ARCHIVED = typeof COLUMN_ARCHIVED;

export const COLUMN_UNARCHIVED = "COLUMN_UNARCHIVED";
export type COLUMN_UNARCHIVED = typeof COLUMN_UNARCHIVED;

// Card actions
export const GET_CARD = "GET_CARD";
export type GET_CARD = typeof GET_CARD;

export const PUT_CARD = "PUT_CARD";
export type PUT_CARD = typeof PUT_CARD;

export const PUT_CARDS = "PUT_CARDS";
export type PUT_CARDS = typeof PUT_CARDS;

export const PATCH_CARD = "PATCH_CARD";
export type PATCH_CARD = typeof PATCH_CARD;

export const STORE_CARD = "STORE_CARD";
export type STORE_CARD = typeof STORE_CARD;

export const STORE_CARDS = "STORE_CARDS";
export type STORE_CARDS = typeof STORE_CARDS;

export const CREATE_CARD = "CREATE_CARD";
export type CREATE_CARD = typeof CREATE_CARD;

export const DELETE_CARD = "DELETE_CARD";
export type DELETE_CARD = typeof DELETE_CARD;

export const MOVE_CARD = "MOVE_CARD";
export type MOVE_CARD = typeof MOVE_CARD;

export const UPDATE_CARD = "UPDATE_CARD";
export type UPDATE_CARD = typeof UPDATE_CARD;

export const PATCH_CARDS = "PATCH_CARDS";
export type PATCH_CARDS = typeof PATCH_CARDS;

export const REMOVE_CARD = "REMOVE_CARD";
export type REMOVE_CARD = typeof REMOVE_CARD;

export const TAG_CARD = "TAG_CARD";
export type TAG_CARD = typeof TAG_CARD;

export const UNTAG_CARD = "UNTAG_CARD";
export type UNTAG_CARD = typeof UNTAG_CARD;

export const FETCH_CARDS = "FETCH_CARDS";
export type FETCH_CARDS = typeof FETCH_CARDS;

export const ARCHIVE_CARD = "ARCHIVE_CARD";
export type ARCHIVE_CARD = typeof ARCHIVE_CARD;

export const UNARCHIVE_CARD = "UNARCHIVE_CARD";
export type UNARCHIVE_CARD = typeof UNARCHIVE_CARD;

export const LOAD_CARDS = "LOAD_CARDS";
export type LOAD_CARDS = typeof LOAD_CARDS;

export const CLEAR_CARDS = "CLEAR_CARDS";
export type CLEAR_CARDS = typeof CLEAR_CARDS;

export const CARD_CREATED = "CARD_CREATED";
export type CARD_CREATED = typeof CARD_CREATED;

export const CARD_TAGGED = "CARD_TAGGED";
export type CARD_TAGGED = typeof CARD_TAGGED;

export const CARD_UNTAGGED = "CARD_UNTAGGED";
export type CARD_UNTAGGED = typeof CARD_UNTAGGED;

export const CARD_ARCHIVED = "CARD_ARCHIVED";
export type CARD_ARCHIVED = typeof CARD_ARCHIVED;

export const CARD_DONE = "CARD_DONE";
export type CARD_DONE = typeof CARD_DONE;

export const MARK_CARD_AS_DONE = "MARK_CARD_AS_DONE";
export type MARK_CARD_AS_DONE = typeof MARK_CARD_AS_DONE;

export const MARK_CARD_AS_UNDONE = "MARK_CARD_AS_UNDONE";
export type MARK_CARD_AS_UNDONE = typeof MARK_CARD_AS_UNDONE;

export const CARD_UNARCHIVED = "CARD_UNARCHIVED";
export type CARD_UNARCHIVED = typeof CARD_UNARCHIVED;

export const CARD_UPDATED = "CARD_UPDATED";
export type CARD_UPDATED = typeof CARD_UPDATED;

export const CARD_DELETED = "CARD_DELETED";
export type CARD_DELETED = typeof CARD_DELETED;

export const CARDS_REORDERED = "CARDS_REORDERED";
export type CARDS_REORDERED = typeof CARDS_REORDERED;

// Checklist actions
export const PUT_CHECKLIST = "PUT_CHECKLIST";
export type PUT_CHECKLIST = typeof PUT_CHECKLIST;

export const PUT_CHECKLISTS = "PUT_CHECKLISTS";
export type PUT_CHECKLISTS = typeof PUT_CHECKLISTS;

export const PATCH_CHECKLIST = "PATCH_CHECKLIST";
export type PATCH_CHECKLIST = typeof PATCH_CHECKLIST;

export const DELETE_CHECKLIST = "DELETE_CHECKLIST";
export type DELETE_CHECKLIST = typeof DELETE_CHECKLIST;

export const CREATE_CHECKLIST = "CREATE_CHECKLIST";
export type CREATE_CHECKLIST = typeof CREATE_CHECKLIST;

export const UPDATE_CHECKLIST = "UPDATE_CHECKLIST";
export type UPDATE_CHECKLIST = typeof UPDATE_CHECKLIST;

export const PATCH_CHECKLISTS = "PATCH_CHECKLISTS";
export type PATCH_CHECKLISTS = typeof PATCH_CHECKLISTS;

export const REMOVE_CHECKLIST = "REMOVE_CHECKLIST";
export type REMOVE_CHECKLIST = typeof REMOVE_CHECKLIST;

export const CHECKLIST_CREATED = "CHECKLIST_CREATED";
export type CHECKLIST_CREATED = typeof CHECKLIST_CREATED;

export const CHECKLIST_UPDATED = "CHECKLIST_UPDATED";
export type CHECKLIST_UPDATED = typeof CHECKLIST_UPDATED;

export const CHECKLIST_DELETED = "CHECKLIST_DELETED";
export type CHECKLIST_DELETED = typeof CHECKLIST_DELETED;

// Task actions
export const PUT_TASK = "PUT_TASK";
export type PUT_TASK = typeof PUT_TASK;

export const PUT_TASKS = "PUT_TASKS";
export type PUT_TASKS = typeof PUT_TASKS;

export const PATCH_TASK = "PATCH_TASK";
export type PATCH_TASK = typeof PATCH_TASK;

export const DELETE_TASK = "DELETE_TASK";
export type DELETE_TASK = typeof DELETE_TASK;

export const CREATE_TASK = "CREATE_TASK";
export type CREATE_TASK = typeof CREATE_TASK;

export const UPDATE_TASK = "UPDATE_TASK";
export type UPDATE_TASK = typeof UPDATE_TASK;

export const PATCH_TASKS = "PATCH_TASKS";
export type PATCH_TASKS = typeof PATCH_TASKS;

export const REMOVE_TASK = "REMOVE_TASK";
export type REMOVE_TASK = typeof REMOVE_TASK;

export const COMPLETE_TASK = "COMPLETE_TASK";
export type COMPLETE_TASK = typeof COMPLETE_TASK;

export const UNCOMPLETE_TASK = "UNCOMPLETE_TASK";
export type UNCOMPLETE_TASK = typeof UNCOMPLETE_TASK;

export const TASK_CREATED = "TASK_CREATED";
export type TASK_CREATED = typeof TASK_CREATED;

export const TASK_UPDATED = "TASK_UPDATED";
export type TASK_UPDATED = typeof TASK_UPDATED;

export const TASK_DELETED = "TASK_DELETED";
export type TASK_DELETED = typeof TASK_DELETED;

// Category
export const GET_CATEGORY = "GET_CATEGORY";
export type GET_CATEGORY = typeof GET_CATEGORY;

export const PATCH_CATEGORY = "PATCH_CATEGORY";
export type PATCH_CATEGORY = typeof PATCH_CATEGORY;

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export type FETCH_CATEGORIES = typeof FETCH_CATEGORIES;

export const DELETE_CATEGORY = "DELETE_CATEGORY";
export type DELETE_CATEGORY = typeof DELETE_CATEGORY;

export const PUT_CATEGORY = "PUT_CATEGORY";
export type PUT_CATEGORY = typeof PUT_CATEGORY;

export const PUT_CATEGORIES = "PUT_CATEGORIES";
export type PUT_CATEGORIES = typeof PUT_CATEGORIES;

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export type CREATE_CATEGORY = typeof CREATE_CATEGORY;

export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export type UPDATE_CATEGORY = typeof UPDATE_CATEGORY;

export const PATCH_CATEGORIES = "PATCH_CATEGORIES";
export type PATCH_CATEGORIES = typeof PATCH_CATEGORIES;

export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export type REMOVE_CATEGORY = typeof REMOVE_CATEGORY;

export const CATEGORY_CREATED = "CATEGORY_CREATED";
export type CATEGORY_CREATED = typeof CATEGORY_CREATED;

export const CATEGORY_UPDATED = "CATEGORY_UPDATED";
export type CATEGORY_UPDATED = typeof CATEGORY_UPDATED;

export const CATEGORY_DELETED = "CATEGORY_DELETED";
export type CATEGORY_DELETED = typeof CATEGORY_DELETED;

// Member
export const GET_MEMBER = "GET_MEMBER";
export type GET_MEMBER = typeof GET_MEMBER;

export const PATCH_MEMBER = "PATCH_MEMBER";
export type PATCH_MEMBER = typeof PATCH_MEMBER;

export const LOAD_MEMBERS = "LOAD_MEMBERS";
export type LOAD_MEMBERS = typeof LOAD_MEMBERS;

export const FETCH_MEMBERS = "FETCH_MEMBERS";
export type FETCH_MEMBERS = typeof FETCH_MEMBERS;

export const DELETE_MEMBER = "DELETE_MEMBER";
export type DELETE_MEMBER = typeof DELETE_MEMBER;

export const PUT_MEMBER = "PUT_MEMBER";
export type PUT_MEMBER = typeof PUT_MEMBER;

export const PUT_MEMBERS = "PUT_MEMBERS";
export type PUT_MEMBERS = typeof PUT_MEMBERS;

export const CREATE_MEMBER = "CREATE_MEMBER";
export type CREATE_MEMBER = typeof CREATE_MEMBER;

export const UPDATE_MEMBER = "UPDATE_MEMBER";
export type UPDATE_MEMBER = typeof UPDATE_MEMBER;

export const PATCH_MEMBERS = "PATCH_MEMBERS";
export type PATCH_MEMBERS = typeof PATCH_MEMBERS;

export const REMOVE_MEMBER = "REMOVE_MEMBER";
export type REMOVE_MEMBER = typeof REMOVE_MEMBER;

export const MEMBER_JOINED = "MEMBER_JOINED";
export type MEMBER_JOINED = typeof MEMBER_JOINED;

export const MEMBER_UPDATED = "MEMBER_UPDATED";
export type MEMBER_UPDATED = typeof MEMBER_UPDATED;

export const MEMBER_LEFT = "MEMBER_LEFT";
export type MEMBER_LEFT = typeof MEMBER_LEFT;

// Channel Role
export const GET_CHANNEL_ROLE = "GET_CHANNEL_ROLE";
export type GET_CHANNEL_ROLE = typeof GET_CHANNEL_ROLE;

export const PATCH_CHANNEL_ROLE = "PATCH_CHANNEL_ROLE";
export type PATCH_CHANNEL_ROLE = typeof PATCH_CHANNEL_ROLE;

export const SET_DEFAULT_CHANNEL_ROLE = "SET_DEFAULT_CHANNEL_ROLE";
export type SET_DEFAULT_CHANNEL_ROLE = typeof SET_DEFAULT_CHANNEL_ROLE;

export const FETCH_CHANNEL_ROLES = "FETCH_CHANNEL_ROLES";
export type FETCH_CHANNEL_ROLES = typeof FETCH_CHANNEL_ROLES;

export const LOAD_CHANNEL_ROLES = "LOAD_CHANNEL_ROLES";
export type LOAD_CHANNEL_ROLES = typeof LOAD_CHANNEL_ROLES;

export const DELETE_CHANNEL_ROLE = "DELETE_CHANNEL_ROLE";
export type DELETE_CHANNEL_ROLE = typeof DELETE_CHANNEL_ROLE;

export const PUT_CHANNEL_ROLE = "PUT_CHANNEL_ROLE";
export type PUT_CHANNEL_ROLE = typeof PUT_CHANNEL_ROLE;

export const PUT_CHANNEL_ROLES = "PUT_CHANNEL_ROLES";
export type PUT_CHANNEL_ROLES = typeof PUT_CHANNEL_ROLES;

export const CREATE_CHANNEL_ROLE = "CREATE_CHANNEL_ROLE";
export type CREATE_CHANNEL_ROLE = typeof CREATE_CHANNEL_ROLE;

export const UPDATE_CHANNEL_ROLE = "UPDATE_CHANNEL_ROLE";
export type UPDATE_CHANNEL_ROLE = typeof UPDATE_CHANNEL_ROLE;

export const PATCH_CHANNEL_ROLES = "PATCH_CHANNEL_ROLES";
export type PATCH_CHANNEL_ROLES = typeof PATCH_CHANNEL_ROLES;

export const REMOVE_CHANNEL_ROLE = "REMOVE_CHANNEL_ROLE";
export type REMOVE_CHANNEL_ROLE = typeof REMOVE_CHANNEL_ROLE;

export const CHANNEL_ROLE_CREATED = "CHANNEL_ROLE_CREATED";
export type CHANNEL_ROLE_CREATED = typeof CHANNEL_ROLE_CREATED;

export const CHANNEL_ROLE_UPDATED = "CHANNEL_ROLE_UPDATED";
export type CHANNEL_ROLE_UPDATED = typeof CHANNEL_ROLE_UPDATED;

export const CHANNEL_ROLE_DELETED = "CHANNEL_ROLE_DELETED";
export type CHANNEL_ROLE_DELETED = typeof CHANNEL_ROLE_DELETED;

// Tag
export const CREATE_TAG = "CREATE_TAG";
export type CREATE_TAG = typeof CREATE_TAG;

export const PUT_TAG = "PUT_TAG";
export type PUT_TAG = typeof PUT_TAG;

export const PUT_TAGS = "PUT_TAGS";
export type PUT_TAGS = typeof PUT_TAGS;

export const REMOVE_TAG = "REMOVE_TAG";
export type REMOVE_TAG = typeof REMOVE_TAG;

export const REMOVE_TAGS = "REMOVE_TAGS";
export type REMOVE_TAGS = typeof REMOVE_TAGS;

export const DELETE_TAG = "DELETE_TAG";
export type DELETE_TAG = typeof DELETE_TAG;

export const TAG_CREATED = "TAG_CREATED";
export type TAG_CREATED = typeof TAG_CREATED;

export const TAG_DELETED = "TAG_DELETED";
export type TAG_DELETED = typeof TAG_DELETED;

// Status

export const LOAD_STATUSES = "LOAD_STATUSES";
export type LOAD_STATUSES = typeof LOAD_STATUSES;

export const PUT_STATUS = "PUT_STATUS";
export type PUT_STATUS = typeof PUT_STATUS;

export const PUT_STATUSES = "PUT_STATUSES";
export type PUT_STATUSES = typeof PUT_STATUSES;

export const PATCH_STATUS = "PATCH_STATUS";
export type PATCH_STATUS = typeof PATCH_STATUS;

export const REMOVE_STATUS = "REMOVE_STATUS";
export type REMOVE_STATUS = typeof REMOVE_STATUS;

export const SET_USER_STATUS = "SET_USER_STATUS";
export type SET_USER_STATUS = typeof SET_USER_STATUS;

export const CREATE_STATUS = "CREATE_STATUS";
export type CREATE_STATUS = typeof CREATE_STATUS;

export const UPDATE_STATUS = "UPDATE_STATUS";
export type UPDATE_STATUS = typeof UPDATE_STATUS;

export const DELETE_STATUS = "DELETE_STATUS";
export type DELETE_STATUS = typeof DELETE_STATUS;

export const STATUS_CREATED = "STATUS_CREATED";
export type STATUS_CREATED = typeof STATUS_CREATED;

export const STATUS_UPDATED = "STATUS_UPDATED";
export type STATUS_UPDATED = typeof STATUS_UPDATED;

export const STATUS_DELETED = "STATUS_DELETED";
export type STATUS_DELETED = typeof STATUS_DELETED;

export const SET_USER_PRESENCE = "SET_USER_PRESENCE";
export type SET_USER_PRESENCE = typeof SET_USER_PRESENCE;

export const PUT_PRESENCE = "PUT_PRESENCE";
export type PUT_PRESENCE = typeof PUT_PRESENCE;

export const REMOVE_PRESENCE = "REMOVE_PRESENCE";
export type REMOVE_PRESENCE = typeof REMOVE_PRESENCE;

export const PATCH_PRESENCE = "PATCH_PRESENCE";
export type PATCH_PRESENCE = typeof PATCH_PRESENCE;

// PREFERENCES
export const UPDATE_PREFERENCES = "UPDATE_PREFERENCES";
export type UPDATE_PREFERENCES = typeof UPDATE_PREFERENCES;

export const PATCH_PREFERENCES = "PATCH_PREFERENCES";
export type PATCH_PREFERENCES = typeof PATCH_PREFERENCES;
