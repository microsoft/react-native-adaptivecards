import * as React from 'react';
import { Column } from '../../Abandon/Components/Containers/Column';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';
import { FactView } from './Fact';

interface IProps extends IElementViewProps<FactSetElement> {
}

export class FactSetView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <Column
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='stretch'
                height='auto'
                vSpacing={StyleManager.getInstance().getSpacing(element.spacing)}
            >
                {this.renderFacts()}
            </Column>
        );
    }

    private renderFacts = () => {
        const { element } = this.props;

        if (!element || !element.isValid || !element.facts || element.facts.length === 0) {
            return undefined;
        }

        return element.facts.map((fact, index) => (
            <FactView
                key={index}
                vIndex={0}
                hIndex={index}
                element={fact}
                theme={this.props.theme}
            />
        ));
    }
}
