import {put, select, takeEvery} from 'redux-saga/effects';

function * open({ payload }: any){
	yield put({type:'OPEN_TOOLS_DRAWER'});
}

function * close({payload}: any){
	yield put({type:'CLOSE_TOOLS_DRAWER'});
}

export const tasks = [
    { effect:takeEvery, type:'OPEN_TOOL', handler:open},
    { effect:takeEvery, type:'CLOSE_TOOL', handler:close},
];
