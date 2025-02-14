import { useState } from "react"
import Header from "./Header"
import StatisticLine from "./StatisticLine"

const Statistics = ( {good, neutral, bad} ) => {

    const total = good + neutral + bad
    const avg = (good - bad) / total
    const positive = (good / total * 100) + "%"


    return (
        <>
            <Header text="Statistics" />
            {total > 0 ?     
                <table>
                    <StatisticLine option="good" amount={good} />
                    <StatisticLine option="neutral" amount={neutral} />
                    <StatisticLine option="bad" amount={bad} />
                    <StatisticLine option="all" amount={total} />
                    <StatisticLine option="average" amount={avg} />
                    <StatisticLine option="positive" amount={positive} />
                </table>
                :
                <p>No feedback given</p>
            }
        </>
    )
}

export default Statistics;