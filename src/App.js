import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayItem from './components/DisplayItem'

const App = () => {

  const [inventory, setInventory] = useState()

  const getInventory = () => {
    axios.get('https://the-shop-back-end.herokuapp.com/api/inventory').then((response) => {
      setInventory(response.data)
    })
  }

  useEffect(() => {
    getInventory()
  }, [])

  return (
    <>
      <h1>Welcome to The Shop!</h1>
      {inventory?.map((inventoryItem) => {
        return <DisplayItem inventoryItem={inventoryItem} />
      })}
    </>
  )
}

export default App