import { ConfigManager } from '../Configs/ConfigManager';
import { ActionError } from '../Shared/ActionResult';
export class Host {
    constructor() {
        this.config = ConfigManager.getInstance().getConfig();
    }
    static getInstance() {
        if (Host.sharedInstance === undefined) {
            Host.sharedInstance = new Host();
        }
        return Host.sharedInstance;
    }
    applyConfig(config) {
        const parsedConfig = ConfigManager.parseConfig(config);
        if (this.config) {
            this.config = this.config.combine(parsedConfig);
        }
        else {
            this.config = parsedConfig;
        }
    }
    getConfig() {
        return this.config;
    }
    registerErrorHandler(handler) {
        if (handler) {
            this.errorHandler = handler;
        }
    }
    registerInfoHandler(handler) {
        if (handler) {
            this.infoHandler = handler;
        }
    }
    registerWarningHandler(handler) {
        if (handler) {
            this.warningHandler = handler;
        }
    }
    registerFocusHandler(handler) {
        if (handler) {
            this.focusHandler = handler;
        }
    }
    registerBlurHandler(handler) {
        if (handler) {
            this.blurHandler = handler;
        }
    }
    registerOpenUrlActionHandler(handler) {
        if (handler) {
            this.openUrlActionHandler = handler;
        }
    }
    registerSubmitActionHandler(handler) {
        if (handler) {
            this.submitActionHandler = handler;
        }
    }
    registerCallbackActionHandler(handler) {
        if (handler) {
            this.callbackActionHandler = handler;
        }
    }
    onError(error) {
        if (this.errorHandler) {
            this.errorHandler(error);
        }
    }
    onInfo(info) {
        if (this.infoHandler) {
            this.infoHandler(info);
        }
    }
    onWarning(warning) {
        if (this.warningHandler) {
            this.warningHandler(warning);
        }
    }
    onFocus() {
        if (this.focusHandler) {
            this.focusHandler();
        }
    }
    onBlur() {
        if (this.blurHandler) {
            this.blurHandler();
        }
    }
    onOpenUrlAction(url, method, data) {
        if (this.openUrlActionHandler) {
            return this.openUrlActionHandler(url, method, data);
        }
        return Promise.reject(ActionError.handlerNotFound);
    }
    onSubmitAction(data) {
        if (this.onSubmitAction) {
            return this.submitActionHandler(data);
        }
        return Promise.reject(ActionError.handlerNotFound);
    }
    onCallbackAction(url, parameters) {
        if (this.onCallbackAction) {
            return this.callbackActionHandler(url, parameters);
        }
        return Promise.reject(ActionError.handlerNotFound);
    }
}
