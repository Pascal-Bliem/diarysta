import React, { useReducer } from "react";
import axios from "axios";
import EntryContext from "./entryContext";
import entryReducer from "./entryReducer";
import {
    GET_ENTRIES,
    ADD_ENTRY,
    DELETE_ENTRY,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ENTRY,
    FILTER_ENTRIES,
    CLEAR_ENTRIES,
    CLEAR_FILTER,
    ENTRY_ERROR
} from "../types";

const EntryState = (props) => {

    const initialState = {
        entries: [],
        current: null,
        filtered: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(entryReducer, initialState);

    // GET_ENTRIES
    const getEntries = async () => {
        try {
            const response = await axios.get("/api/entries");

            dispatch({ type: GET_ENTRIES, payload: response.data });
        } catch (error) {
            console.error(error)
            // dispatch({ type: ENTRY_ERROR, payload: error.response.data.message });
        }
    };

    // ADD_ENTRY
    const addEntry = async (entry) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.post("/api/entries", entry, config);

            dispatch({ type: ADD_ENTRY, payload: response.data });
        } catch (error) {
            console.error(error)
            dispatch({ type: ENTRY_ERROR, payload: error.response.data.message });
        }
    };

    // DELETE_ENTRY
    const deleteEntry = async (_id) => {
        try {
            // eslint-disable-next-line
            const response = await axios.delete(`/api/entries/${_id}`);

            dispatch({ type: DELETE_ENTRY, payload: _id });
        } catch (error) {
            console.error(error)
            dispatch({ type: ENTRY_ERROR, payload: error.response.data.message });
        }
    };

    // SET_CURRENT
    const setCurrent = (entry) => {
        dispatch({ type: SET_CURRENT, payload: entry });
    };

    // CLEAR_CURRENT
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // UPDATE_ENTRY
    const updateEntry = async (entry) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.put(`/api/entries/${entry._id}`, entry, config);

            dispatch({ type: UPDATE_ENTRY, payload: response.data });
        } catch (error) {
            console.error(error)
            dispatch({ type: ENTRY_ERROR, payload: error.response.data.message });
        }
    };

    // CLEAR_ENTRIES
    const clearEntries = () => {
        dispatch({ type: CLEAR_ENTRIES });
    };

    // FILTER_ENTRIES
    const filterEntries = (text) => {
        dispatch({ type: FILTER_ENTRIES, payload: text });
    };

    // CLEAR_FILTER
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (
        <EntryContext.Provider
            value={{
                entries: state.entries,
                current: state.current,
                filtered: state.filtered,
                loading: state.loading,
                error: state.error,
                getEntries,
                addEntry,
                deleteEntry,
                setCurrent,
                clearCurrent,
                updateEntry,
                filterEntries,
                clearEntries,
                clearFilter
            }}
        >{props.children}
        </EntryContext.Provider>
    );
}

export default EntryState;