import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
}

export class ButtonGroup extends React.Component<IProps> {
    public render() {
        return (
            <View
                flexDirection={this.flexDirection}
                alignSelf='stretch'
                marginTop={StyleManager.actionSetSpacing}
                paddingTop={12}
                justifyContent='center'
                borderTopWidth={StyleManager.separatorThickness}
                borderTopColor={StyleManager.separatorColor}
            >
                {this.props.children}
            </View>
        );
    }

    private get flexDirection() {
        return StyleManager.actionDirection === 'vertically' ? 'column' : 'row';
    }
}
