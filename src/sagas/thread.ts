import { put, select, takeEvery } from "redux-saga/effects";
import { MessageSchema } from "../schemas";
import Client, { io, socket } from "@colab/client";
import { dispatch } from "..";
import { storeRelated } from "../actions/app";
import {
    LoadThreadAction,
    putThread,
    putThreads,
    ThreadActivityAction,
    PutThreadAction,
    PutThreadsAction,
    newMessage,
    messageUpdated,
    messageDeleted,
    patchThread,
    userReacted,
    userUnreacted,
    removeThread,
    concatConversation,
    loadingConversation,
    LoadConversationAction,
    CreateTopicAction,
    UpdateTopicAction,
    DeleteTopicAction,
    ThreadDeletedAction,
    ThreadUpdatedAction,
    ThreadCreatedAction,
    threadCreated,
    threadUpdated,
    threadDeleted,
    LoadTopicsAction,
} from "../actions/thread";
import {
    THREAD_CREATED,
    THREAD_UPDATED,
    THREAD_DELETED,
    CREATE_TOPIC,
    UPDATE_TOPIC,
    DELETE_TOPIC,
    LOAD_THREAD,
    THREAD_ACTIVITY,
    PUT_THREAD,
    PUT_THREADS,
    INIT_CONVERSATION,
    POST_MESSAGE,
    LOAD_CONVERSATION,
    LOAD_TOPICS,
} from "../actions/types";
import { State } from "..";

function* load({ payload, meta }: LoadThreadAction) {
    try {
        const { data } = yield Client.channel.loadThread(payload);
        yield put(putThread(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* loadTopics({ payload, meta }: LoadTopicsAction) {
    try {
        const { data } = yield Client.fetchChannelTopics(payload);
        yield put(putThreads(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* fetch() {
    try {
        const { data } = yield Client.fetchThreads();
        yield put(putThreads(data));
    } catch (e) {}
}

function* create({ payload, meta }: CreateTopicAction) {
    try {
        const { data } = yield Client.createTopic(payload);
        yield put(threadCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* update({ payload, meta }: UpdateTopicAction) {
    try {
        const { data } = yield Client.updateTopic(payload);
        yield put(threadUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* trash({ payload, meta }: DeleteTopicAction) {
    try {
        const { data } = yield Client.deleteTopic(payload);
        yield put(
            threadDeleted({
                id: payload.thread_id,
                channel_id: payload.channel_id,
            })
        );
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* created({ payload }: ThreadCreatedAction) {
    yield put(putThread(payload));
}

function* updated({ payload }: ThreadUpdatedAction) {
    yield put(patchThread(payload));
}

function* trashed({ payload }: ThreadDeletedAction) {
    yield put(removeThread(payload));
}

function* activity({ payload }: ThreadActivityAction) {
    const topic = `thread:${payload.thread_id}`;
    let ch = (socket as any).channels.find((ch: any) => ch.topic == topic);
    if (ch) {
        ch.push(payload.type, {});
    }
}

function* conversation({ payload, meta }: LoadConversationAction) {
    const { threads } = (yield select()) as State;
    const thread = threads.getThread(payload.thread_id);
    if (!thread) return;

    try {
        const params: any = {};
        if (payload.more == "top") {
            let first = thread.history.first() as any;
            if (first) {
                params.before = first.id;
            }
            params.last = payload.limit;
        } else if (payload.more == "bottom") {
            let last = thread.history.last() as any;
            if (last) {
                params.after = last.id;
            }
            params.first = payload.limit;
        }
        const loading: { top?: boolean; bottom?: boolean } = {};

        if (payload.more == "top") {
            loading.top = true;
        } else if (payload.more == "bottom") {
            loading.bottom = true;
        } else if (payload.more == "around") {
            loading.top = true;
            loading.bottom = true;
        }

        yield put(
            loadingConversation({
                ...payload,
                loading,
            })
        );

        const { data } = yield Client.fetchMessages({
            channel_id: payload.channel_id,
            thread_id: payload.thread_id,
            params,
        });
        const [normalized, related] = MessageSchema.normalizeMany(data);
        yield put(storeRelated(related));
        if (payload.more == "top") {
            yield put(
                concatConversation({
                    mode: "prepend",
                    messages: normalized,
                    thread_id: payload.thread_id,
                })
            );
        } else if (payload.more == "bottom") {
            yield put(
                concatConversation({
                    mode: "append",
                    messages: normalized,
                    thread_id: payload.thread_id,
                })
            );
        }

        for (let key in loading) {
            loading[key as keyof typeof loading] = !loading[
                key as keyof typeof loading
            ];
        }
        yield put(
            loadingConversation({
                ...payload,
                loading,
            })
        );
        meta.success(data);
    } catch (e) {
        yield meta.error(e);
    }
}

function* subscribe({ payload }: PutThreadAction | PutThreadsAction) {
    if (!Array.isArray(payload)) payload = [payload];

    for (let thread of payload) {
        const topic = `thread:${thread.id}`;

        if ((socket as any).channels.find((ch: any) => ch.topic == topic))
            continue;

        let ch = socket.channel(topic, {});

        ch.on("new.message", (payload: io.UserMessage) => {
            dispatch(newMessage(payload));
        });

        ch.on("user.reacted", (payload: io.Reaction) => {
            dispatch(userReacted(payload));
        });

        ch.on("user.unreacted", (payload: io.Reaction) => {
            dispatch(userUnreacted(payload));
        });

        ch.on("message.updated", (payload: io.UserMessage) => {
            dispatch(messageUpdated(payload));
        });

        ch.on("message.deleted", (payload: io.Message) => {
            dispatch(messageDeleted(payload));
        });

        ch.on("message.pinned", (payload: io.Message) => {
            dispatch(messageUpdated(payload));
        });

        ch.on("message.reaction", (payload: io.Message) => {
            dispatch(messageUpdated(payload));
        });

        ch.on("message.flagged", (payload: io.Message) => {
            dispatch(messageUpdated(payload));
        });

        ch.on("message.unpinned", (payload: io.Message) => {
            dispatch(messageUpdated(payload));
        });

        ch.on("message.unflagged", (payload: io.Message) => {
            dispatch(messageUpdated(payload));
        });

        ch.on("typing", (payload: io.Author) => {
            dispatch({ type: "USER", payload });
        });

        ch.join()
            .receive("ok", () => {})
            .receive("error", () => {});
    }
}

export const tasks = [
    { effect: takeEvery, type: CREATE_TOPIC, handler: create },
    { effect: takeEvery, type: UPDATE_TOPIC, handler: update },
    { effect: takeEvery, type: DELETE_TOPIC, handler: trash },

    { effect: takeEvery, type: THREAD_CREATED, handler: created },
    { effect: takeEvery, type: THREAD_UPDATED, handler: updated },
    { effect: takeEvery, type: THREAD_DELETED, handler: trashed },

    { effect: takeEvery, type: LOAD_THREAD, handler: load },
    { effect: takeEvery, type: LOAD_TOPICS, handler: loadTopics },
    { effect: takeEvery, type: PUT_THREAD, handler: subscribe },
    { effect: takeEvery, type: PUT_THREADS, handler: subscribe },

    { effect: takeEvery, type: THREAD_ACTIVITY, handler: activity },
    { effect: takeEvery, type: LOAD_CONVERSATION, handler: conversation },
    { effect: takeEvery, type: "FETCH_THREADS", handler: fetch },
];
