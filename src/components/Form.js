import React from 'react'

const Form = props => {
    return (
        <form onSubmit={props.get}>
            <input type="text" name="city" placeholder="City..." required/>
            <button>Show Weather</button>
        </form>
    )
}

export default Form