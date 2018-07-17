import * as React from 'react';
import { ImageBackground } from '../../Components/Basic/ImageBackground';
import { SeparateLine } from '../../Components/Basic/SeparateLine';
import { ContentElement, ContentElementType } from '../../Schema/Base/ContentElement';
import { ImageElement } from '../../Schema/CardElements/Image';
import { TextBlockElement } from '../../Schema/CardElements/TextBlock';
import { ColumnSetElement } from '../../Schema/Containers/ColumnSet';
import { ContainerElement } from '../../Schema/Containers/Container';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { ImageSetElement } from '../../Schema/Containers/ImageSet';
import { DateInputElement } from '../../Schema/Inputs/DateInput';
import { NumberInputElement } from '../../Schema/Inputs/NumberInput';
import { TextInputElement } from '../../Schema/Inputs/TextInput';
import { TimeInputElement } from '../../Schema/Inputs/TimeInput';
import { HostConfigManager } from '../../Styles/HostConfig';
import { ImageView } from '../CardElements/Image';
import { TextBlockView } from '../CardElements/TextBlock';
import { ColumnSetView } from '../Containers/ColumnSet';
import { ContainerView } from '../Containers/Container';
import { FactSetView } from '../Containers/FactSet';
import { ImageSetView } from '../Containers/ImageSet';
import { DateInputView } from '../Inputs/DateInput';
import { NumberInputView } from '../Inputs/NumberInput';
import { TextInputView } from '../Inputs/TextInput';
import { TimeInputView } from '../Inputs/TimeInput';

export class ContentFactory {
    public static createView(element: ContentElement, index: number): JSX.Element[] {
        if (element) {
            let elementView = ContentFactory.createElement(element, index);
            if (index > 0 && element.separator) {
                return [
                    <SeparateLine
                        key={'SeparateLine' + index}
                        color='#777777'
                        margin={HostConfigManager.getInstance().getSpacing(element.spacing)}
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
                    containerStyle={{ flex: 1 }}
                    source={{ uri: background }}
                    vIndex={0}
                    hIndex={0}
                >
                    {node}
                </ImageBackground>
            );
        } else {
            return null;
        }
    }

    public static createElement(element: ContentElement, index: number): JSX.Element {
        if (element) {
            switch (element.type) {
                case ContentElementType.TextInput:
                    return (
                        <TextInputView
                            key={'TextInputView' + index}
                            element={element as TextInputElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.NumberInput:
                    return (
                        <NumberInputView
                            key={'NumberInputView' + index}
                            element={element as NumberInputElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.DateInput:
                    return (
                        <DateInputView
                            key={'DateInputView' + index}
                            element={element as DateInputElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.TimeInput:
                    return (
                        <TimeInputView
                            key={'TimeInputView' + index}
                            element={element as TimeInputElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.Container:
                    return (
                        <ContainerView
                            key={'ContainerView' + index}
                            element={element as ContainerElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.ColumnSet:
                    return (
                        <ColumnSetView
                            key={'ColumnSetView' + index}
                            element={element as ColumnSetElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.TextBlock:
                    return (
                        <TextBlockView
                            key={'TextBlockView' + index}
                            element={element as TextBlockElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.Image:
                    return (
                        <ImageView
                            key={'ImageView' + index}
                            element={element as ImageElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.ImageSet:
                    return (
                        <ImageSetView
                            key={'ImageSetView' + index}
                            element={element as ImageSetElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                case ContentElementType.FactSet:
                    return (
                        <FactSetView
                            key={'FactSetView' + index}
                            element={element as FactSetElement}
                            vIndex={index}
                            hIndex={0}
                        />
                    );
                default:
                    return null;
            }
        }
        return null;
    }
}
