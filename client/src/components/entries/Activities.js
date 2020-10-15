import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import LocaleContext from "../../context/locale/localeContext";

// a little note here: since this Activities component is reused in
// a couple of similar but distinct components, I get DOM elements 
// by ID by combining an id-prop which is passed down by the parent 
// component with the activity name (`${id}-${activity}`) to ensure
// that the HTML-ids of the DOM elements are unique and activities 
// within the right parent components are updated.
const Activities = ({ id, activities, setActivities }) => {
      const localeContext = useContext(LocaleContext);
      const { translations: t } = localeContext;

      useEffect(() => {
            activities.forEach(activity => {
                  const element = document.getElementById(`${id}-${activity}`);
                  element.classList.add("green", "lighten-2", "white-text");
            })
      }, [activities, id])

      const onActivityClick = (e) => {
            const idActivity = e.target.id;
            const element = document.getElementById(idActivity);
            //  update appearance
            element.classList.toggle("green");
            element.classList.toggle("lighten-2");
            element.classList.toggle("white-text");
            // extract activity from idActivity
            const activity = idActivity.slice((id + "-").length);
            // update activities array
            activities.includes(activity) ?
                  setActivities(activities.filter(a => a !== activity)) :
                  setActivities([...activities, activity]);
      }

      return (
            <Fragment>
                  <div className="row">
                        <h6 className="left">{t.activities}</h6>
                  </div>
                  <div className="row" id="health">
                        <div className="chip" id={`${id}-meditation`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                              Meditation
                    </div>
                        <div className="chip" id={`${id}-yoga`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                              Yoga
                    </div>
                        <div className="chip" id={`${id}-sports`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                              Sports
                    </div>
                        <div className="chip" id={`${id}-good-sleep`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                              Good Sleep
                    </div>
                  </div>
                  <div className="row">
                        <label htmlFor="health" className="left">Health</label>
                  </div>
                  <div className="row" id="studying">
                        <div className="chip" id={`${id}-language`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                              Language
              </div>
                        <div className="chip" id={`${id}-programming`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                              Programming
              </div>
                        <div className="chip" id={`${id}-music`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                              Music
              </div>
                        <div className="chip" id={`${id}-business`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                              Business
              </div>
                  </div>
                  <div className="row">
                        <label htmlFor="studying" className="left">Studying</label>
                  </div>
            </Fragment>
      )
}

Activities.propTypes = {
      id: PropTypes.string.isRequired,
      activities: PropTypes.array.isRequired,
      setActivities: PropTypes.func.isRequired,
}

const chipsStyle = {
      cursor: "pointer",
      float: "left"
}

export default Activities
