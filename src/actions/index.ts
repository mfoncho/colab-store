import client from "@colab/client";

export interface CommandAction<T = string> {
    readonly type: T;
}

export interface Action<T = string, P = null> extends CommandAction<T> {
    readonly payload: P;
}

export interface AsyncMeta<T = any, E = any> {
    error(error: E): void;
    success(callback: T): void;
}

export interface AsyncAction<T, P, S = any, E = any> extends Action<T, P> {
    then<RSuccess, RReject>(
        onFullfill: (data: S) => RSuccess,
        onReject?: (error: E) => RReject
    ): Promise<RSuccess | RReject>;
    catch<CReturn = never>(
        callback: (error: E) => CReturn
    ): Promise<S | CReturn>;
    finally<FReturn = never>(callback: () => FReturn): Promise<S | FReturn>;
    readonly meta: AsyncMeta<S, E>;
}

export interface IOMeta<T = any, E = any> extends AsyncMeta<T, E> {
    readonly token: any;
}

export interface IOAction<T, P, S = any, E = any>
    extends AsyncAction<T, P, S, E> {
    readonly meta: IOMeta<S, E>;
    cancel(reason: string): void;
}

export function createAction<T = string, P = any>(
    type: T,
    payload: P
): Action<T, P> {
    return { type, payload };
}

export function createIOAction<S, T = string, P = any>(type: T, payload: P) {
    let error: (reason: any) => void = (error) => {};

    let success: (data: S) => void = (data) => {};

    let promise = new Promise<S>((res, rej) => {
        error = rej;
        success = res;
    });

    let source = client.cancelToken();

    return {
        type: type,

        meta: { error, success, token: source.token },

        payload: payload,

        catch: <R>(callback: (error: any) => R) => {
            return promise.catch(callback);
        },

        then: <R = never, E = never>(
            onFullfill: (data: S) => R,
            onReject?: (error: string) => E
        ) => {
            return promise.then(onFullfill, onReject);
        },

        cancel: (reason: string) => {
            return source.cancel(reason);
        },

        finally: <R>(callback: () => R) => {
            return promise.finally(callback);
        },
    };
}
