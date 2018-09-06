import React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';

export class SeparateLine extends React.PureComponent {
    public render() {
        return (
            <View style={{
                backgroundColor: StyleManager.separatorColor,
                height: StyleManager.separatorThickness,
                marginTop: StyleManager.separatorSpacing,
                marginBottom: StyleManager.separatorSpacing,
            }}
            />
        );
    }
}
