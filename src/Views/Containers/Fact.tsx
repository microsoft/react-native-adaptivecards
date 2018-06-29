import * as React from 'react';

import { TextBlock } from '../../Components/Basic/TextBlock';
import { Row } from '../../Components/Containers/Row';
import { FactElement } from '../../Schema/Containers/Fact';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<FactElement> {

}

export class FactView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <Row
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
            >
                <TextBlock
                    vIndex={0}
                    hIndex={0}
                    width='auto'
                    textStyle={{
                        color: '#333333',
                    }}
                >
                    {element.title}
                </TextBlock>
                <TextBlock
                    vIndex={0}
                    hIndex={1}
                    width='auto'
                    textStyle={{
                        color: '#777777',
                    }}
                >
                    {element.value}
                </TextBlock>
            </Row>
        );
    }
}
