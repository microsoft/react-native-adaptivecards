import React from 'react';
import {
    View,
} from 'react-native';

import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { StyleManager } from '../../Styles/StyleManager';
import { CardText } from '../Basic/CardText';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<TextBlockElement> {
}
interface IState {
}

export class TextBlockView extends React.PureComponent<IProps, IState> {
    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <View style={{
                flex: 1,
            }}>
                <CardText
                    style={[
                        this.buildStyle()
                    ]}
                    numberOfLines={element.maxLines || undefined}
                >
                    {element.text}
                </CardText>
            </View>
        );
    }

    private buildStyle() {
        let styleConfig = StyleManager.getInstance().getStyle(this.props.element);
        return {
            backgroundColor: 'transparent',
            fontSize: styleConfig.fontSize,
            fontWeight: styleConfig.fontWeight,
            color: styleConfig.color,
            textAlign: styleConfig.textAlign,
            flexWrap: styleConfig.wrap,
            marginTop: this.props.index && this.props.index > 0 ? styleConfig.spacing : 0
        };
    }
}
