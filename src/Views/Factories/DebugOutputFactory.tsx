import * as React from 'react';

import { Banner } from '../../Components/Basic/Banner';
import { HostContext } from '../../Contexts/HostContext';

export class DebugOutputFactory {
    public static createDebugOutputBanner(info: string, theme: 'default' | 'emphasis', level: 'info' | 'warning' | 'error' | 'success') {
        if (HostContext.getInstance().getConfig().mode === 'debug') {
            return (
                <Banner
                    title={info}
                    theme={theme}
                    level={level}
                />
            );
        }
        return undefined;
    }
}
