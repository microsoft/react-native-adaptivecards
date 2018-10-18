import * as React from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';

import { Touchable } from '../../Components/Basic/Touchable';
import { AbstractAction } from '../../Models/Props/Abstract/AbstractAction';
import { IViewProps } from '../../Shared/Types';

interface IProps extends IViewProps<AbstractAction> {
    style: StyleProp<ViewStyle>;
    onLayout?: (event: LayoutChangeEvent) => void;
}

export class SelectActionView extends React.Component<IProps> {
    public render() {
        const { model, children, style } = this.props;

        if (model) {
            return (
                <Touchable
                    disabled={!model.enabled}
                    onPress={this.onPress}
                    onLayout={this.onLayout}
                    style={style}
                >
                    {children}
                </Touchable>
            );
        } else {
            return (
                <View
                    onLayout={this.onLayout}
                    style={style}
                >
                    {children}
                </View>
            );
        }
    }

    private onPress = () => {
        const { model, context } = this.props;

        if (model && context && model.onAction) {
            model.onAction(context);
        }
    }

    private onLayout = (event: LayoutChangeEvent) => {
        if (this.props.onLayout) {
            this.props.onLayout(event);
        }
    }
}
