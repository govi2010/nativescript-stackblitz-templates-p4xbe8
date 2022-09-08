export type Selectable<T> = T & {
    checked: boolean;
};

export enum AccountScope {
    account = 'account',
    prospect = 'prospect',
    document = 'document'
}

export enum LocationType {
    account = 'account',
    custom = 'custom',
    start = 'start',
    end = 'end',
}

export interface GeoPoint {
    lat: number;
    lng: number;
}

export interface AccountLocation extends GeoPoint {
    type: string;
    id: string;
    name: string;
    address: string;
    scope?: string
}

export interface CustomLocation extends GeoPoint {
    type: string;
    id: string;
    name: string;
    address: string;
}

export type RouteLocation = AccountLocation | CustomLocation;
