import * as React from 'react';
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native';
import { ButtonGroup } from '../../Components/Containers/ButtonGroup';
import { Card } from '../../Components/Containers/Card';
import { CardModel } from '../../Models/Cards/Card';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';

interface IProps {
    index: number;
    model: CardModel;
    theme: 'default' | 'emphasis';
    style?: StyleProp<ViewStyle>;
}

interface IState {
    subCard?: CardModel;
}

export class AdaptiveCardView extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {};
        this.props.model.context.registerShowCardActionHandler(this.showSubCard);
    }

    public render(): JSX.Element {
        const { model } = this.props;

        // if (!model || !model.isValid) {
        //     return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.type + ' is not valid', theme, 'error');
        // }

        return (
            <Card
                flex={1}
                fit='container'
                backgroundImageUrl={model.backgroundImage}
                style={[ 
                    {
                        minHeight: this.minHeight,
                    },
                    this.props.style
                ]}
            >
                {this.renderBody()}
                {this.renderSubCard()}
                {this.renderActionSet()}
            </Card>
        );
    }

    private renderBody(): JSX.Element {
        const { model } = this.props;

        if (!model || !model.body) {
            return undefined;
        }

        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignSelf: 'stretch',
                    flex: 1
                }}
            >
                {
                    this.props.model.body.map((content, index) =>
                        ContentFactory.createView(content, index, this.props.theme)
                    )
                }
            </View>
        );
    }

    private renderActionSet(): JSX.Element {
        const { model } = this.props;

        if (!model || !model.actions || model.actions.length === 0) {
            return undefined;
        }

        return (
            <ButtonGroup>
                {this.renderActions()}
            </ButtonGroup>
        );
    }

    private renderActions(): JSX.Element[] {
        const { model, theme } = this.props;

        if (!model || !model.actions) {
            return undefined;
        }

        let capacity = StyleManager.maxActions;

        return model.actions.map((action, index) => {
            if (index < capacity) {
                return ActionFactory.createAction(action, index, theme);
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
                    model={this.state.subCard}
                    style={{
                        marginTop: StyleManager.subCardSpacing
                    }}
                    theme={StyleManager.subCardTheme}
                />
            );
        }
        return undefined;
    }

    private showSubCard = (card: CardModel) => {
        console.log('Show Card');
        if (card) {
            this.setState({
                subCard: card
            });
        }
        return Promise.resolve(true);
    }

    private get minHeight() {
        const { model } = this.props;

        if (model) {
            if (model.context && model.context.fit === 'background') {
                // Fix for bing answer card
                let padding = 12;
                if (model.backgroundImage) {
                    padding = 0;
                }
                return Dimensions.get('window').width * (150 + padding * 2) / (285 + padding * 2);
            }
        }
        return undefined;
    }
}
