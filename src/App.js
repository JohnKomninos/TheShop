import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import RefineNumber from 'react-refine-number'
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
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [loginError, setLoginError] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  const totalPriceHumanize = <RefineNumber number = {totalPrice}/>


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
        getCart()
        calculateTotal()
      })
  }


  // USER AUTHORIZATION FUNCTION FOR CREATING NEW ACCOUNT
  const handleCreateNewUser = (newUserAccount) => {
    axios.post('https://the-shop-back-end.herokuapp.com/api/useraccount', newUserAccount).then((response) => {
        setPage('login')
    })
  }

  // SHOP INVENTORY PAGE FUNCTIONS
  const getInventory = () => {
    axios.get('https://the-shop-back-end.herokuapp.com/api/inventory').then((response) => {
      setInventory(response.data)
    })
  }

  const handleAddToCart = (addedInventoryItem) => {
    if (currentUser) {
      axios.post('https://the-shop-back-end.herokuapp.com/api/cart', addedInventoryItem).then((response) => {
        setCart([...cart, response.data])
      })
    } else {
      viewLogin()
    }

  }


  // CART PAGE FUNCTIONS
  const getCart = () => {
    axios.get('https://the-shop-back-end.herokuapp.com/api/cart').then((response) => {
      setCart(response.data.filter(cartItem => cartItem.email === currentUser))
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

  const calculateTotal = () =>{
    let total = 0
    cart.map((item) => {
      let quantityPrice = item.price * item.quantity
      total+=quantityPrice
      setTotalPrice(total)
    })
  }

  const handleDelete = (deletedItem) => {
    axios.delete('https://the-shop-back-end.herokuapp.com/api/cart/' + deletedItem.id)
    .then((response) => {
      setCart(cart.filter(cartItem => cartItem.id !== deletedItem.id))
      setTotalPrice(totalPrice - deletedItem.price)
    })
  }

  const deleteCart = () => {
    setTotalPrice(0)
    cart.map((deleteItem) => {
      axios.delete('https://the-shop-back-end.herokuapp.com/api/cart/' + deleteItem.id)
      .then((response) => {
        getCart()
      })
    })
  }

  //SORT FUNCTIONS

  const priceDesc = () => {
      setOrder(inventory?.sort((a, b) => b.price - a.price))
  }

  const priceAsc = () => {
      setOrder(inventory?.sort((a, b) => a.price - b.price))
  }

  // PAGE CHANGE / VIEW FUNCTIONS
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
      <Header viewHome={viewHome} viewShop={viewShop} viewCart={viewCart} cart={cart}/>
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
      {page == 'shop' ?
      <>
      <input className='search' placeholder = 'Search by item name' onChange = {event => setQuery(event.target.value)}/>
      <details>
      <summary>Filters</summary>
      <button onClick = {priceDesc}>Price High to Low</button>
      <button onClick = {priceAsc}>Price Low to High</button>
      </details>
        <div className='inventory-container'>
        {inventory?.filter(inventoryItem => {
            if (query === '') {
                return inventoryItem
            } else if (inventoryItem.title.toLowerCase().includes(query.toLowerCase())){
                return inventoryItem
            }
        }).map((inventoryItem) => {
          return (
            <div className='inventory-item' key={inventoryItem.id}>
              <DisplayItem inventoryItem={inventoryItem} handleAddToCart={handleAddToCart} currentUser={currentUser} />
            </div>
          )
        })}
        </div>
        </>
      : null}
      {page === 'cart' ?
        currentUser ?
          <div>
            {cart?.map((cartItem) => {
              return (
                <div key={cartItem.id}>
                  <Cart cartItem={cartItem} totalPrice={totalPrice} updateCart={updateCart} calculateTotal={calculateTotal} handleDelete={handleDelete}/>
                </div>
              )
          })}
          <button onClick={deleteCart}>Empty the cart</button>
          <div>
          <h2>Total:</h2>
          <h1 className = 'inline'>$</h1>
          <h1 className = 'inline'>{totalPriceHumanize}</h1>
          <h1 className = 'inline'>.00</h1>
          </div>
          </div>
        : viewLogin()
      : null}
    </>
  )
}

export default App
