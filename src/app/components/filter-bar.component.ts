// vendors
import { 
	Component,
	ElementRef, 
	Input, 
	Output, 
	QueryList, 
	ViewChild, 
} from '@angular/core';
import { 
	Observable, 
	ReplaySubject 
} from 'rxjs/Rx';
// import * as $ from 'jquery';
// models
import { FilterType } from '../models/filter.enum';

@Component({
	selector: 'filter-bar',
	templateUrl: 'app/templates/filter-bar.template.html',
	providers: []
})

export class FilterBarComponent {

	// input/ output
	@Input() filterTypes: FilterType[];
	// @Output() filterStartSink: ReplaySubject;

	// referenced elements
	@ViewChild('filterBar') private _$filterButton: QueryList<ElementRef>;

	// private models
	private _filters: string[];

	constructor(private elementRef: ElementRef) {
		// let element = $(this.elementRef.nativeElement);
	}

	ngOnInit() {
		this._filters = this.filterTypes.map(filter => FilterType[filter]);

		const filterButtons = document.querySelectorAll('button');
		console.log(filterButtons);

		// console.log($('button'));

		// Observable.fromEvent(filterButtons, 'click')
		// 	.subscribe(
		// 		event => {
		// 			console.log(event);
		// 		}
		// 	)
	}
}