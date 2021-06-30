import { Unique, BelongsToWorkspace, Require } from "@colab/types";
import { AccessType, io, SpaceType } from "@colab/client";
import {
    SEND_INVITATIONS,
    CLEAR_SPACE,
    CREATE_SPACE,
    SPACE_JOINED,
    JOIN_SPACE,
    LOAD_SPACE,
    LOAD_SPACES,
    SPACE_CREATED,
    SPACE_ARCHIVED,
    SPACE_UNARCHIVED,
    ARCHIVE_SPACE,
    UNARCHIVE_SPACE,
    UPDATE_SPACE,
    PUT_SPACE,
    PUT_SPACES,
    PATCH_SPACE,
    PATCH_SPACES,
    REMOVE_SPACE,
    SPACE_UPDATED,
    SPACE_DELETED,
} from "./types";

import { IOAction, createAction, createIOAction, Action } from "./index";
import {  NormalizedSpace } from "../schemas";

export interface BelongsToSpace {
    space_id: string;
}

export interface SendInvitationsPayload {
    space_id: string;
    emails: string[];
}

export type RemoveSpacePayload = Require<
    Partial<io.Space>,
    "id" | "workspace_id"
>;

export interface CreateSpacePayload {
    icon?: File;
    name: string;
    board?: {
        name: string;
        columns: ({
            name: string;
            origin: boolean;
            type: "column" | "stack"
            capacity: number;
        })[]
    };
    type: SpaceType;
    access: "public" | "private";
    topics: ({name: string})[];
}

export interface LoadSpacePayload {
    space_id: string;
    workspace_id: string;
}

export interface ArchiveSpacePayload {
    workspace_id: string;
    space_id: string;
}

export interface UnarchiveSpacePayload {
    workspace_id: string;
    space_id: string;
}

export interface JoinSpacePayload {
    workspace_id: string;
    space_id: string;
}

export interface LoadSpacesPayload {
}

export interface UpdateSpacePayload extends Unique, BelongsToWorkspace {
    space_id: string;
    icon?: string;
    name?: string;
    purpose?: string;
    is_private?: boolean;
}

export type SpaceUpdatedAction = Action<SPACE_UPDATED, io.Space>;

export type SpaceDeletedAction = Action<SPACE_DELETED, io.Space>;

export type PutSpaceAction = Action<PUT_SPACE, NormalizedSpace>;

export type PutSpacesAction = Action<PUT_SPACES, NormalizedSpace[]>;

export type PatchSpaceAction = Action<PATCH_SPACE, NormalizedSpace>;

export type PatchSpacesAction = Action<PATCH_SPACES, NormalizedSpace[]>;

export type ClearSpaceAction = Action<CLEAR_SPACE, io.Space>;

export type RemoveSpaceAction = Action<REMOVE_SPACE, RemoveSpacePayload>;

export type SendInvitationsAction = IOAction<
    SEND_INVITATIONS,
    SendInvitationsPayload,
    any
>;

export type LoadSpacesAction = IOAction<
    LOAD_SPACES,
    LoadSpacesPayload,
    io.Space[]
>;

export type CreateSpaceAction = IOAction<
    CREATE_SPACE,
    CreateSpacePayload,
    io.Space
>;

export type ArchiveSpaceAction = IOAction<
    ARCHIVE_SPACE,
    ArchiveSpacePayload,
    io.Space
>;

export type UnarchiveSpaceAction = IOAction<
    UNARCHIVE_SPACE,
    UnarchiveSpacePayload
>;

export type UpdateSpaceAction = IOAction<
    UPDATE_SPACE,
    UpdateSpacePayload,
    io.Space
>;

export type LoadSpaceAction = IOAction<LOAD_SPACE, LoadSpacePayload, io.Space>;

export type JoinSpaceAction = IOAction<JOIN_SPACE, JoinSpacePayload, io.Space>;

export type SpaceCreatedAction = Action<SPACE_CREATED, io.Space>;

export type SpaceJoinedAction = Action<SPACE_JOINED, io.Space>;

export type SpaceArchivedAction = Action<SPACE_ARCHIVED, io.Space>;

