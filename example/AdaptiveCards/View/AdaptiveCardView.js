import React from 'react';
import { Linking, View, } from 'react-native';
import { ActionContext } from '../Context/ActionContext';
import { AdaptiveCardSingleView } from './AdaptiveCardSingleView';
import { styleManager } from './Styles/StyleManager';
export class AdaptiveCardView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onOpenUrl = (action) => {
            Linking.canOpenURL(action.url).then((supported) => {
                if (supported) {
                    Linking.openURL(action.url);
                }
            });
        };
        this.onShowCard = (action) => {
            if (!this.isComponentUnmounted) {
                this.setState({
                    actionCard: action.card,
                });
            }
        };
        this.onSubmit = (action) => {
            if (this.props.onSubmit) {
                this.props.onSubmit(action.data);
            }
        };
        this.styleConfig = styleManager.addStyle(props.overrideStyle);
        this.state = {
            actionCard: null,
        };
        let actionContext = ActionContext.getInstance();
        actionContext.registerOpenUrlHandler(this.onOpenUrl);
        actionContext.registerShowCardHandler(this.onShowCard);
        actionContext.registerSubmitHandler(this.onSubmit);
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
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(AdaptiveCardSingleView, { formId: 'root', adaptiveCard: adaptiveCard }),
            this.state.actionCard ?
                React.createElement(AdaptiveCardSingleView, { formId: 'first', adaptiveCard: this.state.actionCard, style: {
                        marginTop: this.styleConfig.card.spacing,
                    } })
                :
                    null));
    }
}
