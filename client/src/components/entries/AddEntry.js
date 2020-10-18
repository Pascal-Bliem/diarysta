import React, { useState, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import Activities from "./Activities";
import Mood from "./Mood";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

// the id prop represents which modal this component actually
// is and will either be "addEntryToday", "addEntryYesterday",
// or "addEntryCalendar". The initialDate prop corresponds to that.
// The (set)calendarDate props are optional and only get passed when
// this component is used from withing the Calendar page.
const AddEntry = ({ id, initialDate, calendarDate, setCalendarDate }) => {
    const localeContext = useContext(LocaleContext);
    const { translations: t } = localeContext;

    const entryContext = useContext(EntryContext);
    const { addEntry } = entryContext;

    // states for the individual constituents of an entry
    const [date, setDate] = useState(calendarDate || initialDate);
    const [mood, setMood] = useState(null);
    const [activities, setActivities] = useState([]);
    const [note, setNote] = useState("");

    // In case this component is used from within the calendar
    // page and the selected date in the calendar is updated,
    // this useEffect() updates the date in the date-input of
    // this component accordingly.
    useEffect(() => {
        const setCalendarDate = () => {
            if (calendarDate) {
                setDate(calendarDate);
            }
        };
        setCalendarDate();
    }, [calendarDate, date]);

    const onDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        if (selectedDate > new Date()) {
            M.toast({ html: t.date_in_future, classes: "red lighten-3" });
        } else {
            if (setCalendarDate) {
                setCalendarDate(selectedDate);
            }
            setDate(selectedDate);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (mood === null) {
            M.toast({ html: t.must_select_mood, classes: "red lighten-3" });
        } else {
            addEntry({
                date,
                mood,
                activities,
                note
            });
        }
    };

    return (
        <div id={id} className="modal center" style={modalStyle}>
            <div className="modal-content">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat" style={{ position: "absolute", right: "10px" }}>
                    <i className="material-icons" >close</i>
                </a>
                <h5 className="">{t.add_entry}</h5>
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <h6 className="left">{t.date}</h6>
                    </div>
                    <div className="row">
                        <input
                            type="date"
                            className=""
                            name="date"
                            // value has to be passed as string in the format "YYYY-MM-DD"
                            value={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`}
                            onChange={e => onDateChange(e)} />
                    </div>
                    <Mood id={id} mood={mood} setMood={setMood} />
                    <Activities id={id} activities={activities} setActivities={setActivities} />
                    <div className="row">
                        <h6 className="left">{t.note}</h6>
                    </div>
                    <div className="row">
                        <textarea type="date" className="materialize-textarea" id="note" onChange={e => setNote(e.target.value)} placeholder={t.add_a_note} />
                    </div>
                    <button
                        type="submit"
                        className="modal-close btn-large waves-effect waves-light green lighten-1"
                        style={{ width: "100%", marginTop: "30px" }}
                    >
                        {t.done}
                    </button>
                </form>
            </div>
        </div>
    )
}

AddEntry.propTypes = {
    id: PropTypes.string.isRequired,
    initialDate: PropTypes.instanceOf(Date).isRequired,
    calendarDate: PropTypes.instanceOf(Date),
    setCalendarDate: PropTypes.func,
}

const modalStyle = {
    width: "70%",
    height: "90%",
}

export default AddEntry;
