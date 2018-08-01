import * as React from 'react';
import { Modal, View } from 'react-native';
export class ModalBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(Modal, { visible: this.props.show, animationType: 'fade', transparent: true },
            React.createElement(View, { style: [
                    {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    }
                ] },
                React.createElement(View, { style: [
                        {
                            backgroundColor: 'white',
                            borderWidth: 0.5,
                            borderColor: '#00000019',
                            borderRadius: 4,
                            shadowColor: '#00000026',
                            shadowOffset: {
                                width: 0,
                                height: 1
                            },
                            shadowRadius: 4,
                            shadowOpacity: 1.0,
                            height: '45%',
                            width: '85%',
                            padding: 10,
                        }
                    ] }, this.props.children))));
    }
}
