export const state = {
    '@personal':{ 
        '@me':{ 
            user_id:'1'
        } 
    }
};

function put(state: any, {
    payload
}: any){
    let section = state[payload.workspace_id] 
    if(!section){
        section = {}
    }
    let prev = section[payload.id] || {}
    section[payload.id] = { ...prev, ...payload };
    return { ...state, [payload.workspace_id]: { ...section } }
}

function puts(state: any, {
    payload
}: any){

    if(!Array.isArray(payload)){
        payload = Object.values(payload)
    }

    return payload.reduce( (state: any, payload: any) => {
        return put(state, { payload });
    }, state);

}

function clear(state: any, {
    payload
}: any ){
    state = { ...state }
    delete state[payload]
    return state;
}

function patch(state: any, {
    payload
}: any ){

    let section = state[payload.workspace_id] 
    if(!section){
        section = {}
    }

    let prev = section[payload.id]

    if(prev){

        section[payload.id] = { ...prev, ...payload };
        return { ...state, [payload.workspace_id]: { ...section } }

    } else {

        return state;

    }

}

function remove(state: any, {
    payload
}: any ){

    let section = state[payload.workspace_id] 

    if(!section){
        section = {}
    }

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'prev'.
    prev = section[payload.id]

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'prev'.
    if(prev){

        section = { ...section }
        delete section[payload.id]
        return { ...state, [payload.workspace_id]: { ...section } }

    } else {

        return state;

    }
}

export const reducers =
{

    PUT_MEMBERSHIP: put,

	PUT_MEMBERSHIPS: puts,

	PATCH_MEMBERSHIP: patch,

    CLEAR_MEMBERSHIP: clear,

    REMOVE_MEMBERHIP: remove,

};

export default { state, reducers }
