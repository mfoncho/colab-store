import { Action, createAction, createIOAction, IOAction } from ".";
import { ROUTE, LOGIN, AUTH, STORE_RELATED, SET_SITE, LOGOUT, SET_CONFIG, SET_AUTH, LOAD_SITE, LOAD_CONFIG, STORE_INIT, LOAD_AUTH } from "./types";
import { NormalizedRelated } from "../schemas";
import { io } from "@colab/client";

export interface IAuth{
    id: string;
    token: string;
    timestamp: string;
}

export interface ILoginPayload{
    email: string;
    password: string;
    remember_me?: boolean;
}

export type AuthAction = Action<AUTH, io.Auth | {}>

export type StoreIntAction = Action<STORE_INIT, {}>

export type RouteAction = Action<ROUTE, any>;

export type SetAuthAction = Action<SET_AUTH, Partial<IAuth>>

export type StoreRelatedAction = Action<STORE_RELATED, NormalizedRelated>;

export type SetSiteAction = Action<SET_SITE, Partial<io.Site>>

export type SetConfigAction = Action<SET_CONFIG, Partial<io.Config>>

export type LoadAuthAction = IOAction<LOAD_AUTH, any, io.Auth>

export type LogoutAction = IOAction<LOGOUT, any, any>

export type LoginAction = IOAction<LOGIN, ILoginPayload, any>

export type LoadSiteAction = IOAction<LOAD_SITE, any, io.Site>

export type LoadConfigAction = IOAction<LOAD_CONFIG, any, io.Config>

export function setSite(payload: Partial<io.Site>): SetSiteAction{
    return createAction(SET_SITE, payload);
}

export function authenticate(payload: io.Auth): AuthAction {
    return createAction(AUTH, payload);
}

export function loadAuth(): LoadAuthAction {
    return createIOAction<io.Auth, LOAD_AUTH>(LOAD_AUTH, {});
}

export function loadSite(): LoadSiteAction{
    return createIOAction<io.Site, LOAD_SITE>(LOAD_SITE,{});
}

export function loadConfig(): LoadConfigAction{
    return createIOAction<io.Config, LOAD_CONFIG>(LOAD_CONFIG,{});
}

export function setAuth(payload: Partial<IAuth>): SetAuthAction{
    return createAction(SET_AUTH, payload);
}

export function login(param: ILoginPayload): LoginAction{
    return createIOAction<io.Config, LOGIN>(LOGIN, param);
}

export function logout(): LogoutAction{
    return createIOAction<any, LOGOUT>(LOGOUT, {});
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
