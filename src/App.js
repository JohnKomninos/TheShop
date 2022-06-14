import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayItem from './components/DisplayItem'

const App = () => {

  const [inventory, setInventory] = useState([])
  const [cart, setCart] = useState([])

  const getInventory = () => {
    axios.get('https://the-shop-back-end.herokuapp.com/api/inventory').then((response) => {
      setInventory(response.data)
    })
  }

  const handleAddToCart = (addedInventoryItem) => {
    axios.post('https://the-shop-back-end.herokuapp.com/api/cart', addedInventoryItem).then((response) => {
        setCart(response.data)
    })
  }

  useEffect(() => {
    getInventory()
  }, [])

  return (
    <>
      <h1>Welcome to The Shop!</h1>
      <div className='inventory-container'>
        {inventory?.map((inventoryItem) => {
          return (
            <div className='inventory-item' key={inventoryItem.id}>
              <DisplayItem inventoryItem={inventoryItem} handleAddToCart={handleAddToCart} />
              <Cart/>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
