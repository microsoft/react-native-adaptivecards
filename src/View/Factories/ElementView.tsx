import * as React from 'react';

import { AbstractElement } from '../../Schema/Base/AbstractElement';
import { ValueElement } from '../../Schema/Base/ValueElement';
import { IElementViewProps } from '../Shared/BaseProps';

import { ContentElement } from '../../Schema/Base/ContentElement';
import { ContentElementView } from './ContentElementView';
import { ValueElementView } from './ValueElementView';

interface IProps extends IElementViewProps<AbstractElement> {

}

export class ElementView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        if (this.props.element) {
            if (this.props.element.isContent()) {
                return (
                    <ContentElementView
                        index={this.props.index}
                        element={this.props.element as ContentElement}
                    />
                );
            } else if (this.props.element.isContent()) {
                return (
                    <ValueElementView
                        index={this.props.index}
                        element={this.props.element as ValueElement}
                    />
                );
            }
        }
        return undefined;
    }
}
