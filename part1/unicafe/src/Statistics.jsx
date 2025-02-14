import { useState } from "react"
import Header from "./Header"
import StatisticLine from "./StatisticLine"

const Statistics = ( {good, neutral, bad} ) => {

    const total = good + neutral + bad
    const avg = (good - bad) / total
    const positive = good / total


    return (
        <>
            <Header text="Statistics" />
            {total > 0 ?     
                <>
                    <StatisticLine option="good" amount={good} />
                    <StatisticLine option="neutral" amount={neutral} />
                    <StatisticLine option="bad" amount={bad} />
                    <StatisticLine option="Total feedback" amount={total} />
                    <StatisticLine option="Average" amount={avg} />
                    <StatisticLine option="Positive" amount={positive} />
                </>
                :
                <p>No feedback given</p>
            }
        </>
    )
}

export default Statistics;