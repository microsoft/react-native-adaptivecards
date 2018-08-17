import * as React from 'react';

import { Button } from '../../Components/Inputs/Button';
import { ActionContext } from '../../Contexts/ActionContext';
import { ActionElement } from '../../Schema/Abstract/ActionElement';
import { ActionHook } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps<T extends ActionElement> {
    index: number;
    element: T;
    theme: 'default' | 'emphasis';
    actionHooks?: ActionHook[];
}

export class ActionView<T extends ActionElement> extends React.Component<IProps<T>> {
    public render() {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.title + ' is not valid', theme, 'error');
        }

        return (
            <Button
                flex={1}
                title={this.title}
                color={StyleManager.getColor('accent', theme, false)}
                fontSize={StyleManager.getFontSize('default')}
                fontWeight={StyleManager.getFontWeight('bolder')}
                backgroundColor={StyleManager.getBackgroundColor(theme)}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onPress}
                marginTop={StyleManager.actionDirection === 'vertically' ? this.spacing : 0}
                marginLeft={StyleManager.actionDirection === 'horizontal' ? this.spacing : 0}
                style={{
                    borderLeftWidth: this.leftBorderWidth,
                    borderLeftColor: StyleManager.separatorColor,
                }}
            />
        );
    }

    private onPress = () => {
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element);
        if (callback) {
            if (this.props.actionHooks) {
                callback(...this.props.actionHooks);
            } else {
                callback();
            }
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
            return StyleManager.actionSpacing;
        }
        return 0;
    }

    // As lots of the skill team is violate the rule that title is required in all actions,
    // we apply a temp work around in client side to unblock click containers.
    /*****Fix starts here*****/
    private get title() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return '';
        }

        return this.props.element.title ? this.props.element.title.toLocaleUpperCase() : '';
    }
    /*****Fix ends here*****/
}
