import * as React from 'react';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { SeparateLine } from '../../Components/Basic/SeparateLine';
import { ContentElement, ContentElementType } from '../../Schema/Abstract/ContentElement';
import { ImageElement } from '../../Schema/CardElements/Image';
import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { CardElement } from '../../Schema/Cards/Card';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { ContainerElement } from '../../Schema/Containers/Container';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { NumberInputElement } from '../../Schema/Inputs/NumberInput';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { StyleManager } from '../../Styles/StyleManager';
import { ImageView } from '../CardElements/Image';
import { TextBlockView } from '../CardElements/TextBlock';
import { AdaptiveCardView } from '../Cards/AdaptiveCard';
import { ColumnSetView } from '../Containers/ColumnSet';
import { ContainerView } from '../Containers/Container';
import { FactSetView } from '../Containers/FactSet';
import { ImageSetView } from '../Containers/ImageSet';
import { NumberInputView } from '../Inputs/NumberInput';
import { TextInputView } from '../Inputs/TextInput';

export class ContentFactory {
    public static createView(element: ContentElement, index: number, theme: 'default' | 'emphasis'): JSX.Element[] {
        if (element) {
            let elementView = ContentFactory.createElement(element, index, theme);
            if (index > 0 && element.separator) {
                return [
                    <SeparateLine
                        key={'SeparateLine' + index}
                        color={StyleManager.separatorColor}
                        thick={StyleManager.separatorThickness}
                        marginTop={StyleManager.separatorSpacing}
                        marginBottom={StyleManager.separatorSpacing}
                    />,
                    elementView
                ];
            }
            return [elementView];
        }
        return null;
    }

    public static createBackgroundImageView(node: React.ReactNode, background: string): JSX.Element {
        console.log(background);
        if (background) {
            return (
                <ImageBackground
                    url={background}
                    flex={1}
                >
                    {node}
                </ImageBackground>
            );
        } else {
            return null;
        }
    }

    public static createElement(element: ContentElement, index: number, theme: 'default' | 'emphasis'): JSX.Element {
        if (element) {
            switch (element.type) {
                case ContentElementType.AdaptiveCard:
                    return (
                        <AdaptiveCardView 
                            key={'TextBlockView' + index}
                            element={element as CardElement}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentElementType.TextBlock:
                    return (
                        <TextBlockView
                            key={'TextBlockView' + index}
                            element={element as TextBlockElement}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentElementType.Image:
                    return (
                        <ImageView
                            key={'ImageView' + index}
                            element={element as ImageElement}
                            index={index}
                        />
                    );
                case ContentElementType.Container:
                    return (
                        <ContainerView
                            key={'ContainerView' + index}
                            element={element as ContainerElement}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentElementType.ColumnSet:
                    return (
                        <ColumnSetView
                            key={'ColumnSetView' + index}
                            element={element as ColumnSetElement}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentElementType.FactSet:
                    return (
                        <FactSetView
                            key={'FactSetView' + index}
                            element={element as FactSetElement}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentElementType.ImageSet:
                    return (
                        <ImageSetView
                            key={'ImageSetView' + index}
                            element={element as ImageSetElement}
                            index={index}
                        />
                    );
                case ContentElementType.TextInput:
                    return (
                        <TextInputView
                            key={'TextInputView' + index}
                            element={element as TextInputElement}
                            index={index}
                            theme={theme}
                        />
                    );
                case ContentElementType.NumberInput:
                    return (
                        <NumberInputView
                            key={'TextInputView' + index}
                            element={element as NumberInputElement}
                            index={index}
                            theme={theme}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }
}
