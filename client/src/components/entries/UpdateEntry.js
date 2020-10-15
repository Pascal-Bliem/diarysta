import React, {useState, useContext, useEffect} from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import Activities from "./Activities";
import Mood from "./Mood";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";


const UpdateEntry = () => {
    const localeContext = useContext(LocaleContext);
    const { translations: t } = localeContext;

    const entryContext = useContext(EntryContext);
    const { current, updateEntry, clearCurrent } = entryContext;

    useEffect(() => {
    // set the states of the entry components to those of current
      if (current !== null) {
        set_id(current._id)
        setDate(current.date);
        setMood(current.mood);
        setActivities(current.activities);
        setNote(current.note);
      } else {
        set_id("")
        setDate(new Date());
        setMood(0);
        setActivities([]);
        setNote("");
      }
    }, [entryContext, current]);
 
    // states for the individual constituents 
    const [_id, set_id] = useState("");
    const [date, setDate] = useState(new Date());
    const [mood, setMood] = useState(0);
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
            updateEntry({
                _id,
                date,
                mood,
                activities,
                note
            });
            clearCurrent();
        }
    };

    return (
        <div id="editEntry" className="modal center" style={modalStyle}>
          <div className="modal-content">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat" style={{ position: "absolute", right: "10px" }}>
                <i className="material-icons" >close</i>
            </a>
            <h5 className="">{t.edit_entry}</h5>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <h6 className="left">{t.date}</h6>
                </div>
                <div className="row">
                    <input type="date" className="" name="date" onChange={e => onDateChange(e)} value={`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`}  />
                </div>
                {/* TODO: do for the moods what I already did for the activities,
                set them to the current values and maybe create unique html - IDs */}
                <Mood id="updateEntry" mood={mood} setMood={setMood} />
                <Activities id="updateEntry" activities={activities} setActivities={setActivities} />
                <div className="row">
                    <h6 className="left">{t.note}</h6>
                </div>
                <div className="row">
                    <textarea type="date" className="materialize-textarea" id="note" value={note} onChange={e => setNote(e.target.value)} placeholder={t.add_a_note} />
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

// EditEntry.propTypes = {
//     htmlId: PropTypes.string.isRequired,
//     _id: PropTypes.string.isRequired,
// }

const modalStyle = {
    width: "70%",
    height: "90%",
}

export default UpdateEntry;
