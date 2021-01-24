import { Record, Map } from 'immutable';
import { UserRecord } from '../records';

export type UsersState = Map<string, UserRecord>

export const state = Map<string, UserRecord>();

function PUT_USER(state: UsersState, { payload }: any) {

    if (state.has(payload.id)){

        return PATCH_USER(state, { payload })

    } else {

        return state.set(payload.id, new UserRecord(payload))

    }
}

function PUT_USERS(state: UsersState, action: any) : UsersState {
    return action.payload.reduce((state: any, payload: any) => {
        return PUT_USER(state, {payload})
    }, state);
}

function PATCH_USER(state: UsersState, { payload }: any){

    if(state.has(payload.id)) {
        return state.withMutations( (state: any) => {
            state.mergeIn([payload.id], payload);
        });
    } else {
        return state;
    }
}

function PATCH_USERS(state: UsersState, { payload }: any){
    for(let user of payload){
        state = PATCH_USER(state, {payload:user});
    }
    return state;
}

function REMOVE_USER(state: UsersState, action: any){
    return state.delete(action.payload);
}

export const reducers = {

	PUT_USER,

	PUT_USERS,

	PATCH_USER,

	PATCH_USERS,

    REMOVE_USER,

};

export default { state, reducers }
