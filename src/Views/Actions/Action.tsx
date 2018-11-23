import * as React from 'react';

import { Button } from '../../Components/Inputs/Button';
import { ViewAction } from '../../Models/Props/Abstract/ViewAction';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps extends IViewProps<ViewAction> {
}

export class ActionView extends React.Component<IProps> {
    public render() {
        const { model, theme, context } = this.props;

        return (
            <Button
                flex={1}
                title={this.title}
                color={StyleManager.getColor('accent', theme, false, context.config)}
                fontSize={StyleManager.getFontSize('default', context.config)}
                fontWeight={StyleManager.getFontWeight('bolder', context.config)}
                backgroundColor={StyleManager.getBackgroundColor(theme, context.config)}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onPress}
                disabled={!model.enabled}
                marginTop={StyleManager.getActionDirection(context.config) === 'vertically' ? this.spacing : 0}
                marginLeft={StyleManager.getActionDirection(context.config) === 'horizontal' ? this.spacing : 0}
                style={{
                    borderLeftWidth: this.leftBorderWidth,
                    borderLeftColor: StyleManager.getSeparatorColor(context.config),
                }}
            />
        );
    }

    private onPress = () => {
        const { model, context } = this.props;

        if (model && context && model.onAction) {
            model.onAction(context);
        }
    }

    private get leftBorderWidth() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return 1;
        }
        return 0;
    }

    private get spacing() {
        if (this.props.index !== undefined && this.props.index > 0) {
            return StyleManager.getActionSpacing(this.props.context.config);
        }
        return 0;
    }

    // As lots of the skill team is violate the rule that title is required in all actions,
    // we apply a temp work around in client side to unblock click containers.
    /*****Fix starts here*****/
    private get title() {
        const { model } = this.props;

        // if (!model || !model.isValid) {
        //     return '';
        // }

        if (!model) {
            return '';
        }

        return model.title ? model.title.toLocaleUpperCase() : '';
    }
    /*****Fix ends here*****/
}
