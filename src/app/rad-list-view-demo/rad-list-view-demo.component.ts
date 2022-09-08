import {Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {RouterExtensions} from '@nativescript/angular';
import {isAndroid, Screen} from '@nativescript/core';
import {distinctUntilChanged, Observable, take, takeUntil} from "rxjs";
import {isEqual} from "lodash-es";
import {RadListViewDemoComponentStore} from "./rad-list-view-demo.component.store";
import {BaseComponent} from "../basecomponent";
import {AccountLocation, AccountScope, LocationType, RouteLocation, Selectable} from "../modal";
import {RadListViewComponent} from "nativescript-ui-listview/angular";

export const searchFunctionFactory = (search$: Observable<string>) => {
    return (item: RouteLocation) => {
        let searchText = ''
        search$.pipe(take(1)).subscribe(data => searchText = data);
        if (searchText?.length) {
            return item.name?.toLowerCase()?.includes(searchText?.toLowerCase()) && (!(item as AccountLocation).scope || ((item as AccountLocation).scope === AccountScope.account))
        }
    }
}

@Component({
    selector: 'AppRadListViewComponentDemo',
    templateUrl: './rad-list-view-demo.component.html',
    styleUrls: ['./rad-list-view-demo.component.scss'],
    providers: [RadListViewDemoComponentStore]
})
export class RadListViewComponentDemo extends BaseComponent implements OnInit, OnDestroy {
    @ViewChild('ListElement') listElement: RadListViewComponent;
    selectableRoutLocationsWithStartEnd$: Observable<Selectable<RouteLocation>[]> = this.store.selectableRoutLocationsWithStartEnd$.pipe(takeUntil(this.destroy$), distinctUntilChanged(isEqual));
    isLoading$: Observable<boolean> = this.store.isLoading$.pipe(takeUntil(this.destroy$), distinctUntilChanged());
    search$: Observable<string> = this.store.search$.pipe(takeUntil(this.destroy$), distinctUntilChanged())
    searchFunction = searchFunctionFactory(this.search$);
    trackByFn = (index, item) => item?.id;


    constructor(
        private router: RouterExtensions,
        public store: RadListViewDemoComponentStore,
    ) {
        super();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ngOnInit() {
        this.store.getData();
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
        this.store.checkUnCheckLocation({id, checked})
    }

}

