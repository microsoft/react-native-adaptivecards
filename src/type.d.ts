import AdaptiveCard from './index';
import StyleConfig from './View/Style/styleConfig';

declare module 'adaptivecardsreactnative' {
    export const AdaptiveCardView: JSX.Element;
}

export interface AdaptiveCardStyle extends StyleConfig { }
