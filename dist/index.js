var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { View } from 'react-native';
import { safe } from './Components/Shared/Safe';
import { ConfigManager } from './Configs/ConfigManager';
import { CardContext } from './Contexts/CardContext';
import { AdaptiveCardView } from './Views/Cards/AdaptiveCard';
let CardRoot = class CardRoot extends React.Component {
    constructor(props) {
        super(props);
        this.onModelUpdate = () => {
            this.refreshView();
        };
        this.refreshView = () => {
            this.forceUpdate();
        };
        let context = new CardContext(this.props.payload, this.props.config);
        context.updateHandler = this.onModelUpdate;
        context.refreshViewHandler = this.refreshView;
        context.host.registerInfoHandler(this.props.onInfo);
        context.host.registerErrorHandler(this.props.onError);
        context.host.registerWarningHandler(this.props.onWarning);
        context.host.registerFocusHandler(this.props.onFocus);
        context.host.registerBlurHandler(this.props.onBlur);
        context.host.registerOpenUrlActionHandler(this.props.onOpenUrl);
        context.host.registerSubmitActionHandler(this.props.onSubmit);
        context.host.registerCallbackActionHandler(this.props.onCallback);
        this.state = {
            context: context,
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.config) !== JSON.stringify(this.props.config)) {
            this.state.context.updateConfig(ConfigManager.parseConfig(this.props.config));
        }
    }
    render() {
        if (this.state.context && this.state.context.document && this.state.context.document.model) {
            const { context } = this.state;
            return (React.createElement(View, { style: {
                    flexDirection: 'row'
                } },
                React.createElement(AdaptiveCardView, { index: 0, model: context.document.model, context: context, theme: 'default' })));
        }
        return null;
    }
};
CardRoot = __decorate([
    safe
], CardRoot);
export { CardRoot };
