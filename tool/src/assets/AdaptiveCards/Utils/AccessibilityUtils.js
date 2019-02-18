import { AccessibilityInfo, findNodeHandle, NativeModules, Platform } from 'react-native';
export class AccessibilityUtils {
    static focusComponent(component) {
        if (component) {
            console.log('AccessibilityUtils - focusComponent');
            try {
                let reactTag = findNodeHandle(component);
                if (reactTag) {
                    console.log('Send focus event');
                    if (Platform.OS === 'ios') {
                        AccessibilityInfo.setAccessibilityFocus(reactTag);
                    }
                    if (Platform.OS === 'android') {
                        NativeModules.UIManager.sendAccessibilityEvent(reactTag, NativeModules.UIManager.AccessibilityEventTypes.typeViewFocused);
                    }
                }
            }
            catch (e) {
                console.warn('AccessibilityUtils focusComponent error: ' + e);
            }
        }
    }
}
