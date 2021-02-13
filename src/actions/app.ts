import { Action, createAction, createIOAction, IOAction } from ".";
import { ROUTE, STORE_RELATED, SET_SITE, LOGOUT, SET_CONFIG, SET_AUTH, LOAD_SITE, LOAD_CONFIG, STORE_INIT } from "./types";
import { NormalizedRelated } from "../schemas";
import { io } from "@colab/client";

export interface IAuth{
    id: string;
    token: string;
}

export type StoreIntAction = Action<STORE_INIT, {}>

export type RouteAction = Action<ROUTE, any>;

export type SetAuthAction = Action<SET_AUTH, Partial<IAuth>>

export type StoreRelatedAction = Action<STORE_RELATED, NormalizedRelated>;

export type SetSiteAction = Action<SET_SITE, Partial<io.Site>>

export type SetConfigAction = Action<SET_CONFIG, Partial<io.Config>>

export type LogoutAction = IOAction<LOGOUT, any, any>

export type LoadSiteAction = IOAction<LOAD_SITE, any, io.Site>

export type LoadConfigAction = IOAction<LOAD_CONFIG, any, io.Site>

export function setSite(payload: Partial<io.Site>): SetSiteAction{
    return createAction(SET_SITE, payload);
}

export function loadSite(): LoadSiteAction{
    return createIOAction<io.Site, LOAD_SITE>(LOAD_SITE,{});
}

export function loadConfig(): LoadConfigAction{
    return createIOAction<io.Site, LOAD_CONFIG>(LOAD_CONFIG,{});
}

export function setAuth(payload: Partial<IAuth>): SetAuthAction{
    return createAction(SET_AUTH, payload);
}

export function logout(): LogoutAction{
    return createIOAction<any,LOGOUT>(LOGOUT, {});
}

export function setConfig(payload: Partial<io.Config>): SetConfigAction{
    return createAction(SET_CONFIG, payload) 
}

export function route(route: any): RouteAction {
    return createAction(ROUTE, route);
}

export function storeRelated(related: NormalizedRelated): StoreRelatedAction {
    return createAction(STORE_RELATED, related);
}
