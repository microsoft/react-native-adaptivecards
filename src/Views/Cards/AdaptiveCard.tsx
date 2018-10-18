import * as React from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';

import { ButtonGroup } from '../../Components/Containers/ButtonGroup';
import { Card } from '../../Components/Containers/Card';
import { AdaptiveCardNode } from '../../Models/Nodes/Cards/AdaptiveCard';
import { IViewProps } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionView } from '../Actions/Action';
import { Factory as ViewFactory } from '../Factory';

interface IProps extends IViewProps<AdaptiveCardNode> {
    style?: StyleProp<ViewStyle>;
}

interface IState {
    width: number;
}

export class AdaptiveCardView extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            width: 0,
        };
    }

    public render(): JSX.Element {
        const { model, context } = this.props;

        if (model.show) {
            return (
                <Card
                    flex={1}
                    fit='container'
                    backgroundImageUrl={model.backgroundImage}
                    onLayout={this.onLayout}
                    config={context.config}
                    style={[
                        {
                            marginTop: this.marginTop,
                            minHeight: this.minHeight,
                        },
                        this.props.style
                    ]}
                >
                    {this.renderBody()}
                    {this.renderActionSet()}
                </Card>
            );
        }
        return null;
    }

    private renderBody(): JSX.Element {
        const { model, context } = this.props;

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
                        ViewFactory.createView(content, context, index, this.props.theme)
                    )
                }
            </View>
        );
    }

    private renderActionSet(): JSX.Element {
        const { model, context } = this.props;

        if (!model || !model.actions || model.actions.length === 0) {
            return undefined;
        }

        return (
            <ButtonGroup
                hasSpacing={model && model.body && model.body.length > 0}
                config={context.config}
            >
                {this.renderActions()}
            </ButtonGroup>
        );
    }

    private renderActions(): JSX.Element[] {
        const { model, context, theme } = this.props;

        if (!model || !model.actions) {
            return undefined;
        }

        let capacity = StyleManager.getMaxActions(context.config);

        return model.actions.map((action, index) => {
            if (index < capacity) {
                return (
                    <ActionView
                        key={action.type + index}
                        index={index}
                        model={action}
                        context={context}
                        theme={theme}
                        
                    />
                );
            } else {
                return undefined;
            }
        });
    }

    private onLayout = (event: LayoutChangeEvent) => {
        this.setState({
            width: event.nativeEvent.layout.width,
        });
    }

    private get minHeight() {
        const { model, context } = this.props;

        if (model) {
            if (context && context.fit === 'background') {
                // Fix for bing answer card
                let padding = 12;
                if (model.backgroundImage) {
                    padding = 0;
                }
                return (this.state.width - padding * 2) * 150 / 285 + padding * 2;
            }
        }
        return undefined;
    }

    private get marginTop() {
        const { model, context } = this.props;

        if (model && context) {
            if (model.parent) {
                return StyleManager.getSubCardSpacing(context.config);
            }
        }
        return undefined;
    }
}
