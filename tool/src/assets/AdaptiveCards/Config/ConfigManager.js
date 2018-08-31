import { HostConfig } from './Types';
export class ConfigManager {
    constructor() { }
    static getInstance() {
        if (ConfigManager.sharedInstance === undefined) {
            ConfigManager.sharedInstance = new ConfigManager();
        }
        return ConfigManager.sharedInstance;
    }
    static loadConfig() {
        try {
            let rawConfig;
            rawConfig = require('./default.json');
            return new HostConfig(rawConfig);
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    }
    static parseConfig(json) {
        return new HostConfig(json);
    }
    getDefaultConfig() {
        if (this.defaultConfig === undefined) {
            this.defaultConfig = ConfigManager.loadConfig();
        }
        return this.defaultConfig;
    }
    getConfig(override) {
        let config = this.getDefaultConfig();
        if (config) {
            return config.combine(override);
        }
        return config;
    }
}
