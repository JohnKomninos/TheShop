import React, {useState} from 'react'

const Cart = (props) => {

  return(
    <>
      {props.cart?.map((cartItem)=>{
        return(
          <div>
          <h1>{cartItem.image}</h1>
          <h1>{cartItem.title}</h1>
          <h1>{cartItem.description}</h1>
          <h1>{cartItem.price}</h1>
          <h1>{cartItem.quantity}</h1>
          </div>
        )
      })}
    </>
  )
}

export default Cart
