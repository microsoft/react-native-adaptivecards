import React from 'react';
import { TouchableOpacity, } from 'react-native';
import { ActionContext } from '../../Context/ActionContext';
import { AdaptiveCardText } from '../Shared/AdaptiveCardText';
import { styleManager } from '../Styles/StyleManager';
export class ActionView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = () => {
            let actionContext = ActionContext.getInstance();
            let callback = actionContext.getActionHandler();
            if (callback) {
                callback(this.props.action);
            }
        };
        this.styleConfig = styleManager.getStyle();
    }
    render() {
        const { action, index } = this.props;
        if (!action || !action.isValid()) {
            return;
        }
        return (React.createElement(TouchableOpacity, { style: [{
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
                }, numberOfLines: 1 }, action.title)));
    }
}
ActionView.defaultProps = {
    index: 0,
};
