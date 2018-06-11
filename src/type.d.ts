import { ComponentClass } from 'react';
import { StyleConfig } from './View/Style/StyleConfig';

interface AdaptiveCardsProps {
    adaptiveCard: any;
    overrideStyle?: StyleConfig;
    onSubmit?: (data: any) => void;
}

declare const AdaptiveCardView: ComponentClass<AdaptiveCardsProps>;
export default AdaptiveCardView;
