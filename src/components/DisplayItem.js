import axios from 'axios'
import React, {useState} from 'react'
import RefineNumber from 'react-refine-number'

const DisplayItem = (props) => {
    const [cartItem, setCartItem] = useState({...props.inventoryItem, quantity: 1})


    return (
        <>
            <img src={props.inventoryItem.image} alt={props.inventoryItem.title} />
            <h2>{props.inventoryItem.title}</h2>
            <p>{props.inventoryItem.description}</p>
            <h3>$<RefineNumber number= {props.inventoryItem.price}/>.00</h3>
            <button value={props.inventoryItem} onClick={(event) => props.handleAddToCart(cartItem)}>Add To Cart</button>
        </>
    )
}

export default DisplayItem
