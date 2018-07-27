import * as React from 'react';

import { TextBlock } from '../../Components/Basic/TextBlock';
import { Row } from '../../Components/Containers/Row';
import { FactElement } from '../../Schema/Containers/Fact';
import { StyleManager } from '../../Styles/StyleManager';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<FactElement> {

}

export class FactView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return null;
        }

        return (
            <Row
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                width='auto'
            >
                <TextBlock
                    vIndex={0}
                    hIndex={0}
                    width='auto'
                    textStyle={{
                        color: StyleManager.getInstance().getColor('default', false, this.props.theme),
                    }}
                >
                    {element.title}
                </TextBlock>
                <TextBlock
                    vIndex={0}
                    hIndex={1}
                    width='auto'
                    textStyle={{
                        color: StyleManager.getInstance().getColor('default', true, this.props.theme),
                    }}
                >
                    {element.value}
                </TextBlock>
            </Row>
        );
    }
}
