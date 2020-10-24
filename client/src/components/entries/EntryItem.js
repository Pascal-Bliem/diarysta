import React, { useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import moodConfig from "../../config/moods";
import activityConfig from "../../config/activities";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

const EntryItem = ({ _id, date, mood, activities, note }) => {
    const localeContext = useContext(LocaleContext);
    const { locale, translations: t } = localeContext;

    const entryContext = useContext(EntryContext);
    const { deleteEntry, setCurrent } = entryContext;


    useEffect(() => {
        // initializes Materialize JavaScript
        M.AutoInit();
        //  eslint-ignore-next-line
    }, []);

    const onDeleteClick = () => {
        deleteEntry(_id);
    }

    const onEditClick = () => {
        setCurrent({
            _id,
            date,
            mood,
            activities,
            note
        })
    }

    return (
        <div>
            <div className="row">
                <div className="col s12 m8 l6 push-m2 push-l3">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">
                                <i className={`material-icons medium center ${moodConfig[mood].colorClass}`}>{moodConfig[mood].icon}</i>
                                <span style={{ float: "right" }}>{t[`day_${date.getDay()}`]}{`, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</span>
                            </span>
                            {activities.map((activity, index) => {
                                const { name, icon } = activityConfig.filter(ac => ac.idString === activity)[0];
                                return (
                                    <div key={index} className="chip green lighten-2 white-text">
                                        <i className={icon} style={{ pointerEvents: "none" }}></i> {name[locale]}
                                    </div>
                                )
                            })}
                            <p style={{ wordBreak: "normal", overflow: "auto" }}>{note}</p>
                        </div>
                        <div className="card-action right-align">
                            <a href="#editEntry" data-target="editEntry" className="btn-flat modal-trigger" onClick={onEditClick}><i className="material-icons tiny" style={iconStyle}>edit</i> {t.edit}</a>
                            <a href={`#confirmDelete${_id}`} data-target={`confirmDelete${_id}`} className="btn-flat modal-trigger"><i className="material-icons tiny" style={iconStyle}>delete</i> {t.delete}</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete confirmation modal */}
            <div id={`confirmDelete${_id}`} className="modal center-align">
                <div className="modal-content">
                    <h5>{t.sure_want_delete}</h5>
                </div>
                <a href="#!" onClick={onDeleteClick} className="modal-close waves-effect waves-green btn red lighten-2" style={{ margin: "0 30px", width: "80px" }}>{t.yes}</a>
                <a href="#!" className="modal-close waves-effect waves-green btn green lighten-2" style={{ margin: "0 30px", width: "80px" }}>{t.no}</a>
                <div style={{ paddingBottom: "20px" }} ></div>
            </div>
        </div>
    )
}

EntryItem.propTypes = {
    _id: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    mood: PropTypes.number.isRequired,
    activities: PropTypes.array.isRequired,
    note: PropTypes.string.isRequired,
}

const iconStyle = {
    display: "inline-flex",
    verticalAlign: "top",
};

export default EntryItem;
