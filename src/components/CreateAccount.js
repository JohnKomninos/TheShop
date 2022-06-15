import React, {useState} from 'react'

const CreateAccount = (props) => {

    const [newUserAccount, setNewUserAccount] = useState({email: '', password: ''})

    const handleNewUserChange = (event) => {
        setNewUserAccount({...newUserAccount, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreateNewUser(newUserAccount)
    }

    return (
        <div>
            <h3>Create A New Account</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' placeholder='EMAIL ADDRESS' value={newUserAccount.email} onChange={handleNewUserChange} /><br />
                <input type='password' name='password' placeholder='PASSWORD' value={newUserAccount.password} onChange={handleNewUserChange} /><br />
                <input type='submit' />
                <button onClick={props.viewLogin}>Back to Login</button>
            </form>
        </div>
    )
}

export default CreateAccount