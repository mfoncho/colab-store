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

function* load({ payload, meta }: LoadThreadAction): Iterable<any> {
    try {
        const { data } = (yield Client.loadThread(payload)) as any;
        yield put(putThread(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* loadTopics({ payload, meta }: LoadTopicsAction): Iterable<any> {
    try {
        const { data } = (yield Client.fetchSpaceTopics(payload)) as any;
        yield put(putThreads(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* fetch(): Iterable<any> {
    try {
        const { data } = (yield Client.fetchThreads()) as any;
        yield put(putThreads(data));
    } catch (e) {}
}

function* create({ payload, meta }: CreateTopicAction): Iterable<any> {
    try {
        const { data } = (yield Client.createTopic(payload)) as any;
        yield put(threadCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* update({ payload, meta }: UpdateTopicAction): Iterable<any> {
    try {
        const { data } = (yield Client.updateTopic(payload)) as any;
        yield put(threadUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* trash({ payload, meta }: DeleteTopicAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteTopic(payload)) as any;
        yield put(
            threadDeleted({
                id: payload.thread_id,
                space_id: payload.space_id,
            })
        );
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* created({ payload }: ThreadCreatedAction): Iterable<any> {
    yield put(putThread(payload));
}

function* updated({ payload }: ThreadUpdatedAction): Iterable<any> {
    yield put(patchThread(payload));
}

function* trashed({ payload }: ThreadDeletedAction): Iterable<any> {
    yield put(removeThread(payload));
}

function* activity({ payload }: ThreadActivityAction): Iterable<any> {
    const topic = `thread:${payload.thread_id}`;
    let ch = socket.getChannel(topic);
    if (ch) {
        ch.push(payload.type, {});
    }
}

function* conversation({
    payload,
    meta,
}: LoadConversationAction): Iterable<any> {
    const { threads } = ((yield select()) as any) as State;
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

        const { data } = (yield Client.fetchMessages({
            thread_id: payload.thread_id,
            params,
        })) as any;
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

function* subscribe({
    payload,
}: PutThreadAction | PutThreadsAction): Iterable<any> {
    if (!Array.isArray(payload)) payload = [payload];

    for (let thread of payload) {
        const topic = `thread:${thread.id}`;

        if (socket.getChannel(topic))
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
