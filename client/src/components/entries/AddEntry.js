import React, { useState, useContext } from 'react';
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import Activities from "./Activities";
import Mood from "./Mood";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

// the id prop represents which modal this component actually
// is and will either be "addEntryToday" of "addEntryYesterday";
// the initialDate prop corresponds to that
const AddEntry = ({ id, initialDate }) => {
    const localeContext = useContext(LocaleContext);
    const { translations: t } = localeContext;

    const entryContext = useContext(EntryContext);
    const { addEntry } = entryContext;

    // states for the individual constituents of an entry
    const [date, setDate] = useState(initialDate);
    let formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    const [mood, setMood] = useState(null);
    const [activities, setActivities] = useState([]);
    const [note, setNote] = useState("");

    const onDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        if (selectedDate > new Date()) {
            M.toast({ html: t.date_in_future, classes: "red lighten-3" });
        } else {
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
                        <input type="date" className="" name="date" value={formattedDate} onChange={e => onDateChange(e)} />
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
    initialDate: PropTypes.instanceOf(Date).isRequired
}

const modalStyle = {
    width: "70%",
    height: "90%",
}

export default AddEntry;
