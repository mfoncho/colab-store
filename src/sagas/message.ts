import { put, select, takeEvery } from "redux-saga/effects";
import { State } from "..";
import {
    FETCH_MESSAGES,
    POST_MESSAGE,
    UPDATE_MESSAGE,
    NEW_MESSAGE,
    FLAG_MESSAGE,
    REACT_MESSAGE,
    PIN_MESSAGE,
    UNREACT_MESSAGE,
    UNPIN_MESSAGE,
    UNFLAG_MESSAGE,
    MESSAGE_UPDATED,
    DELETE_MESSAGE,
    MESSAGE_DELETED,
    USER_REACTED,
    USER_UNREACTED,
} from "../actions/types";
import client from "@colab/client";
import { MessageSchema } from "../schemas";
import {
    userReacted,
    FetchMessagesAction,
    PostMessageAction,
    NewMessageAction,
    newMessage,
    concatConversation,
    PinMessageAction,
    FlagMessageAction,
    UnflagMessageAction,
    UnpinMessageAction,
    UserReactedAction,
    UserUnreactedAction,
    messageUpdated,
    MessageUpdatedAction,
    UnreactMessageAction,
    patchMessage,
    ReactMessageAction,
    UpdateMessageAction,
    DeleteMessageAction,
    messageDeleted,
    MessageDeletedAction,
    removeMessage,
    userUnreacted,
} from "../actions/thread";
import { storeRelated } from "../actions/app";

function* fetch({ payload, meta }: FetchMessagesAction) {
    try {
        const { data } = yield client.fetchMessages(payload);
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* post({ payload, meta }: PostMessageAction) {
    try {
        const { data } = yield client.channel.postMessage(payload);
        yield put(newMessage(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* created({ payload }: NewMessageAction) {
    const [normalized, related] = MessageSchema.normalizeOne(payload);
    yield put(storeRelated(related));
    yield put(
        concatConversation({
            mode: "append",
            messages: [normalized],
            thread_id: normalized.thread_id!,
        })
    );
}

function* flag({ payload, meta }: FlagMessageAction) {
    try {
        const { data } = yield client.channel.flagMessage(payload);
        yield put(messageUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* pin({ payload, meta }: PinMessageAction) {
    try {
        const { data } = yield client.channel.pinMessage(payload);
        yield put(messageUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unflag({ payload, meta }: UnflagMessageAction) {
    try {
        const { data } = yield client.channel.unflagMessage(payload);
        yield put(messageUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unpin({ payload, meta }: UnpinMessageAction) {
    try {
        const { data } = yield client.channel.unpinMessage(payload);
        yield put(messageUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* updated({ payload }: MessageUpdatedAction) {
    const [normalized, related] = MessageSchema.normalizeOne(payload);
    yield put(storeRelated(related));
    yield put(patchMessage(normalized));
}

function* react({ payload, meta }: ReactMessageAction) {
    try {
        const { data } = yield client.reactMessage(payload);
        yield put(userReacted(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unreact({ payload, meta }: UnreactMessageAction) {
    try {
        const { data } = yield client.unreactMessage(payload);
        const { auth } = (yield select()) as State;
        const partial = {
            name: payload.name,
            message_id: payload.message_id,
            user: {
                id: auth.id,
            },
        };
        yield put(userUnreacted(partial as any));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* trash({ payload, meta }: DeleteMessageAction) {
    try {
        const { data } = yield client.channel.deleteMessage(payload);
        yield put(
            messageDeleted({
                id: payload.message_id,
                thread_id: payload.thread_id,
            })
        );
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* update({ payload, meta }: UpdateMessageAction) {
    try {
        const { data } = yield client.channel.updateMessage(payload);
        yield put(messageUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* reacted({ payload }: UserReactedAction) {
    const { threads } = (yield select()) as State;
    if (threads.hasMessage(payload.message_id)) {
        const message = threads.getMessage(payload.message_id)!;
        const rtx = message.reactions.find((rtx) => rtx.name == payload.name);
        if (rtx) {
            if (!rtx.users.includes(payload.user.id)) {
                let reactions = message.reactions
                    .map((rtx) => {
                        if (rtx.name == payload.name) {
                            return rtx.set(
                                "users",
                                rtx.users.push(payload.user.id)
                            );
                        } else {
                            return rtx;
                        }
                    })
                    .toJS();
                const partial = {
                    id: message.id,
                    reactions: reactions,
                    thread_id: message.thread_id,
                    channel_id: message.channel_id,
                } as any;
                yield put(patchMessage(partial));
            }
        } else {
            const reactions = message.reactions.toJS().concat([
                {
                    name: payload.name,
                    users: [payload.user.id],
                },
            ]);
            const partial = {
                id: message.id,
                reactions: reactions,
                thread_id: message.thread_id,
                channel_id: message.channel_id,
            } as any;
            yield put(patchMessage(partial));
        }
    }
}

function* unreacted({ payload }: UserUnreactedAction) {
    const { threads } = (yield select()) as State;
    if (threads.hasMessage(payload.message_id)) {
        const message = threads.getMessage(payload.message_id)!;
        const rtx = message.reactions.find((rtx) => rtx.name == payload.name);
        if (rtx) {
            let reactions = message.reactions
                .map((rtx) => {
                    if (
                        rtx.name == payload.name &&
                        rtx.users.includes(payload.user.id)
                    ) {
                        return rtx.set(
                            "users",
                            rtx.users.filter((id) => id != payload.user.id)
                        );
                    } else {
                        return rtx;
                    }
                })
                .filter((rtx) => {
                    return rtx.users.size != 0;
                })
                .toJS();
            const partial = {
                id: message.id,
                reactions: reactions,
                thread_id: message.thread_id,
                channel_id: message.channel_id,
            } as any;
            yield put(patchMessage(partial));
        }
    }
}

function* remove({ payload }: MessageDeletedAction) {
    yield put(removeMessage(payload));
}

export const tasks = [
    { effect: takeEvery, type: USER_REACTED, handler: reacted },
    { effect: takeEvery, type: USER_UNREACTED, handler: unreacted },
    { effect: takeEvery, type: FETCH_MESSAGES, handler: fetch },
    { effect: takeEvery, type: POST_MESSAGE, handler: post },
    { effect: takeEvery, type: NEW_MESSAGE, handler: created },
    { effect: takeEvery, type: PIN_MESSAGE, handler: pin },
    { effect: takeEvery, type: FLAG_MESSAGE, handler: flag },
    { effect: takeEvery, type: UNPIN_MESSAGE, handler: unpin },
    { effect: takeEvery, type: UNFLAG_MESSAGE, handler: unflag },
    { effect: takeEvery, type: MESSAGE_UPDATED, handler: updated },
    { effect: takeEvery, type: REACT_MESSAGE, handler: react },
    { effect: takeEvery, type: UNREACT_MESSAGE, handler: unreact },
    { effect: takeEvery, type: UPDATE_MESSAGE, handler: update },
    { effect: takeEvery, type: DELETE_MESSAGE, handler: trash },
    { effect: takeEvery, type: MESSAGE_DELETED, handler: remove },
];
