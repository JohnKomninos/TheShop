import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayItem from './components/DisplayItem'
import Index from './components/Index'
import Cart from './components/cart'

const App = () => {

  const [inventory, setInventory] = useState()
  const [cart, setCart] = useState()

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
        console.log(response.data)
    })
  }

  useEffect(() => {
    getInventory()
    getCart()
  }, [])

  return (
    <>
      <h1>Welcome to The Shop!</h1>
      {inventory ? <Index inventory={inventory} /> : null}
      <div className='inventory-container'>
        {inventory?.map((inventoryItem) => {
          return (
            <div className='inventory-item' key={inventoryItem.id}>
              <DisplayItem inventoryItem={inventoryItem} handleAddToCart={handleAddToCart} />
            </div>
          )
        })}
            <Cart cart={cart}/>
      </div>
    </>
  )
}

export default App
