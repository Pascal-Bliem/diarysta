import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import moodConfig from "../../config/moods";
import LocaleContext from "../../context/locale/localeContext";

// a little note here: since this Mood component is reused in
// a couple of similar but distinct components, I get DOM elements 
// by ID by combining an id-prop which is passed down by the parent 
// component with the mood value (`${id}-${mood}`) to ensure
// that the HTML-ids of the DOM elements are unique and moods 
// within the right parent components are updated.
const Mood = ({ id, mood, setMood }) => {
    const localeContext = useContext(LocaleContext);
    const { translations: t } = localeContext;

    useEffect(() => {
        moodIconReset();
        if (mood !== null) {
            const currMood = document.getElementById(String(`${id}-${mood}`));
            currMood.classList.add("large");
        }
        // eslint-disable-next-line 
    }, [mood])

    // resets all mood icons to medium size
    const moodIconReset = () => {
        const allMoods = document.querySelectorAll(".mood-option");
        [].forEach.call(allMoods, (el) => {
            el.firstChild.classList.add("medium");
            el.firstChild.classList.remove("large");
        });
    }

    const onMoodClick = (e) => {
        const moodEl = e.target;
        moodIconReset();
        moodEl.classList.add("large");
        const mood = moodEl.id.slice((id + "-").length);
        setMood(Number(mood));
    }

    return (
        <Fragment>
            <div className="row">
                <h6 className="left">{t.mood}</h6>
            </div>
            <div className="row center">
                <a href="#!" className="mood-option col s2 push-s1" onClick={e => onMoodClick(e)} >
                    <i id={`${id}-4`} className={`material-icons medium center ${moodConfig["4"].colorClass}`}>{moodConfig["4"].icon}</i>
                </a>
                <a href="#!" className="mood-option col s2 push-s1" onClick={e => onMoodClick(e)} >
                    <i id={`${id}-3`} className={`material-icons medium center ${moodConfig["3"].colorClass}`}>{moodConfig["3"].icon}</i>
                </a>
                <a href="#!" className="mood-option col s2 push-s1" onClick={e => onMoodClick(e)} >
                    <i id={`${id}-2`} className={`material-icons medium center ${moodConfig["2"].colorClass}`}>{moodConfig["2"].icon}</i>
                </a>
                <a href="#!" className="mood-option col s2 push-s1" onClick={e => onMoodClick(e)} >
                    <i id={`${id}-1`} className={`material-icons medium center ${moodConfig["1"].colorClass}`}>{moodConfig["1"].icon}</i>
                </a>
                <a href="#!" className="mood-option col s2 push-s1" onClick={e => onMoodClick(e)} >
                    <i id={`${id}-0`} className={`material-icons medium center ${moodConfig["0"].colorClass}`}>{moodConfig["0"].icon}</i>
                </a>
            </div>
        </Fragment>
    )
}

Mood.propTypes = {
    id: PropTypes.string.isRequired,
    mood: PropTypes.number,
    setMood: PropTypes.func.isRequired,
}

export default Mood;
