import React, {useState} from 'react'
import RefineNumber from 'react-refine-number'

const Cart = (props) => {
  const [cartItem, setCartItem] = useState({...props.cartItem})
  const [quantity, setQuantity] = useState(cartItem.quantity)

  const handleChange = (event) =>{
    setCartItem({...cartItem, [event.target.name]: event.target.value})
  }

  let cartNumber = <RefineNumber number = {props.cartItem.price}/>

  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset();
    setQuantity(cartItem.quantity)
    props.updateCart(cartItem, quantity)
  }

    let quantityPrice = cartItem.price * cartItem.quantity
    let quantityHumanized = <RefineNumber number = {quantityPrice}/>

  return(
    <>
      <div className="cart-div" key={cartItem.id}>
        <div className='cart-card'>
          <form onSubmit={handleSubmit}>
            <img src = {cartItem.image}/>
            <h3 className = 'block'>{cartItem.title}</h3>
            <p className = 'block'>{cartItem.description}</p>
            <h3 className='block' id='cart-price'>${quantityHumanized}.00</h3>
            <p className = 'block'>Quantity: {cartItem.quantity}</p>
            <label className = 'block'>Change Quantity:</label>
            <input type="number" name='quantity' onChange={handleChange} min="1" max="100"/>
            <input className = 'button' type="submit"/>
          </form>
          <button className = 'button' onMouseDown={props.calculateTotal} onClick={()=>{props.handleDelete(cartItem, quantity)}}>X</button>
        </div>
      </div>
    </>
  )
}

export default Cart
