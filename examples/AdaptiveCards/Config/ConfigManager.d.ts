import { HostConfig } from './Types';
export declare class ConfigManager {
    private defaultConfig;
    private static sharedInstance;
    private constructor();
    static getInstance(): ConfigManager;
    static loadConfig(): HostConfig;
    static parseConfig(json: any): HostConfig;
    getDefaultConfig(): HostConfig;
    getConfig(override?: any): HostConfig;
}
