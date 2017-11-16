import React from 'react';
import {
    View,
} from 'react-native';

import Fact from '../../Schema/Containers/Fact';
import FactSet from '../../Schema/Containers/FactSet';
import { ICardElementViewProps } from '../view.d';
import CardElementWrapper from '../Shared/CardElementWrapper';
import FactView from './FactView';

interface IProps extends ICardElementViewProps {
    factSet: FactSet;
}
interface IState {
}

export default class FactSetView extends React.PureComponent<IProps, IState> {
    render(): JSX.Element {
        const { factSet, index } = this.props;

        if (!factSet || !factSet.isValid() || !factSet.hasFacts()) {
            return null;
        }

        return <CardElementWrapper cardElement={factSet} index={index} style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
            }}>
                {
                    factSet.facts.map((fact: Fact, index: number) =>
                        <FactView
                            key={'fact' + index}
                            fact={fact}
                        />
                    )
                }
            </View>
        </CardElementWrapper>;
    }
}
