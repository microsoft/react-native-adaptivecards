import * as React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';

interface IProps {
    show: boolean;
    onPressBackground?: () => void;
}

export class ModalBox extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Modal
                visible={this.props.show}
                animationType={'fade'}
                transparent={true}
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
                    flex={1}
                    justifyContent='center'
                    alignContent='center'
                    alignItems='center'
                >
                    <View
                        style={[
                            {
                                width: '85%',
                                height: '45%',
                                maxHeight: '45%',
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
