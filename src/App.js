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

  const viewHome = () => {
    setPage('home')
  }

  const viewShop = () => {
    setPage('shop')
  }

  const viewCart = () => {
    setPage('cart')
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

        </div>
      : null}
      {page == 'cart' ?
        <Cart cart={cart}/>
      : null}

    </>
  )
}

export default App
