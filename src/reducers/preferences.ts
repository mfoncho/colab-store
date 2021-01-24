import { Record, Map } from "immutable";
import { PreferencesRecord } from "../records";
import { PATCH_PREFERENCES } from "../actions/types";
import { PatchPreferencesAction } from "../actions/user";

export const state = new PreferencesRecord();

export const reducers = {
    [PATCH_PREFERENCES]: (
        state: PreferencesRecord,
        { payload }: PatchPreferencesAction
    ) => {
        return state.merge(payload);
    },
};

export default { state, reducers };
