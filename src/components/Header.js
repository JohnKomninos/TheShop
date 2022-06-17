import React from 'react'

const Header = (props) => {
    return (
        <header className = 'sticky'>
            <img className = 'logo' src = 'https://i.imgur.com/wBJCpvz.png' onClick={props.viewHome}/>
            <h2 onClick={props.viewShop}>Inventory</h2>
            <div>
            <h3 onClick={props.viewCart} onMouseDown={props.userCart} onTouchStart={props.userCart}><img src='https://i.imgur.com/TZQTAwq.png'/>({props.cart?.length})</h3>
            </div>
        </header>
    )
}

export default Header
