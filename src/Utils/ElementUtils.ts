export class ElementUtils {
    private static inputTypes = ['Input.Text', 'Input.Number', 'Input.Date', 'Input.Time', 'Input.Toggle', 'Input.ChoiceSet'];
    private static valueTypes = ['Fact', 'Input.Choice'];
    public static isInput(type: string) {
        return ElementUtils.inputTypes.indexOf(type) >= 0;
    }

    public static isValue(type: string) {
        return ElementUtils.valueTypes.indexOf(type) >= 0;
    }
}
