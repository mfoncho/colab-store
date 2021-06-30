import { Record, Map, OrderedMap } from "immutable";
import {
    LoadingConversationAction,
    PutMessageAction,
    PatchMessageAction,
    PutMessagesAction,
    RemoveMessageAction,
    ConcatConversationAction,
    SetConversationPageAction,
    TrimConversationAction,
    PutThreadAction,
    PutThreadsAction,
    PatchThreadAction,
    RemoveThreadAction,
} from "../actions/thread";
import {
    PUT_MESSAGE,
    PUT_THREAD,
    PUT_THREADS,
    PUT_MESSAGES,
    PATCH_MESSAGE,
    PATCH_THREAD,
    REMOVE_MESSAGE,
    SET_CONVERSATION_PAGE,
    LOADING_CONVERSATION,
    CONCAT_CONVERSATION,
    TRIM_CONVSERSATION,
    REMOVE_SPACE,
    REMOVE_THREAD,
} from "../actions/types";
import { ThreadRecord, MessageRecord, ChatMessage } from "../records";
import { Id, Timestamped, Unique } from "../utils";
import { RemoveSpaceAction } from "../actions/space";

const sort = (a: Timestamped & Unique, b: Timestamped & Unique) => {
    if (a.timestamp < b.timestamp) return -1;

    if (a.timestamp > b.timestamp) return 1;

    return 0;
};

type ThreadType = "topic" | "main" | "card";

export class ThreadsState extends Record(
    {
        paths: Map<Id, [Id, ThreadType, Id]>(),
        mpaths: Map<Id, Id>(),
        entities: Map<Id, Map<ThreadType, Map<Id, ThreadRecord>>>(),
        messages: Map<Id, MessageRecord>(),
    },
    "threads"
) {
    hasMessage(id: string) {
        const path = this.getMessagePath(id);
        if (path) return this.hasIn(path);
        return false;
    }

    hasThread(id: string) {
        const path = this.getThreadPath(id);
        if (path) return this.hasIn(path);
        return false;
    }

    getThreadPath(id: string) {
        const path = this.paths.get(id);
        if (path == null) return;
        return ["entities", ...path];
    }

    getMessagePath(id: string) {
        const tid = this.mpaths.get(id);
        if (tid == null) return;
        const path = this.paths.get(tid);
        if (path == null) return;
        return ["entities", ...path, "messages", id];
    }

    getMessage(id: string): MessageRecord | undefined {
        const path = this.getMessagePath(id);
        if (path) {
            return this.getIn(path);
        }
    }

    getThread(id: string): ThreadRecord | undefined {
        const path = this.getThreadPath(id);
        if (path) {
            return this.getIn(path);
        }
    }

    deleteThread({ id }: { id: string }) {
        if (this.hasThread(id)) {
            const tpath = this.paths.get(id)!;
            const path = ["entities", ...tpath];
            const messages = this.getIn([...path, "messages"]) as Map<
                string,
                MessageRecord
            >;
            let self = this.deleteIn(path);
            if (messages) {
                self = messages.reduce(
                    (acc, message) => acc.deleteIn(["mpaths", message.id]),
                    self
                );
            }
            return self;
        }
        return this;
    }

    deleteMessage(id: string) {
        const tid = this.mpaths.get(id);
        if (tid) {
            const cid = this.paths.get(tid);
            const path = [cid, tid];
            return this.deleteIn(["mpaths", id])
                .deleteIn(["entities", ...path, "hcache", id])
                .deleteIn(["entities", ...path, "history", id])
                .deleteIn(["entities", ...path, "messages", id]);
        }
        return this;
    }

    storeMessage(message: MessageRecord) {
        const path = this.getThreadPath(message.thread_id);

        if (path) {
            return this.setIn(["mpaths", message.id], message.thread_id).setIn(
                [...path, "messages", message.id],
                message
            );
        }
        return this;
    }

    udpateMessage(partial: Partial<MessageRecord>) {
        const path = this.getMessagePath(partial.id!);
        if (path && this.hasIn(path)) {
            return this.updateIn(path, (message: MessageRecord) => {
                return message.merge(partial);
            });
        }
        return this;
    }

    updateThread(partial: Partial<ThreadRecord>) {
        const path = this.getThreadPath(partial.id!);
        if (path && this.hasIn(path)) {
            return this.updateIn(path, (thread: ThreadRecord) => {
                return thread.merge(partial);
            });
        }
        return this;
    }

    storeThread(thread: ThreadRecord) {
        const prev = this.getThread(thread.id);
        if (prev) {
            thread = prev.merge(thread);
        }
        const path = [thread.space_id, thread.type, thread.id];
        return this.setIn(["paths", thread.id], path).setIn(
            ["entities", ...path],
            thread
        );
    }
}

