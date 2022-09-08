import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { delay, Observable, of, switchMap, tap } from 'rxjs';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Injectable } from '@angular/core';
import { RouteLocation, Selectable } from '~/app/modal';
import { data } from '~/app/data';

const adaptor = createEntityAdapter<Selectable<RouteLocation>>({
  selectId: (model) => model.id,
  sortComparer: (a: RouteLocation, b: RouteLocation) => {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  },
});

const { selectAll, selectEntities, selectIds, selectTotal } =
  adaptor.getSelectors();

export class DailyRouteCreateComponentState {
  selectableRoutLocation: EntityState<Selectable<RouteLocation>> =
    adaptor.getInitialState();
  search: string = '';
  isLoading: boolean = false;
}

@Injectable()
export class RadListViewDemoComponentStore extends ComponentStore<DailyRouteCreateComponentState> {
  constructor() {
    super(new DailyRouteCreateComponentState());
  }

  readonly isLoading$: Observable<boolean> = this.select((s) => s.isLoading);

  readonly selectableRoutLocationsWithStartEnd$: Observable<
    Selectable<RouteLocation>[]
  > = this.select((s) =>
    s.selectableRoutLocation ? selectAll(s.selectableRoutLocation) : []
  );
  readonly search$: Observable<string> = this.select((s) => s.search);

  readonly setSearch = this.updater((state, value: string) => ({
    ...state,
    search: value,
  }));

  readonly getData = this.effect((req$) =>
    req$.pipe(
      tap((req) => {
        console.log('getData');
        this.setState((state) => ({ ...state, isLoading: true }));
      }),
      switchMap((req) => {
        return of(data).pipe(
          delay(1500),
          tapResponse(
            (response: Selectable<RouteLocation>[]) => {
              console.log('getData', response.length);
              this.setState((state) => ({
                ...state,
                isLoading: false,
                selectableRoutLocation: adaptor.addMany(
                  response,
                  state.selectableRoutLocation
                ),
              }));
            },
            (error) => {
              this.setState((state) => ({ ...state, isLoading: false }));
            }
          )
        );
      })
    )
  );
  readonly setRoutLocations = this.updater(
    (state, value: Selectable<RouteLocation>[]) => {
      return {
        ...state,
        selectableRoutLocation: adaptor.addMany(
          value,
          state.selectableRoutLocation
        ),
      };
    }
  );

  readonly checkUnCheckLocation = this.updater(
    (state, value: { id: string; checked: boolean }) => {
      return {
        ...state,
        selectableRoutLocation: adaptor.updateOne(
          {
            id: value.id,
            changes: { checked: value.checked },
          },
          state.selectableRoutLocation
        ),
      };
    }
  );

  readonly checkUnCheckAll = this.updater((state, value: boolean) => {
    return {
      ...state,
      selectableRoutLocation: adaptor.updateMany(
        [
          ...selectAll(state.selectableRoutLocation).map((s) => ({
            id: s.id,
            changes: { checked: value },
          })),
        ],
        state.selectableRoutLocation
      ),
    };
  });
}
