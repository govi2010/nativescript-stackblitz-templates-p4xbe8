import { distinctUntilChanged, Observable, take } from 'rxjs';
import { isEqual } from 'lodash-es';
import { RouteLocation } from '../modal';
import { isAndroid, Screen, ObservableArray } from '@nativescript/core';

export const searchFunctionFactory = (search$: Observable<string>) => {
  return (item: RouteLocation) => {
    let searchText = '';
    search$.pipe(take(1)).subscribe((data) => (searchText = data));
    if (searchText?.length) {
      return item.name?.toLowerCase()?.includes(searchText?.toLowerCase());
    } else {
      return true;
    }
  };
};

export function syncObservableArray<T>(
  obsArray: ObservableArray<T>,
  array: T[],
  identifier: keyof T
) {
  if (!array.length && obsArray.length) {
    obsArray = new ObservableArray<T>([]);
  } else if (array.length && !obsArray.length) {
    obsArray.push(...array);
  } else {
    /** add-update **/
    for (let i = 0; i < array.length; i++) {
      const index = obsArray.findIndex((s) => {
        if (!!s[identifier] && !!array[i] && array[i][identifier]) {
          return s[identifier] === array[i][identifier];
        } else {
          return false;
        }
      });
      if (index > -1) {
        if (!isEqual(obsArray.getItem(i), array[i])) {
          obsArray.setItem(index, array[i]);
        }
      } else {
        obsArray.splice(i, 0, array[i]);
      }
    }
    /** remove **/
    for (let i = 0; i < obsArray.length; i++) {
      const index = array.findIndex((s) => {
        const obsItem = obsArray.getItem(i);
        if (s[identifier] && !!obsItem && obsItem[identifier]) {
          return s[identifier] === obsItem[identifier];
        } else {
          return false;
        }
      });
      if (index === -1) {
        obsArray.splice(i, 1);
      }
    }
  }
}
