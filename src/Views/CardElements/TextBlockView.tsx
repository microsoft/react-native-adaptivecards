import React from 'react';

import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { CardText } from '../Basic/CardText';
import { FlexBox } from '../Basic/FlexBox';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<TextBlockElement> {
}

export class TextBlockView extends React.PureComponent<IProps> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = StyleManager.getInstance().getStyle(this.props.element);
    }

    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <FlexBox
                index={this.props.index}
                size='auto'
                spacing={this.styleConfig.spacing}
                align='auto'
            >
                <CardText
                    style={[
                        this.getStyle()
                    ]}
                    numberOfLines={element.maxLines || undefined}
                >
                    {element.text}
                </CardText>
            </FlexBox>
        );
    }

    private getStyle = () => {
        return {
            backgroundColor: 'transparent',
            fontSize: this.styleConfig.fontSize,
            fontWeight: this.styleConfig.fontWeight,
            color: this.styleConfig.color,
            textAlign: this.styleConfig.textAlign,
            flexWrap: this.styleConfig.wrap,
        };
    }
}
