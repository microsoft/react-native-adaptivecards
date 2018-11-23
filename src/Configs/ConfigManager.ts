import { HostConfig } from './Types';

export class ConfigManager {
    private defaultConfig: HostConfig;

    private static sharedInstance: ConfigManager;

    private constructor() { }

    public static getInstance() {
        if (ConfigManager.sharedInstance === undefined) {
            ConfigManager.sharedInstance = new ConfigManager();
        }
        return ConfigManager.sharedInstance;
    }

    public static loadConfig() {
        try {
            let rawConfig: any;
            rawConfig = require('./default.json');
            return new HostConfig(rawConfig);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public static parseConfig(json: any) {
        return new HostConfig(json);
    }

    public getDefaultConfig() {
        if (this.defaultConfig === undefined) {
            this.defaultConfig = ConfigManager.loadConfig();
        }
        return this.defaultConfig;
    }

    public getConfig(override?: any) {
        let config = this.getDefaultConfig();
        if (config) {
            return config.combine(ConfigManager.parseConfig(override));
        }
        return config;
    }
}
