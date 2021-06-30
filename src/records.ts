import { Record, List, fromJS, Map, OrderedMap } from "immutable";
import {
    Unique,
    Positioned,
    BelongsToSpace,
    Id,
    Timestamped,
    SpaceType,
    AccessType,
    ThreadType,
    BelongsToThread,
    BelongsToBoard,
} from "@colab/client";
import { io } from "@colab/client";

export class SiteRecord extends Record<io.Site>({
    name: "colab",
    icon: "",
    title: "Colaborations",
    about: "Colaborations",
}) {}

export class ConfigRecord extends Record<io.Config>({
    locale: "en_US",
    lpack: {},
    user_invitation: false,
    user_registration: false,
    admin_api_version: "",
    client_api_version: "",
    socket_api_version: "",
    admin_api_endpoint: "",
    client_api_endpoint: "",
    socket_api_endpoint: "",
    socket_api_protocol: "",
    auth_providers: [["email", "password"]],
}) {}

export class PreferencesRecord extends Record<io.Preferences>({
    theme: "",
    locale: "",
    timezone: "",
    time_format: "12",
    theme_mode: "dark",
    message_type: "default",
    notifications: true,
}) {}

export class Presence extends Record({
    state: "offline" as io.PresenceState,
    timestamp: "0",
}) {}

export class StatusRecord extends Record({
    id: "0",
    name: "",
    icon: "",
}) {}

export class UserRecord
    extends Record(
        {
            id: "0" as Id,
            name: "",
            email: "",
            phone: "",
            verified: false,
            avatar: (null as any) as string,
            bio: "",
            status_id: "0" as Id,
        },
        "user"
    )
    implements Unique {}

export class Permissions extends Record({
    upload_limit: 0,
    upload_types: "",
    create_card: false,
    embed_links: false,
    pin_message: false,
    upload_file: false,
    edit_message: false,
    flag_message: false,
    post_reply: false,
    manage_board: false,
    use_markdown: false,
    post_message: false,
    add_reaction: false,
    leave_channel: false,
    promot_thread: false,
    delete_message: false,
    manage_channel: false,
    manage_members: false,
    send_invitation: false,
    manage_messages: false,
    mention_members: false,
    manage_permissions: false,
    manage_invitations: false,
}) {}

export class AuthRecord
    extends Record(
        {
            id: "",
            token: "",
            role_id: "",
            permissions: new Permissions(),
        },
        "auth"
    )
    implements Unique {}

export class SpaceRoleRecord
    extends Record({
        id: "0" as Id,
        role_id: "" as Id,
        space_id: "" as Id,
        permissions: {} as object,
    })
    implements Unique {}

export class LabelRecord
    extends Record({
        id: "0" as Id,
        name: "label",
        color: "blue",
        board_id: "" as Id,
    })
    implements Unique {}

export class BoardRecord
    extends Record({
        id: "0" as Id,
        icon: "",
        name: "label",
        labels: List<LabelRecord>(),
    })
    implements Unique {
    constructor({ labels, ...card }: any) {
        labels = List(labels.map((label: any) => new CardRecord(label)));
        super({ ...card, labels });
    }

    static objectFromJS(data: any) {
        if (data.labels) {
            let labels = List(
                data.labels.map((label: any) => new CardRecord(label))
            );
            data = { ...data, labels };
        }
        return data;
    }
}

export class SpaceRecord
    extends Record({
        id: "0" as Id,
        icon: "",
        name: "colab",
        users: List<Id>(),
        type: "discuss" as SpaceType,
        access: "public" as AccessType,
        board_id: null as string | null,
        topic_id: null as string | null,
        member_id: "0" as Id,
        roles: Map<string, SpaceRoleRecord>(),
        joined_at: "",
        created_at: "",
        archived_at: null as string | null,
    })
    implements Unique {
    constructor(data: any) {
        super(SpaceRecord.objectFromJS(data));
    }

    toServer() {
        return this.toJS();
    }

    static mapFromJS(data: any) {
        return SpaceRecord.objectFromJS(data);
    }

    static objectFromJS(data: any) {
        return data;
    }

    get is_board() {
        return this.type === "board";
    }

    get is_direct() {
        return this.type === "direct";
    }

    get is_archived() {
        return Boolean(this.archived_at);
    }

    get is_discuss() {
        return this.type === "discuss";
    }
}

export class CardLabel
    extends Record({
        id: "",
        card_id: "",
        label_id: "",
        labeled_at: "",
    })
    implements Unique {}

export class CardRecord
    extends Record({
        id: "",
        name: "",
        done: false,
        labels: List<CardLabel>(),
        user_id: "",
        deadline: null as string | null,
        position: 0,
        thread_id: "",
        column_id: "",
        created_at: "",
        board_id: "",
        description: "",
        archived_at: null as string | null,
    })
    implements Unique, Positioned, BelongsToBoard {
    constructor({ labels, ...card }: any) {
        labels = List(labels.map((label: any) => new CardLabel(label)));
        super({ ...card, labels });
    }

    getStorePath(): [Id, Id, Id] {
        return [this.board_id, this.column_id, this.id];
    }

    static objectFromJS(data: any) {
        if (data.labels) {
            let labels = List(
                data.labels.map((label: any) => new CardLabel(label))
            );
            data = { ...data, labels };
        }
        return data;
    }

    static mapFromJS(data: any) {
        return fromJS(CardRecord.objectFromJS(data));
    }
}

