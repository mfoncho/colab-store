
export type Id = string;

export interface Timestamped{
	timestamp: string;
}

export interface BelongsToSpace {
	space_id: string;
}

export interface BelongsToThread {
	thread_id: string;
}

export interface BelongsToWorkspace{
	workspace_id: string;
}

export interface Unique{
	id: Id
}

export interface Positioned {
    position: number
}

export function positionSort(a: Positioned, b: Positioned){

	if(a.position < b.position){

		return -1;

	} else if(a.position > b.position) {

		return 1;
	}

	return 0;
}

