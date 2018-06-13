import React from 'react';
import { Linking, View, } from 'react-native';
import { ActionContext } from '../Context/ActionContext';
import { AdaptiveCardElementView } from './Cards/AdaptiveCardElementView';
import { styleManager } from './Styles/StyleManager';
export class AdaptiveCardView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onOpenUrl = (args) => {
            Linking.canOpenURL(args.action.url).then((supported) => {
                if (supported) {
                    Linking.openURL(args.action.url);
                }
            });
        };
        this.onShowCard = (args) => {
            if (!this.isComponentUnmounted) {
                this.setState({
                    actionCard: args.action.card,
                });
            }
        };
        this.onSubmit = (args) => {
            if (this.props.onSubmit) {
                this.props.onSubmit(args.formData);
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
            React.createElement(AdaptiveCardElementView, { formId: 'root', element: adaptiveCard }),
            this.state.actionCard ?
                React.createElement(AdaptiveCardElementView, { formId: 'first', element: this.state.actionCard, style: {
                        marginTop: this.styleConfig.card.spacing,
                    } })
                :
                    null));
    }
}
