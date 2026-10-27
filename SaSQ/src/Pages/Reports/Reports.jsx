import React, { useRef } from "react";

function Reports({ title, data, type, onNext, onPrevious }) {
    const chartRef = useRef(null);   
     return (
        <div className="report">

            <h2>{title}</h2>

            {/* COMPLETION RATES */}
            {type === "completion" && (
                <div className="completion-chart"
                ref={chartRef}>

                    {data.map((item) => (
                        <div
                            className="bar-group"
                            key={item.department}
                        >
                            <div className="bars">

                                <div
                                    className="bar-total"
                                    style={{
                                        height: `${item.total * 4}px`
                                    }}
                                />

                                <div
                                    className="bar-completed"
                                    style={{
                                        height: `${item.completed * 4}px`
                                    }}
                                />

                            </div>

                            <span className="bar-label">
                                {item.department} ({item.completed}/{item.total})
                            </span>

                        </div>
                    ))}

                </div>
                
            )}

            {/* CERTIFICATE STATUS */}
            
{/* CERTIFICATE STATUS */}
{type === "certificate" && (() => {
    const total =
        data.valid +
        data.soonToExpire +
        data.expired +
        data.pending;

    const valid = total > 0 ? (data.valid / total) * 100 : 0;
    const soon =
        total > 0 ? (data.soonToExpire / total) * 100 : 0;
    const expired =
        total > 0 ? (data.expired / total) * 100 : 0;

    const soonEnd = valid + soon;
    const expiredEnd = soonEnd + expired;

    const certificateGradient = total > 0
        ? `conic-gradient(
            #087b32 0% ${valid}%,
            #ffd333 ${valid}% ${soonEnd}%,
            #b5121b ${soonEnd}% ${expiredEnd}%,
            #bdbdbd ${expiredEnd}% 100%
        )`
        : "#d9d9d9";

    return (
        <div className="certificate-report" ref={chartRef}>
            <div
                className="certificate-donut"
                style={{ background: certificateGradient }}
            >
                <div className="certificate-donut-hole"></div>
            </div>

            <div className="certificate-values">
                <div className="certificate-value valid">
                    <span>{data.valid}</span>
                    Valid
                </div>

                <div className="certificate-value soon">
                    <span>{data.soonToExpire}</span>
                    Soon-to-expire
                </div>

                <div className="certificate-value expired">
                    <span>{data.expired}</span>
                    Expired
                </div>

                <div className="certificate-value pending">
                    <span>{data.pending}</span>
                    Pending
                </div>
            </div>
        </div>
    );
})()}


            {/* TRAINING SUMMARY */}
            
{type === "training" && (() => {
    const total = data.totalCourses;
    const completed = (data.completedCourses / total) * 100;
    const ongoing = (data.ongoingCourses / total) * 100;
    const pending = (data.pendingCourses / total) * 100;

    return (
        <div className="training-report">
            <div
                className="training-donut"
                style={{
                    background: `conic-gradient(
                        #07834b 0% ${completed}%,
                        #e9ad3b ${completed}% ${completed + ongoing}%,
                        #d9d9d9 ${completed + ongoing}% 100%
                    )`
                }}
            >
                <div className="training-donut-hole">
                    <strong>{total}</strong>
                    <span>Total Courses</span>
                </div>
            </div>

            <div className="training-legend">
                <div className="training-legend-item">
                    <span className="training-dot completed-dot" />
                    <div>
                        <span>Completed</span>
                        <strong>{data.completedCourses}</strong>
                    </div>
                    <small>{completed.toFixed(0)}%</small>
                </div>

                <div className="training-legend-item">
                    <span className="training-dot ongoing-dot" />
                    <div>
                        <span>Ongoing</span>
                        <strong>{data.ongoingCourses}</strong>
                    </div>
                    <small>{ongoing.toFixed(0)}%</small>
                </div>

                <div className="training-legend-item">
                    <span className="training-dot pending-dot" />
                    <div>
                        <span>Pending</span>
                        <strong>{data.pendingCourses}</strong>
                    </div>
                    <small>{pending.toFixed(0)}%</small>
                </div>
            </div>
        </div>
    );
})()}

            {/* PREVIOUS / NEXT */}
            <div className="chart-slider">
    <input
        type="range"
        min="0"
        max="100"
        defaultValue="0"
        className="chart-range"
        onChange={(e) => {

            const chart = chartRef.current;

            if (!chart) return;

            const maxScroll =
                chart.scrollWidth - chart.clientWidth;

            chart.scrollLeft =
                (e.target.value / 100) * maxScroll;

        }}
    />
</div>
            <div className="report-navigation">

                <button
                    className="report-arrow"
                    onClick={onPrevious}
                >
                    ‹
                </button>
            

                
                <button
                    className="report-arrow"
                    onClick={onNext}
                >
                    ›
                </button>

            </div>



        </div>
    );
}

export default Reports;