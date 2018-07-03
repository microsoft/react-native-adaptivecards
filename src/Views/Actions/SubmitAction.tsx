import * as React from 'react';

import { Button } from '../../Components/Inputs/Button';
import { ActionContext } from '../../Contexts/ActionContext';
import { SubmitActionElement } from '../../Schema/Actions/SubmitAction';
import { ActionHook } from '../../Shared/Types';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<SubmitActionElement> {
    actionHooks?: ActionHook[];
}

export class SubmitActionView extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { element } = this.props;

        if (!element || !element.isValid()) {
            return null;
        }

        return (
            <Button
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                title={this.props.element.title}
                onPress={this.onPress}
            />
        );
    }

    private onPress = () => {
        console.log('SubmitAction pressed');
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element);
        if (callback) {
            if (this.props.actionHooks) {
                callback(...this.props.actionHooks);
            } else {
                callback();
            }
        }
    }
}
