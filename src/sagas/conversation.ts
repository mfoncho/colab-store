import { put, select, takeEvery } from "redux-saga/effects";
import {
    INIT_CONVERSATION,
    POST_MESSAGE,
    LOAD_CONVERSATION,
} from "../actions/types";
import { MessageSchema } from "../schemas";
import {
    InitConversationAction,
    createConversation,
    concatConversation,
    fetchMessages,
    removeConversation,
    loadingConversation,
    putMessages,
    LoadConversationAction,
} from "../actions/thread";
import client from "@colab/client";
import { storeRelated } from "../actions/app";
import { State } from "..";

function* init({ payload, meta }: InitConversationAction): Iterable<any> {
    yield put(createConversation(payload));

    try {
        const { data } = (yield client.fetchMessages(payload)) as any;
        const [normalized, related] = MessageSchema.normalizeMany(data);
        yield put(storeRelated(related));
        yield put(
            concatConversation({
                mode: "prepend",
                messages: normalized,
                thread_id: payload.thread_id,
            })
        );
        yield put(
            loadingConversation({
                ...payload,
                loading: { top: false, bottom: false },
            })
        );
        meta.success(data);
    } catch (e) {
        yield put(removeConversation(payload));
    }
}

function* load({ payload, meta }: LoadConversationAction): Iterable<any> {
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
            params.last = 25;
        } else if (payload.more == "bottom") {
            let last = thread.history.last() as any;
            if (last) {
                params.after = last.id;
            }
            params.first = 25;
        }

        yield put(
            loadingConversation({
                ...payload,
                loading: { top: true, bottom: false },
            })
        );

        const { data } = (yield client.fetchMessages({
            channel_id: payload.channel_id,
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
        yield put(
            loadingConversation({
                ...payload,
                loading: { top: false, bottom: false },
            })
        );
        meta.success(data);
    } catch (e) {
        yield meta.error(e);
    }
}

export const tasks = [
    //{ effect: takeEvery, type: INIT_CONVERSATION, handler: init },
    //{ effect: takeEvery, type: LOAD_CONVERSATION, handler: load },
];
