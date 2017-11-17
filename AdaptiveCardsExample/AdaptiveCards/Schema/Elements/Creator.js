import CardElementType from './CardElementType';
import Image from './Image';
import TextBlock from './TextBlock';
import Column from '../Containers/Column';
import ColumnSet from '../Containers/ColumnSet';
import Container from '../Containers/Container';
import FactSet from '../Containers/FactSet';
import ImageSet from '../Containers/ImageSet';
import InputText from '../Inputs/InputText';
import InputDate from '../Inputs/InputDate';
import InputTime from '../Inputs/InputTime';
export function createCardElement(json) {
    if (!json) {
        return null;
    }
    let cardElement;
    switch (json.type) {
        case CardElementType.Image:
            cardElement = new Image(json);
            break;
        case CardElementType.TextBlock:
            cardElement = new TextBlock(json);
            break;
        case CardElementType.Column:
            cardElement = new Column(json);
            break;
        case CardElementType.ColumnSet:
            cardElement = new ColumnSet(json);
            break;
        case CardElementType.Container:
            cardElement = new Container(json);
            break;
        case CardElementType.FactSet:
            cardElement = new FactSet(json);
            break;
        case CardElementType.ImageSet:
            cardElement = new ImageSet(json);
            break;
        case CardElementType.InputText:
            cardElement = new InputText(json);
            break;
        case CardElementType.InputDate:
            cardElement = new InputDate(json);
            break;
        case CardElementType.InputTime:
            cardElement = new InputTime(json);
            break;
        default:
            cardElement = null;
            break;
    }
    return cardElement;
}
export function createCardElementSet(json) {
    let cardElementSet = [];
    if (json && json.length > 0) {
        json.forEach((item) => {
            let cardElement = createCardElement(item);
            if (cardElement && cardElement.isValidJSON) {
                cardElementSet.push(cardElement);
            }
        });
    }
    return cardElementSet;
}
