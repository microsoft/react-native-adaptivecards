import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import { ContentElement } from '../../Schema/Base/ContentElement';
import { ContainerElement } from '../../Schema/Containers/Container';
import { ContainerStyle } from '../../Shared/Enums';
import { ContentFactory } from '../Factories/ContentFactory';
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
                    element.items.map((contentElement: ContentElement, index: number) =>
                        ContentFactory.createView(contentElement, index, false)
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
