import { Record, Map, List } from 'immutable';
import { RemoveChecklistAction } from '../actions/board';
import { ChecklistRecord, TaskRecord } from '../records';

const StateFactory = Record({
    paths: Map<string, [string, string]>(),
    entities: Map<string, Map<string, ChecklistRecord>>(),
}, 'checklists')

export class Checklists extends StateFactory {}

export const state = new Checklists();


function PUT_CHECKLIST(state: Checklists, { payload }: any) : Checklists{
    const checklist = new ChecklistRecord(payload);
    const path = [payload.card_id, payload.id];

    return state.withMutations( (state: Checklists) => {
        state.setIn(["paths", payload.id], path);
        state.setIn(["entities", ...path], checklist);
    });

}

function PUT_CHECKLISTS(state: Checklists, action: any) : Checklists{
    return action.payload.reduce((state: Checklists, payload: any) => {
        return PUT_CHECKLIST(state, {payload})
    }, state);
}

function PATCH_CHECKLIST(state: Checklists, { payload }: any): Checklists{
    const path = state.paths.get(payload.id);

    if(path) {
        const checklist = ChecklistRecord.mapFromJS(payload);
        return state.withMutations( (state: Checklists) => {
            state.mergeIn(["entities", ...path], checklist);
        });

    } else {
        return state;
    }
}

function PUT_TASK(state: Checklists, { payload }: any): Checklists{
    const path = state.paths.get(payload.checklist_id);

    if(path) {
        return state.withMutations( (state: Checklists) => {
            const checklist = state.entities.getIn(path);
            const index = checklist.tasks.findIndex((task: any) => task.id === payload.id);
            if(index === -1){
                const task = new TaskRecord(payload);
                const tasks = checklist.tasks.push(task);
                state.setIn(["entities", ...path, "tasks"], tasks)
            }
        });

    } else {
        return state;
    }
}

function REMOVE_TASK(state: Checklists, { payload }: any): Checklists{
    const path = state.paths.get(payload.checklist_id);

    if(path) {
        return state.withMutations( (state: Checklists) => {
            const checklist = state.entities.getIn(path);
            const index = checklist.tasks.findIndex((task: any) => task.id === payload.id);
            if(index > -1){
                const tasks = checklist.tasks.delete(index);
                state.setIn(["entities", ...path, "tasks"], tasks)
            }
        });

    } else {
        return state;
    }
}

function PATCH_TASK(state: Checklists, { payload}: any): Checklists{
    const path = state.paths.get(payload.checklist_id);

    if(path) {
        return state.withMutations( (state: any) => {
            const checklist = state.entities.getIn(path);
            const index = checklist.tasks.findIndex((task: any) => task.id === payload.id);
            if(index > -1){
                const task = Map(payload);
                state.mergeIn(["entities", ...path, "tasks", index], task)
            }
        });

    } else {
        return state;
    }
}

function PATCH_CHECKLISTS(state: Checklists, { payload }: any) : Checklists{
    for(let checklist of payload){
        state = PATCH_CHECKLIST(state, {payload:checklist});
    }
    return state;
}

function REMOVE_CHECKLIST(state: Checklists, action: RemoveChecklistAction): Checklists{

    const id = action.payload.id;

    const path = state.paths.get(id);

    if(path) {
        return state.withMutations( (state: Checklists) => {
            state.deleteIn(["paths", id])
            state.deleteIn(["entities", ...path]);
        });
    } else {
        return state;
    }
}

export const reducers = {

    PUT_TASK,

    PATCH_TASK,

    REMOVE_TASK,

	PUT_CHECKLIST,

	PUT_CHECKLISTS,

	PATCH_CHECKLIST,

	PATCH_CHECKLISTS,

    REMOVE_CHECKLIST,

};

export default { state, reducers }
