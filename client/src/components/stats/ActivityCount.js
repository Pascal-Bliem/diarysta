import React, { useEffect, useState, useContext } from "react";
import Chart from "chart.js";
import activityConfig from "../../config/activities";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";

const ActivityCount = () => {
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

            // counts the occurrences of each activity
            activityConfig.forEach(activity => {
                const dataPoint = {}
                dataPoint.label = activity.name[locale];
                dataPoint.data = dateFiltered
                    .filter(entry => entry.activities.includes(activity.idString))
                    .length;
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

        // get canvas context
        const ctx = document.getElementById('activity-count').getContext('2d');
        // 
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                // 0 represents sunday, hence it goes to the back
                labels: labels,
                datasets: [{
                    backgroundColor: "rgba(149, 102, 187, 0.4)",
                    borderColor: '#bb668c',
                    borderWidth: 2,
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
                            min: 0.0,
                            max: Math.max(...data) + 1,
                            stepSize: Math.max(...data) > 10 ? 2 : 1,
                            suggestedMin: 0.5,
                            suggestedMax: Math.max(...data) + 1,
                        }
                    }]
                },
            }
        });
    }, [timeRange, entries, locale])


    return (
        <div className="row">
            <div className="col s12 m8 l6 push-m2 push-l3">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">{t.activity_count}</span>
                        {/* This canvas element is the actual chart */}
                        <canvas id="activity-count" />
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

export default ActivityCount
