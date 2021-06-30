import { Map, List, OrderedMap } from "immutable";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";

import { State } from "./index";

import selector from "./selectors";
import {
    Presence,
    CardRecord,
    Permissions,
    ChecklistRecord,
    ThreadRecord,
    UserRecord,
    SpaceRecord,
    SpaceRoleRecord,
    MemberRecord,
} from "./records";

const emptyarr: any = [];

const defaultMap = Map<string, any>();

const defaultList = List();

const defaultUser = new UserRecord();

const defaultPresence = new Presence();

const defaultSpaces = Map<string, SpaceRecord>();

const defaultMembers = OrderedMap<string, MemberRecord>();

const defaultRoles = OrderedMap<string, SpaceRoleRecord>();

const defaultCards = Map<string, OrderedMap<string, CardRecord>>();

export function usePreferences() {
    return useSelector(selector.preferences);
}

export function useTopics(space_id: string) {
    const selector = useCallback(
        ({ threads }: State) => {
            const ths = threads.entities.get(space_id);
            if (ths) {
                return ths.get("topic");
            }
        },
        [space_id]
    );
    return useSelector(selector);
}

export function usePresence(id?: string) {
    const selector = useCallback(
        ({ presence, auth }: State) => {
            return presence.get(id ?? auth.id);
        },
        [id]
    );
    return useSelector(selector) ?? defaultPresence;
}

export function useStatus(id?: string) {
    const selector = useCallback(
        ({ status, auth, users }: State) => {
            if (id) {
                status.get(id);
            } else {
                const user = users.get(auth.id);
                if (user) {
                    return status.get(user.status_id);
                }
            }
        },
        [id]
    );
    return useSelector(selector);
}

export function useWorkspace() {
    return useSelector(selector.workspace);
}

export const useSite = useWorkspace;

export function useStatuses() {
    return useSelector(selector.statuses);
}

export function useMembers(id?: string) {
    const select = useCallback(
        id
            ? ({ members }: State) => {
                  return members.get(id, defaultMembers);
              }
            : selector.members,
        [id]
    );
    return useSelector(select);
}

export function useRoles(id?: string) {
    const select = useCallback(
        id
            ? ({ roles }: State) => {
                  return roles.get(id);
              }
            : selector.roles,
        [id]
    );
    return useSelector(select) ?? defaultRoles;
}

export function useThreadProp(id: string, prop: string) {
    const selector = useCallback(
        ({ threads }: State) => {
            const path = threads.paths.get(id);
            if (path != null) {
                const thread = threads.entities.getIn(path) as ThreadRecord;
                if (thread) {
                    return thread.get(prop as any);
                }
            }
        },
        [id]
    );
    return useSelector(selector);
}

export function useThread(id: string, prop?: string) {
    const selector = useCallback(
        ({ threads }: State) => {
            const path = threads.paths.get(id);
            if (path != null) {
                return threads.entities.getIn(path) as ThreadRecord;
            }
        },
        [id]
    );
    return useSelector(selector);
}

export function useCards(id?: string) {
    const selector = useCallback(
        ({ cards, route }: State) => {
            id = id ? id : route.params.get("space_id");
            return cards.entities.get(id as any);
        },
        [id]
    );
    return useSelector(selector);
}

export function useConfig() {
    return useSelector(selector.config);
}

export function useUser(id?: string) {
    const selector = useCallback(
        ({ users, auth }: State) => {
            return users.get(id ?? auth.id);
        },
        [id]
    );

    return useSelector(selector) ?? defaultUser;
}

export function useUsers(
    ids: Array<string> | List<string> | Map<string | number, string>
) {
    let users = useSelector(selector.users);

    if (Array.isArray(ids)) {
        return ids
            .map((id: string) => users.get(id))
            .filter((user) => {
                return user ? true : false;
            });
    }
    if (List.isList(ids)) {
        return ids
            .map((id: string) => users.get(id))
            .filter((user) => {
                return user ? true : false;
            });
    }
    if (Map.isMap(ids)) {
        return ids
            .map((id: string) => users.get(id))
            .filter((user) => {
                return user ? true : false;
            });
    }
}

export function useThreads(id?: string) {
    const selector = useCallback(
        ({ threads, route }: State) => {
            if (id) {
                return threads.entities.get(id);
            } else {
                return threads.entities.get(route.params.get("space_id"));
            }
        },
        [id]
    );
    return useSelector(selector);
}

export function useAuth() {
    return useSelector(selector.auth);
}

export function useAuthId() {
    return useAuth().id;
}

export function useViewer() {
    const id = useAuthId();

    const user = useUser(id)!;

    const dispatch = useDispatch();

    function setStatus(sid: string) {
        dispatch({ type: "SET_STATUS", payload: sid });
    }

    function setNames(names: string) {
        dispatch({ type: "SET_NAMES", payload: names });
    }

    function setEmail(email: string) {
        dispatch({ type: "SET_EMAIL", payload: email });
    }

    function setPassword(password: string) {
        dispatch({ type: "SET_PASSWORD", payload: password });
    }

    function setDisplayName(name: string) {
        dispatch({ type: "SET_DISPLAY_NAME", payload: name });
    }

    return {
        id,
        user,
        viewer: user,
        setEmail,
        setNames,
        setStatus,
        setPassword,
        setDisplayName,
    };
}

export function useSpaceMembers() {
    return emptyarr;
}

export function useMessage(id: string) {
    const selector = useCallback(
        ({ threads }: State) => {
            return threads.getMessage(id);
        },
        [id]
    );
    return useSelector(selector);
}

export function useSpace(id?: string) {
    const select = useCallback(
        id
            ? ({ spaces }: State) => {
                  return spaces.get(id);
              }
            : selector.space,
        [id]
    );
    return useSelector(select);
}

export function useSpaces() {
    return useSelector(selector.spaces);
}

export function useDirectSpaces() {
    const channels = useSelector(selector.directSpaces);
    if (channels) {
        return channels;
    } else {
        return defaultSpaces;
    }
}

export function useColumns(id?: string) {
    const selector = useCallback(
        ({ columns, route }: State) => {
            id = id ? id : route.params.get("space_id");
            return columns.entities.get(id as any);
        },
        [id]
    );
    return useSelector(selector);
}

export function useCard(id: string) {
    const selector = useCallback(
        ({ cards }: State) => {
            const path = cards.paths.get(id);
            if (path) {
                return cards.entities.getIn(path);
            }
        },
        [id]
    );
    return useSelector(selector);
}

export function useLabels() {
    return [];
}

export function useCardChecklists(id: string): Map<string, ChecklistRecord> {
    const selector = useCallback(
        ({ checklists }) => {
            return checklists.entities.get(id, defaultMap);
        },
        [id]
    );
    return useSelector(selector);
}

export function usePermissions() {
    const { permissions } = useAuth();
    return permissions;
}

export function useSpacePermissions() {
    const { permissions, role_id } = useAuth();
    const [modified, setPermissions] = useState<Permissions>(permissions);
    const space = useSpace();
    let space_role = null as any;
    if (space) {
        space_role = space.roles.find((role) => role.role_id == role_id);
    }

    useCallback(() => {
        if (space_role) {
            setPermissions(permissions.merge(space_role.permissions));
        }
    }, [role_id, space_role, permissions]);

    return modified;
}
