import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "AnotherLocation": "Another location",
      "WeatherDetail":'Weather Details',
      "Cloudy":"Cloudy",
      "Humidity":"Humidity",
      "Wind":"Wind",
      "Rain":"Rain"
    }
  },
  vi: {
    translation: {
      "AnotherLocation": "Tìm địa điểm khác",
      "WeatherDetail":'Thông số thời tiết',
      "Cloudy":'Tầm nhìn xa',
      "Humidity":"Độ ẩm",
      "Wind":"Tốc độ gió",
      "Rain":"Lượng mưa"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
export function changeLanguage(lng){
    return i18n.changeLanguage(lng)
}
export default i18n;