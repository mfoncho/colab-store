import { Record, OrderedMap, Map } from "immutable";
import {
    CreateConversationAction,
    LoadingConversationAction,
    PutMessageAction,
    PatchMessageAction,
    PutMessagesAction,
    RemoveConversationAction,
    RemoveMessageAction,
    ConcatConversationAction,
    SetConversationPageAction,
    TrimConversationAction,
} from "../actions/thread";
import {
    PUT_MESSAGE,
    PUT_MESSAGES,
    PATCH_MESSAGE,
    REMOVE_MESSAGE,
    SET_CONVERSATION_PAGE,
    REMOVE_CONVERSATION,
    CREATE_CONVERSATION,
    LOADING_CONVERSATION,
    CONCAT_CONVERSATION,
    TRIM_CONVSERSATION,
} from "../actions/types";
import { MessageRecord } from "../records";
import { Id, Timestamped, Unique } from "@colab/types";

const sort = (a: Timestamped & Unique, b: Timestamped & Unique) => {
    if (a.timestamp < b.timestamp) return -1;

    if (a.timestamp > b.timestamp) return 1;

    return 0;
};

class Loading extends Record({
    top: true,
    bottom: true,
}) {}

export class ChatMessage extends Record({
    id: "",
    user_id: "",
    timestamp: "",
}) {}

export class Page extends Record({
    // Message scrollTop
    top: 0,
    // Middle message id
    mid: "",
    // Follow new messages by
    // auto scroll bottom
    follow: true,
}) {}

export class Conversation extends Record({
    id: "" as Id,
    view: Map(),
    page: new Page(),
    highlight: "0",
    loading: new Loading(),
    chat: OrderedMap<string, ChatMessage>(),
}) {
    getMessageByIndex(index: number): ChatMessage | undefined {
        if (this.chat.size > 0) {
            const chat: any = this.chat;
            const msg = chat._list.get(index);
            if (msg) {
                return msg[1];
            }
        }
    }
    getIndexById(id: string): number | undefined {
        if (this.chat.size > 0) {
            const chat: any = this.chat;
            return chat._map.get(id);
        }
    }
}

class Conversations extends Record({
    paths: Map<string, string>(),
    entities: Map<string, Conversation>(),
    messages: Map<string, MessageRecord>(),
}) {}

const state = new Conversations();

export const reducers = {
    [PATCH_MESSAGE]: (
        state: Conversations,
        { payload }: PatchMessageAction
    ) => {
        return state.withMutations((state) => {
            if (state.messages.has(payload.id!)) {
                state.updateIn(
                    ["messages", payload.id],
                    (message: MessageRecord) => {
                        return message.merge(
                            MessageRecord.objectFromJS(payload)
                        );
                    }
                );
            }
        });
    },
    [CONCAT_CONVERSATION]: (
        state: Conversations,
        { payload }: ConcatConversationAction
    ) => {
        return state.withMutations((state) => {
            let conversation = state.entities.get(payload.thread_id);

            if (conversation == null) return;

            const chat = OrderedMap<string, ChatMessage>()
                .withMutations((partials) => {
                    payload.messages.forEach((message) => {
                        let record = new MessageRecord(message);
                        let partial = new ChatMessage(message as any);
                        partials.set(record.id, partial);
                        state.setIn(["messages", message.id], record);
                    });
                })
                .sort(sort);

            state.updateIn(
                ["entities", payload.thread_id],
                (conv: Conversation) => {
                    switch (payload.mode) {
                        case "append": {
                            return conv.set("chat", conv.chat.concat(chat));
                        }

                        case "prepend": {
                            return conv.set("chat", chat.concat(conv.chat));
                        }

                        default:
                            return conv;
                    }
                }
            );
        });
    },

    [TRIM_CONVSERSATION]: (
        state: Conversations,
        { payload }: TrimConversationAction
    ) => {
        return state.withMutations((state) => {
            let conversation = state.entities.get(payload.thread_id);

            if (conversation == null) return;
            state.updateIn(
                ["entities", payload.thread_id],
                (conv: Conversation) => {
                    switch (payload.mode) {
                        case "top": {
                            return conv.set(
                                "chat",
                                conv.chat.takeLast(payload.amount)
                            );
                        }
                        case "bottom": {
                            return conv.set(
                                "chat",
                                conv.chat.take(payload.amount)
                            );
                        }
                        default:
                            return conv;
                    }
                }
            );
        });
    },

    [PUT_MESSAGE]: (state: Conversations, { payload }: PutMessageAction) => {
        return state.withMutations((state) => {
            let conversation = state.entities.get(payload.thread_id!);

            if (conversation == null) return;

            state.setIn(["messages", payload.id], new MessageRecord(payload));
        });
    },

    [PUT_MESSAGES]: (state: Conversations, { payload }: PutMessagesAction) => {
        return state.withMutations((state) => {
            payload.forEach((message) => {
                let conversation = state.entities.get(message.thread_id!);

                if (conversation == null) return;

                state.setIn(
                    ["messages", message.id],
                    new MessageRecord(payload)
                );
            });
        });
    },

    [REMOVE_MESSAGE]: (
        state: Conversations,
        { payload }: RemoveMessageAction
    ) => {
        return state.withMutations((state) => {
            state.deleteIn(["messages", payload.id]);
            state.deleteIn(["entities", payload.thread_id, "chat", payload.id]);
        });
    },

    [CREATE_CONVERSATION]: (
        state: Conversations,
        { payload }: CreateConversationAction
    ) => {
        return state.withMutations((state) => {
            state.setIn(
                ["entities", payload.thread_id],
                new Conversation({ id: payload.thread_id })
            );
        });
    },

    [LOADING_CONVERSATION]: (
        state: Conversations,
        { payload }: LoadingConversationAction
    ) => {
        return state.withMutations((state) => {
            let conversation = state.entities.get(payload.thread_id);
            if (conversation != null) {
                state.mergeIn(
                    ["entities", payload.thread_id, "loading"],
                    payload.loading
                );
            }
        });
    },

    [SET_CONVERSATION_PAGE]: (
        state: Conversations,
        { payload }: SetConversationPageAction
    ) => {
        return state.withMutations((state) => {
            let conversation = state.entities.get(payload.thread_id);
            if (conversation != null) {
                const path = ["entities", payload.thread_id, "page"];
                state.mergeIn(path, payload);
            }
        });
    },

    [REMOVE_CONVERSATION]: (
        state: Conversations,
        { payload }: RemoveConversationAction
    ) => {
        return state.withMutations((state) => {
            let conversation = state.entities.get(payload.thread_id);
            if (conversation != null) {
                conversation.chat.forEach((message) => {
                    state.deleteIn(["messages", message.id]);
                });
            }
            state.deleteIn(["entities", payload.thread_id]);
        });
    },
};

export default { state, reducers };
