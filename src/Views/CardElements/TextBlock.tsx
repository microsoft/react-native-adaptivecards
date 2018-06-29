import * as React from 'react';

import { TextBlock } from '../../Components/Basic/TextBlock';
import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { StyleConfig, StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<TextBlockElement> {
}

export class TextBlockView extends React.Component<IProps> {
    private styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;
        if (element && element.isValid()) {
            this.styleConfig = StyleManager.getInstance().getStyle(element);
        }
    }

    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <TextBlock
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='stretch'
                boxStyle={[
                    {
                        backgroundColor: 'transparent'
                    }
                ]}
                textStyle={[
                    {
                        backgroundColor: 'transparent',
                        fontSize: this.styleConfig.fontSize,
                        fontWeight: this.styleConfig.fontWeight,
                        color: this.styleConfig.color,
                        textAlign: this.styleConfig.textAlign,
                        flexWrap: this.styleConfig.wrap,
                    }
                ]}
                horizontalAlign={this.styleConfig.inboxTextAlign}
                spacing={this.styleConfig.spacing}
                numberOfLines={element.maxLines}
            >
                {element.text}
            </TextBlock>
        );
    }
}
