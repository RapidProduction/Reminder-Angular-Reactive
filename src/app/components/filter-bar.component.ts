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
import * as $ from 'jquery';
// models
import { FilterType } from '../models/filter.enum';

@Component({
	selector: 'filter-bar',
	templateUrl: 'app/templates/filter-bar.template.html',
})

export class FilterBarComponent {
	// input/ output
	@Input('filterTypes') filterTypes: FilterType[];
	@Output('filterStart') filterStartSink: ReplaySubject<string>;

	// private models
	private _filters: string[];
	private _el: JQuery;

	constructor(private elementRef: ElementRef) {
		this._el = $(this.elementRef.nativeElement);
		this.filterStartSink = new ReplaySubject(1);
	}

	ngOnInit() {
		this._filters = this.filterTypes.map(filter => FilterType[filter]);
	}

	ngAfterViewInit() {
    const filterButtons = this._el.find("button");

		Observable.fromEvent(filterButtons, 'click')
			.map((event: Event) => ((event.target) as HTMLInputElement).textContent)
			.startWith('all')
			.subscribe(this.filterStartSink);
	}
}
