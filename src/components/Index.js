import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Index = (props) => {
    const [inventory, setInventory] = useState([])
    const [x, setX] = useState(0)

    const getInventory = () => {
      axios.get('https://the-shop-back-end.herokuapp.com/api/inventory').then((response) => {
        setInventory(response.data)
        console.log(response.data)
      })
    }

    useEffect(() => {
      getInventory()
    }, [])

    const prevImage = () => {
        setX(x-1)
    }

    const nextImage = () => {
        setX(x+1)
    }


    return (
        <>
        {x - 1 < 0 ?  null : <button onClick = {prevImage}>Previous</button>}
        <img src = {inventory[x].image}/>
        {x + 1 > (inventory.length - 1) ? null : <button onClick = {nextImage}>Next</button>}
        </>
    )

}

export default Index
