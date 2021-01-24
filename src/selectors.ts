import { Map, List, OrderedMap } from "immutable";
import { State } from "./index";
import { MemberRecord } from "./records";

const defaultMembers = OrderedMap<string, MemberRecord>();

export function org({ org }: State) {
    return org;
}

export function auth({ auth }: State) {
    return auth;
}

export function users({ users }: State) {
    return users;
}

export function paths({ app }: State) {
    return app.paths;
}

export function statuses({ status }: State) {
    return status;
}

export function preferences({ preferences }: State) {
    return preferences;
}

export function cards({ cards, route }: State) {
    return cards.entities.get(route.params.get("channel_id"));
}

export function columns({ columns, route }: State) {
    return columns.entities.get(route.params.get("channel_id"));
}

export function roles({ roles, route }: State) {
    return roles.get(route.params.get("channel_id"));
}

export function workspaces({ workspaces }: State) {
    return workspaces;
}

export function members({
    members,
    route,
}: State): OrderedMap<string, MemberRecord> {
    return members.get(route.params.get("channel_id"), defaultMembers);
}

export function workspace({ workspaces, route }: State) {
    return workspaces.get(route.params.get("workspace_id"));
}

export function channel({ channels, route }: State) {
    let path = channels.paths.get(route.params.get("channel_id"));
    if (path) {
        let [workspace_id, channel_id] = path;
        return channels.entities.get(workspace_id)?.get(channel_id);
    }
}

export function channels({ channels }: State) {
    return channels.entities;
}

export function checklists({ checklists }: State) {
    return checklists;
}

export function threads({ threads, route }: State) {
    return threads.entities.get(route.params.get("channel_id"));
}

export function mainthread({ threads, route }: State) {
    return threads.entities
        .get(route.params.get("channel_id"))
        ?.find((thread) => thread.type == "main");
}

export default {
    org,
    auth,
    users,
    roles,
    paths,
    cards,
    threads,
    columns,
    channel,
    members,
    statuses,
    channels,
    workspace,
    checklists,
    mainthread,
    workspaces,
    preferences,
};
