import React, { useEffect, useState, useContext } from "react";
import Chart from "chart.js";
import LocaleContext from "../../context/locale/localeContext";
import EntryContext from "../../context/entry/entryContext";


const MoodChart = () => {
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

            entries
                .filter(entry => new Date(entry.date) >= cutoffDate)
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .forEach((entry, index) => {
                    labels.push(index + 1);
                    data.push(entry.mood + 1);
                })
            return { labels, data };
        }
        const { labels, data } = calculateData();

        // get canvas context
        const ctx = document.getElementById('mood-chart').getContext('2d');
        // 
        new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: labels,
                datasets: [{
                    backgroundColor: "rgba(149, 102, 187, 0.4)",
                    borderColor: '#bb668c',
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
    }, [timeRange, entries])


    return (
        <div className="row">
            <div className="col s12 m8 l6 push-m2 push-l3">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">{t.mood_chart}</span>
                        {/* This canvas element is the actual chart */}
                        <canvas id="mood-chart" />
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

export default MoodChart;
