import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';

import { ActionContext, ActionEventHandlerArgs } from '../../Context/ActionContext';
import { ActionElement } from '../../Schema/Base/ActionElement';
import { CardText } from '../Base/CardText';
import { ICardElementViewProps } from '../Shared/BaseProps';
import { StyleConfig } from '../Styles/StyleConfig';
import { styleManager } from '../Styles/StyleManager';

export interface IActionViewProps<T extends ActionElement> extends ICardElementViewProps<T> {
    actionHooks: ((args: ActionEventHandlerArgs<T>) => ActionEventHandlerArgs<T>)[];
}

export class ActionView<T extends ActionElement> extends React.Component<IActionViewProps<T>> {
    private readonly styleConfig: StyleConfig;

    constructor(props: IActionViewProps<T>) {
        super(props);

        this.styleConfig = styleManager.getStyle();
    }

    render() {
        const { element, index } = this.props;

        if (!element || !element.isValid()) {
            return;
        }

        return (
            <TouchableOpacity
                style={[{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: this.styleConfig.action.button.paddingVertical,
                    paddingHorizontal: this.styleConfig.action.button.paddingHorizontal,
                    borderRadius: this.styleConfig.action.button.borderRadius,
                    backgroundColor: this.styleConfig.action.button.backgroundColor,
                },
                styleManager.getActionButtonSpacingStyle(index)
                ]}
                onPress={this.onPress}
            >
                <CardText
                    style={{
                        fontSize: this.styleConfig.action.button.fontSize,
                        color: this.styleConfig.action.button.textColor,
                    }}
                    numberOfLines={1}
                >
                    {element.title}
                </CardText>
            </TouchableOpacity>
        );
    }

    private onPress = () => {
        let actionContext = ActionContext.getInstance();
        let callback = actionContext.getActionEventHandler();
        if (callback) {
            callback(
                this.props.element,
                ...this.props.actionHooks
            );
        }
    }
}
