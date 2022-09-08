import {Component, OnDestroy} from "@angular/core";
import {FormArray, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
    template: ''
})
export abstract class BaseComponent implements OnDestroy {
    private _destroy$: Subject<any> | undefined;

    constructor() {
    }

    get destroy$() {
        if (!this._destroy$) {
            this._destroy$ = new Subject();
        }
        return this._destroy$;
    }

    ngOnDestroy() {
        if (this._destroy$) {
            this._destroy$.next(true);
            this._destroy$.complete();
        }
    }

    makeFormDirtyAndTouched(form: FormGroup | FormArray): void {
        if (form instanceof FormGroup) {
            // tslint:disable-next-line:forin
            for (const controlsKey in form.controls) {
                const control = form.get(controlsKey);
                if (control instanceof FormArray || control instanceof FormGroup) {
                    this.makeFormDirtyAndTouched(control);
                }
                // @ts-ignore
                control?.markAsTouched();
                control?.markAsDirty();
            }
        } else {
            form.controls.forEach((c) => {
                if (c instanceof FormArray || c instanceof FormGroup) {
                    this.makeFormDirtyAndTouched(c);
                }
                c.markAsTouched();
                c.markAsDirty();
            });
        }
    }
}
