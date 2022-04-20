import { SceneMessageStyleType } from '../../message';
export interface LoginRegProps {
    onLogin: (p: {
        userID: string;
        pwd: string;
    }) => Promise<{
        done: boolean;
    }>;
    onReg: (p: {
        userID: string;
        userNick: any;
        pwd: string;
    }) => Promise<{
        done: boolean;
    }>;
    onLoginSuc?: (userID: string) => any;
    onRegSuc?: (userID: string) => any;
    onLoginFail?: (userID: string) => any;
    onRegFail?: (userID: string) => any;
    LoginTitle?: string;
    LoginSubmitTip?: string;
    RegTitle?: string;
    RegSubmitTip?: string;
}
declare const _sfc_main: import("vue").DefineComponent<{
    onLogin: {
        type: FunctionConstructor;
        required: true;
    };
    onReg: {
        type: FunctionConstructor;
        required: true;
    };
    onLoginSuc: {
        type: FunctionConstructor;
        required: false;
    };
    onRegSuc: {
        type: FunctionConstructor;
        required: false;
    };
    onLoginFail: {
        type: FunctionConstructor;
        required: false;
    };
    onRegFail: {
        type: FunctionConstructor;
        required: false;
    };
    LoginTitle: {
        type: StringConstructor;
        required: false;
    };
    LoginSubmitTip: {
        type: StringConstructor;
        required: false;
    };
    RegTitle: {
        type: StringConstructor;
        required: false;
    };
    RegSubmitTip: {
        type: StringConstructor;
        required: false;
    };
}, {
    props: {
        onLogin: (p: {
            userID: string;
            pwd: string;
        }) => Promise<{
            done: boolean;
        }>;
        onReg: (p: {
            userID: string;
            userNick: any;
            pwd: string;
        }) => Promise<{
            done: boolean;
        }>;
        onLoginSuc?: ((userID: string) => any) | undefined;
        onRegSuc?: ((userID: string) => any) | undefined;
        onLoginFail?: ((userID: string) => any) | undefined;
        onRegFail?: ((userID: string) => any) | undefined;
        LoginTitle?: string | undefined;
        LoginSubmitTip?: string | undefined;
        RegTitle?: string | undefined;
        RegSubmitTip?: string | undefined;
    };
    loginUserID: import("vue").Ref<string>;
    loginPwd: import("vue").Ref<string>;
    regUserID: import("vue").Ref<string>;
    regUserNick: import("vue").Ref<string>;
    regPwd: import("vue").Ref<string>;
    inLoginPage: import("vue").Ref<boolean>;
    wrapperRef: import("vue").Ref<null>;
    LOGIN_SUC: {
        text: string;
        type: SceneMessageStyleType;
    };
    LOGIN_FAIL: {
        text: string;
        type: SceneMessageStyleType;
    };
    LOGIN_ERROR: {
        text: string;
        type: SceneMessageStyleType;
    };
    REG_SUC: {
        text: string;
        type: SceneMessageStyleType;
    };
    REG_FAIL: {
        text: string;
        type: SceneMessageStyleType;
    };
    REG_ERROR: {
        text: string;
        type: SceneMessageStyleType;
    };
    onLogin: () => Promise<void>;
    onReg: () => Promise<void>;
    wrapperClasses: import("vue").Ref<string[]>;
    onSwitchMode: () => void;
    sInput: import("vue").DefineComponent<{
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
    SCheckbox: import("vue").DefineComponent<{
        checked: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        theme: {
            type: StringConstructor;
            default: string;
            required: boolean;
            validator(value: import("../../../core/constants/constants").StandardColor): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        unsure: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
            required: boolean;
            validator(value: import("../../../core/constants/constants").StandardSize): boolean;
        };
        label: {
            type: StringConstructor;
            default: string;
            required: boolean;
        };
    }, {
        current: import("vue").Ref<boolean>;
        checkboxClass: import("vue").ComputedRef<string>;
        SizeMap: {
            large: string;
            default: string;
            small: string;
        };
        FontSizeMap: {
            large: string;
            default: string;
            small: string;
        };
        checkboxSign: import("vue").ComputedRef<"" | "✳️" | "✅">;
        themeBorderColor: import("vue").ComputedRef<string | undefined>;
        onChange: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        change: typeof import("../../../core/lib/type-assert").isBoolean;
        "update:modelValue": typeof import("../../../core/lib/type-assert").isBoolean;
    }, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        checked: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        theme: {
            type: StringConstructor;
            default: string;
            required: boolean;
            validator(value: import("../../../core/constants/constants").StandardColor): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        unsure: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
            required: boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
            required: boolean;
            validator(value: import("../../../core/constants/constants").StandardSize): boolean;
        };
        label: {
            type: StringConstructor;
            default: string;
            required: boolean;
        };
    }>> & {
        onChange?: ((value: any) => any) | undefined;
        "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    }, {
        theme: string;
        size: string;
        disabled: boolean;
        checked: boolean;
        modelValue: boolean;
        label: string;
        unsure: boolean;
    }>;
    Secret0: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    User0: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    Name0: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    onLogin: {
        type: FunctionConstructor;
        required: true;
    };
    onReg: {
        type: FunctionConstructor;
        required: true;
    };
    onLoginSuc: {
        type: FunctionConstructor;
        required: false;
    };
    onRegSuc: {
        type: FunctionConstructor;
        required: false;
    };
    onLoginFail: {
        type: FunctionConstructor;
        required: false;
    };
    onRegFail: {
        type: FunctionConstructor;
        required: false;
    };
    LoginTitle: {
        type: StringConstructor;
        required: false;
    };
    LoginSubmitTip: {
        type: StringConstructor;
        required: false;
    };
    RegTitle: {
        type: StringConstructor;
        required: false;
    };
    RegSubmitTip: {
        type: StringConstructor;
        required: false;
    };
}>>, {}>;
export default _sfc_main;
