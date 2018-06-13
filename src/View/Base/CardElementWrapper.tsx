import React from 'react';
import {
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { ActionContext } from '../../Context/ActionContext';
import { InputContext } from '../../Context/InputContext';
import { ContentElement } from '../../Schema/Base/ContentElement';
import {
    Spacing,
} from '../../Shared/Enums';
import { SeparateLine } from '../Base/SeparateLine';
import { StyleConfig } from '../Styles/StyleConfig';
import { styleManager } from '../Styles/StyleManager';

interface IProps {
    cardElement: ContentElement;
    index?: number;
    style?: ViewStyle;
}

interface IState {
}

export class CardElementWrapper extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;

    static defaultProps = {
        index: 0,
    };

    constructor(props: IProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();
        this.onClick = this.onClick.bind(this);
    }

    public render() {
        if (!this.props.cardElement || !this.props.cardElement.isValid()) {
            return null;
        }

        if (this.props.cardElement.supportAction() && this.props.cardElement.getAction() !== undefined) {
            return this.renderActionView();
        }
        return this.renderNonActionView();
    }

    private renderActionView() {
        const isHorizontalLayout = styleManager.isHorizontalCardElement(this.props.cardElement.type);

        if (this.props.cardElement.separator) {
            return (
                <TouchableOpacity
                    style={this.props.style}
                    onPress={this.onClick}
                >
                    {this.renderSeparator(this.props.cardElement.spacing, isHorizontalLayout)}
                    {this.renderWrapper(this.props.cardElement.spacing, 0, isHorizontalLayout, { flex: 1 })}
                </TouchableOpacity>
            );
        } else {
            return this.renderTouchableWrapper(this.props.cardElement.spacing, this.props.index, isHorizontalLayout, this.props.style);
        }
    }

    private renderNonActionView() {
        const isHorizontalLayout = styleManager.isHorizontalCardElement(this.props.cardElement.type);

        if (this.props.cardElement.separator) {
            return (
                <View
                    style={this.props.style}
                >
                    {this.renderSeparator(this.props.cardElement.spacing, isHorizontalLayout)}
                    {this.renderWrapper(this.props.cardElement.spacing, 0, isHorizontalLayout, { flex: 1 })}
                </View>
            );
        } else {
            return this.renderWrapper(this.props.cardElement.spacing, this.props.index, isHorizontalLayout, this.props.style);
        }
    }

    private renderTouchableWrapper(spacing: Spacing, index: number, isHorizontalLayout: boolean, wrapperStyle: ViewStyle): JSX.Element {
        return (
            <TouchableOpacity
                style={[
                    wrapperStyle,
                    styleManager.getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
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
                    styleManager.getCardElementSpacingStyle(spacing, index, isHorizontalLayout)
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
                margin={styleManager.getCardElementMargin(spacing)}
                color={this.styleConfig.element.separateLineColor}
            />
        );
    }

    private onClick() {
        let actionContext = ActionContext.getInstance();
        let callback = actionContext.getActionEventHandler();
        if (callback) {
            const element = this.props.cardElement;
            if (element.supportAction()) {
                let action = element.getAction();
                if (action) {
                    callback(
                        this.props.cardElement,
                        (args) => {
                            args.formData = {
                                ...action.getData(),
                                ...InputContext.getInstance().getFields(this.props.cardElement.getAllInputFieldIds())
                            };
                            return args;
                        }
                    );
                }
            }
        }
    }
}
