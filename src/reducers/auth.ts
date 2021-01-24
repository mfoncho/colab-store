import { Record } from "immutable";
import { MemberSchema } from "../records";

const state = new MemberSchema();

export const reducers = {
    SET_CREDS(state: MemberSchema, { payload }: any) {
        return state;
    },

    SET_AUTH_ID(state: MemberSchema, { payload }: any) {
        return state.set("id", payload);
    },

    CLEAR_AUTH_USER(state: MemberSchema, { payload }: any) {
        return state;
    },
};

export default { state, reducers };
