import CardElementType from '../Elements/CardElementType';
import InputText from '../Inputs/InputText';
import InputNumber from '../Inputs/InputNumber';
import InputDate from '../Inputs/InputDate';
import InputTime from '../Inputs/InputTime';
import InputToggle from '../Inputs/InputToggle';
import InputChoiceSet from '../Inputs/InputChoiceSet';

describe('Input components tests', () => {
    it('Test InputText', () => {
        let jsonData = require('./Data/Input/InputText.json');
        let inputText = new InputText(jsonData);

        expect(inputText !== null).toBeTruthy();
        expect(inputText.isValid()).toBeTruthy();

        expect(inputText.type).toEqual(CardElementType.InputText);
        expect(inputText.id).toEqual('input2');
        expect(inputText.isMultiline).toBeTruthy();
        expect(inputText.value).toEqual('test value');
        expect(inputText.maxLength).toEqual(500);
        expect(inputText.placeholder).toEqual('enter comment');
        expect(inputText.separator).toBeTruthy();
        expect(inputText.style).toEqual('test style');
        expect(inputText.spacing).toEqual('middle spacing');
    });

    it('Test InputNumber', () => {
        let jsonData = require('./Data/Input/InputNumber.json');
        let inputNumber = new InputNumber(jsonData);

        expect(inputNumber !== null).toBeTruthy();
        expect(inputNumber.isValid()).toBeTruthy();

        expect(inputNumber.type).toEqual(CardElementType.InputNumber);
        expect(inputNumber.id).toEqual('number');
        expect(inputNumber.max).toEqual(10);
        expect(inputNumber.min).toEqual(1);
        expect(inputNumber.separator).toBeTruthy();
        expect(inputNumber.spacing).toEqual('test spacing');
        expect(inputNumber.placeholder).toEqual('Enter a number');
        expect(inputNumber.value).toEqual(3);
    });

    it('Test InputDate', () => {
        let jsonData = require('./Data/Input/InputDate.json');
        let inputDate = new InputDate(jsonData);

        expect(inputDate !== null).toBeTruthy();
        expect(inputDate.isValid()).toBeTruthy();

        expect(inputDate.type).toEqual(CardElementType.InputDate);
        expect(inputDate.id).toEqual('date');
        expect(inputDate.max).toEqual('2019-12-22T12:00:00');
        expect(inputDate.min).toEqual('2010-12-12T12:00:00');
        expect(inputDate.placeholder).toEqual('Enter a date');
        expect(inputDate.spacing).toEqual('test spacing');
        expect(inputDate.separator).toBeFalsy();
        expect(inputDate.value).toEqual('2015-10-12T12:00:00');
    });

    it('Test InputTime', () => {
        let jsonData = require('./Data/Input/InputTIme.json');
        let inputTime = new InputTime(jsonData);

        expect(inputTime.type).toEqual(CardElementType.InputTime);
        expect(inputTime.id).toEqual('time');
        expect(inputTime.max).toEqual('5:00 PM');
        expect(inputTime.min).toEqual('9:00 AM');
        expect(inputTime.placeholder).toEqual('Enter a time');
        expect(inputTime.spacing).toEqual('test spacing');
        expect(inputTime.separator).toBeFalsy();
        expect(inputTime.value).toEqual('11:00 AM');
    });

    it('Test InputToggle', () => {
        let jsonData = require('./Data/Input/InputToggle.json');
        let inputToggle = new InputToggle(jsonData);

        expect(inputToggle.type).toEqual(CardElementType.InputToggle);
        expect(inputToggle.id).toEqual('acceptTerms');
        expect(inputToggle.title).toEqual('I accept the terms and agreements');
        expect(inputToggle.spacing).toEqual('test spacing');
        expect(inputToggle.separator).toBeFalsy();
        expect(inputToggle.value).toEqual('true');
        expect(inputToggle.valueOff).toEqual('false');
        expect(inputToggle.valueOn).toEqual('true');
    });

    it('Test InputChoiceSet', () => {
        let jsonData = require('./Data/Input/InputChoiceSet.json');
        let inputChoiceSet = new InputChoiceSet(jsonData);

        expect(inputChoiceSet.type).toEqual(CardElementType.InputChoiceSet);
        expect(inputChoiceSet.id).toEqual('myColor');
        expect(inputChoiceSet.isMultiSelect).toBeFalsy();
        expect(inputChoiceSet.style).toEqual('compact');
        expect(inputChoiceSet.choices != null && inputChoiceSet.choices.length === 3).toBeTruthy();

        let choices = inputChoiceSet.choices;
        for (let i = 0; i < choices.length; i++) {
            expect(choices[i].type).toEqual('Input.Choice');
            expect(choices[i].title !== null).toBeTruthy();
            expect(choices[i].value !== null).toBeTruthy();
        }
    });
});
