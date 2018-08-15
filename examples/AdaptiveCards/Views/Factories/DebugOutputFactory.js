import * as React from 'react';
import { Banner } from '../../Components/Basic/Banner';
import { HostContext } from '../../Contexts/HostContext';
export class DebugOutputFactory {
    static createDebugOutputBanner(info, level) {
        if (HostContext.getInstance().getConfig().mode === 'debug') {
            switch (level) {
                case 'info':
                    return DebugOutputFactory.createInfoOutputBanner(info);
                case 'warning':
                    return DebugOutputFactory.createWarningOutputBanner(info);
                case 'error':
                    return DebugOutputFactory.createErrorOutputBanner(info);
                default:
                    return DebugOutputFactory.createInfoOutputBanner(info);
            }
        }
        return undefined;
    }
    static createInfoOutputBanner(info) {
        return (React.createElement(Banner, { title: info, color: 'white', backgroundColor: '#007acc' }));
    }
    static createWarningOutputBanner(info) {
        return (React.createElement(Banner, { title: info, color: 'white', backgroundColor: '#eb7b07' }));
    }
    static createErrorOutputBanner(info) {
        return (React.createElement(Banner, { title: info, color: 'white', backgroundColor: '#c80000' }));
    }
}
