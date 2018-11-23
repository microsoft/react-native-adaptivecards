# Introduction

React Native renderer for [AdaptiveCards](http://adaptivecards.io/).

![Sample Screenshot](./screenshot.gif "Sample Screenshot")

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

2. Impementation

- Import to the component where you want to show an AdaptiveCards

```ts
import AdaptiveCard from 'react-native-adaptivecards';
```

- Send initial props

```jsx
    <AdaptiveCard adaptiveCard={} overrideStyle={} />
```

### Properties

| Prop          | default                                     |  Type     | Description              |
| ------------- | -------------------------------------------:| ---------:| ------------------------:|
| adaptiveCard  | -                                           | object    | Json object based on AdaptiveCards schema |
| overrideStyle | [{...}](./src/View/Styles/styleConfig.d.ts)  | object    | Customized styles        |

### Develope

```bash
$ brew install watchman
$ yarn global add gulp-cli
$ yarn all
$ yarn run-ios
```

### Examples

```bash
$ cd examples
$ yarn
$ react-native run-ios
```
