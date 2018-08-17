import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ButtonGroup } from '../../Components/Containers/ButtonGroup';
import { Card } from '../../Components/Containers/Card';
import { ActionContext } from '../../Contexts/ActionContext';
import { ActionElement, ActionType } from '../../Schema/Abstract/ActionElement';
import { ContentElement } from '../../Schema/Abstract/ContentElement';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { CardElement } from '../../Schema/Cards/Card';
import { ActionEventHandlerArgs } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    element: CardElement;
    theme: 'default' | 'emphasis';
    style?: StyleProp<ViewStyle>;
}

interface IState {
    subCard?: CardElement;
}

export class AdaptiveCardView extends React.Component<IProps, IState> {
    private actionContext: ActionContext;

    constructor(props: IProps) {
        super(props);

        this.state = {};

        this.actionContext = ActionContext.createInstance();
        this.actionContext.registerHook({ func: this.showSubCard, name: 'showSubCard', actionType: ActionType.ShowCard });

    }

    public render(): JSX.Element {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.type + ' is not valid', theme, 'error');
        }

        return (
            <Card
                flex={1}
                fit='container'
                backgroundImageUrl={element.getBackgroundImageUrl()}
                style={[
                    {
                        minHeight: 150,
                    }, this.props.style
                ]}
            >
                {this.renderBody()}
                {this.renderSubCard()}
                {this.renderActionSet()}
            </Card>
        );
    }

    private renderBody(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid || !element.body) {
            return undefined;
        }

        return (
            <View
                flexDirection='column'
                alignSelf='stretch'
                flex={1}
            >
                {
                    this.props.element.body.map((contentElement: ContentElement, index: number) =>
                        ContentFactory.createView(contentElement, index, this.props.theme)
                    )
                }
            </View>
        );
    }

    private renderActionSet(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid || !element.actions || element.actions.length === 0) {
            return undefined;
        }

        return (
            <ButtonGroup>
                {this.renderActions()}
            </ButtonGroup>
        );
    }

    private renderActions(): JSX.Element[] {
        const { element, theme } = this.props;

        if (!element || !element.isValid || !element.actions) {
            return undefined;
        }

        let capacity = StyleManager.maxActions;

        return element.actions.map((action: ActionElement, index: number) => {
            if (index < capacity) {
                return ActionFactory.createAction(action, index, theme, this.actionContext);
            } else {
                return undefined;
            }
        });
    }

    private renderSubCard(): JSX.Element {
        if (this.state.subCard) {
            return (
                <AdaptiveCardView
                    index={2}
                    element={this.state.subCard}
                    style={{
                        marginTop: StyleManager.subCardSpacing
                    }}
                    theme={StyleManager.subCardTheme}
                />
            );
        }
        return undefined;
    }

    private showSubCard = (args: ActionEventHandlerArgs<ShowCardActionElement>) => {
        console.log('Show Card');
        if (args && args.action && args.action.type === ActionType.ShowCard) {
            if (this.state.subCard !== args.action.card) {
                this.setState({
                    subCard: args.action.card
                });
            } else {
                this.setState({
                    subCard: undefined
                });
            }
        }
        return args;
    }
}
