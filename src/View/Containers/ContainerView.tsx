import React from 'react';
import {
    View,
    ViewStyle,
} from 'react-native';

import {
    ContainerStyle,
} from '../../Schema/enums';
import StyleConfig from '../Style/styleConfig.d';
import styleManager from '../Style/styleManager';
import CardElement from '../../Schema/Elements/CardElement';
import Container from '../../Schema/Containers/Container';
import { ICardElementViewProps } from '../view.d';
import CardElementWrapper from '../Shared/CardElementWrapper';
import CardElementView from '../Elements/CardElementView';

interface IProps extends ICardElementViewProps {
    container: Container;
}
interface IState {
}

export default class ContainerView extends React.PureComponent<IProps, IState> {
    private readonly styleConfig: StyleConfig;

    constructor(props: IProps) {
        super(props);

        this.styleConfig = styleManager.getStyle();
    }

    render(): JSX.Element {
        const { container, index } = this.props;

        if (!container || !container.isValid() || !container.hasItems()) {
            return null;
        }

        return <CardElementWrapper cardElement={container} index={index} style={{
            flex: 1,
        }}>
            <View style={[{
                flex: 1,
            },
            this.getContainerStyle(container.style)
            ]}>
                {
                    container.items.map((cardElement: CardElement, index: number) =>
                        <CardElementView
                            key={'containerItems' + index}
                            index={index}
                            cardElement={cardElement}
                        />
                    )
                }
            </View>
        </CardElementWrapper>;
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
