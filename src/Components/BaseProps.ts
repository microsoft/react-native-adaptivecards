export interface IFlexProps {
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    alignContent: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    flex?: number;
    relativeWidth: boolean;
    wrap?: 'wrap' | 'nowrap';
    width: 'auto' | 'stretch' | number;
    height?: number | string;
    vIndex: number;
    hIndex: number;
    vSpace?: number;
    hSpace?: number;
    containerWidth?: number;
    containerHeight?: number;
}
