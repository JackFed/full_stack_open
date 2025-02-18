const DisplayPeople = ({ filter, persons }) => {

    return (
        <>
        <h2>Numbers</h2>
        {persons.map(
            (person) => <p key={person.name}>{person.name} {person.number}</p>
        )}
        </>
    )
}

export default DisplayPeople;