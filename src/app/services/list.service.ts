import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class ListService {
	
	todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject([]);

	constructor() {
		this.todos.next([
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

	getTodos() {
		return this.todos.asObservable();
	}

	addTodo(todo: TodoModel) {
		let todos = this.todos.getValue();
		todo.id = todos.length;
		todos.push(todo);
		console.log("Add todo id " + todo.id);
	}
}