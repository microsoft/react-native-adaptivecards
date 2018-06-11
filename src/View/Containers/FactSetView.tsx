import React from 'react';
import { View } from 'react-native';

import { FactElement } from '../../Schema/Containers/Fact';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { ICardElementViewProps } from '../Shared/BaseProps';
import { CardElementWrapper } from '../Shared/CardElementWrapper';
import { FactView } from './FactView';

interface IProps extends ICardElementViewProps {
    factSet: FactSetElement;
}
interface IState {
}

export class FactSetView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { factSet, index } = this.props;

        if (!factSet || !factSet.isValid() || !factSet.hasFacts()) {
            return null;
        }

        return (
            <CardElementWrapper
                cardElement={factSet}
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
                        factSet.facts.map((fact: FactElement, index: number) =>
                            <FactView
                                key={'fact' + index}
                                fact={fact}
                            />
                        )
                    }
                </View>
            </CardElementWrapper>
        );
    }
}
