import React, { Component } from 'react'
import {
  Text,
  View,
  I18nManager,
  Picker
} from 'react-native'
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar: () => require("./src/translations/ar.json"),
  en: () => require("./src/translations/en.json"),
  fr: () => require("./src/translations/fr.json")
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const strings = (name, params = {}) => I18n.t(name, params);
export const switchLanguage = (lang, component) => {
  I18n.locale = lang;
  translate.cache.clear();
  component.forceUpdate();
};
// const setI18nConfig = () => {
//   // fallback if no available language fits
//   const fallback = { languageTag: "en", isRTL: false };

//   const { languageTag, isRTL } =
//     RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
//     fallback;

//   // clear translation cache
//   translate.cache.clear();
//   // update layout direction
//   I18nManager.forceRTL(isRTL);
//   // set i18n-js config
//   i18n.translations = { [languageTag]: translationGetters[languageTag]() };
//   i18n.locale = languageTag;
// };

export default class App extends Component {
  constructor(props) {
    super(props)
    // setI18nConfig();

    this.state = {
      choosenIndex: 0
    }
  }


  componentDidMount() {
    // RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    // RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  // handleLocalizationChange = () => {
  //   setI18nConfig();
  //   this.forceUpdate();
  // };

  onChangeLang(itemValue, itemPosition) {
    switchLanguage(itemValue, this);
  }
  render() {
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: "center", alignItems: "center" }}>
        <Picker style={{
          height: 150,
          width: "80%",
          color: '#344953',
          justifyContent: 'center',
        }}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemPosition) => this.onChangeLang(itemValue, itemPosition)}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="France" value="fr" />
          <Picker.Item label="Arabic" value="ar" />
        </Picker>
        <Text> {strings("hello")} </Text>
      </View>
    )
  }
}
