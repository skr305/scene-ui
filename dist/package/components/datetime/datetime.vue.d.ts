import { DateObject, createDate } from '../../core/lib/date';
/**
 * 修改modelValue的七种模式
 */
declare type modelType = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second' | 'Date';
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: DateConstructor;
        required: boolean;
        default: Date;
    };
    name: {
        type: StringConstructor;
        required: boolean;
    };
    placeholder: {
        type: StringConstructor;
    };
    theme: {
        type: StringConstructor;
        default: string;
        required: boolean;
        validator(value: import("../../core/constants/constants").StandardColor): boolean;
    };
}, {
    hours: import("vue").Ref<HTMLElement | undefined>;
    minutes: import("vue").Ref<HTMLElement | undefined>;
    seconds: import("vue").Ref<HTMLElement | undefined>;
    hourScrollbar: import("vue").Ref<any>;
    minuteScrollbar: import("vue").Ref<any>;
    secondScrollbar: import("vue").Ref<any>;
    showCalendar: import("vue").Ref<boolean>;
    screenArray: import("vue").ComputedRef<DateObject[][]>;
    englishMonthName: import("vue").ComputedRef<string | undefined>;
    datetimeTemplate: import("vue").ComputedRef<string>;
    calendarControl: (open: boolean) => void;
    updateDatetime: (model: modelType, value: number | Date) => void;
    createDate: typeof createDate;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (newVal: Date, oldVal: Date) => boolean;
    blur: (e: FocusEvent) => boolean;
    focus: (e: FocusEvent) => boolean;
    'update:modelValue': (val: Date) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: DateConstructor;
        required: boolean;
        default: Date;
    };
    name: {
        type: StringConstructor;
        required: boolean;
    };
    placeholder: {
        type: StringConstructor;
    };
    theme: {
        type: StringConstructor;
        default: string;
        required: boolean;
        validator(value: import("../../core/constants/constants").StandardColor): boolean;
    };
}>> & {
    onChange?: ((newVal: Date, oldVal: Date) => any) | undefined;
    "onUpdate:modelValue"?: ((val: Date) => any) | undefined;
    onBlur?: ((e: FocusEvent) => any) | undefined;
    onFocus?: ((e: FocusEvent) => any) | undefined;
}, {
    theme: string;
    modelValue: Date;
}>;
export default _sfc_main;
