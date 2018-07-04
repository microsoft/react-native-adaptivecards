export class ConfigManager {
    constructor() { }
    static getInstance() {
        if (ConfigManager.sharedInstance === undefined) {
            ConfigManager.sharedInstance = new ConfigManager();
        }
        return ConfigManager.sharedInstance;
    }
}
