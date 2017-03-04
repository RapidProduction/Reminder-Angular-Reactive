// vendors
import { 
	Component, 
	ElementRef, 
	ViewChild,
} from '@angular/core';
import { 
	Observable,
	ReplaySubject,
	Subject,
} from 'rxjs/Rx';
import * as $ from 'jquery';
// services & models
import { TodoModel } from '../models/todo.model';
import { ListService } from '../services/list.service';
import { FilterType } from '../models/filter.enum';

@Component({
	selector: 'todo-page',
	templateUrl: 'app/templates/todo-page.template.html',
	providers: [ListService],
})

export class TodoPageComponent {
	// constructs
	private _filterSource: ReplaySubject<string>;
	private _searchSource: ReplaySubject<string>;

	// obtains
	private _displayList$: Observable<TodoModel[]>
	private _todoInput$: Observable<KeyboardEvent>;

	// models
	private _filterTypes: FilterType[];
	private _el: JQuery;

	constructor(private listService: ListService, private elementRef: ElementRef) {
		this._el = $(this.elementRef.nativeElement);
		this._filterTypes = [FilterType.All, FilterType.Active, FilterType.Completed];

		this._filterSource = new ReplaySubject(1);
		this._searchSource = new ReplaySubject(1);
	}

	ngOnInit() {
		const todoInput = this._el.find(".todo-input");
		this._todoInput$ = Observable.fromEvent(todoInput, 'keydown');

		// New todo
		this._todoInput$
			.filter((event: KeyboardEvent) => event.keyCode == 13)
			.subscribe(
				(event: Event) => {
					let targetElement = event.target as HTMLInputElement;
					if(targetElement.value != "") {
						this.listService.addTodo(new TodoModel({
							id: this.listService.count,
							title: targetElement.value,
							completed: false,
							date: new Date()
						}));

						targetElement.value = "";
					}
				}
			);

		// Filter todos		
		const filteredTodo$ = Observable.combineLatest(
			this.listService.todos$,
			this._filterSource
		)
		.map((combineTodoFilter) => {
			let filterTodos = [];
			const todos = combineTodoFilter[0];
			const filterType = combineTodoFilter[1]; 

			todos.forEach((todo) => {
				switch (filterType) {
					case "Completed":
						if(todo.completed === true) {
							console.log(todo.title);
							filterTodos.push(todo);
						}
						break;
					case "Active":
						if(!todo.completed) {
							filterTodos.push(todo);
						}
						break;
					default:
						filterTodos.push(todo);
						break;
				}
			});
		
			return filterTodos;
		});


		this._displayList$ = Observable.combineLatest(
			filteredTodo$,
			this._searchSource
		)
		.map((combineTodoSearch) => {
			let searchTodos = [];
			const todos = combineTodoSearch[0];
			const searchWord = combineTodoSearch[1];

			todos.forEach((todo) => {
				if(todo.title.includes(searchWord)) {
					searchTodos.push(todo);
				}
			});

			return searchTodos;
		})
		.publishReplay(1)
		.refCount();
	}
}