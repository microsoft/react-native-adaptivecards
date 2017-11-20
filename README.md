# Introduction

React Native renderer for [AdaptiveCards](http://adaptivecards.io/).

![Sample Screenshot](./screenshot.gif "Sample Screenshot")

## Getting Started

### Basic Usage

1. Installation

  ```bash
  $ npm install git+https://msasg.visualstudio.com/DefaultCollection/Bing_Cortana/_git/react-native-adaptivecards
  ```

  or by Yarn

  ```bash
  $ yarn add git+https://msasg.visualstudio.com/DefaultCollection/Bing_Cortana/_git/react-native-adaptivecards
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
| overrideStyle | [{...}](./src/View/Style/styleConfig.d.ts)  | object    | Customized styles        |

### Examples

```bash
$ cd examples
$ yarn
$ react-native run-ios
```
