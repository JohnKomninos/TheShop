import React, {useState} from 'react'

const Index = (props) => {
    const [imageIndex, setImageIndex] = useState(0)
    const [inventory, setInventory] = useState([...props.inventory])

    const nextImage = () => {
        setImageIndex(imageIndex + 1)
    }

    const prevImage = () => {
        setImageIndex(imageIndex - 1)
    }

    return (
        <>
            {imageIndex - 1 < 0 ? null : <button onClick={prevImage}>Prev</button>}
            {inventory ? <img src={inventory[imageIndex].image} /> : null}
            {imageIndex + 1 > inventory.length - 1 ? null : <button onClick={nextImage}>Next</button>}
        </>
    )
}

export default Index