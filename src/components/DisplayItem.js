import React, {useState} from 'react'

const DisplayItem = (props) => {
    const [item, setItem] = useState({image: '', title: '', description: '', price: ''})

    console.log(props)

    return (
        <div className='display-item'>
            item
        </div>
    )
}

export default DisplayItem