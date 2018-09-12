import * as React from 'react';
import {Modal, Platform, TouchableWithoutFeedback, View} from 'react-native';

interface IProps {
    show: boolean;
    onPressBackground?: () => void;
    onRequestClose?: () => void;
}

export class ModalBox extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {

        if (Platform.OS === 'web') {
            return undefined;
        }

        return (
            <Modal
                visible={this.props.show}
                animationType={'fade'}
                transparent={true}
                onRequestClose={this.props.onRequestClose}
            >
                <TouchableWithoutFeedback
                    onPress={this.props.onPressBackground}
                >
                    <View
                        style={[
                            {
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        ]}
                    />
                </TouchableWithoutFeedback>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={[
                            {
                                width: '85%',
                            }
                        ]}
                    >
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        );
    }
}
