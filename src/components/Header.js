import React from 'react'

const Header = (props) => {
    return (
        <header className = 'sticky'>
            <img className = 'logo' src = 'https://i.imgur.com/wBJCpvz.png' onClick={props.viewHome}/>
            <h2 onClick={props.viewShop}>Inventory</h2>
            <h3 onClick={props.viewCart}><img src='https://i.imgur.com/TZQTAwq.png' onClick={props.viewCart}/>({props.cart?.length})</h3>
        </header>
    )
}

export default Header
