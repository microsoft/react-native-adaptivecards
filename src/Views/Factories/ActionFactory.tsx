import React from 'react';

import { OpenUrlActionModel } from '../../Models/Actions/OpenUrlAction';
import { ShowCardActionModel } from '../../Models/Actions/ShowCardAction';
import { SubmitActionModel } from '../../Models/Actions/SubmitAction';
import { ActionView } from '../Actions/Action';

export class ActionFactory {
    // tslint:disable-next-line:max-line-length
    public static createAction(model: OpenUrlActionModel | ShowCardActionModel | SubmitActionModel, index: number, direction: 'row' | 'column', theme: 'default' | 'emphasis'): JSX.Element {
        if (model) {
            return (
                <ActionView
                    key={model.type + index}
                    index={index}
                    model={model}
                    direction={direction}
                    theme={theme}
                />
            );
        }
        return null;
    }
}
