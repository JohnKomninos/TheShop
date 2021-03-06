import React, {useState} from 'react'
import RefineNumber from 'react-refine-number'

const DisplayItem = (props) => {
    const [cartItem] = useState({...props.inventoryItem, quantity: 1, email: props.currentUser})
    let number = <RefineNumber number = {props.inventoryItem.price}/>

    return (
        <>
            <div className='imageContainer'>
                <img src={props.inventoryItem.image} alt={props.inventoryItem.title} />
            </div>
            <h2>{props.inventoryItem.title}</h2>
            <p>{props.inventoryItem.description}</p>
            <div>
            <h3 className='inline'>$</h3>
            <h3 className='inline'>{number}</h3>
            <h3 className='inline'>.00</h3>
            </div>
            <br />
            <button className='button' value={props.inventoryItem}
            onMouseUp={(event)=>{props.checkDuplicate(cartItem)}} onTouchCancel={(event)=>{props.checkDuplicate(cartItem)}} onClick={(event) => props.handleAddToCart(cartItem)}>Add To Cart</button>
        </>
    )
}

export default DisplayItem
