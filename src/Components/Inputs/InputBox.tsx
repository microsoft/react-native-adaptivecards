import * as React from 'react';
import {
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    StyleProp,
    TextInput,
    TextStyle,
} from 'react-native';

interface IProps {
    placeholder: string;
    value: string;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: ReturnKeyTypeOptions;
    multiline?: boolean;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    flex?: number;
    width?: number;
    height?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    style?: StyleProp<TextStyle>;
    onValueChange?: (input: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export class InputBox extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <TextInput
                style={[
                    {
                        flex: this.props.flex,
                        color: this.props.color,
                        fontFamily: this.props.fontFamily,
                        fontSize: this.props.fontSize,
                        fontWeight: this.props.fontWeight,
                        backgroundColor: this.props.backgroundColor,
                        width: this.props.width,
                        height: this.props.height,
                        borderColor: this.props.borderColor,
                        borderWidth: this.props.borderWidth,
                        borderRadius: this.props.borderRadius,
                        marginTop: this.props.marginTop,
                        marginRight: this.props.marginRight,
                        marginBottom: this.props.marginBottom,
                        marginLeft: this.props.marginLeft,
                        paddingTop: this.props.paddingTop,
                        paddingRight: this.props.paddingRight,
                        paddingBottom: this.props.paddingBottom,
                        paddingLeft: this.props.paddingLeft,
                    },
                    this.props.style
                ]}
                
                multiline={this.props.multiline}
                keyboardType={this.props.keyboardType}
                blurOnSubmit={true}
                placeholder={this.props.placeholder}
                value={this.props.value}
                returnKeyType={this.props.returnKeyType}
                underlineColorAndroid={'transparent'}
                importantForAccessibility={'no-hide-descendants'}
                onChangeText={this.props.onValueChange}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
            />
        );
    }
}
