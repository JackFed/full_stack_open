// Editor's note:
// This is the worst component ever and the props names completely screwed me when
// trying to use in other components.
// Definitely will never make a dumb wrapper component like this again.

const Input = ( { description, handleChange, value }) => {
    return (
        <div>
          {description}: <input onChange={handleChange} value={value}/>
        </div>
    )
}

export default Input;