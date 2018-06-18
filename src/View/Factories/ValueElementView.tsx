import * as React from 'react';
import { ValueElement, ValueElementType } from '../../Schema/Base/ValueElement';
import { FactElement } from '../../Schema/Containers/Fact';
import { FactView } from '../Containers/FactView';
import { IValueElementViewProps } from '../Shared/BaseProps';

interface IProps extends IValueElementViewProps<ValueElement> {

}

export class ValueElementView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        if (this.props.element) {
            switch (this.props.element.type) {
                case ValueElementType.Fact:
                    return (
                        <FactView
                            element={this.props.element as FactElement}
                            index={this.props.index} />
                    );
                default:
                    return undefined;
            }
        }
        return undefined;
    }
}
