import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import { ContentElement } from '../../Schema/Base/ContentElement';
import { ContainerElement } from '../../Schema/Containers/Container';
import { ContainerStyle } from '../../Shared/Enums';
import { CardElementView } from '../Base/CardElementView';
import { CardElementWrapper } from '../Base/CardElementWrapper';
import { ICardElementViewProps } from '../Shared/BaseProps';
import { StyleConfig } from '../Styles/StyleConfig';
import { styleManager } from '../Styles/StyleManager';

interface IProps extends ICardElementViewProps<ContainerElement> {
}
interface IState {
}

export class ContainerView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();
    }

    render(): JSX.Element {
        const { element, index } = this.props;

        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }

        return (
            <CardElementWrapper
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
                            <CardElementView
                                key={'containerItems' + index}
                                index={index}
                                element={cardElement}
                            />
                        )
                    }
                </View>
            </CardElementWrapper>
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
