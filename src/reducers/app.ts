import { Record } from "immutable";
import { App } from "../records";

function PUT_APP_CONFIG(state: App, action: any) {
    return state;
}

const state = new App();

const reducers = {
    PUT_APP_CONFIG,
};

export default { state, reducers };
