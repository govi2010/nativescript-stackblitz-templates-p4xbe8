import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";

export class ItemsComponentState {
    accountsAndProspects: IAccountDRElement[];
    search: string = '';
    currentView: 'accounts' | 'prospects' = 'accounts';
}
export interface IAccountDRElement {
    id: string;
    name: string;
    location: LocationModel;
    scope: AccountScope
}
export interface LocationModel {
    address: string;
    lat?: number;
    lng?: number;
}
export enum AccountScope {
    account = 'account',
    prospect = 'prospect',
    document = 'document'
}

@Injectable()
export class ItemsComponentStore extends ComponentStore<ItemsComponentState> {
    constructor() {
        super();
    }

}
