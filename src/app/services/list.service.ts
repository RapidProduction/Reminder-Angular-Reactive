import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { Observable, Subject, BehaviorSubject, Observer } from 'rxjs/Rx';

@Injectable()
export class ListService {

	private _todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject([]);

	constructor() {
		this._todos.next([
			{
				id: 0,
				title: "Having dinner with Emm",
				completed: false,
				date: new Date()
			},
			{
				id: 1,
				title: "Wash clothes",
				completed: true,
				date: new Date()
			},
			{
				id: 2,
				title: "Pick up eggs",
				completed: false,
				date: new Date()
			}
		]);
	}

	get todos$() {
		return this._todos.asObservable();
	}

	get count() {
		return this._todos.getValue().length;
	}

	addTodo(newTodo: TodoModel) {
		// TODO: Push todo to backend
		// let obs = todoBackendService.saveTodo(todo);
		// obs.subscribe(
		// 	response => {
		// 		//synchonize with local todo
		// 		this.todos.next(this.todos.getValue().push(todo));
		// 	}
		// );

		// ASSUME: already synchonize with backend service
		let todos = this._todos.getValue();
		todos.push(newTodo);
		this._todos.next(todos);
	}

	toggleTodo(toggledTodo: TodoModel) {
		// ASSUME: already synchonize with backend service
		let todos = this._todos.getValue();
		let index = todos.findIndex((todo) => todo.id === toggledTodo.id);
		todos[index].completed = !todos[index].completed;
		this._todos.next(todos);
	}

	deleteTodo(deletedTodo: TodoModel) {
		// ASSUME: already synchonize with backend service
		let todos = this._todos.getValue();
		let index = todos.findIndex((todo) => todo.id === deletedTodo.id);
		todos.splice(index, 1);
		this._todos.next(todos);
	}

	rewriteTodo(editedTodo: TodoModel) {
		// ASSUME: already synchonize with backend service
		let todos = this._todos.getValue();
		let index = todos.findIndex((todo) => todo.id === editedTodo.id);
		todos[index] = editedTodo;
		this._todos.next(todos);
	}
}