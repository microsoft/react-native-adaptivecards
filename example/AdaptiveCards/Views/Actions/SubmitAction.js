import React from 'react';
import { TouchableOpacity, } from 'react-native';
import { ActionContext } from '../../Context/ActionContext';
import { CardText } from '../Basic/CardText';
import { DecStyleManager } from '../Styles/DecStyleManager';
export class SubmitActionView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = () => {
            let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element);
            if (callback) {
                if (this.props.actionHooks) {
                    callback(...this.props.actionHooks);
                }
                else {
                    callback();
                }
            }
        };
        this.styleConfig = DecStyleManager.getInstance().getStyle();
    }
    render() {
        const { element, index } = this.props;
        if (!element || !element.isValid()) {
            return;
        }
        return (React.createElement(TouchableOpacity, { style: [
                {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: this.styleConfig.action.button.paddingVertical,
                    paddingHorizontal: this.styleConfig.action.button.paddingHorizontal,
                    borderRadius: this.styleConfig.action.button.borderRadius,
                    backgroundColor: this.styleConfig.action.button.backgroundColor,
                },
                DecStyleManager.getInstance().getActionButtonSpacingStyle(index)
            ], onPress: this.onPress },
            React.createElement(CardText, { style: {
                    fontSize: this.styleConfig.action.button.fontSize,
                    color: this.styleConfig.action.button.textColor,
                }, numberOfLines: 1 }, element.title)));
    }
}
