
import i18next from "i18next";
import {initReactI18next} from 'react-i18next';
import {en, bn} from './translations';
const resources = {
en : {
     translation : en,
    },
    bn : {
        translation : bn,
    },
}
i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    debug : false,
    lng: 'en',
    fallbackLng : 'en',
    interpolation: {
    escapeValue: false,
    },
    resources,
})
export default i18next;