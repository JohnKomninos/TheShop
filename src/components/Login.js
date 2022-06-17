import React, {useState} from 'react'

const Login = (props) => {

    const [userAccount, setUserAccount] = useState({email: '', password: ''})

    const handleUserChange = (event) => {
        setUserAccount({...userAccount, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.getUserAccount(userAccount)
    }

    return (
        <div className='login-create-form'>
            <h3>Log in to your account to shop:</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' placeholder='EMAIL ADDRESS' onChange={handleUserChange} /><br />
                <input type='password' name='password' placeholder='PASSWORD' onChange={handleUserChange} /><br />
                <input className='submit-btn' type='submit' />
                <h3>Don't have an account? Create one here:</h3>
                <button className='create-back-btn' onClick={props.viewCreate}>Create Account</button>
            </form>
        </div>
    )
}

export default Login