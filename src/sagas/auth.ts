import { put, takeEvery } from "redux-saga/effects";
import { dispatch } from "..";
import { io, socket, Presence } from "@colab/client";
import { patchPresence, putPresence, removePresence } from "../actions/user";

function* init() {
    const topic = `colab`;
    let ch = socket.channel(topic, {});
    const presence = new Presence(ch);
    presence.onSync(() => {
        //console.log("online", presence.list());
    });

    presence.onJoin((id, current: io.PresenceSync, pres: io.PresenceSync) => {
        if (current && id) {
            const presence = { ...pres.metas[pres.metas.length - 1] };
            dispatch(patchPresence({ user_id: id, ...presence }));
        } else if (id) {
            const presence = pres.metas[0];
            dispatch(putPresence({ user_id: id, ...presence }));
        }
    });

    presence.onLeave((id, current) => {
        if (id && current.metas.length == 0) {
            dispatch(removePresence({ user_id: id }));
        }
    });

    ch.join()
        .receive("ok", () => {})
        .receive("error", () => {});
}

export const tasks = [{ effect: takeEvery, type: "PLUME_INIT", handler: init }];
