import React from 'react';
import {
    View,
} from 'react-native';

import StyleConfig from './Style/styleConfig.d';
import styleManager from './Style/styleManager';
import AdaptiveCard from '../Schema/AdaptiveCard';
import AdaptiveCardSingleView from './AdaptiveCardSingleView';

interface IProps {
    adaptiveCard: any;
    overrideStyle?: StyleConfig;
}
interface IState {
    actionCard: AdaptiveCard;
}

export default class AdaptiveCardView extends React.PureComponent<IProps, IState> {
    private styleConfig: StyleConfig;
    private isComponentUnmounted: Boolean;

    constructor(props: IProps) {
        super(props);

        // Apply customized styles
        this.styleConfig = styleManager.addStyle(props.overrideStyle);

        // State initialization
        this.state = {
            actionCard: null,
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
        // Update customized styles
        this.styleConfig = styleManager.addStyle(nextProps.overrideStyle);
    }

    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }

    render(): JSX.Element {
        const { adaptiveCard } = this.props;

        if (!adaptiveCard) {
            // TODO: render error card
            return null;
        }

        return <View style={{ flex: 1 }}>
            <AdaptiveCardSingleView
                adaptiveCard={adaptiveCard}
                onShowCard={this.onShowCard} />
            {
                this.state.actionCard ?
                    <AdaptiveCardSingleView
                        adaptiveCard={this.state.actionCard}
                        style={{
                            marginTop: this.styleConfig.card.spacing,
                        }} />
                    :
                    null
            }
        </View>;
    }

    private onShowCard = (actionCard: AdaptiveCard) => {
        if (!this.isComponentUnmounted) {
            this.setState({
                actionCard,
            });
        }
    }
}
