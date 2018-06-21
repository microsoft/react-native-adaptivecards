import * as React from 'react';
import { FormElement, FormElementType } from '../../Schema/Base/FormElement';
import { ImageElement } from '../../Schema/CardElements/Image';
import { CardElement } from '../../Schema/Cards/Card';
import { ColumnElement } from '../../Schema/Containers/Column';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { ContainerElement } from '../../Schema/Containers/Container';
import { DecImageView } from '../CardElements/DecImageView';
import { CardView } from '../Cards/CardView';
import { ColumnSetView } from '../Containers/ColumnSetView';
import { ColumnView } from '../Containers/ColumnView';
import { ContainerView } from '../Containers/ContainerView';
import { IFormElementViewProps } from '../Shared/BaseProps';

interface IProps extends IFormElementViewProps<FormElement> {
    containerWidth?: number;
}

export class FormElementView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        if (this.props.element) {
            switch (this.props.element.type) {
                case FormElementType.Image:
                    return (
                        <DecImageView
                            element={this.props.element as ImageElement}
                            index={this.props.index}
                        />
                    );
                case FormElementType.Container:
                    return (
                        <ContainerView
                            element={this.props.element as ContainerElement}
                            index={this.props.index}
                        />
                    );
                case FormElementType.Column:
                    return (
                        <ColumnView
                            element={this.props.element as ColumnElement}
                            containerWidth={this.props.containerWidth}
                            index={this.props.index}
                        />
                    );
                case FormElementType.ColumnSet:
                    return (
                        <ColumnSetView
                            element={this.props.element as ColumnSetElement}
                            index={this.props.index}
                        />
                    );
                case FormElementType.AdaptiveCard:
                    return (
                        <CardView
                            element={this.props.element as CardElement}
                            index={this.props.index}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }
}
