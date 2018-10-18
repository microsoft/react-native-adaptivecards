import * as React from 'react';
import { View } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';

interface IProps {
    hasSpacing: boolean;
}

export class ButtonGroup extends React.Component<IProps> {
    public render() {
        return (
            <View
                style={[
                    {
                        flexDirection: this.flexDirection,
                        alignSelf: 'stretch',
                    },
                    this.topStyles
                ]}
            >
                {this.props.children}
            </View>
        );
    }

    private get topStyles() : any {
        if (this.props.hasSpacing) {
            return {
                marginTop: StyleConfig.actionSetSpacing,
                paddingTop: 12,
                justifyContent: 'center',
                borderTopWidth: StyleConfig.separatorThickness,
                borderTopColor: StyleConfig.separatorColor
            };
        }
        return {};
    }

    private get flexDirection() {
        return StyleConfig.actionDirection === 'vertically' ? 'column' : 'row';
    }
}
