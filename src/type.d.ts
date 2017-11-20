import { ComponentClass } from 'react';
import StyleConfig from './View/Style/styleConfig.d';

interface AdaptiveCardsProps {
    adaptiveCard: any;
    overrideStyle?: StyleConfig;
}

declare const AdaptiveCardView: ComponentClass<AdaptiveCardsProps>;
export default AdaptiveCardView;
