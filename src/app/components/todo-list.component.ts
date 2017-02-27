// vendors
import { 
	Component, 
	Input, 
	Output 
} from '@angular/core';
import { 
	Observable, 
	Observer, 
	ReplaySubject
} from 'rxjs/Rx';
// models
import { TodoModel } from '../models/todo.model';

@Component({
	selector: 'todo-list',
	templateUrl: 'app/templates/todo-list.template.html'
})

export class TodoListComponent {
	// input/ output
	@Input() todos: TodoModel[]
	@Output() deleteTodoSink: ReplaySubject<{id: number}>;
	@Output() toggleTodoSink: ReplaySubject<{id: number, completed: boolean}>;

	constructor() {
		this.deleteTodoSink = new ReplaySubject(1);
		this.toggleTodoSink = new ReplaySubject(1);
	}

	ngOnInit() {

	}
}