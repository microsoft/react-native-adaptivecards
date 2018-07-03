import * as React from 'react';

import { Button } from '../../Components/Inputs/Button';
import { ActionContext } from '../../Contexts/ActionContext';
import { ShowCardActionElement } from '../../Schema/Actions/ShowCardAction';
import { ActionHook } from '../../Shared/Types';
import { IElementViewProps } from '../Shared/BaseProps';

interface IProps extends IElementViewProps<ShowCardActionElement> {
    actionHooks?: ActionHook[];
}

export class ShowCardActionView extends React.Component<IProps> {
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
        console.log('ShowCardAction pressed');
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
