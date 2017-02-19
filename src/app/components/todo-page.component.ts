import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TodoModel } from '../models/todo.model';
import { ListService } from '../services/list.service';

@Component({
	selector: 'todo-page',
	templateUrl: 'app/templates/todo-page.template.html',
	providers: [ListService]
})

export class TodoPageComponent {
	@ViewChild('todoInput') $todoInput: ElementRef;
	todos$: Observable<TodoModel[]>;
	todoInput$: Observable<KeyboardEvent>

	constructor(private listService: ListService) {}

	ngOnInit() {
		this.todos$ = this.listService.getTodos();

		this.todoInput$ = Observable.fromEvent(this.$todoInput.nativeElement, 'keydown');
		this.todoInput$
			.filter(event => event.keyCode == 13)
			.subscribe(
				val => {
					let title = val.target.value;
					console.log(title);
					this.listService.addTodo(new TodoModel({
						id: -1,
						title: title,
						completed: false,
						date: new Date()
					}));
					val.target.value = "";
				}
			);
	}
}