export const state = new ThreadsState();

export const reducers = {
    [PUT_THREAD]: (state: ThreadsState, { payload }: PutThreadAction) => {
        const thread = new ThreadRecord(payload as any);
        return state.storeThread(thread);
    },

    [PUT_THREADS]: (state: ThreadsState, { payload }: PutThreadsAction) => {
        return payload.reduce((state, thr) => {
            const thread = new ThreadRecord(thr as any);
            return state.storeThread(thread);
        }, state);
    },

    [PATCH_THREAD]: (state: ThreadsState, { payload }: PatchThreadAction) => {
        return state.updateThread(payload as any);
    },

    [REMOVE_THREAD]: (state: ThreadsState, { payload }: RemoveThreadAction) => {
        return state.deleteThread(payload);
    },

    [REMOVE_SPACE]: (
        state: ThreadsState,
        { payload }: RemoveSpaceAction
    ) => {
        return state.withMutations((state) => {
            const threads = state.entities.get(payload.id);
            if (threads) {
                threads.forEach((type) => {
                    type.forEach((thread) => {
                        thread.messages.forEach((message) => {
                            state.deleteIn(["mpaths", message.id]);
                        });
                        state.deleteIn(["paths", thread.id]);
                    });
                });
            }
            state.deleteIn(["entities", payload.id]);
        });
    },

    [PATCH_MESSAGE]: (state: ThreadsState, { payload }: PatchMessageAction) => {
        return state.withMutations((state) => {
            const partial = MessageRecord.objectFromJS(payload);
            state.udpateMessage(partial);
        });
    },
    [CONCAT_CONVERSATION]: (
        state: ThreadsState,
        { payload }: ConcatConversationAction
    ) => {
        return state.withMutations((state) => {
            const path = state.getThreadPath(payload.thread_id);

            if (path == null) return;

            const chat = OrderedMap<string, ChatMessage>()
                .withMutations((partials) => {
                    payload.messages.forEach((message) => {
                        let record = new MessageRecord(message);
                        let partial = new ChatMessage(message as any);
                        state.storeMessage(record);
                        partials.set(record.id, partial);
                    });
                })
                .sort(sort);

            state.updateIn(path, (thread: ThreadRecord) => {
                switch (payload.mode) {
                    case "append": {
                        let history = thread.history.concat(chat);
                        return thread.set("history", history);
                    }

                    case "prepend": {
                        let history = chat.concat(thread.history);
                        return thread.set("history", history);
                    }

                    default:
                        return thread;
                }
            });
        });
    },

    [TRIM_CONVSERSATION]: (
        state: ThreadsState,
        { payload }: TrimConversationAction
    ) => {
        return state.withMutations((state) => {
            const path = state.getThreadPath(payload.thread_id);

            if (path == null) return;

            state.updateIn(path, (thread: ThreadRecord) => {
                switch (payload.mode) {
                    case "top": {
                        return thread.set(
                            "history",
                            thread.history.takeLast(payload.amount)
                        );
                    }
                    case "bottom": {
                        return thread.set(
                            "history",
                            thread.history.take(payload.amount)
                        );
                    }
                    default:
                        return thread;
                }
            });
        });
    },

    [PUT_MESSAGE]: (state: ThreadsState, { payload }: PutMessageAction) => {
        return state.withMutations((state) => {
            const record = new MessageRecord(payload);
            state.storeMessage(record);
        });
    },

    [PUT_MESSAGES]: (state: ThreadsState, { payload }: PutMessagesAction) => {
        return state.withMutations((state) => {
            payload.forEach((message) => {
                const record = new MessageRecord(message);
                state.storeMessage(record);
            });
        });
    },

    [REMOVE_MESSAGE]: (
        state: ThreadsState,
        { payload }: RemoveMessageAction
    ) => {
        return state.withMutations((state) => {
            state.deleteMessage(payload.id);
        });
    },

    [LOADING_CONVERSATION]: (
        state: ThreadsState,
        { payload }: LoadingConversationAction
    ) => {
        return state.withMutations((state) => {
            let path = state.getThreadPath(payload.thread_id);
            if (path != null) {
                state.mergeIn([...path, "loading"], payload.loading);
            }
        });
    },

    [SET_CONVERSATION_PAGE]: (
        state: ThreadsState,
        { payload }: SetConversationPageAction
    ) => {
        return state.withMutations((state) => {
            let path = state.getThreadPath(payload.thread_id);
            if (path) {
                state.mergeIn([...path, "view"], payload);
            }
        });
    },
};

export default { state, reducers };
