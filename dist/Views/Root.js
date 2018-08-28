import React from 'react';
import { View, } from 'react-native';
import { CardContext } from '../Contexts/CardContext';
import { HostContext } from '../Contexts/HostContext';
import { CardModel } from '../Models/Cards/Card';
import { AdaptiveCardView } from './Cards/AdaptiveCard';
export class CardRootView extends React.PureComponent {
    constructor(props) {
        super(props);
        let hostContext = HostContext.getInstance();
        hostContext.applyConfig(this.props.config);
        this.rootCardContext = CardContext.createInstance();
        this.rootCardContext.registerOpenUrlActionHandler(this.props.onOpenUrl);
        this.rootCardContext.registerSubmitActionHandler(this.props.onSubmit);
        this.rootCardContext.registerCallbackActionHandler(this.props.onCallback);
        this.rootCardContext.registerFocusHandler(this.props.onFocus);
        this.rootCardContext.registerBlurHandler(this.props.onBlur);
        this.rootCardContext.registerErrorHandler(this.props.onError);
        this.rootCardContext.registerInfoHandler(this.props.onInfo);
        this.rootCardContext.registerWarningHandler(this.props.onWarning);
    }
    render() {
        return (React.createElement(View, { style: { flex: 1 } },
            React.createElement(AdaptiveCardView, { index: 0, model: new CardModel(this.props.adaptiveCard, undefined, this.rootCardContext), theme: 'default', style: this.props.style })));
    }
}
