import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'AppCheckbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
})
export class CheckboxComponent
    implements OnInit, OnChanges, ControlValueAccessor {
    @Input() text: string;
    @Input() checked = false;
    @Input() cssStyles: object = {};

    @Output() change = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes) {
        if (changes.checked) {
            this.checked = changes.checked.currentValue;
            this.onChange(this.checked);
        }
    }

    toggle() {
        this.checked = !this.checked;
        this.change.emit(this.checked);
        this.onTouched();
        this.onChange(this.checked);
    }

    onChange: any = () => {};

    onTouched: any = () => {};

    // setDisabledState(isDisabled: boolean): void {
    //     this.isDisabled = isDisabled;
    // }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: boolean): void {
        this.checked = value;
    }
}
