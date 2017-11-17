import AdaptiveCard from './index';
import StyleConfig from './View/Style/styleConfig';

declare module 'AdaptiveCardReactNative' {
    export const AdaptiveCardView: JSX.Element;
}

export interface AdaptiveCardStyle extends StyleConfig { }
