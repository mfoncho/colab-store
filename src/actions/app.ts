import { Action, createAction } from ".";
import { ROUTE, STORE_RELATED } from "./types";
import { NormalizedRelated } from "../schemas";

export type RouteAction = Action<ROUTE, any>;

export type StoreRelatedAction = Action<STORE_RELATED, NormalizedRelated>;

export function route(route: any): RouteAction {
    return createAction(ROUTE, route);
}

export function storeRelated(related: NormalizedRelated): StoreRelatedAction {
    return createAction(STORE_RELATED, related);
}
