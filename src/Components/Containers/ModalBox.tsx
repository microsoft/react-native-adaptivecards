import * as React from 'react';
import { Modal, Platform, TouchableWithoutFeedback, View } from 'react-native';

interface IProps {
    show: boolean;
    onShow: () => void;
    onBackgroundPress?: () => void;
    onRequestClose?: () => void;
}

export class ModalBox extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {

        if (Platform.OS === 'web') {
            return null;
        }

        return (
            <Modal
                visible={this.props.show}
                animationType={'fade'}
                transparent={true}
                onRequestClose={this.onRequestClose}
                onShow={this.onShow}
            >
                <TouchableWithoutFeedback
                    onPress={this.onBackgroundPress}
                    accessible={false}
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
                    >
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
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    private onBackgroundPress = () => {
        if (this.props.onBackgroundPress) {
            this.props.onBackgroundPress();
        }
    }
    
    private onRequestClose = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    private onShow = () => {
        console.log('Modal OnShow');
        if (this.props.onShow) {
            this.props.onShow();
        }
    }
}
