export class ElementUtils {
    static isInput(type) {
        return ElementUtils.inputTypes.indexOf(type) >= 0;
    }
    static isValue(type) {
        return ElementUtils.valueTypes.indexOf(type) >= 0;
    }
    static isSelectActionTarget(type) {
        return ElementUtils.selectActionTargetTypes.indexOf(type) >= 0;
    }
}
ElementUtils.inputTypes = ['Input.Text', 'Input.Number', 'Input.Date', 'Input.Time', 'Input.Toggle', 'Input.ChoiceSet'];
ElementUtils.valueTypes = ['Fact', 'Input.Choice'];
ElementUtils.selectActionTargetTypes = ['Input.PeoplePicker'];
