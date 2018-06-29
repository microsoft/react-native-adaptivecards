import * as React from 'react';

import { FlexBox } from '../Basic/FlexBox';
import { TextBlock } from '../Basic/TextBlock';

interface IProps {
    vIndex: number;
    hIndex: number;
    title: string;
    onPress: () => void;
    boxStyle?: any;
    textStyle?: any;
}

export class Button extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <FlexBox
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                flexDirection='row'
                relativeWidth={false}
                flex={1}
                alignSelf='stretch'
                alignItems='center'
                alignContent='center'
                justifyContent='center'
                width='stretch'
                hSpace={10}
                style={[
                    {
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 4,
                        backgroundColor: '#277BDF',
                    },
                    this.props.boxStyle
                ]}
                onPress={this.props.onPress}
            >
                <TextBlock
                    vIndex={0}
                    hIndex={0}
                    width='stretch'
                    horizontalAlign='center'
                    textStyle={[
                        {
                            textAlign: 'center',
                            color: 'white',
                        },
                        this.props.textStyle,
                    ]}
                    numberOfLines={1}
                >
                    {this.props.title}
                </TextBlock>
            </FlexBox>
        );
    }
}
