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
	@ViewChild('todoInput') private _$todoInput: ElementRef;

	private _todoInput$: Observable<KeyboardEvent>

	constructor(private listService: ListService) {}

	ngOnInit() {
		this._todoInput$ = Observable.fromEvent(this._$todoInput.nativeElement, 'keydown');
		this._todoInput$
			.filter(event => event.keyCode == 13)
			.subscribe(
				(event: KeyboardEvent) => {
					if(this._$todoInput.nativeElement.value != "") {
						let title = this._$todoInput.nativeElement.value;
						
						this.listService.addTodo(new TodoModel({
							id: this.listService.count,
							title: title,
							completed: false,
							date: new Date()
						}));

						this._$todoInput.nativeElement.value = "";
					}
				}
			);
	}
}