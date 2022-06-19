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
import Total from './components/Total'
const App = () => {

  const [inventory, setInventory] = useState()
  const [cart, setCart] = useState([])
  const [page, setPage] = useState('home')
  const [query, setQuery] = useState('')
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'))
  const [loginError, setLoginError] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [addToCart, setAddToCart] = useState(true)
  const [totalQuantity, setTotalQuantity] = useState(0)

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
        getCart(response.data.email)
        viewShop()
      })
  }


  // USER AUTHORIZATION FUNCTION FOR CREATING NEW ACCOUNT
  const handleCreateNewUser = (newUserAccount) => {
    axios.post('https://the-shop-back-end.herokuapp.com/api/useraccount', newUserAccount).then((response) => {
      setPage('login')
    })
  }


  // LOG OUT FUNCTION
  const logoutUser = () => {
    setCurrentUser('null')
    setCart([])
    setTotalQuantity(0)
    localStorage.clear()
  }

  // SHOP INVENTORY PAGE FUNCTIONS
  const getInventory = () => {
    axios.get('https://the-shop-back-end.herokuapp.com/api/inventory').then((response) => {
      setInventory(response.data)
    })
  }

  const handleAddToCart = (addedInventoryItem) => {
    if (currentUser && currentUser !== 'null') {
      if(addToCart === true){
      axios.post('https://the-shop-back-end.herokuapp.com/api/cart', addedInventoryItem).then((response) => {
        setCart([...cart, response.data])
        setTotalQuantity(totalQuantity+1)
      })}
      else{
        alert("This item is already in the cart")
        setAddToCart(true)
      }
    } else {
      viewLogin()
    }
  }

  const checkDuplicate = (addedInventoryItem) => {
    cart.map((item)=>{
      if(addedInventoryItem.title === item.title){
        setAddToCart(false)
      }
    })
  }

  // CART PAGE FUNCTIONS
  const getCart = (queriedUser) => {
    axios.get('https://the-shop-back-end.herokuapp.com/api/cart').then((response) => {
      setCart(response.data.filter(cartItem => cartItem.email === queriedUser))
       let finalQuantity = 0
      response.data.map((quantities)=>{
        if(quantities.email === queriedUser)
        finalQuantity += quantities.quantity
        setTotalQuantity(finalQuantity)
      })
    })
  }

  const updateCart = (editCart,  quantity) => {
    let finalQuantity = 0
    cart.map((quantities)=>{
      if(editCart.title !== quantities.title){
        finalQuantity += quantities.quantity
        return finalQuantity
      }
    })
    setTotalQuantity(finalQuantity + parseInt(editCart.quantity))
    setTotalPrice(totalPrice + ((editCart.quantity-quantity)* editCart.price))
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
      total += quantityPrice
      return setTotalPrice(total)
    })
  }

  const handleDelete = (deletedItem, quantity) => {
    axios.delete('https://the-shop-back-end.herokuapp.com/api/cart/' + deletedItem.id)
    .then((response) => {
      setCart(cart.filter(cartItem => cartItem.id !== deletedItem.id))
      setTotalPrice(totalPrice - (deletedItem.price * quantity))
      setTotalQuantity(totalQuantity - quantity)
    })
  }

  const deleteCart = () => {
    setTotalPrice(0)
    setTotalQuantity(0)
    cart.map((deleteItem) => {
      axios.delete('https://the-shop-back-end.herokuapp.com/api/cart/' + deleteItem.id)
      .then((response) => {
        getCart(currentUser)
      })
    })
  }


  //SORT FUNCTIONS
  const priceDesc = () => {
    setInventory([...inventory]?.sort((a, b) => b.price - a.price))
  }

  const priceAsc = () => {
    setInventory([...inventory]?.sort((a, b) => a.price - b.price))
  }

  // PAGE CHANGE / VIEW FUNCTIONS
  const viewHome = () => {
    setPage('home')
    setLoginError(false)
  }

  const viewShop = () => {
    setPage('shop')
    setLoginError(false)
  }

  const viewCart = () => {
    setPage('cart')
    setLoginError(false)
    calculateTotal()
  }

  const viewLogin = () => {
    setPage('login')
    setLoginError(false)
  }

  const viewCreate = () => {
    setPage('create')
    setLoginError(false)
  }

const viewCheckout = () => {
    setPage('total')
}

  useEffect(() => {
    getInventory()
    getCart(currentUser)
  }, [])

  useEffect(() => {
    localStorage.setItem('currentUser', currentUser)
  }, [currentUser])

  return (
    <>
      <Header viewHome={viewHome} viewShop={viewShop} viewCart={viewCart} cart={cart} totalQuantity={totalQuantity} />

      <button onClick={logoutUser}>Log Out</button>

      {page === 'login' ?
        <Login getUserAccount={getUserAccount} viewCreate={viewCreate} />
      : null}

      {page === 'create' ?
        <CreateAccount handleCreateNewUser={handleCreateNewUser} viewLogin={viewLogin} />
      : null}

      {loginError ? <h3 className='error-msg'>Wrong email or password!</h3> : null}

      {page === 'home' ?
        inventory ? <Index inventory={inventory} /> : null
      : null}

      {page === 'shop' ?
        <>
          <input className='search' placeholder = 'Search by item name' onChange = {event => setQuery(event.target.value)}/>
          <div className = 'filterContainer'>
            <button className = 'filter' onClick = {priceDesc}>Price High to Low</button>
            <button className = 'filter' onClick = {priceAsc}>Price Low to High</button>
            <button className = 'filter' onClick = {getInventory}>Reset Filters</button>
          </div>
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
                  <DisplayItem inventoryItem={inventoryItem} handleAddToCart={handleAddToCart} currentUser={currentUser} checkDuplicate={checkDuplicate} />
                </div>
              )
            })}
          </div>
        </>
      : null}

      {page === 'cart' ?
        currentUser && currentUser !== 'null' ?
          <div>
            {cart?.map((cartItem) => {
              return (
                <div key={cartItem.id}>
                  <Cart cartItem={cartItem} totalPrice={totalPrice} updateCart={updateCart} calculateTotal={calculateTotal} handleDelete={handleDelete}/>
                </div>
              )
            })}
            <button onClick={deleteCart}>Empty the cart</button>
            <button onClick={viewCheckout}>Proceed to checkout</button>
          </div>
        : viewLogin()
      : null}
      {page === 'total' ?
      <Total totalPriceHumanize={totalPriceHumanize} totalPrice={totalPrice} totalQuantity={totalQuantity} viewCart={viewCart}/> : null}
    </>
  )
}

export default App
