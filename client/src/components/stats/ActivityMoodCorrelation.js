import React, { useEffect, useState, useContext } from "react";
import Chart from "chart.js";
import moodConfig from "../../config/moods";
import activityConfig from "../../config/activities";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

const ActivityMoodCorrelation = () => {
    const localeContext = useContext(LocaleContext);
    const { locale, translations: t } = localeContext;

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
            const dataset = [];

            const dateFiltered = entries.filter(entry => new Date(entry.date) >= cutoffDate)
            // calculates floored average mood, set zero if mood doesn't occur at all
            const averageMood = (arr) => arr.length > 0 ? Math.floor(arr.reduce((sum, mood) => sum + mood, 0) / arr.length) + 1 : 0;
            // counts the occurrences of each activity
            activityConfig.forEach(activity => {
                const dataPoint = {}
                dataPoint.label = activity.name[locale];
                dataPoint.data = averageMood(
                    dateFiltered
                        .filter(entry => entry.activities.includes(activity.idString))
                        .map(entry => entry.mood)
                );
                dataset.push(dataPoint);
            })
            // sort w.r.t. the occurrences
            dataset.sort((a, b) => (a.data < b.data) ? 1 : ((a.data > b.data) ? -1 : 0));
            // split into labels and data arrays
            const labels = dataset.map(dataPoint => dataPoint.label);
            const data = dataset.map(dataPoint => dataPoint.data);

            return { labels, data };
        }
        const { labels, data } = calculateData();
        console.log(labels)
        console.log(data)

        // get canvas context
        const ctx = document.getElementById('activity-mood-correlation').getContext('2d');
        // 
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                // 0 represents sunday, hence it goes to the back
                labels: labels,
                datasets: [{
                    backgroundColor: data.map(value => value !== 0 ? moodConfig[String(value - 1)].color : "#fff"),  //"rgba(149, 102, 187, 0.4)",
                    borderColor: data.map(value => value !== 0 ? moodConfig[String(value - 1)].colorHex : "#fff"),
                    borderWidth: 3,
                    data: data
                }]
            },

            // Configuration options go here
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{ gridLines: { display: false } }],
                    yAxes: [{
                        ticks: {
                            min: 0.5,
                            max: 5.5,
                            stepSize: 1,
                            suggestedMin: 0.5,
                            suggestedMax: 5.5,
                            callback: function (label, index, labels) {
                                switch (label) {
                                    case 1:
                                        return "☹️";
                                    case 2:
                                        return "🙁";
                                    case 3:
                                        return "😐";
                                    case 4:
                                        return "🙂";
                                    case 5:
                                        return "😃";
                                    default:
                                        return "";
                                }
                            }
                        }
                    }]
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function (tooltipItems, data) {
                            switch (tooltipItems.yLabel) {
                                case 1:
                                    return "☹️";
                                case 2:
                                    return "🙁";
                                case 3:
                                    return "😐";
                                case 4:
                                    return "🙂";
                                case 5:
                                    return "😃";
                                default:
                                    return "";
                            }
                        }
                    },
                }
            }
        });
    }, [timeRange, entries, locale])


    return (
        <div className="row">
            <div className="col s12 m8 l6 push-m2 push-l3">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">{t.average_activity_mood}</span>
                        {/* This canvas element is the actual chart */}
                        <canvas id="activity-mood-correlation" />
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

export default ActivityMoodCorrelation;
