import React, {useState} from 'react'
import RefineNumber from 'react-refine-number'

const DisplayItem = (props) => {
    const [cartItem] = useState({...props.inventoryItem, quantity: 1, email: props.currentUser})

    let number = <RefineNumber number = {props.inventoryItem.price}/>

    return (
        <>
            <img src={props.inventoryItem.image} alt={props.inventoryItem.title} />
            <h2>{props.inventoryItem.title}</h2>
            <p>{props.inventoryItem.description}</p>
            <h3 className = 'inline'>$</h3>
            <h3 className = 'inline'>{number}</h3>
            <h3 className = 'inline'>.00</h3>
            <button className = 'block' value={props.inventoryItem} onClick={(event) => props.handleAddToCart(cartItem)}>Add To Cart</button>
        </>
    )
}

export default DisplayItem
