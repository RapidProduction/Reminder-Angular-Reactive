export class TodoModel {
	id: number;
	title: string;
	completed: boolean;
	date: Date;

	constructor(params: TodoModel){
		Object.assign(this, params);
	}
}