# react-native-adaptivecards

React Native renderer for [AdaptiveCards](http://adaptivecards.io/).

![Sample Screenshot](./screenshot.gif "Sample Screenshot")

## Compatibility

As we are using react-native@0.57, at this moment, [react-native-web](https://github.com/necolas/react-native-web) could not support react-native@0.57. The web port project in [./tool](./tool) may not run properly.

## Getting Started

### Installation

* add package

  ```bash
    yarn add react-native-adaptivecards
  ```

* link native files
  1. We are using [react-native-svg](https://github.com/react-native-community/react-native-svg) to render SVG. Please follow the its doc to finish setup.

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
yarn run-ios
```

### Examples

```bash
yarn run-ios
yarn run-android
```
