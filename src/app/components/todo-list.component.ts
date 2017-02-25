import { Component, Input, Output } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { TodoModel } from '../models/todo.model';

@Component({
	selector: 'todo-list',
	templateUrl: 'app/templates/todo-list.template.html'
})

export class TodoListComponent {
	@Input() todos: TodoModel[]
	
	delete$: Observable<{id: number}>;
	toggle$: Observable<{id: number, completed: boolean}>;

	constructor() {
	}

	ngOnInit() {

	}
}