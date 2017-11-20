import React from 'react';
import { View, } from 'react-native';
import styleManager from './Style/styleManager';
import AdaptiveCardSingleView from './AdaptiveCardSingleView';
export default class AdaptiveCardView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onShowCard = (actionCard) => {
            if (!this.isComponentUnmounted) {
                this.setState({
                    actionCard,
                });
            }
        };
        this.styleConfig = styleManager.addStyle(props.overrideStyle);
        this.state = {
            actionCard: null,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.styleConfig = styleManager.addStyle(nextProps.overrideStyle);
    }
    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }
    render() {
        const { adaptiveCard } = this.props;
        if (!adaptiveCard) {
            return null;
        }
        return React.createElement(View, { style: { flex: 1 } },
            React.createElement(AdaptiveCardSingleView, { adaptiveCard: adaptiveCard, onShowCard: this.onShowCard }),
            this.state.actionCard ?
                React.createElement(AdaptiveCardSingleView, { adaptiveCard: this.state.actionCard, style: {
                        marginTop: this.styleConfig.card.spacing,
                    } })
                :
                    null);
    }
}
