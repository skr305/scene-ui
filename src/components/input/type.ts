import { ComponentConstants } from '../../core/constants'; 

export interface SceneInputProps {
    size ?: ComponentConstants.StandardSize;
    onInput ?: ( value: string ) => any;
    color ?: ComponentConstants.StandardColor;
    borderColor ?: ComponentConstants.StandardColor;
};