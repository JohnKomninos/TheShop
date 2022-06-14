import React, {useState} from 'react'

const DisplayItem = (props) => {
    const [cartItem, setCartItem] = useState({...props.inventoryItem})

    return (
        <>
            <img src={props.inventoryItem.image} alt={props.inventoryItem.title} />
            <h2>{props.inventoryItem.title}</h2>
            <p>{props.inventoryItem.description}</p>
            <h3>${props.inventoryItem.price}</h3>
            <button value={props.inventoryItem} onClick={(event) => props.handleAddToCart(cartItem)}>Add To Cart</button>
        </>
    )
}

export default DisplayItem