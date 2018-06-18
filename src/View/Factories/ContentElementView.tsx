import * as React from 'react';
import { ContentElement, ContentElementType } from '../../Schema/Base/ContentElement';
import { FormElement } from '../../Schema/Base/FormElement';
import { InputElement } from '../../Schema/Base/InputElement';
import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { SeparateLine } from '../Basic/SeparateLine';
import { TextBlockView } from '../CardElements/TextBlockView';
import { FactSetView } from '../Containers/FactSetView';
import { ImageSetView } from '../Containers/ImageSetView';
import { IContentElementViewProps } from '../Shared/BaseProps';
import { StyleManager } from '../Styles/StyleManager';
import { FormElementView } from './FormElementView';
import { InputElementView } from './InputElementView';

interface IProps extends IContentElementViewProps<ContentElement> {

}

export class ContentElementView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return [
            this.renderSeperator(),
            this.renderELement()
        ];
    }

    private renderELement() {
        if (this.props.element) {
            if (this.props.element.isForm()) {
                return (
                    <FormElementView
                        index={this.props.index}
                        element={this.props.element as FormElement}
                    />
                );
            } else if (this.props.element.isInput()) {
                return (
                    <InputElementView
                        index={this.props.index}
                        element={this.props.element as InputElement}
                    />
                );
            } else {
                switch (this.props.element.type) {
                    case ContentElementType.TextBlock:
                        return (
                            <TextBlockView
                                element={this.props.element as TextBlockElement}
                                index={this.props.index} />
                        );
                    case ContentElementType.ImageSet:
                        return (
                            <ImageSetView
                                element={this.props.element as ImageSetElement}
                                index={this.props.index}
                            />
                        );
                    case ContentElementType.FactSet:
                        return (
                            <FactSetView
                                element={this.props.element as FactSetElement}
                                index={this.props.index}
                            />
                        );
                    default:
                        return null;
                }
                return undefined;
            }
        }
        return undefined;
    }

    private renderSeperator() {
        if (this.props.element.separator) {
            return (
                <SeparateLine
                    isHorizontal={StyleManager.getInstance().isHorizontalCardElement(this.props.element.type)}
                    margin={StyleManager.getInstance().getCardElementMargin(this.props.element.spacing)}
                    color={StyleManager.getInstance().getStyle().element.separateLineColor}
                />
            );
        }
    }
}
