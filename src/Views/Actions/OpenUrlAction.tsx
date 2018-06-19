import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';

import { OpenUrlActionElement } from 'Schema/Actions/OpenUrlAction';
import { ActionContext, ActionHook } from '../../Context/ActionContext';
import { CardText } from '../Basic/CardText';
import { IElementViewProps } from '../Shared/BaseProps';
import { DecStyleConfig } from '../Styles/DecStyleConfig';
import { DecStyleManager } from '../Styles/DecStyleManager';

export interface IProps extends IElementViewProps<OpenUrlActionElement> {
    actionHooks?: ActionHook[];
}

export class OpenUrlActionView extends React.Component<IProps> {
    private readonly styleConfig: DecStyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = DecStyleManager.getInstance().getStyle();
    }

    public render() {
        const { element, index } = this.props;

        if (!element || !element.isValid()) {
            return;
        }

        return (
            <TouchableOpacity
                style={[
                    {
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: this.styleConfig.action.button.paddingVertical,
                        paddingHorizontal: this.styleConfig.action.button.paddingHorizontal,
                        borderRadius: this.styleConfig.action.button.borderRadius,
                        backgroundColor: this.styleConfig.action.button.backgroundColor,
                    },
                    DecStyleManager.getInstance().getActionButtonSpacingStyle(index)
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
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element);
        if (callback) {
            if (this.props.actionHooks) {
                callback(...this.props.actionHooks);
            } else {
                callback();
            }
        }
    }
}
