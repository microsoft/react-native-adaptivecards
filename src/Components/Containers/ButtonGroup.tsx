import * as React from 'react';
import { View } from 'react-native';
import { HostConfig } from '../../Configs/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    hasSpacing: boolean;
    config: HostConfig;
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
                marginTop: StyleManager.getActionSetSpacing(this.props.config),
                paddingTop: 12,
                justifyContent: 'center',
                borderTopWidth: StyleManager.getSeparatorThickness(this.props.config),
                borderTopColor: StyleManager.getSeparatorColor(this.props.config),
            };
        }
        return {};
    }

    private get flexDirection() {
        return StyleManager.getActionDirection(this.props.config) === 'vertically' ? 'column' : 'row';
    }
}
