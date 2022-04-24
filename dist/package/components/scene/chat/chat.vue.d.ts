export interface ChatProps {
    chatID: string;
    send: (p: {
        chatID: string;
        message: string;
    }) => Promise<{
        done: boolean;
    }>;
    receive?: (p: {
        chatID: string;
    }) => Promise<ChatMessage[]>;
    updateAfterSendDone?: boolean;
}
export declare type ChatMessage = {
    isMe?: boolean;
    content: string;
};
declare const _sfc_main: import("vue").DefineComponent<{
    chatID: {
        type: StringConstructor;
        required: true;
    };
    send: {
        type: FunctionConstructor;
        required: true;
    };
    receive: {
        type: FunctionConstructor;
        required: false;
    };
    updateAfterSendDone: {
        type: BooleanConstructor;
        required: false;
    };
}, {
    props: {
        chatID: string;
        send: (p: {
            chatID: string;
            message: string;
        }) => Promise<{
            done: boolean;
        }>;
        receive?: ((p: {
            chatID: string;
        }) => Promise<ChatMessage[]>) | undefined;
        updateAfterSendDone?: boolean | undefined;
    };
    DEFAULT_ASK_TIME_DURATION: number;
    messageRecords: import("vue").Ref<{
        isMe?: boolean | undefined;
        content: string;
    }[]>;
    inputed: import("vue").Ref<string>;
    scrollRef: import("vue").Ref<null>;
    recordsRef: import("vue").Ref<null>;
    inputRef: import("vue").Ref<null>;
    receiver: number | null;
    onSend: () => Promise<void>;
    sButton: import("vue").DefineComponent<{
        type: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator(value: import("../../../core/constants/constants").StandardColor): boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        nativeType: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
    }, {
        root: import("vue").Ref<HTMLInputElement | undefined>;
        styleObj: {
            padding?: string | undefined;
            fontSize: string;
            color: string | undefined;
        };
        icon: import("vue").Slot | undefined;
        handleClick: (evt: MouseEvent) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        click: (evt: MouseEvent) => boolean;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator(value: import("../../../core/constants/constants").StandardColor): boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        nativeType: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
    }>> & {
        onClick?: ((evt: MouseEvent) => any) | undefined;
    }, {
        type: string;
        theme: string;
        size: string;
        disabled: boolean;
        nativeType: string;
    }>;
    SCard: import("vue").DefineComponent<{
        header: {
            type: StringConstructor;
        };
        shadow: {
            type: StringConstructor;
            default: string;
            validator(val: string): boolean;
        };
        bodyStyle: {
            type: ObjectConstructor;
        };
    }, {
        el: import("vue").Ref<HTMLElement | undefined>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        header: {
            type: StringConstructor;
        };
        shadow: {
            type: StringConstructor;
            default: string;
            validator(val: string): boolean;
        };
        bodyStyle: {
            type: ObjectConstructor;
        };
    }>>, {
        shadow: string;
    }>;
    SPaper: import("vue").DefineComponent<{
        theme: {
            type: null;
            required: false;
            default: string;
        };
        size: {
            type: null;
            required: false;
            default: string;
        };
        label: {
            type: StringConstructor;
            required: false;
            default: string;
        };
        needRadius: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
    }, {
        props: {
            theme: import("../../../core/constants/constants").StandardColor;
            size: import("../../../core/constants/constants").StandardSize;
            label: string;
            needRadius: boolean;
        };
        paperStyle: import("vue").ComputedRef<{
            fontSize: string;
            background: string | undefined;
            color: string;
            borderRadius: string;
        }>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        theme: {
            type: null;
            required: false;
            default: string;
        };
        size: {
            type: null;
            required: false;
            default: string;
        };
        label: {
            type: StringConstructor;
            required: false;
            default: string;
        };
        needRadius: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
    }>>, {
        theme: any;
        size: any;
        label: string;
        needRadius: boolean;
    }>;
    SInput: import("vue").DefineComponent<{
        type: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
        name: {
            type: StringConstructor;
        };
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            required: boolean;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        width: {
            type: NumberConstructor;
            default: number;
            validator(value: number): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        validate: {
            type: FunctionConstructor;
            default: undefined;
        };
    }, {
        input: import("vue").Ref<HTMLInputElement | undefined>;
        tip: import("vue").Ref<HTMLElement | undefined>;
        updateValue: (event: InputEvent, newVal?: string | number | undefined) => void;
        showPassword: (e: Event, show: boolean) => void;
        handleFocus: (event: MouseEvent) => void;
        handleBlur: (event: MouseEvent) => void;
        focus: () => void;
        blur: () => void;
        inputValue: import("vue").Ref<string | number>;
        isEncrypt: import("vue").Ref<boolean>;
        inputType: import("vue").Ref<"text" | "password">;
        isFocus: import("vue").Ref<boolean>;
        isWarning: import("vue").Ref<boolean>;
        warningInfo: import("vue").Ref<string>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        change: (newVal: string | number, oldVal: string | number) => boolean;
        blur: (e: FocusEvent) => boolean;
        input: (val: string | number) => boolean;
        focus: (e: FocusEvent) => boolean;
        'update:modelValue': (val: string | number) => boolean;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: StringConstructor;
            default: string;
            validator(value: string): boolean;
        };
        name: {
            type: StringConstructor;
        };
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            required: boolean;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        width: {
            type: NumberConstructor;
            default: number;
            validator(value: number): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        validate: {
            type: FunctionConstructor;
            default: undefined;
        };
    }>> & {
        onChange?: ((newVal: string | number, oldVal: string | number) => any) | undefined;
        "onUpdate:modelValue"?: ((val: string | number) => any) | undefined;
        onBlur?: ((e: FocusEvent) => any) | undefined;
        onFocus?: ((e: FocusEvent) => any) | undefined;
        onInput?: ((val: string | number) => any) | undefined;
    }, {
        type: string;
        disabled: boolean;
        width: number;
        validate: Function;
        placeholder: string;
        readonly: boolean;
        clearable: boolean;
        center: boolean;
    }>;
    SScrollbar: import("vue").DefineComponent<{
        width: {
            type: NumberConstructor;
            required: boolean;
        };
        height: {
            type: NumberConstructor;
            required: boolean;
        };
        thumbSize: {
            type: NumberConstructor;
            default: number;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator(value: import("../../../core/constants/constants").StandardColor): boolean;
        };
        alwaysNeedY: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        alwaysNeedX: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        clickUpdateDelay: {
            type: NumberConstructor;
            default: number;
        };
    }, {
        el: import("vue").Ref<HTMLElement | undefined>;
        wrap: import("vue").Ref<HTMLElement | undefined>;
        thumbX: import("vue").Ref<HTMLElement | undefined>;
        thumbY: import("vue").Ref<HTMLElement | undefined>;
        wrapStyle: {
            width: string;
            height: string;
        };
        thumbStyle: {
            x: {
                padding: string;
                width: string;
                height: string;
                left: string;
                bottom: string;
                transform: string;
                borderRadius: string;
                backgroundColor: string | undefined;
            };
            y: {
                padding: string;
                width: string;
                height: string;
                top: string;
                right: string;
                transform: string;
                borderRadius: string;
                backgroundColor: string | undefined;
            };
        };
        showThumb: {
            x: boolean;
            y: boolean;
        };
        updateThumbStyle: () => void;
        onEnter: () => void;
        onLeave: () => void;
        moveTo: (distance: number, direction: "Y" | "X") => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        width: {
            type: NumberConstructor;
            required: boolean;
        };
        height: {
            type: NumberConstructor;
            required: boolean;
        };
        thumbSize: {
            type: NumberConstructor;
            default: number;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator(value: import("../../../core/constants/constants").StandardColor): boolean;
        };
        alwaysNeedY: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        alwaysNeedX: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        clickUpdateDelay: {
            type: NumberConstructor;
            default: number;
        };
    }>>, {
        theme: string;
        thumbSize: number;
        alwaysNeedY: boolean;
        alwaysNeedX: boolean;
        clickUpdateDelay: number;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    chatID: {
        type: StringConstructor;
        required: true;
    };
    send: {
        type: FunctionConstructor;
        required: true;
    };
    receive: {
        type: FunctionConstructor;
        required: false;
    };
    updateAfterSendDone: {
        type: BooleanConstructor;
        required: false;
    };
}>>, {
    updateAfterSendDone: boolean;
}>;
export default _sfc_main;