export class TaskRecord
    extends Record({
        id: "",
        name: "",
        complete: false,
        created_at: "",
    })
    implements Unique {}

export class ChecklistRecord
    extends Record({
        id: "",
        name: "",
        tasks: List(),
        card_id: "",
        created_at: "",
        user_id: "",
    })
    implements Unique {
    constructor({ tasks, ...checklist }: any) {
        tasks = List(tasks.map((task: any) => new TaskRecord(task)));
        super({ ...checklist, tasks });
    }

    static mapFromJS(data: any) {
        return fromJS(ChecklistRecord.objectFromJS(data));
    }

    static objectFromJS(data: any) {
        if (data.tasks) {
            data = {
                ...data,
                tasks: data.tasks.map((task: any) => new TaskRecord(task)),
            };
        }
        return data;
    }
}

export type WorkspaceRecord = Map<string, any>;

export class MemberRecord
    extends Record({
        id: "",
        role_id: "",
        user_id: "",
        joined_at: "",
        space_id: "",
        membership_id: "",
    })
    implements Unique, BelongsToSpace {}

export class ColumnRecord
    extends Record({
        id: "" as Id,
        type: "" as "stack" | "queue",
        name: "",
        origin: false,
        position: 0,
        capacity: 0,
        board_id: "" as Id,
        archived_at: null,
    })
    implements Unique, Positioned, BelongsToBoard {
    static mapFromJS(data: any) {
        return Map(ColumnRecord.objectFromJS(data));
    }

    static objectFromJS(data: any) {
        return { ...data };
    }

    getStorePath(): [Id, Id] {
        return [this.board_id, this.id];
    }
}
class Loading extends Record({
    top: false,
    bottom: false,
}) {}

export class ChatMessage extends Record({
    id: "",
    user_id: "",
    timestamp: "",
}) {}

export class ThreadView extends Record({
    // Message scrollTop
    top: 0,
    // Middle message id
    mid: "",

    // scrollPercentage
    precentage: 100,

    // Follow new messages by
    // auto scroll bottom
    follow: true,
}) {}

export class ThreadHistory extends Record({}) {}

export class ThreadRecord
    extends Record({
        id: "0" as Id,
        type: "topic" as ThreadType,
        name: "",
        created_at: "",
        space_id: "0" as Id,
        message_count: 0,
        last_message_id: "" as Id,
        first_message_id: "" as Id,
        unread_message_count: 0,

        // Virtual fields
        highlight: "0",
        loading: new Loading(),
        view: new ThreadView(),
        messages: Map<string, MessageRecord>(),
        hcache: OrderedMap<string, ChatMessage>(),
        history: OrderedMap<string, ChatMessage>(),
    })
    implements Unique, BelongsToSpace {
    static mapFromJS(data: any) {
        return fromJS(ThreadRecord.objectFromJS(data));
    }

    static objectFromJS(data: any) {
        return data;
    }

    get isMain() {
        return this.type == "main";
    }

    get isTopic() {
        return this.type == "topic";
    }

    getStorePath(): [Id, Id] {
        return [this.space_id, this.id];
    }

    getHistoryAtIndex(index: number): ChatMessage | undefined {
        if (this.history.size > 0) {
            const chat: any = this.history;
            const msg = chat._list.get(index);
            if (msg) {
                return msg[1];
            }
        }
    }

    getHistoryIndex(id: string): number | undefined {
        if (this.history.size > 0) {
            const chat: any = this.history;
            return chat._map.get(id);
        }
    }
}

export class UsersReactionRecord extends Record({
    name: "love",
    users: List<Id>(),
}) {
    constructor(params: any) {
        super(UsersReactionRecord.mapFromJS(params));
    }

    static mapFromJS(data: any) {
        return fromJS(UsersReactionRecord.objectFromJS(data));
    }

    static objectFromJS(data: any) {
        return data;
    }
}

export class MessageRecord
    extends Record({
        id: "0" as Id,
        content: "",
        pinned: false,
        attachement: null as any,
        embedded: [],
        flagged: false,
        user_id: "0" as Id,
        markdown: false,
        timestamp: "",
        thread_id: "0" as Id,
        space_id: "0" as Id,
        reply_thread_id: null as string | null,
        reactions: List<UsersReactionRecord>(),
        last_reply: null as MessageRecord | null,
    })
    implements Unique, Timestamped, BelongsToThread {
    constructor(params: any) {
        super(MessageRecord.mapFromJS(params));
    }

    getPath() {
        return [this.thread_id, "messages", this.id];
    }

    static mapFromJS(data: any) {
        return fromJS(MessageRecord.objectFromJS(data));
    }

    static objectFromJS(data: any) {
        if (data.reactions) {
            data = {
                ...data,
                reactions: List(
                    data.reactions.map(
                        (rtx: any) => new UsersReactionRecord(rtx)
                    )
                ),
            };
        }
        return data;
    }
}
