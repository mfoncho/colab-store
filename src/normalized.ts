import {
    ThreadSchema, SpaceSchema, CardSchema, ChecklistSchema, UserSchema,
    ColumnSchema, MessageSchema
} from './schemas'

export type NormalizedThread = ReturnType<
    typeof ThreadSchema["normalizeOne"]
>[0];

export type NormalizedUser = ReturnType<
    typeof UserSchema["normalizeOne"]
>[0];

export type NormalizedCard = ReturnType<
    typeof CardSchema["normalizeOne"]
>[0];

export type NormalizedChecklist = ReturnType<
    typeof ChecklistSchema["normalizeOne"]
>[0];

export type NormalizedSpace = ReturnType<
    typeof SpaceSchema["normalizeOne"]
>[0];

export type NormalizedColumn = ReturnType<
    typeof ColumnSchema["normalizeOne"]
>[0];

export type NormalizedMessage = ReturnType<
    typeof MessageSchema["normalizeOne"]
>[0];

export type NormalizedRelated =
    | typeof UserSchema
    | typeof SpaceSchema;

