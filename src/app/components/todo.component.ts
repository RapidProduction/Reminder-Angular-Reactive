import { Component, Input, Output, ViewChild, ElementRef, SimpleChange } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { TodoModel } from '../models/todo.model';

@Component({
	selector: 'todo',
	templateUrl: 'app/templates/todo.template.html'
})

export class TodoComponent {
	@Input() todo: TodoModel;
	@Output() delete$: Observable<{id: number}>;
	@Output() toggle$: Observable<{id: number, completed: boolean}>;
	@Output() edit$: Observable<{id: number}>;

	@ViewChild('todoComplete') $todoComplete: ElementRef;
	@ViewChild('todoTitle') $todoTitle: ElementRef;
	@ViewChild('todoDeleteButton') $todoDeleteButton: ElementRef;

	constructor() {}

	ngOnInit() {
		// Impure oeprators!!
		this.toggle$ = Observable.fromEvent(this.$todoComplete.nativeElement, 'click');
		this.toggle$ = this.toggle$.map(val => ({id: this.todo.id, completed: !this.todo.completed}));

		this.delete$ = Observable.fromEvent(this.$todoDeleteButton.nativeElement, 'click');
		this.delete$ = this.delete$.map(val => ({id: this.todo.id}));

		this.edit$ = Observable.fromEvent(this.$todoTitle.nativeElement, 'dblclick');
	}
}