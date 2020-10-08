import {
    CHANGE_LOCALE
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return {
                ...state,
                locale: action.payload.locale,
                translations: action.payload.translations
            }
        default:
            return state;
    }
}