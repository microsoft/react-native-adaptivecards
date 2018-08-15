import * as React from 'react';

import { Banner } from '../../Components/Basic/Banner';
import { HostContext } from '../../Contexts/HostContext';

export class DebugOutputFactory {
    public static createDebugOutputBanner(info: string, level: 'info' | 'warning' | 'error') {
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

    private static createInfoOutputBanner(info: string) {
        return (
            <Banner
                title={info}
                color='white'
                backgroundColor='#007acc'
            />
        );
    }

    private static createWarningOutputBanner(info: string) {
        return (
            <Banner
                title={info}
                color='white'
                backgroundColor='#eb7b07'

            />
        );
    }

    private static createErrorOutputBanner(info: string) {
        return (
            <Banner
                title={info}
                color='white'
                backgroundColor='#c80000'
            />
        );
    }
}
