import { OrderedMap } from "immutable";
import { State } from "./index";
import { MemberRecord } from "./records";

const defaultMembers = OrderedMap<string, MemberRecord>();

export function permissions({ auth: { permissions } }: State) {
    return permissions;
}

export function role({ auth: { role_id }, roles }: State) {
    return roles.get(role_id)!;
}

export function config({ config }: State) {
    return config;
}

export function auth({ auth }: State) {
    return auth;
}

export function users({ users }: State) {
    return users;
}

export function statuses({ status }: State) {
    return status;
}

export function preferences({ preferences }: State) {
    return preferences;
}

export function cards({ cards, route }: State) {
    return cards.entities.get(route.params.get("board_id"));
}

export function columns({ columns, route }: State) {
    return columns.entities.get(route.params.get("board_id"));
}

export function roles({ roles }: State) {
    return roles;
}

export function workspace({ workspace }: State) {
    return workspace;
}

export function members({
    members,
    route,
}: State): OrderedMap<string, MemberRecord> {
    return members.get(route.params.get("space_id"), defaultMembers);
}

export function space({ spaces, route }: State) {
    let space_id = route.params.get("space_id");
    if (space_id) {
        return spaces.get(space_id);
    }
}

export function directSpaces({ spaces }: State) {
    return spaces.filter((space) => space.type === "direct");
}

export function spaces({ spaces }: State) {
    return spaces;
}

export function checklists({ checklists }: State) {
    return checklists;
}

export function threads({ threads, route }: State) {
    return threads.entities.get(route.params.get("space_id"));
}

export default {
    role,
    auth,
    users,
    space,
    roles,
    cards,
    config,
    spaces,
    threads,
    columns,
    members,
    statuses,
    workspace,
    checklists,
    preferences,
    directSpaces,
    permissions,
};
