import Input from "./Input";

const Form = ( { newName, newNum, handleAddName, handleNameChange, handleNumChange }) => {
    
    return (
        <form onSubmit={handleAddName}>
            <Input description="name" handleChange={handleNameChange} value={newName} />
            <Input description="number" handleChange={handleNumChange} value={newNum}/>
            <button type="submit">add</button>
        </form>
    )
}

export default Form;