import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import { ContentElement } from '../../Schema/Base/ContentElement';
import { ContainerElement } from '../../Schema/Containers/Container';
import { ContainerStyle } from '../../Shared/Enums';
import { DecCardElementView } from '../Basic/DecCardElementView';
import { DecCardElementWrapper } from '../Basic/DecCardElementWrapper';
import { IElementViewProps } from '../Shared/BaseProps';
import { StyleConfig } from '../Styles/StyleConfig';
import { StyleManager } from '../Styles/StyleManager';

interface IProps extends IElementViewProps<ContainerElement> {
}
interface IState {
}

export class ContainerView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = StyleManager.getInstance().getStyle();
    }

    public render(): JSX.Element {
        const { element, index } = this.props;

        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }

        return (
            <DecCardElementWrapper
                element={element}
                index={index}
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={[{
                        flex: 1,
                    },
                    this.getContainerStyle(element.style)
                    ]}
                >
                    {
                        element.items.map((cardElement: ContentElement, index: number) =>
                            <DecCardElementView
                                key={'containerItems' + index}
                                index={index}
                                element={cardElement}
                            />
                        )
                    }
                </View>
            </DecCardElementWrapper>
        );
    }

    private getContainerStyle(style: ContainerStyle): ViewStyle {
        let containerStyle: ViewStyle;

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
