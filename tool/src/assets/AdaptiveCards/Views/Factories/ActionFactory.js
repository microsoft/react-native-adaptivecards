import React from 'react';
import { ActionView } from '../Actions/Action';
export class ActionFactory {
    static createAction(model, index, direction, theme) {
        if (model) {
            return (React.createElement(ActionView, { key: model.type + index, index: index, model: model, direction: direction, theme: theme }));
        }
        return null;
    }
}
