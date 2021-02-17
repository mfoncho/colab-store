import {
    Unique,
    BelongsToWorkspace,
    BelongsToChannel,
    Require,
} from "@colab/types";
import { io } from "@colab/client";
import {
    SEND_INVITATIONS,
    CLEAR_CHANNEL,
    CREATE_CHANNEL,
    CHANNEL_JOINED,
    LOAD_CHANNEL,
    LOAD_CHANNELS,
    CHANNEL_CREATED,
    CHANNEL_ARCHIVED,
    CHANNEL_UNARCHIVED,
    ARCHIVE_CHANNEL,
    UNARCHIVE_CHANNEL,
    UPDATE_CHANNEL,
    PUT_CHANNEL,
    PUT_CHANNELS,
    PATCH_CHANNEL,
    PATCH_CHANNELS,
    REMOVE_CHANNEL,
    CHANNEL_UPDATED,
    CHANNEL_DELETED,
    TAG_DELETED,
    TAG_CREATED,
    CREATE_TAG,
    DELETE_TAG,
    REMOVE_TAG,
    JOIN_CHANNEL,
    PUT_TAG,
    PUT_TAGS,
} from "./types";
import { IOAction, createAction, createIOAction, Action } from "./index";
import { NormalizedUserChannel } from "../schemas";

export interface SendInvitationsPayload {
    channel_id: string;
    emails: string[];
}

export type RemoveChannelPayload = Require<
    Partial<io.Channel>,
    "id" | "workspace_id"
>;

export interface CreateChannelPayload {
    icon?: File;
    name: string;
    is_board: boolean;
    is_private: boolean;
    topic?: string;
    workspace_id: string;
}

export interface LoadChannelPayload {
    channel_id: string;
    workspace_id: string;
}

export interface ArchiveChannelPayload {
    workspace_id: string;
    channel_id: string;
}

export interface UnarchiveChannelPayload {
    workspace_id: string;
    channel_id: string;
}

export interface JoinChannelPayload {
    workspace_id: string;
    channel_id: string;
}

export interface CreateTagPayload {
    channel_id: string;
    name: string;
    color: string;
}

export interface DeleteTagPayload {
    channel_id: string;
    tag_id: string;
}

export interface LoadChannelsPayload {
    workspace_id?: string;
}

export interface UpdateChannelPayload extends Unique, BelongsToWorkspace {
    channel_id: string;
    icon?: string;
    name?: string;
    purpose?: string;
    is_private?: boolean;
}

export type RemoveTagPayload = Require<Partial<io.Tag>, "id" | "channel_id">;

export type RemoveTagsPayload = RemoveTagPayload[];

export type TagCreatedAction = Action<TAG_CREATED, io.Tag>;
export type TagDeletedAction = Action<TAG_DELETED, Unique & BelongsToChannel>;

export type ChannelUpdatedAction = Action<CHANNEL_UPDATED, io.Channel>;

export type ChannelDeletedAction = Action<CHANNEL_DELETED, io.Channel>;

export type PutChannelAction = Action<PUT_CHANNEL, NormalizedUserChannel>;

export type PutChannelsAction = Action<PUT_CHANNELS, NormalizedUserChannel[]>;

export type PatchChannelAction = Action<PATCH_CHANNEL, NormalizedUserChannel>;

export type PatchChannelsAction = Action<
    PATCH_CHANNELS,
    NormalizedUserChannel[]
>;

export type ClearChannelAction = Action<CLEAR_CHANNEL, io.Channel>;

export type RemoveChannelAction = Action<REMOVE_CHANNEL, RemoveChannelPayload>;

export type RemoveTagAction = Action<REMOVE_TAG, RemoveTagPayload>;

export type RemoveTagsAction = Action<REMOVE_TAG, RemoveTagPayload[]>;

export type PutTagAction = Action<PUT_TAG, io.Tag>;

export type PutTagsAction = Action<PUT_TAGS, io.Tag[]>;

export type CreateTagAction = IOAction<CREATE_TAG, CreateTagPayload, io.Tag>;
export type DeleteTagAction = IOAction<DELETE_TAG, DeleteTagPayload, any>;

export type SendInvitationsAction = IOAction<
    SEND_INVITATIONS,
    SendInvitationsPayload,
    any
>;

export type LoadChannelsAction = IOAction<
    LOAD_CHANNELS,
    LoadChannelsPayload,
    io.Channel[]
>;

export type CreateChannelAction = IOAction<
    CREATE_CHANNEL,
    CreateChannelPayload,
    io.UserChannel
>;

export type ArchiveChannelAction = IOAction<
    ARCHIVE_CHANNEL,
    ArchiveChannelPayload,
    io.Channel
>;

export type UnarchiveChannelAction = IOAction<
    UNARCHIVE_CHANNEL,
    UnarchiveChannelPayload
>;

export type UpdateChannelAction = IOAction<
    UPDATE_CHANNEL,
    UpdateChannelPayload,
    io.Channel
>;

export type LoadChannelAction = IOAction<
    LOAD_CHANNEL,
    LoadChannelPayload,
    io.Channel
