import * as React from 'react';
import { TextInput } from 'react-native';
import { FlexBox } from '../Basic/FlexBox';
export class InputBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(FlexBox, { vIndex: this.props.vIndex, hIndex: this.props.hIndex, relativeWidth: false, flexDirection: 'row', alignSelf: 'stretch', alignContent: 'flex-start', alignItems: 'stretch', justifyContent: 'space-between', width: 'stretch' },
            React.createElement(TextInput, { style: [
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
                ], multiline: this.props.multiline, keyboardType: this.props.keyboardType, blurOnSubmit: true, placeholder: this.props.placeholder, value: this.props.value, returnKeyType: this.props.returnKeyType, underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.props.onValueChange, onBlur: this.props.onBlur })));
    }
}
