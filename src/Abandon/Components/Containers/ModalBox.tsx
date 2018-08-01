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
                        ]}
                    >
                        {this.props.children}
                    </View>
                </View>
            </Modal>
        );
    }
}
