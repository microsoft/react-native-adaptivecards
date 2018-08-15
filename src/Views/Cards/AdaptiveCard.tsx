import * as React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
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

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 4,
        ...Platform.select({
            ios: {
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'rgba(0, 0, 0, .1)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 3,
                shadowOpacity: .08,
            } as any,
            android: {
                elevation: 2,
            } as any
        }),
    },
}) as any;

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
        const { element } = this.props;
        
        if (!element || !element.isValid) {
            return DebugOutputFactory.createDebugOutputBanner(element.type + '>>' + element.type + ' is not valid', 'error');
        }

        return (
            <View
                style={this.props.style || styles.cardContainer}
            >
                {this.renderCard()}
            </View>
        );
    }

    private renderCard(): JSX.Element {
        const { element, theme } = this.props;

        if (!element || !element.isValid) {
            return undefined;
        }

        const cardStyle: ViewStyle = {
            flex: 1,
            backgroundColor: StyleManager.getBackgroundColor(theme),
            borderRadius: 4,
            overflow: 'hidden',
        };

        const backgroundImage = element.getBackgroundImageUrl();

        if (backgroundImage) {
            return (
                <ImageBackground
                    url={backgroundImage}
                    containerStyle={cardStyle}
                    imageStyle={{borderRadius: 4}}
                >
                    <View
                        style={{ flex: 1, padding: 0, minHeight: 150 }}
                    >
                        {this.renderBody()}
                        {this.renderSubCard()}
                        {this.renderActions()}
                    </View>
                </ImageBackground>
            );
        } else {
            return (
                <View
                    style={[
                        cardStyle,
                        {
                            padding: 12,
                            minHeight: 150
                        }
                    ]}
                >
                    {this.renderBody()}
                    {this.renderSubCard()}
                    {this.renderActionSet()}
                </View>
            );
        }
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
            <View
                flexDirection={StyleManager.actionDirection === 'vertically' ? 'column' : 'row'}
                alignSelf='stretch'
                marginTop={StyleManager.actionSetSpacing}
                justifyContent='center'
                borderTopWidth={0}
                borderTopColor={StyleManager.separatorColor}
            >
                {this.renderActions()}
            </View>
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
