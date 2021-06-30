import { io } from "@colab/client";
import { Relation, Schema } from "./normalizer";

const cards: Relation<undefined> = Schema.hasMany("card");

const checklists: Relation<undefined> = Schema.hasMany("checklist");

const user: Relation<"user_id", string> = Schema.belongsTo("user", "user_id");

const author: Relation<"user_id", string> = Schema.belongsTo("user", "user_id");

const board: Relation<"board_id", string> = Schema.belongsTo(
    "board",
    "board_id"
);

const topic: Relation<"topic_id", string> = Schema.belongsTo(
    "topic",
    "topic_id"
);

const status: Relation<"status_id", string> = Schema.belongsTo(
    "status",
    "status_id"
);

const reactions: Relation<"reactions", string> = Schema.mapMany(
    "reactions",
    "reactions"
);

const users: Relation<"users", string> = Schema.belongsToMany("user", "users");

const SpaceStruct = {
    board: board,
    topic: topic,
};

const UsersReactionStruct = {
    users: users,
};

const ReactionStruct = {
    user: user,
};

const UserStruct = {
    status: status,
};

const ThreadStruct = {};

const MessageStruct = {
    author: author,
    reactions: reactions,
};

const StatusStruct = {};

const ColumnStruct = {
    cards: cards,
};

const CardStruct = {
    user: user,
    checklists: checklists,
};

const ChecklistStruct = {
    user: user,
};

const MemberStruct = {
    user: user,
};

export const SpaceSchema = Schema.create<
    io.Space,
    typeof SpaceStruct,
    "spaces"
>(SpaceStruct, "space", "spaces");

export const ReactionSchema = Schema.create<
    io.Reaction,
    typeof ReactionStruct,
    "reaction"
>(ReactionStruct, "reaction", "reaction");

export const UsersReactionSchema = Schema.create<
    io.UsersReaction,
    typeof UsersReactionStruct,
    "reactions"
>(UsersReactionStruct, "reactions", "reactions");

export const UserSchema = Schema.create<io.User, typeof UserStruct, "users">(
    UserStruct,
    "user",
    "users"
);

export const ThreadSchema = Schema.create<
    io.Thread,
    typeof ThreadStruct,
    "threads"
>(ThreadStruct, "thread", "threads");

export const CardSchema = Schema.create<io.Card, typeof CardStruct, "cards">(
    CardStruct,
    "card",
    "cards"
);

export const StatusSchema = Schema.create<any, typeof StatusStruct, "statuses">(
    StatusStruct,
    "status",
    "statuses"
);

export const ChecklistSchema = Schema.create<
    io.Checklist,
    typeof ChecklistStruct,
    "checklists"
>(ChecklistStruct, "checklist", "checklists");

export const ColumnSchema = Schema.create<
    io.Column,
    typeof ColumnStruct,
    "columns"
>(ColumnStruct, "column", "columns");

export const MessageSchema = Schema.create<
    io.Message,
    typeof MessageStruct,
    "messages"
>(MessageStruct, "message", "messages");

export const MemberSchema = Schema.create<
    io.Member,
    typeof MemberStruct,
    "members"
>(MemberStruct, "member", "members");

export type NormalizedThread = ReturnType<
    typeof ThreadSchema["normalizeOne"]
>[0];

export type NormalizedUser = ReturnType<typeof UserSchema["normalizeOne"]>[0];

export type NormalizedCard = ReturnType<typeof CardSchema["normalizeOne"]>[0];

export type NormalizedChecklist = ReturnType<
    typeof ChecklistSchema["normalizeOne"]
>[0];

export type NormalizedSpace = ReturnType<typeof SpaceSchema["normalizeOne"]>[0];

export type NormalizedMember = ReturnType<
    typeof MemberSchema["normalizeOne"]
>[0];

export type NormalizedColumn = ReturnType<
    typeof ColumnSchema["normalizeOne"]
>[0];

export type NormalizedMessage = ReturnType<
    typeof MessageSchema["normalizeOne"]
>[0];

export type RelatedRecord<T> = Record<string, T>;

export type NormalizedRelated = {
    [UserSchema.collect]?: RelatedRecord<NormalizedUser>;
    [CardSchema.collect]?: RelatedRecord<NormalizedCard>;
    [ColumnSchema.collect]?: RelatedRecord<NormalizedColumn>;
    [ThreadSchema.collect]?: RelatedRecord<NormalizedThread>;
    [MessageSchema.collect]?: RelatedRecord<NormalizedMessage>;
    [ChecklistSchema.collect]?: RelatedRecord<NormalizedChecklist>;
    [MemberSchema.collect]?: RelatedRecord<NormalizedMember>;
    [SpaceSchema.collect]?: RelatedRecord<NormalizedSpace>;
};
