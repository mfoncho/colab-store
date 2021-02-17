import { put, takeEvery } from "redux-saga/effects";
import Client, { io, socket } from "@colab/client";
import { dispatch } from "..";
import { UserChannelSchema as Schema } from "../schemas";
import { roleUpdated, roleCreated, roleDeleted } from "../actions/channelRole";
import {
    tagDeleted,
    tagCreated,
    channelCreated,
    CreateChannelAction,
    ChannelCreatedAction,
    putChannel,
    ChannelJoinedAction,
    PatchChannelAction,
    patchChannel,
    JoinChannelAction,
    LoadChannelAction,
    channelJoined,
    ArchiveChannelAction,
    UnarchiveChannelAction,
    channelArchived,
    channelUnarchived,
    ChannelArchivedAction,
    PutChannelAction,
    PutChannelsAction,
    channelUpdated,
    ClearChannelAction,
    removeChannel,
    putChannels,
    LoadChannelsAction,
} from "../actions/channel";
import {
    INIT,
    JOIN_CHANNEL,
    ARCHIVE_CHANNEL,
    UNARCHIVE_CHANNEL,
    LOAD_CHANNEL,
    CREATE_CHANNEL,
    CHANNEL_JOINED,
    CHANNEL_UPDATED,
    CHANNEL_ARCHIVED,
    PUT_CHANNEL,
    LOAD_CHANNELS,
    PUT_CHANNELS,
    CHANNEL_UNARCHIVED,
    CHANNEL_CREATED,
    CLEAR_CHANNEL,
} from "../actions/types";
import { memberUpdated, memberJoined, memberLeft } from "../actions/member";
import { loadTopics } from "../actions/thread";
import { storeRelated } from "../actions/app";

function* init(): Iterable<any> {
    try {
        const { data } = (yield Client.fetchChannels({})) as any;
        const [normalized, related] = Schema.normalizeMany(data);
        yield put(storeRelated(related));
        yield put(putChannels(normalized));
    } catch (e) {}
}

function* archive({ payload, meta }: ArchiveChannelAction): Iterable<any> {
    try {
        const { data } = (yield Client.archiveChannel(payload)) as any;
        const [normalized, related] = Schema.normalizeOne(data);
        yield put(storeRelated(related));
        yield put(channelArchived(normalized as any));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unarchive({ payload, meta }: UnarchiveChannelAction): Iterable<any> {
    try {
        const { data } = (yield Client.unarchiveChannel(payload)) as any;
        const [normalized, related] = Schema.normalizeOne(data);
        yield put(storeRelated(related));
        yield put(channelUnarchived(normalized as any));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* load({ payload, meta }: LoadChannelAction): Iterable<any> {
    try {
        const { data } = (yield Client.getChannel(payload)) as any;
        const [normalized, related] = Schema.normalizeOne(data);
        yield put(storeRelated(related));
        yield put(putChannel(normalized as any));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* loads({ payload, meta }: LoadChannelsAction): Iterable<any> {
    try {
        const { data } = (yield Client.fetchChannels(payload)) as any;
        const [normalized, related] = Schema.normalizeOne(data);
        yield put(storeRelated(related));
        yield put(putChannels(normalized as any));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* join({ payload, meta }: JoinChannelAction): Iterable<any> {
    try {
        const { data } = (yield Client.joinChannel(payload)) as any;
        yield put(channelJoined(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* patch({
    payload,
}: PatchChannelAction | ChannelArchivedAction): Iterable<any> {
    yield put(patchChannel(payload));
}

function* subscribe({
    payload,
}: PutChannelAction | PutChannelsAction): Iterable<any> {
    if (!Array.isArray(payload)) {
        payload = [payload];
    }
    for (let channel of payload as any) {
        const topic = `channel:${channel.id}`;

        if (socket.getChannel(topic))
            continue;

        let ch = socket.channel(topic, {});

        ch.on("updated", (payload: io.Channel) => {
            dispatch(channelUpdated(payload));
        });

        ch.on("permissions.updated", (permissions: io.ChannelPermissions) => {
            const payload = {
                id: channel.id,
                workspace_id: channel.workspace_id,
                permissions: permissions,
            };
            dispatch(channelUpdated(payload as any));
        });

        ch.on("archived", (payload: io.Channel) => {
            dispatch(channelArchived(payload));
        });

        ch.on("unarchived", (payload: io.Channel) => {
            dispatch(channelUnarchived(payload));
        });

        ch.on("tag.created", (payload: io.Tag) => {
            dispatch(tagCreated(payload));
        });

        ch.on("role.created", (payload: io.ChannelRole) => {
            dispatch(roleCreated(payload));
        });

        ch.on("role.updated", (payload: io.ChannelRole) => {
            dispatch(roleUpdated(payload));
        });

        ch.on("role.deleted", (payload: io.ChannelRole) => {
            dispatch(roleDeleted(payload));
        });

        ch.on("tag.deleted", (payload: io.Tag) => {
            dispatch(tagDeleted(payload));
        });

        ch.on("member.updated", (payload: io.Member) => {
            dispatch(memberUpdated(payload));
        });

        ch.on("member.joined", (payload: io.Member) => {
            dispatch(memberJoined(payload));
        });

        ch.on("member.left", (payload: io.Member) => {
            dispatch(memberLeft(payload));
        });

        ch.join()
            .receive("ok", () => {})
            .receive("error", () => {});
    }
}

function* create({ payload, meta }: CreateChannelAction): Iterable<any> {
    try {
        const { data } = (yield Client.createChannel(payload)) as any;
        yield put(channelCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* clear({ payload }: ClearChannelAction): Iterable<any> {
    const topic = `channel:${payload.id}`;
    let ch = socket.getChannel(topic);
    if (ch) {
        ch.leave();
    }
    yield put(removeChannel(payload));
}

function* store({
    payload,
}: ChannelCreatedAction | ChannelJoinedAction): Iterable<any> {
    const [normalized, related] = Schema.normalizeOne(payload as any);
    yield put(loadTopics({ channel_id: payload.id }));
    yield put(storeRelated(related));
    yield put(putChannel(normalized));
}

export const tasks = [
    { effect: takeEvery, type: INIT, handler: init },

    { effect: takeEvery, type: CLEAR_CHANNEL, handler: clear },

    { effect: takeEvery, type: CREATE_CHANNEL, handler: create },

    { effect: takeEvery, type: ARCHIVE_CHANNEL, handler: archive },

    { effect: takeEvery, type: UNARCHIVE_CHANNEL, handler: unarchive },

    { effect: takeEvery, type: PUT_CHANNEL, handler: subscribe },

    { effect: takeEvery, type: PUT_CHANNELS, handler: subscribe },

    { effect: takeEvery, type: LOAD_CHANNEL, handler: load },

    { effect: takeEvery, type: LOAD_CHANNELS, handler: loads },

    { effect: takeEvery, type: JOIN_CHANNEL, handler: join },

    { effect: takeEvery, type: "STORE_CHANNEL", handler: store },

    { effect: takeEvery, type: CHANNEL_CREATED, handler: store },

    { effect: takeEvery, type: CHANNEL_JOINED, handler: store },

    { effect: takeEvery, type: CHANNEL_UPDATED, handler: patch },

    { effect: takeEvery, type: CHANNEL_ARCHIVED, handler: patch },

    { effect: takeEvery, type: CHANNEL_UNARCHIVED, handler: store },

    { effect: takeEvery, type: "CHANNEL_ROLE_UPDATED", handler: patch },
];
