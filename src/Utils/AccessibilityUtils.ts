import { AccessibilityInfo, findNodeHandle } from 'react-native';

export class AccessibilityUtils {
    public static focusComponent(component: React.Component) {
        AccessibilityInfo.fetch().then((enabled) => {
            if (enabled) {
                if (component) {
                    console.log('AccessibilityUtils - focusComponent');
                    try {
                        const reactTag = findNodeHandle(component);
                        if (reactTag) {
                            AccessibilityInfo.setAccessibilityFocus(reactTag);
                        }
                    } catch (e) {
                        console.warn('AccessibilityUtils focusComponent error: ' + e);
                    }
                }
            }
        }).catch((error) => {
            console.log('get AccessibilityInfo failed');
        });
    }
}
