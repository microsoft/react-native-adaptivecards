import * as React from 'react';
import { FormElement, FormElementType } from '../../Schema/Base/FormElement';
import { ImageElement } from '../../Schema/CardElements/Image';
import { CardElement } from '../../Schema/Cards/Card';
import { ColumnElement } from '../../Schema/Containers/Column';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { ContainerElement } from '../../Schema/Containers/Container';
import { ImageView } from '../CardElements/ImageView';
import { CardView } from '../Cards/CardView';
import { ColumnSetView } from '../Containers/ColumnSetView';
import { ColumnView } from '../Containers/ColumnView';
import { ContainerView } from '../Containers/ContainerView';

export class FormFactory {

    public static createView(element: FormElement, index: number, containerWidth?: number) {
        if (element) {
            switch (element.type) {
                case FormElementType.Image:
                    return (
                        <ImageView
                            key={'ImageView' + index}
                            element={element as ImageElement}
                            index={index}
                        />
                    );
                case FormElementType.Container:
                    return (
                        <ContainerView
                            key={'ContainerView' + index}
                            element={element as ContainerElement}
                            index={index}
                        />
                    );
                case FormElementType.Column:
                    return (
                        <ColumnView
                            key={'ColumnView' + index}
                            element={element as ColumnElement}
                            containerWidth={containerWidth}
                            index={index}
                        />
                    );
                case FormElementType.ColumnSet:
                    return (
                        <ColumnSetView
                            key={'ColumnSetView' + index}
                            element={element as ColumnSetElement}
                            index={index}
                        />
                    );
                case FormElementType.AdaptiveCard:
                    return (
                        <CardView
                            key={'CardView' + index}
                            element={element as CardElement}
                            index={index}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }
}
