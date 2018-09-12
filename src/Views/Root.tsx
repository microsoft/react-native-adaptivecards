import React from 'react';
import {
    View,
} from 'react-native';

import { CardContext } from '../Contexts/CardContext';
import { HostContext } from '../Contexts/HostContext';
import { CardModel } from '../Models/Cards/Card';
import { AdaptiveCardView } from './Cards/AdaptiveCard';

export interface IAdaptiveCardProps {
    adaptiveCard: any;
    config?: any;
    style?: any;
    onSubmit?: (data: any) => Promise<any>;
    onOpenUrl?: (url: string) => Promise<any>;
    onCallback?: (url: string, parameters: { [key: string]: string }) => Promise<any>;
    onFocus?: () => void;
    onBlur?: () => void;
    onError?: (error: any) => void;
    onInfo?: (info: any) => void;
    onWarning?: (warning: any) => void;
}

export class CardRootView extends React.Component<IAdaptiveCardProps> {
    public rootCardContext: CardContext;

    // private styleConfig: StyleConfig;
    constructor(props: IAdaptiveCardProps) {
        super(props);

        // Apply customized styles
        // this.styleConfig = StyleManager.getInstance().addStyle(props.overrideStyle);

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

    public shouldComponentUpdate(nextProps: any) {
        if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
            if (JSON.stringify(nextProps.config) !== JSON.stringify(this.props.config)) {
                HostContext.getInstance().applyConfig(nextProps.config);
            }
            return true;
        }
        return false;
    }

    public render() {
        return (
            <View
                style={{ flex: 1 }}
            >
                <AdaptiveCardView
                    index={0}
                    model={new CardModel(this.props.adaptiveCard, undefined, this.rootCardContext)}
                    theme='default'
                    style={this.props.style}
                />
            </View>
        );
    }
}
