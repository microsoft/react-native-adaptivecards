# react-native-adaptivecards

React Native renderer for [AdaptiveCards](http://adaptivecards.io/).

![Sample Screenshot](./screenshot.gif "Sample Screenshot")

## Compatibility

As we are using react-native@0.57, at this moment, [react-native-web](https://github.com/necolas/react-native-web) could not support react-native@0.57.

## Getting Started

### Installation

* add package

  ```bash
    yarn add react-native-adaptivecards
  ```

* add dependencies
  1. [react-native-svg](https://github.com/react-native-community/react-native-svg).
  1. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons).

### Usage

* Import to the component where you want to show an AdaptiveCards

```ts
import { CardRoot } from 'react-native-adaptivecards';
```

* Send initial props

```tsx
    <CardRoot payload={} config={} />
```

### Properties

| Prop          | default                                     |  Type     | Description              |
| ------------- | -------------------------------------------:| ---------:| ------------------------:|
| payload  | -                                           | object    | Json object based on AdaptiveCards schema. |
| config | [{...}](./src/Configs/default.json)  | object    | Host config used to override the default config.        |

### Develop

```bash
brew install watchman
yarn global add gulp-cli
yarn all
```
