import React from 'react';
import { View } from 'react-native';

import { FactElement } from '../../Schema/Containers/Fact';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { CardElementWrapper } from '../Base/CardElementWrapper';
import { ICardElementViewProps } from '../Shared/BaseProps';
import { FactView } from './FactView';

interface IProps extends ICardElementViewProps<FactSetElement> {
    element: FactSetElement;
}
interface IState {
}

export class FactSetView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { element, index } = this.props;

        if (!element || !element.isValid() || !element.hasFacts()) {
            return null;
        }

        return (
            <CardElementWrapper
                cardElement={element}
                index={index}
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    {
                        element.facts.map((fact: FactElement, index: number) =>
                            <FactView
                                key={'fact' + index}
                                element={fact}
                            />
                        )
                    }
                </View>
            </CardElementWrapper>
        );
    }
}
