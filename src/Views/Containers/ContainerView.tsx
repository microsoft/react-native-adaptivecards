import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import { ContentElement } from '../../Schema/Base/ContentElement';
import { ContainerElement } from '../../Schema/Containers/Container';
import { ContainerStyle } from '../../Shared/Enums';
import { ContentElementView } from '../Factories/ContentElementView';
import { IElementViewProps } from '../Shared/BaseProps';
import { DecStyleConfig } from '../Styles/DecStyleConfig';
import { DecStyleManager } from '../Styles/DecStyleManager';

interface IProps extends IElementViewProps<ContainerElement> {
}
interface IState {
}

export class ContainerView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: DecStyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = DecStyleManager.getInstance().getStyle();
    }

    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }

        return (
            <View
                style={[{
                    flex: 1,
                },
                this.getContainerStyle(element.style)
                ]}
            >
                {
                    element.items.map((cardElement: ContentElement, index: number) =>
                        <ContentElementView
                            key={'containerItems' + index}
                            index={index}
                            element={cardElement}
                        />
                    )
                }
            </View>
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
