import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';

import { ActionContext } from '../../Context/ActionContext';
import { ActionElement } from '../../Schema/Actions/Action';
import { AdaptiveCardText } from '../Shared/AdaptiveCardText';
import { StyleConfig } from '../Styles/StyleConfig';
import { styleManager } from '../Styles/StyleManager';

export interface IActionViewProps {
    action: ActionElement;
    index?: number;
}

interface IState {
}

export class ActionView<T extends ActionElement> extends React.Component<IActionViewProps, IState> {
    private readonly styleConfig: StyleConfig;

    static defaultProps = {
        index: 0,
    };

    constructor(props: IActionViewProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();
    }

    render() {
        const { action, index } = this.props;

        if (!action || !action.isValid()) {
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
                <AdaptiveCardText
                    style={{
                        fontSize: this.styleConfig.action.button.fontSize,
                        color: this.styleConfig.action.button.textColor,
                    }}
                    numberOfLines={1}
                >
                    {action.title}
                </AdaptiveCardText>
            </TouchableOpacity>
        );
    }

    private onPress = () => {
        let actionContext = ActionContext.getInstance();
        let callback = actionContext.getActionHandler();
        if (callback) {
            callback(this.props.action);
        }
    }
}
