import React, { useEffect, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import M from "materialize-css/dist/js/materialize.min.js";
import EntryFilter from "../entries/EntryFilter";
import EntryItem from "../entries/EntryItem";
import AddEntry from "../entries/AddEntry";
import UpdateEntry from "../entries/UpdateEntry";
import AuthContext from "../../context/auth/authContext";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

const Entries = () => {
  const authContext = useContext(AuthContext);
  const { user, loading: authLoading, loadUser } = authContext;

  const localeContext = useContext(LocaleContext);
  const { translations: t } = localeContext;

  const entryContext = useContext(EntryContext);
  const { entries, getEntries, filtered, loading: entryLoading } = entryContext;

  // load user to ensure user is authenticated and get entries
  useEffect(() => {
    loadUser();
    getEntries();
    M.AutoInit();
    // eslint-disable-next-line
  }, [])

  // language and user specific greeting message
  let greeting;
  if (!authLoading && user !== null) {
    greeting = `${t.hello} ${user.name} :)`
  }

  return (
    <div className="private-page">
      <h5 className="center">{greeting}</h5>
      {/* The entry items will be listed here */}
      {entryLoading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) :
        <div>
          <EntryFilter />
          <TransitionGroup>
            {filtered !== null ?
              (filtered.map(entry => {
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
              }))
              : (entries.map(entry => {
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
              }))}
          </TransitionGroup>
        </div>}
      {/* The Add Entry button has to go here */}
      <div className="fixed-action-btn">
        <a href="#addEntryToday"
          className="btn-floating btn-large red waves-effect tooltipped modal-trigger"
          data-position="left"
          data-tooltip={t.today}>
          <i className="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li>
            <a href="/calendar"
              className="btn-floating blue waves-effect tooltipped"
              data-position="left"
              data-tooltip={t.other_day}>
              <i className="material-icons">event</i>
            </a>
          </li>
          <li>
            <a href="#addEntryYesterday"
              className="btn-floating yellow waves-effect tooltipped modal-trigger"
              data-position="left"
              data-tooltip={t.yesterday} >
              <i className="material-icons">keyboard_backspace</i>
            </a>
          </li>
        </ul>
      </div>
      <AddEntry id="addEntryToday" initialDate={new Date()} />
      <AddEntry id="addEntryYesterday" initialDate={(d => new Date(d.setDate(d.getDate() - 1)))(new Date())} />
      <UpdateEntry />
    </div>
  );
};

export default Entries;
