import React, { useEffect, useContext } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import AuthContext from "../../context/auth/authContext";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";
import DaysInRow from "../stats/DaysInRow";
import MoodChart from "../stats/MoodChart";
import AverageDailyMood from "../stats/AverageDailyMood";
import MoodCount from "../stats/MoodCount";


const Stats = () => {
  const authContext = useContext(AuthContext);

  const localeContext = useContext(LocaleContext);
  const { translations: t } = localeContext;

  const entryContext = useContext(EntryContext);
  const { getEntries, loading: entryLoading } = entryContext;

  // load user to ensure user is authenticated
  // and get user entries
  useEffect(() => {
    authContext.loadUser();
    getEntries();
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="private-page">
      <h5 className="center" >{t.diary_stats}</h5>
      {entryLoading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : <div>
          <DaysInRow />
          <MoodChart />
          <AverageDailyMood />
          <MoodCount />
          {/* 
      - days in a row x
      - mood chart x
      - mood count x
      - Average daily mood x
      - activity count (maybe sort them according to count and use the activity as x-label)
      - mood-activity-correlation
       */}
        </div>}
    </div>
  );
};

export default Stats;
