import React from 'react';
import {
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { ActionContext } from '../../Context/ActionContext';
import { ContentElement } from '../../Schema/Base/ContentElement';
import {
    Spacing,
} from '../../Shared/Enums';
import { SeparateLine } from '../Basic/SeparateLine';
import { IElementViewProps } from '../Shared/BaseProps';
import { DecStyleConfig } from '../Styles/DecStyleConfig';
import { DecStyleManager } from '../Styles/DecStyleManager';

interface IProps extends IElementViewProps<ContentElement> {
    style?: ViewStyle;
}

interface IState {
}

export class DecCardElementWrapper extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: DecStyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = DecStyleManager.getInstance().getStyle();
        this.onClick = this.onClick.bind(this);
    }

    public render() {
        if (!this.props.element || !this.props.element.isValid()) {
            return null;
        }

        if (this.props.element.isForm() && this.props.element.getAction() !== undefined) {
            return this.renderActionView();
        }
        return this.renderNonActionView();
    }

    private renderActionView() {
        const isHorizontalLayout = DecStyleManager.getInstance().isHorizontalCardElement(this.props.element.type);

        if (this.props.element.separator) {
            return (
                <TouchableOpacity
                    style={this.props.style}
                    onPress={this.onClick}
                >
                    {this.renderSeparator(this.props.element.spacing, isHorizontalLayout)}
                    {this.renderWrapper(this.props.element.spacing, 0, isHorizontalLayout, { flex: 1 })}
                </TouchableOpacity>
            );
        } else {
            return this.renderTouchableWrapper(this.props.element.spacing, this.props.index, isHorizontalLayout, this.props.style);
        }
    }

    private renderNonActionView() {
        const isHorizontalLayout = DecStyleManager.getInstance().isHorizontalCardElement(this.props.element.type);

        if (this.props.element.separator) {
            return (
                <View
                    style={this.props.style}
                >
                    {this.renderSeparator(this.props.element.spacing, isHorizontalLayout)}
                    {this.renderWrapper(this.props.element.spacing, 0, isHorizontalLayout, { flex: 1 })}
                </View>
            );
        } else {
            return this.renderWrapper(this.props.element.spacing, this.props.index, isHorizontalLayout, this.props.style);
        }
    }

    private renderTouchableWrapper(spacing: Spacing, index: number, isHorizontalLayout: boolean, wrapperStyle: ViewStyle): JSX.Element {
        return (
            <TouchableOpacity
                style={[
                    wrapperStyle,
                    DecStyleManager.getInstance().getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
                ]}
                onPress={this.onClick}
            >
                {this.props.children}
            </TouchableOpacity>
        );
    }

    private renderWrapper(spacing: Spacing, index: number, isHorizontalLayout: boolean, wrapperStyle: ViewStyle): JSX.Element {
        return (
            <View
                style={[
                    wrapperStyle,
                    DecStyleManager.getInstance().getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
                ]}
            >
                {this.props.children}
            </View>
        );
    }

    private renderSeparator(spacing: Spacing, isHorizontalLayout: boolean): JSX.Element {
        return (
            <SeparateLine
                isHorizontal={isHorizontalLayout}
                margin={DecStyleManager.getInstance().getCardElementMargin(spacing)}
                color={this.styleConfig.element.separateLineColor}
            />
        );
    }

    private onClick() {
        let actionContext = ActionContext.getGlobalInstance();
        let callback = actionContext.getActionEventHandler(this.props.element.getAction());
        if (callback) {
            const element = this.props.element;
            if (element.isForm()) {
                let action = element.getAction();
                if (action) {
                    callback();
                }
            }
        }
    }
}
