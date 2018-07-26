import { HostConfig } from './Types';
export class HostConfigManager {
    constructor() { }
    static getInstance() {
        if (HostConfigManager.sharedInstance === undefined) {
            HostConfigManager.sharedInstance = new HostConfigManager();
        }
        return HostConfigManager.sharedInstance;
    }
    static loadConfig() {
        try {
            let rawConfig;
            rawConfig = require('./default_config.json');
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
            this.defaultConfig = HostConfigManager.loadConfig();
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
