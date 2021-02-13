import { Record, List, fromJS, Map, OrderedMap } from "immutable";
import {
    Unique,
    BelongsToWorkspace,
    Positioned,
    BelongsToChannel,
    Id,
    Timestamped,
    ThreadType,
    BelongsToThread,
} from "@colab/client";
import { io } from "@colab/client";

export class SiteRecord extends Record<io.Site>({
    name: "colab",
    icon: "",
    title: "Colaborations",
    about: "Colaborations"
}){}

export class ConfigRecord extends Record<io.Config>({
        token: null as any,
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
        auth_providers: [[ "email", "password"]],
}){}

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

export class AuthRecord
    extends Record(
        {
            id: "",
            token: "",
            timestamp: "",
        },
        "auth"
    )
    implements Unique {}

export class UserRecord
    extends Record(
        {
            id: "0" as Id,
            name: "",
            email: "",
            phone: "",
            verified: false,
            avatar: (null as any) as string,
            about: "",
            status_id: "0" as Id,
        },
        "user"
    )
    implements Unique {}

export class WorkspacePermissionsRecord extends Record({
    join_channels: false,
    create_channel: false,
}) {}

export class WorkspaceRoleRecord
    extends Record({
        id: "0" as Id,
        name: "default",
        is_default: true,
        permissions: new WorkspacePermissionsRecord(),
    })
    implements Unique {
    constructor({ permissions, ...params }: any) {
        permissions = new WorkspacePermissionsRecord(permissions);
        super({ ...params, permissions });
    }
}

export class ChannelPermissions extends Record({
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

export class ChannelRoleRecord
    extends Record({
        id: "0" as Id,
        name: "default",
        is_default: true,
        channel_id: "" as Id,
        permissions: new ChannelPermissions(),
    })
    implements Unique {
    constructor({ permissions, ...params }: any) {
        permissions = new ChannelPermissions(permissions);
        super({ ...params, permissions });
    }
}

export class TagRecord
    extends Record({
        id: "0" as Id,
        name: "tag",
        color: "blue",
    })
    implements Unique {}

export class ChannelRecord
    extends Record({
        id: "0" as Id,
        icon: "",
        name: "colab",
        purpose: "",
        admin_id: "0" as Id,
        member_id: "0" as Id,
        users: List<string>(),
        tags: List<TagRecord>(),
        permissions: new ChannelPermissions({}),
        timestamp: "",
        joined_at: "",
        is_board: false,
        is_direct: false,
        is_private: false,
        is_archived: false,
        workspace_id: "0",
        main_thread_id: "0" as Id,
    })
    implements Unique, BelongsToWorkspace {
    constructor(data: any) {
        super(ChannelRecord.objectFromJS(data));
    }

    toServer() {
        return this.toJS();
    }

    static mapFromJS(data: any) {
        return ChannelRecord.objectFromJS(data);
    }

    static objectFromJS(data: any) {
        if (data.permissions) {
            const permissions = new ChannelPermissions(data.permissions);
            data = { ...data, permissions };
        }
        if (data.tags) {
            let tags = List(data.tags.map((tag: any) => new TagRecord(tag)));
            data = { ...data, tags };
        }
        return data;
    }
}

export class CardTag
    extends Record({
        id: "",
        tag_id: "",
        card_id: "",
        tagged_at: "",
    })
    implements Unique {}

export class CardRecord
    extends Record({
        id: "",
        name: "",
        done: false,
        tags: List<CardTag>(),
        user_id: "",
        deadline: null as string | null,
        position: 0,
        thread_id: "",
        column_id: "",
        timestamp: "",
        channel_id: "",
        description: "",
        archived_at: null as string | null,
    })
    implements Unique, Positioned, BelongsToChannel {
    constructor({ tags, ...card }: any) {
        tags = List(tags.map((tag: any) => new CardTag(tag)));
        super({ ...card, tags });
    }

    getStorePath(): [Id, Id, Id] {
        return [this.channel_id, this.column_id, this.id];
    }

    static objectFromJS(data: any) {
        if (data.tags) {
            let tags = List(data.tags.map((tag: any) => new CardTag(tag)));
            data = { ...data, tags };
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
        timestamp: "",
    })
    implements Unique {}

export class ChecklistRecord
    extends Record({
        id: "",
        name: "",
        tasks: List(),
        card_id: "",
        timestamp: "",
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

export class CategoryRecord
    extends Record({
        id: "0",
        name: "",
        timestamp: "",
        workspace_id: "",
    })
    implements Unique, BelongsToWorkspace {}

export class WorkspaceRecord
    extends Record({
        id: "0",
        name: "",
        icon: "",
        role: new WorkspaceRoleRecord({ permissions: {} }),
        categories: List<CategoryRecord>(),
        timestamp: "",
        description: "",
        topic: "",
        is_root: false,
        joined_at: "",
        membership_id: "",
    })
    implements Unique {
    constructor(props: any) {
        super(WorkspaceRecord.objectFromJS(props));
    }

    static mapFromJS(data: any) {
        return Map(WorkspaceRecord.objectFromJS(data));
    }

    static objectFromJS(data: any) {
        if (data.role) {
            data = { ...data, role: new WorkspaceRoleRecord(data.role) };
        }
        if (data.categories) {
            let categories = List(
                data.categories.map((cat: any) => new CategoryRecord(cat))
            );
            data = { ...data, categories };
        }
        return data;
    }
}

export class MemberRecord
    extends Record({
        id: "",
        role_id: "",
        user_id: "",
        joined_at: "",
        channel_id: "",
        membership_id: "",
    })
    implements Unique, BelongsToChannel {}

export class ColumnRecord
    extends Record({
        id: "" as Id,
        type: "" as "stack" | "queue",
        name: "",
        origin: false,
        position: 0,
        capacity: 0,
        channel_id: "" as Id,
        archived_at: null,
    })
    implements Unique, Positioned, BelongsToChannel {
    static mapFromJS(data: any) {
        return Map(ColumnRecord.objectFromJS(data));
    }

    static objectFromJS(data: any) {
        return { ...data };
    }

    getStorePath(): [Id, Id] {
        return [this.channel_id, this.id];
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
        type: "main" as ThreadType,
        topic: "",
        timestamp: "",
        is_main: false,
        is_active: true,
        is_default: false,
        channel_id: "0" as Id,
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
    implements Unique, BelongsToChannel {
    static mapFromJS(data: any) {
        return fromJS(ThreadRecord.objectFromJS(data));
    }

    static objectFromJS(data: any) {
        return data;
    }

    get isMain() {
        return this.type == "main";
    }

    getStorePath(): [Id, Id] {
        return [this.channel_id, this.id];
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
        text: "",
        pinned: false,
        flagged: false,
        user_id: "0" as Id,
        markdown: false,
        timestamp: "",
        thread_id: "0" as Id,
        channel_id: "0" as Id,
        reply_thread_id: null as string | null,
        reactions: List<UsersReactionRecord>(),
        last_reply: null as MessageRecord | null,
    })
    implements Unique, Timestamped, BelongsToThread {
    constructor(params: any) {
        super(MessageRecord.mapFromJS(params));
    }

    getPath() {
        return [this.channel_id, this.thread_id, "messages", this.id];
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
