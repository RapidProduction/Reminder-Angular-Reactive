import { Component, Input, Output, ViewChild, ElementRef, SimpleChange } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { TodoModel } from '../models/todo.model';

@Component({
	selector: 'todo',
	templateUrl: 'app/templates/todo.template.html'
})

export class TodoComponent {
	@Input('todo') todo: TodoModel;
	@Output() delete$: Observable<{ id: number }>;
	@Output() toggle$: Observable<{ id: number, completed: boolean }>;
	@Output() edit$: Observable<{ id: number, todo: TodoModel }>;

	@ViewChild('todoComplete') $todoComplete: ElementRef;
	@ViewChild('todoTitle') $todoTitle: ElementRef;
	@ViewChild('todoDeleteButton') $todoDeleteButton: ElementRef;

	todo$: Observable<{}>;

	constructor() {}

	ngOnInit() {
		this.todo$ = Observable
			.pairs({todo: this.todo});

		const toggleClick = Observable.fromEvent(this.$todoComplete.nativeElement, 'click');
		this.toggle$ = toggleClick
			.withLatestFrom(this.todo$, (_, todo) => todo[1])
			.map(todo => ({ id: todo.id, completed: todo.completed }))
			.publishReplay(1)
			.refCount();

		const deleteClick = Observable.fromEvent(this.$todoDeleteButton.nativeElement, 'click');
		this.delete$ = deleteClick
			.withLatestFrom(this.todo$, (_, todo) => todo[1])
			.map(todo => ({ id: todo.id }))
			.publishReplay(1)
			.refCount();

		const editDblClick = Observable.fromEvent(this.$todoTitle.nativeElement, 'dblclick');
		editDblClick.subscribe(
			val => {
				console.log("edit click!");
			}
		);
	}
}