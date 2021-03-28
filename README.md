# DEPRECATION NOTICE

**This package is no longer in development.**

**Please migrate to [adaptivecards-reactnative](https://www.npmjs.com/package/adaptivecards-reactnative)**

============================================


# Introduction

React Native renderer for [AdaptiveCards](http://adaptivecards.io/).

![Sample Screenshot](./screenshot.gif "Sample Screenshot")

Online renderer and debugging tool can be found [here](https://microsoft.github.io/react-native-adaptivecards/)

## Getting Started

### Basic Usage

1. Installation

  ```bash
  $ npm install react-native-adaptivecards
  ```

  or by Yarn

  ```bash
  $ yarn add react-native-adaptivecards
  ```

2. Implementation

- Import to the component where you want to show an AdaptiveCards

```ts
import AdaptiveCard from 'react-native-adaptivecards';
```

- Send initial props

```jsx
    <AdaptiveCard adaptiveCard={} overrideStyle={} />
```

### Properties

| Prop          | Required                                    |  Type     | Description              |
| ------------- | -------------------------------------------:| ---------:| ------------------------:|
| adaptiveCard  | Yes                                         | object    | Json object based on AdaptiveCards schema |
| style         | No                                          | object    | Customized styles        |
| config        | No, default[{...}](./src/Config/Types.ts)   | object    | Customized config        |
| onSubmit      | No                                          | function  | Submit Action            |
| onOpenUrl     | No                                          | function  | OpenUrl Action           |
| onCallback    | No                                          | function  | Callback Action          |
| onFocus       | No                                          | function  | Focus Action             |
| onBlur        | No                                          | function  | Blur Action              |
| onError       | No                                          | function  | Error Action             |
| onInfo        | No                                          | function  | Info Action              |
| onWarning     | No                                          | function  | Warning Action           |

### Examples

```bash
$ cd examples
$ yarn
$ yarn ios
```
