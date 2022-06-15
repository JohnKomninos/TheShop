import React, {useState} from 'react'

const Cart = (props) => {

  const [index, setIndex] = useState(0)

  return(
    <>
      {props.cart?.map((cartItem)=>{
        return(
          <div className="cart-div" key={cartItem.id}>
          <h3>{cartItem.image}</h3>
          Title: <h3>{cartItem.title}</h3>
          Description: <h3>{cartItem.description}</h3>
          Price: <h3>${cartItem.price}</h3>
          Quantiy: <h3>{cartItem.quantity}</h3>
          </div>
        )
      })}
      <h3>Total Price: $ {props.totalPrice}</h3>
    </>
  )
}

export default Cart
