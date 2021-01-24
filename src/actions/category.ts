import { io } from "@colab/client";
import { IOAction, createIOAction, createAction, Action } from "./index";
import {
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    CATEGORY_DELETED,
    FETCH_CATEGORIES,
    DELETE_CATEGORY,
    CATEGORY_CREATED,
    CATEGORY_UPDATED,
    PUT_CATEGORY,
    PUT_CATEGORIES,
    PATCH_CATEGORY,
    REMOVE_CATEGORY,
    PATCH_CATEGORIES,
} from "./types";

export interface CreateCategoryPayload {
    name: string;
}

export interface UpdateCategoryPayload {
    category_id: string;
    name: string;
}

export interface DeleteCategoryPayload {
    id: string;
}

export interface FetchCategoriesPayload {}

export type CreateCategoryAction = IOAction<
    CREATE_CATEGORY,
    CreateCategoryPayload,
    io.Category
>;

export type UpdateCategoryAction = IOAction<
    UPDATE_CATEGORY,
    UpdateCategoryPayload,
    io.Category
>;

export type DeleteCategoryAction = IOAction<
    DELETE_CATEGORY,
    DeleteCategoryPayload,
    any
>;

export type FetchCategoriesAction = IOAction<
    FETCH_CATEGORIES,
    FetchCategoriesPayload,
    io.Category[]
>;

export type CategoryCreatedAction = Action<CATEGORY_CREATED, io.Category>;

export type CategoryUpdatedAction = Action<CATEGORY_UPDATED, io.Category>;

export type CategoryDeletedAction = Action<CATEGORY_DELETED, io.Category>;

export type PutCategoryAction = Action<PUT_CATEGORY, io.Category>;

export type PutCategoriesAction = Action<PUT_CATEGORIES, io.Category[]>;

export type PatchCategoryAction = Action<PATCH_CATEGORY, io.Category>;

export type PatchCategoriesAction = Action<PATCH_CATEGORIES, io.Category[]>;

export type RemoveCategoryAction = Action<REMOVE_CATEGORY, { id: string }>;

export function fetchCategories(): FetchCategoriesAction {
    return createIOAction<io.Category[], FETCH_CATEGORIES>(
        FETCH_CATEGORIES,
        {}
    );
}

export function createCategory(name: string): CreateCategoryAction {
    return createIOAction<io.Category, CREATE_CATEGORY>(CREATE_CATEGORY, {
        name,
    });
}

export function updateCategory(
    payload: UpdateCategoryPayload
): UpdateCategoryAction {
    return createIOAction(UPDATE_CATEGORY, payload);
}

export function deleteCategory(id: string): DeleteCategoryAction {
    return createIOAction<any, DELETE_CATEGORY>(DELETE_CATEGORY, {
        category_id: id,
    });
}

export function categoryCreated(category: io.Category): CategoryCreatedAction {
    return createAction(CATEGORY_CREATED, category);
}

export function categoryUpdated(category: io.Category): CategoryUpdatedAction {
    return createAction(CATEGORY_UPDATED, category);
}

export function categoryDeleted(category: io.Category): CategoryDeletedAction {
    return createAction(CATEGORY_DELETED, category);
}

export function putCategory(category: io.Category): PutCategoryAction {
    return createAction(PUT_CATEGORY, category);
}

export function putCategories(categories: io.Category[]): PutCategoriesAction {
    return createAction(PUT_CATEGORIES, categories);
}

export function patchCategory(category: io.Category): PatchCategoryAction {
    return createAction(PATCH_CATEGORY, category);
}

export function patchCategories(
    categories: io.Category[]
): PatchCategoriesAction {
    return createAction(PATCH_CATEGORIES, categories);
}

export function removeCategory(id: string): RemoveCategoryAction {
    return createAction(REMOVE_CATEGORY, { id });
}
