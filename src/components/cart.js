import React, {useState} from 'react'
import RefineNumber from 'react-refine-number'

const Cart = (props) => {
  const [cartItem, setCartItem] = useState({...props.cartItem})

  const handleChange = (event) =>{
    setCartItem({...cartItem, [event.target.name]: event.target.value})
  }

  let cartNumber = <RefineNumber number = {props.cartItem.price}/>

  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset();
    props.updateCart(cartItem)
  }

    let quantityPrice = cartItem.price * cartItem.quantity

  return(
    <>
      <div className="cart-div" key={cartItem.id}>
        <div className='cart-card'>
        <form onSubmit={handleSubmit}>
        <img src = {cartItem.image}/>
        <h3>{cartItem.title}</h3>
        <p>{cartItem.description}</p>
        <h3 className = 'inline'>$</h3>
        <h3 className = 'inline'>{cartNumber}</h3>
        <h3 className = 'inline'>.00</h3>
        <label className = 'block'>Quantity:</label>
        <input type="number" name='quantity' value={cartItem.quantity} onChange={handleChange} min="1" max="100"/>
        <input type="submit"/>
        </form>
        <button onMouseDown={props.calculateTotal} onClick={()=>{props.handleDelete(cartItem)}}>X</button>
        </div>
      </div>
    </>
  )
}

export default Cart
