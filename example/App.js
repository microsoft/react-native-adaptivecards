"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var mockData_1 = require("./mockData");
var BingAnswer2_1 = require("./mockData/BingAnswer2");
var AdaptiveCards_1 = require("./AdaptiveCards");
var cardGap = 20;
var cardOverrideStyle = {
    image: {
        imageSize: {
            small: 32,
            medium: 64
        }
    }
};
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return <react_native_1.ScrollView style={{
            marginTop: 24,
            flex: 1
        }} contentContainerStyle={{
            padding: 10,
            backgroundColor: 'whitesmoke'
        }}>
            <AdaptiveCards_1.default adaptiveCard={BingAnswer2_1["default"].heightOfEiffelTower} overrideStyle={cardOverrideStyle}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={BingAnswer2_1["default"].highestMountionInTheWorld} overrideStyle={cardOverrideStyle}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={BingAnswer2_1["default"].latestNews} overrideStyle={cardOverrideStyle}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={BingAnswer2_1["default"].microsoftStock} overrideStyle={cardOverrideStyle}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={BingAnswer2_1["default"].showMeFunnyVideo} overrideStyle={cardOverrideStyle}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={BingAnswer2_1["default"].timeInLondon} overrideStyle={cardOverrideStyle}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={BingAnswer2_1["default"].whatIsTheWeather} overrideStyle={cardOverrideStyle}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].adaptiveUpdate} overrideStyle={cardOverrideStyle}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].peaplePicker}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].emailSent}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].searchEmail}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].readEmail}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].news}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].adaptiveUpdate}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].flightItinerary}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].flightUpdate}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].foodOrder}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].imageGallery}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].inputForm}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].inputs}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].restaurant}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].solitaire}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].sportsGameUpdate}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].stockUpdate}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].weatherCompact}/>
            {this.renderGap()}
            <AdaptiveCards_1.default adaptiveCard={mockData_1["default"].weatherLarge}/>
        </react_native_1.ScrollView>;
    };
    App.prototype.renderGap = function () {
        return <react_native_1.View style={{ height: cardGap }}/>;
    };
    return App;
}(react_1["default"].Component));
exports["default"] = App;
