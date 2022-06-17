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
            <div className='welcome-msg'>
                <h1>Welcome to The Shop</h1>
                <h2><i>your destination for everything you don't need</i></h2>
                <h3>Check out these <span>red hot</span> deals! Be sure to head over to our inventory page to see more.</h3>
            </div>
            <div className='carousel-container'>
                {imageIndex - 1 < 0 ? null : <button onClick={prevImage}>Prev</button>}
                <div className='carousel-item'>
                    {inventory ? <img className='carousel-img' src={inventory[imageIndex].image} /> : null}
                    {inventory ? <p>{inventory[imageIndex].title} - <b>only ${inventory[imageIndex].price}!</b></p> : null}
                </div>
                {imageIndex + 1 > inventory.length - 1 ? null : <button onClick={nextImage}>Next</button>}
            </div>
        </>
    )
}

export default Index
