import { Map, Record } from "immutable";

export class Org extends Record({
    name: "",
    icon: "",
    is_enterprise: false,
}) {}

export interface OrgState extends Org {}

export const state = new Org();

interface IAction {
    type: string;
    payload?: any;
}

export const reducers = {
    SET_ORG(org: Org, action: IAction) {
        return org.merge(action.payload);
    },
};

export default { state, reducers };