>;

export type JoinChannelAction = IOAction<
    JOIN_CHANNEL,
    JoinChannelPayload,
    io.Channel
>;

export type ChannelCreatedAction = Action<CHANNEL_CREATED, io.Channel>;

export type ChannelJoinedAction = Action<CHANNEL_JOINED, io.Channel>;

export type ChannelArchivedAction = Action<CHANNEL_ARCHIVED, io.Channel>;

export type ChannelUnarchivedAction = Action<CHANNEL_UNARCHIVED, io.Channel>;

export function archiveChannel(
    payload: ArchiveChannelPayload
): ArchiveChannelAction {
    return createIOAction<io.Channel, ARCHIVE_CHANNEL>(
        ARCHIVE_CHANNEL,
        payload
    );
}

export function loadChannel(payload: LoadChannelPayload): LoadChannelAction {
    return createIOAction<io.Channel, LOAD_CHANNEL>(LOAD_CHANNEL, payload);
}

export function unarchiveChannel(
    payload: UnarchiveChannelPayload
): UnarchiveChannelAction {
    return createIOAction<io.Channel, UNARCHIVE_CHANNEL>(
        UNARCHIVE_CHANNEL,
        payload
    );
}

export function channelArchived(payload: io.Channel): ChannelArchivedAction {
    return createAction(CHANNEL_ARCHIVED, payload);
}

export function channelUnarchived(
    payload: io.Channel
): ChannelUnarchivedAction {
    return createAction(CHANNEL_UNARCHIVED, payload);
}

export function patchChannel(
    channel: NormalizedUserChannel
): PatchChannelAction {
    return createAction(PATCH_CHANNEL, channel);
}

export function channelCreated(channel: io.Channel): ChannelCreatedAction {
    return createAction(CHANNEL_CREATED, channel);
}

export function patchChannels(
    channels: NormalizedUserChannel[]
): PatchChannelsAction {
    return createAction(PATCH_CHANNELS, channels);
}

export function putChannel(channel: NormalizedUserChannel): PutChannelAction {
    return createAction(PUT_CHANNEL, channel);
}

export function putChannels(
    channels: NormalizedUserChannel[]
): PutChannelsAction {
    return createAction(PUT_CHANNELS, channels);
}

export function removeChannel(
    payload: RemoveChannelPayload
): RemoveChannelAction {
    return createAction(REMOVE_CHANNEL, payload);
}

export function updateChannel(
    payload: UpdateChannelPayload
): UpdateChannelAction {
    return createIOAction<io.Channel, UPDATE_CHANNEL>(UPDATE_CHANNEL, payload);
}

export function createChannel(
    payload: CreateChannelPayload
): CreateChannelAction {
    return createIOAction<io.UserChannel, CREATE_CHANNEL>(
        CREATE_CHANNEL,
        payload
    );
}

export function sendInvitations(
    payload: SendInvitationsPayload
): SendInvitationsAction {
    return createIOAction<any, SEND_INVITATIONS>(SEND_INVITATIONS, payload);
}

export function channelUpdated(payload: io.Channel): ChannelUpdatedAction {
    return createAction(CHANNEL_UPDATED, payload);
}

export function joinChannel(payload: JoinChannelPayload): JoinChannelAction {
    return createIOAction<io.Channel, JOIN_CHANNEL>(JOIN_CHANNEL, payload);
}

export function loadChannels(payload: LoadChannelsPayload): LoadChannelsAction {
    return createIOAction<io.Channel[], LOAD_CHANNELS>(LOAD_CHANNELS, payload);
}

export function channelJoined(payload: io.Channel): ChannelJoinedAction {
    return createAction(CHANNEL_JOINED, payload);
}

export function clearChannel(payload: io.Channel): ClearChannelAction {
    return createAction(CLEAR_CHANNEL, payload);
}

export function channelDeleted(payload: io.Channel): ChannelDeletedAction {
    return createAction(CHANNEL_DELETED, payload);
}

export function createTag(payload: CreateTagPayload): CreateTagAction {
    return createIOAction<io.Tag, CREATE_TAG>(CREATE_TAG, payload);
}

export function deleteTag(payload: DeleteTagPayload): DeleteTagAction {
    return createIOAction<any, DELETE_TAG>(DELETE_TAG, payload);
}

export function tagCreated(tag: io.Tag): TagCreatedAction {
    return createAction(TAG_CREATED, tag);
}

export function tagDeleted(tag: Unique & BelongsToChannel): TagDeletedAction {
    return createAction(TAG_DELETED, tag);
}

export function putTag(tag: io.Tag): PutTagAction {
    return createAction(PUT_TAG, tag);
}

export function putTags(tag: io.Tag[]): PutTagsAction {
    return createAction(PUT_TAGS, tag);
}

export function removeTag(tag: RemoveTagPayload): RemoveTagAction {
    return createAction(REMOVE_TAG, tag);
}

export function removeTags(tags: RemoveTagsPayload): RemoveTagsAction {
    return createAction(REMOVE_TAG, tags);
}
