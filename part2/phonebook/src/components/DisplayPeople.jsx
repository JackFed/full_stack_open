const DisplayPeople = ({ filter, persons, deletePerson }) => {

    return (
        <>
        <h2>Numbers</h2>
        {persons.map((person) => 
            <p key={person.name}>
                {person.name} {person.number}
                <button onClick={() => deletePerson(person)}>delete</button>
            </p>
        )}
        </>
    )
}

export default DisplayPeople;