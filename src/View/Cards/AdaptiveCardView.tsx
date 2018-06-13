import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import { ActionEventHandlerArgs } from 'Context/ActionContext';
import { InputContext } from '../../Context/InputContext';
import { ActionElement, ActionType } from '../../Schema/Base/ActionElement';
import { ContentElement } from '../../Schema/Base/ContentElement';
import { AdaptiveCardElement } from '../../Schema/Cards/AdaptiveCard';
import { ActionView } from '../Actions/ActionView';
import { CardElementView } from '../Base/CardElementView';
import { ImageBackground } from '../Base/ImageBackground';
import { StyleConfig } from '../Styles/StyleConfig';
import { styleManager } from '../Styles/StyleManager';

interface IProps {
    formId: string;
    element: AdaptiveCardElement;
    style?: ViewStyle;
}
interface IState {
}

export class AdaptiveCardView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;
    private element: AdaptiveCardElement;

    constructor(props: IProps) {
        super(props);

        this.submitActionHook = this.submitActionHook.bind(this);

        this.styleConfig = styleManager.getStyle();

        // Serialize given JSON data
        this.element = new AdaptiveCardElement(props.element);
        console.log('AdaptiveCard', this.element);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.element) {
            this.element = new AdaptiveCardElement(nextProps.element);
        }
    }

    render(): JSX.Element {
        if (!this.element.isValid()) {
            // TODO: render error card
            return null;
        }

        const cardStyle: ViewStyle = Object.assign({
            flex: 1,
            backgroundColor: this.styleConfig.card.backgroundColor,
            borderWidth: this.styleConfig.card.borderWidth,
            borderColor: this.styleConfig.card.borderColor,
            borderRadius: this.styleConfig.card.borderRadius,
        }, this.props.style);

        if (this.element.backgroundImage) {
            return (
                <ImageBackground
                    containerStyle={cardStyle}
                    imageStyle={{
                        borderRadius: this.styleConfig.card.borderRadius,
                    }}
                    source={{ uri: this.element.backgroundImage }}
                >
                    <View
                        style={{ flex: 1, padding: this.styleConfig.card.padding }}
                    >
                        {this.renderBody()}
                        {this.renderActions()}
                    </View>
                </ImageBackground>
            );
        } else {
            return (
                <View
                    style={[cardStyle, {
                        padding: this.styleConfig.card.padding,
                    }]}
                >
                    {this.renderBody()}
                    {this.renderActions()}
                </View>
            );
        }
    }

    private renderBody(): JSX.Element {
        if (!this.element.hasBody()) {
            return null;
        }
        return (
            <View
                style={{ flex: 1 }}
            >
                {
                    this.element.body.map((cardElement: ContentElement, index: number) =>
                        <CardElementView
                            key={'body' + index}
                            index={index}
                            element={cardElement}
                        />
                    )
                }
            </View>
        );
    }

    private renderActions(): JSX.Element {
        if (!this.element.hasActions()) {
            return null;
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: styleManager.getActionSetFlexDirectionValue(),
                    alignItems: 'stretch',
                    marginTop: this.styleConfig.action.actionSet.spacing,
                }}
            >
                {
                    this.element.actions.map((action: ActionElement, index: number) =>
                        <ActionView
                            key={index}
                            element={action}
                            index={index}
                            actionHook={this.submitActionHook}
                        />
                    )
                }
            </View>
        );
    }

    private submitActionHook(args: ActionEventHandlerArgs<ActionElement>) {
        if (args.action.type === ActionType.Submit) {
            args.formData = {
                ...args.action.getData(),
                ...InputContext.getInstance().getFields(this.element.getAllInputFieldIds())
            };
        }
        return args;
    }
}
