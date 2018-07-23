import * as React from 'react';
import { Modal, View } from 'react-native';

interface IProps {
    show: boolean;
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
                <View
                    style={[
                        {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    ]}
                >
                    <View
                        style={[
                            {
                                backgroundColor: 'white',
                                height: '45%',
                                width: '85%',
                                borderRadius: 10,
                                borderWidth: 1,
                                padding: 10,
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
