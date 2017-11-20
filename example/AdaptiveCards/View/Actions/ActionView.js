import React from 'react';
import { TouchableOpacity, Linking, } from 'react-native';
import styleManager from '../Style/styleManager';
import AdaptiveCardText from '../Shared/AdaptiveCardText';
import ActionType from '../../Schema/Actions/ActionType';
export default class ActionView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = () => {
            const { action } = this.props;
            switch (action.type) {
                case ActionType.OpenUrl:
                    this.onOpenUrlAction(action);
                    break;
                case ActionType.ShowCard:
                    this.onShowCardAction(action);
                    break;
                case ActionType.Submit:
                    this.onSubmitAction(action);
                    break;
                default:
                    break;
            }
        };
        this.styleConfig = styleManager.getStyle();
    }
    render() {
        const { action, index } = this.props;
        if (!action || !action.isValid()) {
            return;
        }
        return React.createElement(TouchableOpacity, { style: [{
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
            ], onPress: this.onPress },
            React.createElement(AdaptiveCardText, { style: {
                    fontSize: this.styleConfig.action.button.fontSize,
                    color: this.styleConfig.action.button.textColor,
                }, numberOfLines: 1 }, action.title));
    }
    onOpenUrlAction(action) {
        Linking.canOpenURL(action.url).then((supported) => {
            if (supported) {
                Linking.openURL(action.url);
            }
        });
    }
    onShowCardAction(action) {
        const { onShowCard } = this.props;
        if (typeof onShowCard === 'function') {
            onShowCard(action.card);
        }
    }
    onSubmitAction(action) {
        return;
    }
}
ActionView.defaultProps = {
    index: 0,
};
