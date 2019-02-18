import { HostConfig } from '../Config/Types';
export declare class HostContext {
    private config;
    private static sharedInstance;
    private constructor();
    static getInstance(): HostContext;
    applyConfig(config: any): void;
    getConfig(): HostConfig;
}
