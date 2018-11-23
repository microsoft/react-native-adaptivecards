import * as React from 'react';
import { View } from 'react-native';

import { safe } from './Components/Shared/Safe';
import { ConfigManager } from './Configs/ConfigManager';
import { CardContext } from './Contexts/CardContext';
import { ActionResult } from './Shared/ActionResult';
import { AdaptiveCardView } from './Views/Cards/AdaptiveCard';

interface IProps {
    payload: any;
    config?: any;
    onError: (error: any) => void;
    onInfo: (info: any) => void;
    onWarning: (warning: any) => void;
    onFocus: () => void;
    onBlur: () => void;
    onOpenUrl: (url: string, method: string, data: { [key: string]: string }) => Promise<ActionResult>;
    onSubmit: (data: any) => Promise<ActionResult>;
    onCallback: (url: string, parameters: { [key: string]: string }) => Promise<ActionResult>;
}

interface IState {
    context: CardContext;
}

@safe
export class CardRoot extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

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

    public componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (JSON.stringify(prevProps.config) !== JSON.stringify(this.props.config)) {
            this.state.context.updateConfig(ConfigManager.parseConfig(this.props.config));
        }
    }

    public render() {
        if (this.state.context && this.state.context.document && this.state.context.document.model) {
            const { context } = this.state;

            return (
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <AdaptiveCardView
                        index={0}
                        model={context.document.model}
                        context={context}
                        theme='default'
                    />
                </View>
            );
        }
        return null;
    }

    private onModelUpdate = () => {
        this.refreshView();
    }

    private refreshView = () => {
        this.forceUpdate();
    }
}
