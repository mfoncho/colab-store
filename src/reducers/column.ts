import { Record, Map, OrderedMap } from 'immutable';
import { patchColumn, PatchColumnAction, PatchColumnsAction, putColumn, PutColumnAction, PutColumnsAction, RemoveColumnAction } from '../actions/board';
import { ColumnRecord } from '../records';
import { positionSort } from '../utils';

const StateFactory = Record({
    paths: Map<string, [string, string]>(),
    entities: Map<string, OrderedMap<string, ColumnRecord>>(),
}, 'columns')

const defaultColumns = OrderedMap<string, ColumnRecord>();

export class ColumnState extends StateFactory {}

export const state = new ColumnState();

function PUT_COLUMN(state: ColumnState, { payload }: PutColumnAction) {

    if( state.paths.has(payload.id!)){

        return PATCH_COLUMN(state, patchColumn(payload));

    } else {
        return state.withMutations( (state: ColumnState) => {

            const column = new ColumnRecord(payload as any);
            const path = column.getStorePath();

            state.setIn(["paths", column.id], path);
            state.updateIn(["entities", path[0]], (columns: OrderedMap<string, ColumnRecord> = defaultColumns) => {
                return columns.set(column.id, column).sort(positionSort).toOrderedMap();
            });

        });
    }

}

function PUT_COLUMNS(state: ColumnState, action: PutColumnsAction) {
    return action.payload.reduce((state: ColumnState, column) => {
        return PUT_COLUMN(state, putColumn(column))
    }, state);
}

function PATCH_COLUMN(state: ColumnState, { payload }: PatchColumnAction){
    const path = state.paths.get(payload.id!);

    if(path) {
        return state.withMutations( (state: any) => {

            const column = state.entities.getIn(path) as ColumnRecord;

            const updated = column.merge(ColumnRecord.objectFromJS(payload));

            if(updated.position != column.position){

                state.updateIn(["entities", path[0]], (columns: OrderedMap<string, ColumnRecord>) => {
                    return columns.set(column.id, updated).sort(positionSort);
                });

            } else {

                state.setIn(["entities", ...path], updated);

            }
        });

    } else {
        return state;
    }
}

function PATCH_COLUMNS(state: ColumnState, { payload }: PatchColumnsAction){
    for(let column of payload){
        state = PATCH_COLUMN(state, patchColumn(column));
    }
    return state;
}

function REMOVE_COLUMN(state: ColumnState, action: RemoveColumnAction){

    const id = action.payload.id;

    const path = state.paths.get(id);

    if(path) {
        return state.withMutations( (state: any) => {
            state.deleteIn(["paths", id])
            state.deleteIn(["entities", ...path]);
        });
    } else {
        return state;
    }
}

export const reducers = {

	PUT_COLUMN,

	PUT_COLUMNS,

	PATCH_COLUMN,

	PATCH_COLUMNS,

    REMOVE_COLUMN,

};

export default { state, reducers }
