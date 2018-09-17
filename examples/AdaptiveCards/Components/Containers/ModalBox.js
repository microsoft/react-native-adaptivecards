import * as React from 'react';
import { Modal, Platform, TouchableWithoutFeedback, View } from 'react-native';
export class ModalBox extends React.Component {
    constructor(props) {
        super(props);
        this.onBackgroundPress = () => {
            console.log('ModalBox background onPress');
            if (this.props.onBackgroundPress) {
                this.props.onBackgroundPress();
            }
        };
    }
    render() {
        if (Platform.OS === 'web') {
            return null;
        }
        return (React.createElement(Modal, { visible: this.props.show, animationType: 'fade', transparent: true, onRequestClose: this.props.onRequestClose },
            React.createElement(TouchableWithoutFeedback, { onPress: this.onBackgroundPress },
                React.createElement(View, { style: [
                        {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    ] },
                    React.createElement(View, { style: {
                            flex: 1,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center'
                        } },
                        React.createElement(View, { style: [
                                {
                                    width: '85%',
                                }
                            ] }, this.props.children))))));
    }
}
