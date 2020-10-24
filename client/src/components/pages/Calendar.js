import React, { useEffect, useContext, useState } from "react";
import ReactCalendar from 'react-calendar';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import M from "materialize-css/dist/js/materialize.min.js";
import EntryItem from "../entries/EntryItem";
import AddEntry from "../entries/AddEntry";
import UpdateEntry from "../entries/UpdateEntry";
import AuthContext from "../../context/auth/authContext";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

const Calendar = () => {
  const authContext = useContext(AuthContext);

  const localeContext = useContext(LocaleContext);
  const { locale, translations: t } = localeContext;

  const entryContext = useContext(EntryContext);
  const { entries, getEntries, loading: entryLoading } = entryContext;

  const [selectedDate, setSelectedDate] = useState(new Date());

  // load user to ensure user is authenticated
  // and load the entries
  useEffect(() => {
    authContext.loadUser();
    getEntries();
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  const onDateChange = (date) => {
    setSelectedDate(date);
  }

  return (
    <div className="private-page">
      <div className="row">
        <div className="col s12 m8 l6 push-m2 push-l3">
          <div className="card">
            <div className="card-content center-align">
              <span className="card-title">{t.pick_date}</span>
              <div className="calendar-container" style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
                <ReactCalendar
                  onChange={onDateChange}
                  defaultValue={selectedDate}
                  locale={locale}
                  maxDate={new Date()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The entry items will be listed here */}
      {entryLoading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : <TransitionGroup>{
        (entries
          .filter(entry => {
            const entryDate = new Date(entry.date);
            return (
              entryDate.getDate() === selectedDate.getDate()
              && entryDate.getMonth() === selectedDate.getMonth()
              && entryDate.getFullYear() === selectedDate.getFullYear()
            );
          })
          .map(entry => {
            return (
              <CSSTransition key={entry._id} timeout={500} classNames="entry-item">
                <EntryItem
                  _id={entry._id}
                  date={new Date(entry.date)}
                  mood={entry.mood}
                  activities={entry.activities}
                  note={entry.note} />
              </CSSTransition>
            );
          })
        )}</TransitionGroup>
      }
      {/* Button and modal fpr adding an entry */}
      <div className="fixed-action-btn">
        <a href="#addEntryCalendar"
          className="btn-floating btn-large red waves-effect modal-trigger">
          <i className="large material-icons">mode_edit</i>
        </a>
      </div>
      <AddEntry
        id="addEntryCalendar"
        initialDate={selectedDate}
        calendarDate={selectedDate}
        setCalendarDate={setSelectedDate} />
      <UpdateEntry />
    </div>
  );
};

export default Calendar;
