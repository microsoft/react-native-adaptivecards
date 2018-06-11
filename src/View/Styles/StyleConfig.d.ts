interface Map<T> {
    [key: string]: T;
}

/**
 * Card outer container
 */
interface ICard extends Map<string | number> {
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    padding?: number;
    spacing?: number;
}

/**
 * CardElements
 */
interface IElementSpacing extends Map<number> {
    none?: number;
    small?: number;
    default?: number;
    medium?: number;
    large?: number;
    extraLarge?: number;
    padding?: number;
}
interface IElement extends Map<string | IElementSpacing> {
    separateLineColor?: string;
    spacing?: IElementSpacing;
}

/**
 * TextBlock
 */
interface IFontFamily extends Map<string> {
    ios?: string;
    android?: string;
}
interface IFontSize extends Map<number> {
    small?: number;
    default?: number;
    medium?: number;
    large?: number;
    extraLarge?: number;
}
interface IFontWeight extends Map<string> {
    lighter?: string;
    default?: string;
    bolder?: string;
}
interface ITextColor extends Map<string> {
    default?: string;
    dark?: string;
    light?: string;
    accent?: string;
    good?: string;
    warning?: string;
    attention?: string;
}
interface ISubtleTextColor extends Map<string> {
    default?: string;
    dark?: string;
    light?: string;
    accent?: string;
    good?: string;
    warning?: string;
    attention?: string;
}
interface ITextBlock extends Map<IFontFamily | IFontSize | IFontWeight | ITextColor | ISubtleTextColor> {
    fontFamily?: IFontFamily;
    fontSize?: IFontSize;
    fontWeight?: IFontWeight;
    textColor?: ITextColor;
    subtleTextColor?: ISubtleTextColor;
}

/**
 * Image
 */
interface IImageSet extends Map<string> {
    direction?: string;
}
interface IImageSize extends Map<number> {
    small?: number;
    medium?: number;
    large?: number;
}
interface IImage extends Map<IImageSet | IImageSize> {
    imageSet?: IImageSet;
    imageSize?: IImageSize;
}

/**
 * Container
 */
interface IContainer extends Map<string> {
    backgroundColor?: string;
}

/**
 * Fact
 */
interface IFact extends Map<string | number> {
    titleColor?: string;
    valueColor?: string;
    spacing?: number;
}

/**
 * Actions
 */
interface IActionSet extends Map<string | number> {
    direction?: string;
    spacing?: number;
}
interface IActionButton extends Map<string | number> {
    borderRadius?: number;
    backgroundColor?: string;
    spacing?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    textColor?: string;
    fontSize?: number;
}
interface IAction extends Map<IActionSet | IActionButton> {
    actionSet?: IActionSet;
    button?: IActionButton;
}

export interface StyleConfig extends Map<ICard | IElement | ITextBlock | IImage | IContainer | IFact | IAction> {
    card?: ICard;
    element?: IElement;
    textBlock?: ITextBlock;
    image?: IImage;
    container?: IContainer;
    fact?: IFact;
    action?: IAction;
}
