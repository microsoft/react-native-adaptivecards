import React from 'react';
import {
    Platform,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import { ImageBackground } from '../../Abandon/Components/Basic/ImageBackground';
import { Column } from '../../Abandon/Components/Containers/Column';
import { Row } from '../../Abandon/Components/Containers/Row';
import { ActionContext } from '../../Contexts/ActionContext';
import { ActionElement, ActionType } from '../../Schema/Abstract/ActionElement';
import { ContentElement } from '../../Schema/Abstract/ContentElement';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { CardElement } from '../../Schema/Cards/Card';
import { ActionEventHandlerArgs } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ShowCardStyle } from '../../Styles/Types';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
import { IElementViewProps } from '../Shared/BaseProps';

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

interface IProps extends IElementViewProps<CardElement> {
    style?: ViewStyle;
}

interface IState {
    subCard?: CardElement;
}

export class AdaptiveCardView extends React.Component<IProps, IState> {
    private actionContext: ActionContext;
    private showCardStyle: ShowCardStyle;

    constructor(props: IProps) {
        super(props);

        this.state = {};

        this.actionContext = ActionContext.createInstance();
        this.actionContext.registerHook({ func: this.showSubCard, name: 'showSubCard', actionType: ActionType.ShowCard });
        this.showCardStyle = StyleManager.getInstance().getShowCardStyle();
    }

    public render(): JSX.Element {
        if (!this.props.element || !this.props.element.isValid) {
            // TODO: render error card
            return undefined;
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
        if (!this.props.element.isValid) {
            // TODO: render error card
            return undefined;
        }

        const cardStyle: ViewStyle = {
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 4,
            overflow: 'hidden',
        };

        const backgroundImage = this.props.element.getBackgroundImageUrl();

        if (backgroundImage) {
            return (
                <ImageBackground
                    containerStyle={cardStyle}
                    imageStyle={{
                        borderRadius: 4,
                    }}
                    source={{ uri: backgroundImage }}
                    vIndex={0}
                    hIndex={0}
                >
                    <View
                        style={{ flex: 1, padding: 0, minHeight: 150 }}
                    >
                        {this.renderBody()}
                        {this.renderActions()}
                        {this.renderSubCard()}
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
                        }
                    ]}
                >
                    {this.renderBody()}
                    {this.renderActions()}
                    {this.renderSubCard()}
                </View>
            );
        }
    }

    private renderBody(): JSX.Element {
        if (!this.props.element.body) {
            return null;
        }
        return (
            <Column
                vIndex={0}
                hIndex={0}
                width='stretch'
                height='stretch'
            >
                {
                    this.props.element.body.map((contentElement: ContentElement, index: number) =>
                        ContentFactory.createView(contentElement, index, this.props.theme)
                    )
                }
            </Column>
        );
    }

    private renderActions() {
        if (!this.props.element.actions) {
            return null;
        }

        const hostActionStyle = StyleManager.getInstance().getActionContainerStyle();

        if (hostActionStyle.direction === 'column') {
            return (
                this.props.element.actions.map((action: ActionElement, index: number) => (
                    <Row
                        key={'ActionRow' + index}
                        vIndex={1}
                        hIndex={0}
                        spacing={10}
                        width='stretch'
                        height='auto'
                    >
                        {ActionFactory.createAction(action, 0, 0, this.actionContext)}
                    </Row>
                ))
            );
        } else {
            return (
                <Row
                    vIndex={1}
                    hIndex={0}
                    spacing={10}
                    width='stretch'
                    height='auto'
                >
                    {
                        this.props.element.actions.map((action: ActionElement, index: number) =>
                            ActionFactory.createAction(action, 0, index, this.actionContext)
                        )
                    }
                </Row>
            );
        }
    }

    private renderSubCard(): JSX.Element {
        if (this.state.subCard) {
            return (
                <AdaptiveCardView
                    vIndex={2}
                    hIndex={0}
                    element={this.state.subCard}
                    style={{
                        marginTop: this.showCardStyle.margin,
                    }}
                    theme={this.showCardStyle.theme}
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
