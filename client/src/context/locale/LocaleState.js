import React, { useReducer, useEffect } from "react";
import allTranslations from "../../utils/translations";
import LocaleContext from "./localeContext";
import localeReducer from "./localeReducer";
import {
    CHANGE_LOCALE
} from "../types";

const LocaleState = (props) => {

    // get the user locale from local storage or default to English
    if (!localStorage.getItem("diarysta_user_locale")) {
        localStorage.setItem("diarysta_user_locale", "en");
    }

    const initial_locale = localStorage.getItem("diarysta_user_locale");

    const initialState = {
        locale: initial_locale,
        translations: allTranslations[initial_locale]
    }

    const [state, dispatch] = useReducer(localeReducer, initialState);

    // change locale
    const changeLocale = async (newLocale) => {

        // store new user locale in local storage
        localStorage.setItem("diarysta_user_locale", newLocale);

        // dispatch new locale and matching translations to reducer
        dispatch({
            type: CHANGE_LOCALE,
            payload: { locale: newLocale, translations: allTranslations[newLocale] }
        });
    }

    return (
        <LocaleContext.Provider
            value={{
                locale: state.locale,
                translations: state.translations,
                changeLocale
            }}
        >{props.children}
        </LocaleContext.Provider>
    );
}

export default LocaleState;