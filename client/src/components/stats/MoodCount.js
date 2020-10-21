import React, { useEffect, useState, useContext } from "react";
import Chart from "chart.js";
import moodConfig from "../../config/moods";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

const MoodCount = () => {
    const localeContext = useContext(LocaleContext);
    const { translations: t } = localeContext;

    const entryContext = useContext(EntryContext);
    const { entries } = entryContext;

    const [timeRange, setTimeRange] = useState("7");

    const onTimeRangeChange = (e) => {
        setTimeRange(e.target.value);
    }

    useEffect(() => {
        // prepare the data
        const calculateData = () => {
            const cutoffDate = new Date()
            cutoffDate.setDate(cutoffDate.getDate() - Number(timeRange));
            const labels = [];
            const data = [];

            const dateFiltered = entries.filter(entry => new Date(entry.date) >= cutoffDate)
            const moodOptions = [0, 1, 2, 3, 4];
            moodOptions.forEach(mood => {
                labels.push(mood);
                data.push(dateFiltered.filter(entry => entry.mood === mood).length);
            })

            return { labels, data };
        }
        const { data } = calculateData();

        // get canvas context
        const ctx = document.getElementById('mood-count').getContext('2d');
        // 
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'doughnut',

            // The data for our dataset
            data: {
                labels: ["☹️", "🙁", "😐", "🙂", "😃"],
                datasets: [{
                    backgroundColor: [
                        moodConfig["0"].color,
                        moodConfig["1"].color,
                        moodConfig["2"].color,
                        moodConfig["3"].color,
                        moodConfig["4"].color],
                    borderColor: '#fff',
                    data: data
                }]
            },

            // Configuration options go here
            options: {
                rotation: 1 * Math.PI,
                circumference: 1 * Math.PI,
                borderAlign: "inner",
                legend: { display: true, position: "bottom" },
                scales: {
                    xAxes: [{ display: false }],
                    yAxes: [{ display: false }]
                },
            }
        });
    }, [timeRange, entries])


    return (
        <div className="row">
            <div className="col s12 m8 l6 push-m2 push-l3">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">{t.mood_count}</span>
                        {/* This canvas element is the actual chart */}
                        <canvas id="mood-count" />
                    </div>
                    <div className="card-action center-align">
                        <form action="#">
                            <div className="row">
                                <label style={radioStyle}>
                                    <input type="radio" name="time-7-days"
                                        className="with-gap"
                                        value="7"
                                        checked={timeRange === "7"}
                                        onChange={onTimeRangeChange} />
                                    <span>{"7 " + t.days}</span>
                                </label>
                                <label style={radioStyle}>
                                    <input type="radio" name="time-30-days"
                                        className="with-gap"
                                        value="30"
                                        checked={timeRange === "30"}
                                        onChange={onTimeRangeChange} />
                                    <span>{"30 " + t.days}</span>
                                </label>
                                <label >
                                    <input type="radio" name="time-365-days"
                                        className="with-gap"
                                        value="365"
                                        checked={timeRange === "365"}
                                        onChange={onTimeRangeChange} />
                                    <span >{"365 " + t.days}</span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const radioStyle = {
    paddingRight: "13px"
}

export default MoodCount
