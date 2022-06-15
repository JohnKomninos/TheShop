import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayItem from './components/DisplayItem'
import Index from './components/Index'
import Cart from './components/cart'

import Header from './components/Header'



const App = () => {

  const [inventory, setInventory] = useState()

  const [cart, setCart] = useState()

  const [page, setPage] = useState('home')

  const [totalPrice, setTotalPrice] = useState(0)


  const getInventory = () => {
    axios.get('https://the-shop-back-end.herokuapp.com/api/inventory').then((response) => {
      setInventory(response.data)
    })
  }

  const getCart = () => {
    axios.get('https://the-shop-back-end.herokuapp.com/api/cart').then((response) => {
      setCart(response.data)
    })
  }

  const handleAddToCart = (addedInventoryItem) => {
    axios.post('https://the-shop-back-end.herokuapp.com/api/cart', addedInventoryItem).then((response) => {
        setCart([...cart, response.data])
    })
  }

  const updateCart = (editCart) =>{
    axios.put('https://the-shop-back-end.herokuapp.com/api/cart/' + editCart.id, editCart)
    .then((response)=>{
      setCart(cart.map((item)=>{
        return item.id !== response.data.id ? item : response.data
      }))
    })
  }

  const viewHome = () => {
    setPage('home')
  }

  const viewShop = () => {
    setPage('shop')
  }

  const viewCart = () => {
    setPage('cart')
    calculateTotal()
  }

  const calculateTotal = () =>{
    let total = 0
    cart.map((item)=>{
      let quantityPrice = item.price * item.quantity
      total+=quantityPrice
      setTotalPrice(total)
    })
  }

  const handleDelete = (deletedItem) =>{
      axios.delete('https://the-shop-back-end.herokuapp.com/api/cart/' + deletedItem.id)
      .then((response)=>{
        setCart(cart.filter(cartItem => cartItem.id !== deletedItem.id))
        calculateTotal()
      })
  }

  const deleteCart = () =>{
    setTotalPrice(0)
    cart.map((deleteItem)=>{
      axios.delete('https://the-shop-back-end.herokuapp.com/api/cart/' + deleteItem.id)
      .then((response)=>{
        getCart()
      })
    })
  }

  useEffect(() => {
    getInventory()
    getCart()
  }, [])

  return (

    <>
      <Header viewHome={viewHome} viewShop={viewShop} viewCart={viewCart} />
      {page == 'home' ?
        inventory ? <Index inventory={inventory} /> : null
      : null}
      {page == 'shop' ?
        <div className='inventory-container'>
        {inventory?.map((inventoryItem) => {
          return (
            <div className='inventory-item' key={inventoryItem.id}>
              <DisplayItem inventoryItem={inventoryItem} handleAddToCart={handleAddToCart} />
            </div>
          )
        })}
      </div>
      : null}
      {page == 'cart' ?
        <div>
        <button onClick={deleteCart}>Empty the cart</button>
        {cart?.map((cartItem) => {
          return (
            <div key={cartItem.id}>
              <Cart cartItem={cartItem} totalPrice={totalPrice} updateCart={updateCart} calculateTotal={calculateTotal}/>
              <button onClick={()=>{handleDelete(cartItem)}}>X</button>
            </div>
          )
        })} ${totalPrice}
      </div>
      : null}
    </>
  )
}



export default App
