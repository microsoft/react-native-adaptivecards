import { ComponentClass } from 'react';
import { DecStyleConfig } from './Views/Style/DecStyleConfig';

interface AdaptiveCardsProps {
    adaptiveCard: any;
    overrideStyle?: DecStyleConfig;
    onSubmit?: (data: any) => void;
}

declare const AdaptiveCardView: ComponentClass<AdaptiveCardsProps>;
export default AdaptiveCardView;
