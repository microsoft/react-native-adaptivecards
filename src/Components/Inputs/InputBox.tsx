import * as React from 'react';
import {
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
    TextInput
} from 'react-native';
import { FlexBox } from '../Basic/FlexBox';

interface IProps {
    vIndex: number;
    hIndex: number;
    placeholder: string;
    value: string;
    keyboardType?: KeyboardTypeOptions;
    returnKeyType?: ReturnKeyTypeOptions;
    multiline?: boolean;
    style?: any;
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
            <FlexBox
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                relativeWidth={false}
                flexDirection='row'
                alignSelf='stretch'
                alignContent='flex-start'
                alignItems='stretch'
                justifyContent='space-between'
                width='stretch'
            >
                <TextInput
                    style={[
                        {
                            flex: 1,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 4,
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            marginVertical: 6,
                            height: 38,
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
            </FlexBox>
        );
    }
}
