import * as React from 'react';
import { Banner } from '../../Components/Basic/Banner';
import { HostContext } from '../../Contexts/HostContext';
export class DebugOutputFactory {
    static createDebugOutputBanner(info, theme, level) {
        if (HostContext.getInstance().getConfig().mode === 'debug') {
            return (React.createElement(Banner, { title: info, theme: theme, level: level }));
        }
        return undefined;
    }
}
