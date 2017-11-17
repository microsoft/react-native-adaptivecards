import React from 'react';
import { View, } from 'react-native';
import { ContainerStyle, } from '../../Schema/enums';
import styleManager from '../Style/styleManager';
import CardElementWrapper from '../Shared/CardElementWrapper';
import CardElementView from '../Elements/CardElementView';
export default class ContainerView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.styleConfig = styleManager.getStyle();
    }
    render() {
        const { container, index } = this.props;
        if (!container || !container.isValid() || !container.hasItems()) {
            return null;
        }
        return React.createElement(CardElementWrapper, { cardElement: container, index: index, style: {
                flex: 1,
            } },
            React.createElement(View, { style: [{
                        flex: 1,
                    },
                    this.getContainerStyle(container.style)
                ] }, container.items.map((cardElement, index) => React.createElement(CardElementView, { key: 'containerItems' + index, index: index, cardElement: cardElement }))));
    }
    getContainerStyle(style) {
        let containerStyle;
        switch (style) {
            case ContainerStyle.Emphasis:
                containerStyle = {
                    backgroundColor: this.styleConfig.container.backgroundColor,
                };
                break;
            case ContainerStyle.Default:
            default:
                break;
        }
        return containerStyle;
    }
}
