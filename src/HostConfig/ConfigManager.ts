export class ConfigManager {
    private static sharedInstance: ConfigManager;

    private constructor() { }

    public static getInstance() {
        if (ConfigManager.sharedInstance === undefined) {
            ConfigManager.sharedInstance = new ConfigManager();
        }
        return ConfigManager.sharedInstance;
    }
}
