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
            {type === "certificate" && (
                <div className="certificate-report"
                ref={chartRef}>

                    <div className="certificate-donut">
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
            )}

            {/* TRAINING SUMMARY */}
            {type === "training" && (
                <div className="training-report"
                ref={chartRef}
                >

                    <p>
                        Total Courses: {data.totalCourses}
                    </p>

                    <p>
                        Completed: {data.completedCourses}
                    </p>

                    <p>
                        Ongoing: {data.ongoingCourses}
                    </p>

                    <p>
                        Pending: {data.pendingCourses}
                    </p>

                </div>
            )}

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