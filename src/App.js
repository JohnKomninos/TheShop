import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayItem from './components/DisplayItem'
import Index from './components/Index'
import Cart from './components/cart'
import Header from './components/Header'
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

const App = () => {

  const [inventory, setInventory] = useState()
  const [cart, setCart] = useState()
  const [page, setPage] = useState('home')
  const [currentUser, setCurrentUser] = useState()
  const [loginError, setLoginError] = useState(false)

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

  // USER AUTHORIZATION FUNCTION FOR VERIFYING EXISTING ACCOUNT
  const getUserAccount = (userAccount) => {
    axios.put('https://the-shop-back-end.herokuapp.com/api/useraccount/login', userAccount)
      .catch((error) => {
        if (error) {
          setLoginError(true)
        }
      })
      .then((response) => {
        setCurrentUser(response.data.email)
      })
  }


  // USER AUTHORIZATION FUNCTIONS FOR CREATING NEW ACCOUNT
  const handleCreateNewUser = (newUserAccount) => {
    axios.post('https://the-shop-back-end.herokuapp.com/api/useraccount', newUserAccount).then((response) => {
        setPage('login')
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

  const viewLogin = () => {
    setPage('login')
  }

  const viewCreate = () => {
    setPage('create')
  }

  useEffect(() => {
    getInventory()
    getCart()
  }, [])

  return (

    <>
      <Header viewHome={viewHome} viewShop={viewShop} viewCart={viewCart} />
      {page === 'login' ?
        <Login getUserAccount={getUserAccount} viewCart={viewCart} viewCreate={viewCreate} />
      : null}
      {page === 'create' ?
        <CreateAccount handleCreateNewUser={handleCreateNewUser} viewLogin={viewLogin} />
      : null}
      {loginError ? <h3>Wrong email or password!</h3> : null}
      {page === 'home' ?
        inventory ? <Index inventory={inventory} /> : null
      : null}
      {page === 'shop' ?
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
      {page === 'cart' ?
        currentUser ?
          <Cart cart={cart} />
        : 
          <>
            <h3>Please log in to view cart!</h3>
            <button onClick={viewLogin}>Log In</button>
          </>
      : null}
    </>
  )
}

export default App
