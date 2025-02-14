import Header from "./Header"
import Scores from "./Scores"

const Statistics = ( {good, neutral, bad} ) => {
    return (
        <div>
            <Header text="Statistics" />
            <Scores option="good" amount={good} />
            <Scores option="neutral" amount={neutral} />
            <Scores option="bad" amount={bad} />
        </div>
    )
}

export default Statistics;