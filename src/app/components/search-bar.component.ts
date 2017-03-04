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

@Component({
  selector: 'search-bar',
  templateUrl: 'app/templates/search-bar.template.html',
})

export class SearchBarComponent {
  // input/ output
  @Input('defaultWord') defaultWord: string;
  @Output('searchStart') searchStartSink: ReplaySubject<string>;

  // private models
  private _el: JQuery;

  constructor(private elementRef: ElementRef) {
    this._el = $(this.elementRef.nativeElement);
    this.searchStartSink = new ReplaySubject(1);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const searchBar = this._el.find("input");

     Observable.fromEvent(searchBar, 'keydown')
      .debounceTime(100)
      .startWith(undefined)
      .map((event: Event) => {
        if(event != undefined) {
          return (event.target as HTMLInputElement).value
        }
        return "";
      })
      .subscribe(this.searchStartSink);
  }
}