import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { isAndroid, Screen, ObservableArray } from '@nativescript/core';
import { distinctUntilChanged, Observable, take, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';
import { RadListViewDemoComponentStore } from './rad-list-view-demo.component.store';
import { BaseComponent } from '../basecomponent';
import {
  AccountLocation,
  AccountScope,
  LocationType,
  RouteLocation,
  Selectable,
} from '../modal';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { searchFunctionFactory, syncObservableArray } from './util';

@Component({
  selector: 'AppRadListViewComponentDemo',
  templateUrl: './rad-list-view-demo.component.html',
  styleUrls: ['./rad-list-view-demo.component.scss'],
  providers: [RadListViewDemoComponentStore],
})
export class RadListViewComponentDemo
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public data: ObservableArray<Selectable<RouteLocation>> = new ObservableArray<
    Selectable<RouteLocation>
  >();

  @ViewChild('ListElement') listElement: RadListViewComponent;
  selectableRoutLocationsWithStartEnd$: Observable<
    Selectable<RouteLocation>[]
  > = this.store.selectableRoutLocationsWithStartEnd$.pipe(
    takeUntil(this.destroy$),
    distinctUntilChanged(isEqual)
  );
  isLoading$: Observable<boolean> = this.store.isLoading$.pipe(
    takeUntil(this.destroy$),
    distinctUntilChanged()
  );
  search$: Observable<string> = this.store.search$.pipe(
    takeUntil(this.destroy$),
    distinctUntilChanged()
  );
  searchFunction = searchFunctionFactory(this.search$);
  trackByFn = (index, item) => {
    console.log('trackByFn', item?.id);
    return item?.id;
  };

  constructor(
    private router: RouterExtensions,
    public store: RadListViewDemoComponentStore
  ) {
    super();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngOnInit() {
    this.store.getData();
    this.selectableRoutLocationsWithStartEnd$.subscribe((d) => {
      syncObservableArray(this.data, d, 'id');
    });
  }

  templateSelectorFunc(item: Selectable<RouteLocation>) {
    if (item['type'] === LocationType.start) {
      return 'start';
    }
    if (item['type'] === LocationType.end) {
      return 'end';
    }
    return 'regular';
  }

  onSearch(args: any) {
    const text = args.object.text || '';
    this.store.setSearch(text);
    if (this.listElement) {
      this.listElement.listView.refresh();
    }
  }

  checkUncheck(id, checked: boolean, type: LocationType) {
    this.store.checkUnCheckLocation({ id, checked });
  }
  log(id, checked: boolean, type: LocationType) {
    // if (this.listElement) {
    //   this.listElement.listView.refresh();
    // }
  }
}
