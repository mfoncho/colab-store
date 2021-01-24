import { put, takeEvery } from "redux-saga/effects";

const schema = {
    user: {
        map: {
            user_id: "id",
        },
    },
    role: {
        map: {
            role_id: "id",
        },
    },
};

function* serialize({ payload }: any): Iterable<any> {}

export const tasks = [
    { effect: takeEvery, type: "STORE_MEMBERSHIP", handler: serialize },
];
