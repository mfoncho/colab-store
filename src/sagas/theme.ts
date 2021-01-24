import {put, select, takeEvery} from 'redux-saga/effects';

function * init(){
	yield put({type:'GET_AUTH_USER'});
}

function * loadTheme( {payload}: any){
	const mode = window.localStorage.getItem(`theme::${payload}::mode`);
	if(mode){
		yield put({type:"SET_THEME_MODE", payload:mode});
	}
	const theme = window.localStorage.getItem(`theme::${payload}::primary`);
	if(mode){
		yield put({type:"SET_THEME", payload:theme});
	}
}

function * storeTheme( {payload}: any){
	const state = yield select();
	window.localStorage.setItem(`theme::0::primary`, state.theme.primary);
	window.localStorage.setItem(`theme::${state.auth.id}::primary`, state.theme.primary);
}

function * storeThemeMode( {payload} : any){
	const state = yield select();
	window.localStorage.setItem(`theme::0::mode`, state.theme.mode);
	window.localStorage.setItem(`theme::${state.auth.id}::mode`, state.theme.mode);
}


export const tasks = [

    { effect:takeEvery, type:'PLUME_INIT', handler:init},

    { effect:takeEvery, type:'SET_AUTH_ID', handler:loadTheme},

    { effect:takeEvery, type:'SET_THEME', handler:storeTheme},

    { effect:takeEvery, type:'SET_THEME_MODE', handler:storeThemeMode},


]
