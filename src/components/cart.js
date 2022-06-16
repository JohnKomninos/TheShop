import React, {useState} from 'react'

const Cart = (props) => {
  const [cartItem, setCartItem] = useState({...props.cartItem})

  const handleChange = (event) =>{
    setCartItem({...cartItem, [event.target.name]: event.target.value})
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset();
    props.updateCart(cartItem)
  }

    let quantityPrice = cartItem.price * cartItem.quantity

  return(
    <>
      <div className="cart-div" key={cartItem.id}>
        <form onSubmit={handleSubmit}>
        <h3>{cartItem.image}</h3>
        Title: <h3>{cartItem.title}</h3>
        Description: <h3>{cartItem.description}</h3>
        Price: <h3>${quantityPrice}</h3>
        <label>Quantity:</label>
        <input type="number" name='quantity' value={cartItem.quantity} onChange={handleChange} min="1" max="100"/>
        <input type="submit"/>
        </form>
        <button onMouseDown={props.calculateTotal} onClick={()=>{props.handleDelete(cartItem)}}>X</button>
      </div>
    </>
  )
}

export default Cart
