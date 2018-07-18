import * as React from 'react';

import { TextBlock } from '../../Components/Basic/TextBlock';
import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { StyleManager } from '../../Styles/StyleManager';
import { TextBlockStyle } from '../../Styles/Types';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<TextBlockElement> {
}

export class TextBlockView extends React.Component<IProps> {
    private style: TextBlockStyle;

    constructor(props: IProps) {
        super(props);

        const { element } = this.props;
        if (element && element.isValid) {
            this.style = StyleManager.getInstance().getTextStyle(element, this.props.theme);
        }
    }

    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <TextBlock
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='stretch'
                fontSize={this.style.fontSize}
                fontWeight={this.style.fontWeight}
                color={this.style.color}
                backgroundColor='transparent'
                textAlign={this.style.textAlign}
                wrap={this.style.wrap}
                horizontalAlign={this.style.inboxTextAlign}
                spacing={this.style.spacing}
                numberOfLines={element.maxLines}
            >
                {element.text}
            </TextBlock>
        );
    }
}
