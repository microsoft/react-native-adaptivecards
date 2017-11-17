import React from 'react';
import {
    TouchableOpacity,
    Linking,
} from 'react-native';

import StyleConfig from '../Style/styleConfig.d';
import styleManager from '../Style/styleManager';
import AdaptiveCardText from '../Shared/AdaptiveCardText';
import AdaptiveCard from '../../Schema/AdaptiveCard';
import Action from '../../Schema/Actions/Action';
import ActionType from '../../Schema/Actions/ActionType';
import ActionOpenUrl from '../../Schema/Actions/ActionOpenUrl';
import ActionShowCard from '../../Schema/Actions/ActionShowCard';
import ActionSubmit from '../../Schema/Actions/ActionSubmit';

interface IProps {
    action: Action;
    index?: number;
    onShowCard?: { (card: AdaptiveCard): void };
}
interface IState {
}

export default class ActionView extends React.Component<IProps, IState> {
    private readonly styleConfig: StyleConfig;

    static defaultProps = {
        index: 0,
    };

    constructor(props: IProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();
    }

    render() {
        const { action, index } = this.props;

        if (!action || !action.isValid()) {
            return;
        }

        return <TouchableOpacity style={[{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: this.styleConfig.action.button.paddingVertical,
            paddingHorizontal: this.styleConfig.action.button.paddingHorizontal,
            borderRadius: this.styleConfig.action.button.borderRadius,
            backgroundColor: this.styleConfig.action.button.backgroundColor,
        },
        styleManager.getActionButtonSpacingStyle(index)
        ]} onPress={this.onPress}>
            <AdaptiveCardText style={{
                fontSize: this.styleConfig.action.button.fontSize,
                color: this.styleConfig.action.button.textColor,
            }} numberOfLines={1} >
                {action.title}
            </AdaptiveCardText>
        </TouchableOpacity>;
    }

    private onPress = () => {
        const { action } = this.props;

        switch (action.type) {
            case ActionType.OpenUrl:
                this.onOpenUrlAction(action as ActionOpenUrl);
                break;
            case ActionType.ShowCard:
                this.onShowCardAction(action as ActionShowCard);
                break;
            case ActionType.Submit:
                this.onSubmitAction(action as ActionSubmit);
                break;
            default:
                break;
        }
    }

    private onOpenUrlAction(action: ActionOpenUrl) {
        // TODO: Is URL valid? Handle failure case
        Linking.canOpenURL(action.url).then((supported) => {
            if (supported) {
                Linking.openURL(action.url);
            }
        });
    }

    private onShowCardAction(action: ActionShowCard) {
        const { onShowCard } = this.props;

        if (typeof onShowCard === 'function') {
            onShowCard(action.card);
        }
    }

    private onSubmitAction(action: ActionSubmit) {
        return;
    }
}
