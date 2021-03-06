// vendors
import {
	Component,
	Input,
	Output,
	ViewChild,
	ElementRef,
	SimpleChange,
} from '@angular/core';
import {
	Observable,
	Observer,
	ReplaySubject,
} from 'rxjs/Rx';

// services & models
import { TodoModel } from '../models/todo.model';

@Component({
	selector: 'todo',
	templateUrl: 'app/templates/todo.template.html',
})

export class TodoComponent {
	// input/ output
	@Input('todo') todo: TodoModel;
	@Output('delete') deleteTodoSink: ReplaySubject<{ id: number }>;
	@Output('toggle') toggleTodoSink: ReplaySubject<{ id: number, completed: boolean }>;
	@Output('edit') editTodoSink: ReplaySubject<{ id: number, todo: TodoModel }>;

	// referenced elements
	@ViewChild('todoComplete') private _$todoComplete: ElementRef;
	@ViewChild('todoTitle') private _$todoTitle: ElementRef;
	@ViewChild('todoDeleteButton') private _$todoDeleteButton: ElementRef;

	// private models
	private _todo$: Observable<{}>;
  private _el: JQuery;

	constructor() {
		this.deleteTodoSink = new ReplaySubject(1);
		this.toggleTodoSink = new ReplaySubject(1);
		this.editTodoSink = new ReplaySubject(1);
	}

	ngOnInit() {
		this._todo$ = Observable
			.pairs({todo: this.todo});

		// Observe then sink it to output subject
		Observable.fromEvent(this._$todoComplete.nativeElement, 'click')
			.withLatestFrom(this._todo$, (_, todo) => todo[1])
			.subscribe(this.toggleTodoSink);

		Observable.fromEvent(this._$todoDeleteButton.nativeElement, 'click')
			.withLatestFrom(this._todo$, (_, todo) => todo[1])
			.subscribe(this.deleteTodoSink);

		Observable.fromEvent(this._$todoTitle.nativeElement, 'dblclick')
			.withLatestFrom(this._todo$, (_, todo) => todo[1])
			.subscribe(this.editTodoSink);
	}
}
