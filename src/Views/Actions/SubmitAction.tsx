import * as React from 'react';

import { Button } from '../../Abandon/Components/Inputs/Button';
import { ActionContext } from '../../Contexts/ActionContext';
import { SubmitActionElement } from '../../Schema/Actions/SubmitAction';
import { ActionHook } from '../../Shared/Types';
import { StyleManager } from '../../Styles/StyleManager';
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

        if (!element || !element.isValid) {
            return null;
        }

        const hostStyle = StyleManager.getInstance().getActionStyle();

        return (
            <Button
                vIndex={this.props.vIndex}
                hIndex={this.props.hIndex}
                vSpacing={hostStyle.marginTop}
                hSpacing={hostStyle.marginLeft}
                title={this.title}
                onPress={this.onPress}
                color='white'
                backgroundColor='#277BDF'
                borderColor='#277BDF'
                borderRadius={4}
                textAlign='center'
            />
        );
    }

    private onPress = () => {
        let callback = ActionContext.getGlobalInstance().getActionEventHandler(this.props.element);
        if (callback) {
            if (this.props.actionHooks) {
                callback(...this.props.actionHooks);
            } else {
                callback();
            }
        }
    }

    // As lots of the skill team is violate the rule that title is required in all actions,
    // we apply a temp work around in client side to unblock click containers.
    /*****Fix starts here*****/
    private get title() {
        const { element } = this.props;

        if (!element || !element.isValid) {
            return '';
        }

        return this.props.element.title ? this.props.element.title : '';
    }
    /*****Fix ends here*****/
}