export type SpaceUnarchivedAction = Action<SPACE_UNARCHIVED, io.Space>;

export function archiveSpace(payload: ArchiveSpacePayload): ArchiveSpaceAction {
    return createIOAction<io.Space, ARCHIVE_SPACE>(ARCHIVE_SPACE, payload);
}

export function spaceCreated(payload: io.Space): SpaceCreatedAction {
    return createAction(SPACE_CREATED, payload);
}

export function spaceUpdated(payload: io.Space): SpaceUpdatedAction {
    return createAction(SPACE_UPDATED, payload);
}

export function spaceArchived(payload: io.Space): SpaceArchivedAction {
    return createAction(SPACE_ARCHIVED, payload);
}

export function spaceUnarchived(payload: io.Space): SpaceUnarchivedAction {
    return createAction(SPACE_UNARCHIVED, payload);
}

export function spaceJoined(payload: io.Space): SpaceJoinedAction {
    return createAction(SPACE_JOINED, payload);
}

export function spaceDeleted(payload: io.Space): SpaceDeletedAction {
    return createAction(SPACE_DELETED, payload);
}

export function loadSpace(payload: LoadSpacePayload): LoadSpaceAction {
    return createIOAction<io.Space, LOAD_SPACE>(LOAD_SPACE, payload);
}

export function unarchiveSpace(
    payload: UnarchiveSpacePayload
): UnarchiveSpaceAction {
    return createIOAction<io.Space, UNARCHIVE_SPACE>(UNARCHIVE_SPACE, payload);
}

export function channelArchived(payload: io.Space): SpaceArchivedAction {
    return createAction(SPACE_ARCHIVED, payload);
}

export function channelUnarchived(payload: io.Space): SpaceUnarchivedAction {
    return createAction(SPACE_UNARCHIVED, payload);
}

export function patchSpace(channel: NormalizedSpace): PatchSpaceAction {
    return createAction(PATCH_SPACE, channel);
}

export function channelCreated(channel: io.Space): SpaceCreatedAction {
    return createAction(SPACE_CREATED, channel);
}

export function patchSpaces(
    channels: NormalizedSpace[]
): PatchSpacesAction {
    return createAction(PATCH_SPACES, channels);
}

export function putSpace(channel: NormalizedSpace): PutSpaceAction {
    return createAction(PUT_SPACE, channel);
}

export function putSpaces(channels: NormalizedSpace[]): PutSpacesAction {
    return createAction(PUT_SPACES, channels);
}

export function removeSpace(payload: RemoveSpacePayload): RemoveSpaceAction {
    return createAction(REMOVE_SPACE, payload);
}

export function updateSpace(payload: UpdateSpacePayload): UpdateSpaceAction {
    return createIOAction<io.Space, UPDATE_SPACE>(UPDATE_SPACE, payload);
}

export function createSpace(payload: CreateSpacePayload): CreateSpaceAction {
    return createIOAction<io.Space, CREATE_SPACE>(CREATE_SPACE, payload);
}

export function sendInvitations(
    payload: SendInvitationsPayload
): SendInvitationsAction {
    return createIOAction<any, SEND_INVITATIONS>(SEND_INVITATIONS, payload);
}

export function channelUpdated(payload: io.Space): SpaceUpdatedAction {
    return createAction(SPACE_UPDATED, payload);
}

export function joinSpace(payload: JoinSpacePayload): JoinSpaceAction {
    return createIOAction<io.Space, JOIN_SPACE>(JOIN_SPACE, payload);
}

export function loadSpaces(payload: LoadSpacesPayload): LoadSpacesAction {
    return createIOAction<io.Space[], LOAD_SPACES>(LOAD_SPACES, payload);
}

export function channelJoined(payload: io.Space): SpaceJoinedAction {
    return createAction(SPACE_JOINED, payload);
}

export function clearSpace(payload: io.Space): ClearSpaceAction {
    return createAction(CLEAR_SPACE, payload);
}

export function channelDeleted(payload: io.Space): SpaceDeletedAction {
    return createAction(SPACE_DELETED, payload);
}
