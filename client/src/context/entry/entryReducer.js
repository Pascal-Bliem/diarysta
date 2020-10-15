import {
    GET_ENTRIES,
    ADD_ENTRY,
    DELETE_ENTRY,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ENTRY,
    // eslint-disable-next-line
    FILTER_ENTRIES,
    CLEAR_ENTRIES,
    // eslint-disable-next-line
    CLEAR_FILTER,
    // eslint-disable-next-line
    ENTRY_ERROR
} from "../types";

const sortByDate = (arr) => {
    return arr.sort((a, b) => {
        const date_a = new Date(a.date);
        const date_b = new Date(b.date);
        if (date_a < date_b) {
            return 1;
        } else if (date_a > date_b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export default (state, action) => {
    switch (action.type) {
        case GET_ENTRIES:
            return {
                ...state,
                entries: sortByDate([...action.payload]),
                loading: false
            }
        case ADD_ENTRY:
            return {
                ...state,
                entries: sortByDate([action.payload, ...state.entries]),
            }
        case DELETE_ENTRY:
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload),
            }
        case UPDATE_ENTRY:
            const entryIndex = state.entries.findIndex(
                entry => entry._id === action.payload._id
            );
            state.entries[entryIndex] = action.payload;
            return {
                ...state,
                entries: sortByDate(state.entries),
            }
        case CLEAR_ENTRIES:
            return {
                ...state,
                entries: [],
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_ENTRIES:
            return {
                ...state,
                filtered: state.entries.filter(entry => {
                    const regex = new RegExp(`${action.payload}`, "gi");
                    return entry.note.match(regex) || (entry.activities.filter(activity => activity.match(regex))).length > 0
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        default:
            return state;
    }
}