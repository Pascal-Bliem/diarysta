import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import activityConfig from "../../config/activities";
import LocaleContext from "../../context/locale/localeContext";

// a little note here: since this Activities component is reused in
// a couple of similar but distinct components, I get DOM elements 
// by ID by combining an id-prop which is passed down by the parent 
// component with the activity name (`${id}-${activity}`) to ensure
// that the HTML-ids of the DOM elements are unique and activities 
// within the right parent components are updated.
const Activities = ({ id, activities, setActivities }) => {
      const localeContext = useContext(LocaleContext);
      const { locale, translations: t } = localeContext;

      useEffect(() => {
            activities.forEach(activity => {
                  const element = document.getElementById(`${id}-${activity}`);
                  element.classList.add("green", "lighten-2", "white-text");
            })
      }, [activities, id])

      const onActivityClick = (e) => {
            const idActivity = e.target.id;
            let element = document.getElementById(idActivity);
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
                  <div className="row">
                        <label htmlFor="health" className="left">{t.health}</label>
                  </div>
                  <div className="row" id="health">
                        {activityConfig
                              .filter(activity => activity.category === "health")
                              .map(activity => {
                                    return (
                                          <div key={activity.idString} className="chip center" id={`${id}-${activity.idString}`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                                                <i className={activity.icon} style={{ pointerEvents: "none" }}></i> {activity.name[locale]}
                                          </div>
                                    );
                              })
                        }
                  </div>
                  <div className="row">
                        <label htmlFor="hobbies" className="left">{t.hobbies}</label>
                  </div>
                  <div className="row" id="hobbies">
                        {activityConfig
                              .filter(activity => activity.category === "hobbies")
                              .map(activity => {
                                    return (
                                          <div key={activity.idString} className="chip" id={`${id}-${activity.idString}`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                                                <i className={activity.icon} style={{ pointerEvents: "none" }}></i> {activity.name[locale]}
                                          </div>
                                    );
                              })
                        }
                  </div>
                  <div className="row">
                        <label htmlFor="social" className="left">{t.social}</label>
                  </div>
                  <div className="row" id="social">
                        {activityConfig
                              .filter(activity => activity.category === "social")
                              .map(activity => {
                                    return (
                                          <div key={activity.idString} className="chip" id={`${id}-${activity.idString}`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                                                <i className={activity.icon} style={{ pointerEvents: "none" }}></i> {activity.name[locale]}
                                          </div>
                                    );
                              })
                        }
                  </div>
                  <div className="row">
                        <label htmlFor="food" className="left">{t.food}</label>
                  </div>
                  <div className="row" id="food">
                        {activityConfig
                              .filter(activity => activity.category === "food")
                              .map(activity => {
                                    return (
                                          <div key={activity.idString} className="chip" id={`${id}-${activity.idString}`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                                                <i className={activity.icon} style={{ pointerEvents: "none" }}></i> {activity.name[locale]}
                                          </div>
                                    );
                              })
                        }
                  </div>
                  <div className="row">
                        <label htmlFor="chores" className="left">{t.chores}</label>
                  </div>
                  <div className="row" id="chores">
                        {activityConfig
                              .filter(activity => activity.category === "chores")
                              .map(activity => {
                                    return (
                                          <div key={activity.idString} className="chip" id={`${id}-${activity.idString}`} onClick={e => onActivityClick(e)} style={chipsStyle} >
                                                <i className={activity.icon} style={{ pointerEvents: "none" }}></i> {activity.name[locale]}
                                          </div>
                                    );
                              })
                        }
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
