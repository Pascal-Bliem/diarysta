import React, { useEffect, useState, useContext } from "react";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

const DaysInRow = () => {
    const localeContext = useContext(LocaleContext);
    const { translations: t } = localeContext;

    const entryContext = useContext(EntryContext);
    const { entries } = entryContext;

    const [daysInRow, setDaysInRow] = useState(0);
    const [longestChain, setLongestChain] = useState(0);

    useEffect(() => {
        // calculate how many days in a row there are entries since today
        const counterDate = new Date();
        counterDate.setHours(0, 0, 0, 0);
        let dayCounter = 0;

        while (true) {
            if (entries.filter(entry => {
                const entryDate = new Date(entry.date);
                entryDate.setHours(0, 0, 0, 0);
                return entryDate.getTime() === counterDate.getTime();
            }).length > 0) {
                dayCounter++;
                counterDate.setDate(counterDate.getDate() - 1);
            } else {
                break;
            }
        }
        setDaysInRow(dayCounter);

        // Calculate the longest chain of days with entries.
        // Note that entries is already sorted from the most 
        // recent to the oldest date of the entry items.
        let currLength = 0;
        // i is the current position in the array 
        let i = 1;
        while (i < entries.length) {
            const di = new Date(entries[i].date)
            const di_1 = new Date(entries[i - 1].date)
            di.setHours(0, 0, 0, 0)
            di_1.setHours(0, 0, 0, 0)

            // if date of entry i is same as i-1, only increment i
            if (di.getTime() === di_1.getTime()) {
                i++;
            }
            // if date of entry i is one day before date of i-1, increment i and currLength,
            // if currLength larger than longest, set longestChain to curr length
            else if (di.getTime() === new Date(di_1.setDate(di_1.getDate() - 1)).getTime()) {
                currLength++;
                i++;
                if (currLength > longestChain) {
                    setLongestChain(currLength);
                }
            }
            // if chain is interrupted, increment i and set currLength to 0
            else {
                i++;
                currLength = 0;
            }
        }
    }, [entries, daysInRow, setDaysInRow, longestChain, setLongestChain])

    return (
        <div className="row">
            <div className="col s12 m8 l6 push-m2 push-l3">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">
                          <i className="material-icons small" style={iconStyle}>keyboard_tab</i> {t.days_in_row}: <strong className="right">{daysInRow}</strong>
                        </span>
                        <span className="card-title">
                          <i className="material-icons small" style={iconStyle}>all_inclusive</i> {t.longest_chain}: <strong className="right">{longestChain}</strong>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

const iconStyle = {
  display: "inline-flex",
  verticalAlign: "top",
  paddingRight: "25px"
};


export default DaysInRow
