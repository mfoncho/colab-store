import { Map, List, OrderedMap } from "immutable";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import { State } from "./index";

import selector from "./selectors";
import {
    Presence,
    CardRecord,
    ChecklistRecord,
    TagRecord,
    ThreadRecord,
    UserRecord,
    ChannelRoleRecord,
    MemberRecord,
} from "./records";

const emptyarr: any = [];

const defaultMap = Map<string, any>();

const defaultList = List();

const defaultUser = new UserRecord();

const defaultPresence = new Presence();

const defaultMembers = OrderedMap<string, MemberRecord>();

const defaultRoles = OrderedMap<string, ChannelRoleRecord>();

const defaultCards = Map<string, OrderedMap<string, CardRecord>>();

export function usePreferences() {
    return useSelector(selector.preferences);
}

export function useTopics(id: string) {
    const selector = useCallback(
        ({ threads }: State) => {
            const ths = threads.entities.get(id);
            if (ths) {
                return ths.get("main");
            }
        },
        [id]
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

export function useWorkspaces() {
    return useSelector(selector.workspaces);
}

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
            id = id ? id : route.params.get("channel_id");
            return cards.entities.get(id as any);
        },
        [id]
    );
    return useSelector(selector);
}

export function usePersonalWorkspace() {
    const workspaces = useSelector(selector.workspaces);
    return workspaces.get("@personal");
}

export function useOrg() {
    return useSelector(selector.org);
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
                return threads.entities.get(route.params.get("channel_id"));
            }
        },
        [id]
    );
    return useSelector(selector);
}

export function useAuthId() {
    return useSelector(selector.auth).id;
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

export function useChannelMembers() {
    return emptyarr;
}

export function useWorkspace() {
    return useSelector(selector.workspace);
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

export function useChannel(id?: string) {
    const select = useCallback(
        id
            ? ({ channels }: State) => {
                  let path = channels.paths.get(id!);
                  if (path) {
                      let [workspace_id, channel_id] = path;
                      return channels.entities
                          .get(workspace_id)
                          ?.get(channel_id);
                  }
              }
            : selector.channel,
        [id]
    );
    return useSelector(select);
}

export function useChannels() {
    return useSelector(selector.channels);
}

export function useWorkspaceChannels<T = never>(id: string, defaultValue?: T) {
    const selector = useCallback(
        ({ channels }: State) => {
            return channels.entities.get(id);
        },
        [id]
    );
    return useSelector(selector) ?? defaultValue;
}

export function useColumns(id?: string) {
    const selector = useCallback(
        ({ columns, route }: State) => {
            id = id ? id : route.params.get("channel_id");
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

export function useTags() {
    const channel = useChannel();
    return channel ? channel.tags : (defaultList as List<TagRecord>);
}

export function useCardTags(card: CardRecord) {
    const tags = useTags();
    return card.tags
        .map((ctag) => tags.find((tag: any) => tag.id === ctag.tag_id))
        .filter(Boolean) as List<TagRecord>;
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

export function useWorkspacePermission() {
    const workspace = useWorkspace();
    return workspace?.role.permissions;
}

export function useChannelPermission() {
    const channel = useChannel();
    return channel!.permissions;
}
