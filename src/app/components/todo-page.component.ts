// vendors
import { 
	Component, 
	ElementRef, 
	ViewChild 
} from '@angular/core';
import { Observable } from 'rxjs/Rx';
// services & models
import { TodoModel } from '../models/todo.model';
import { ListService } from '../services/list.service';
import { FilterType } from '../models/filter.enum';

@Component({
	selector: 'todo-page',
	templateUrl: 'app/templates/todo-page.template.html',
	providers: [ListService]
})

export class TodoPageComponent {
	// referenced elements
	@ViewChild('todoInput') private _$todoInput: ElementRef;

	// private models
	private _todoInput$: Observable<KeyboardEvent>;
	private _filterTypes: FilterType[];

	constructor(private listService: ListService) {
		this._filterTypes = [FilterType.All, FilterType.Active, FilterType.Completed];
	}

	ngOnInit() {
		this._todoInput$ = Observable.fromEvent(this._$todoInput.nativeElement, 'keydown');

		// Create Todo
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