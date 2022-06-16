import React from 'react'

const Header = (props) => {
    return (
        <header className = 'sticky'>
            <img className = 'logo' src = 'https://i.imgur.com/wBJCpvz.png'/>
            <h2 onClick={props.viewHome}>Home</h2>
            <h2 onClick={props.viewShop}>Shop</h2>
            <img src='https://cdn-icons-png.flaticon.com/512/1170/1170678.png' onClick={props.viewCart} />
            <h3 className = 'cartLength'>{props.cart?.length}</h3>
        </header>
    )
}

export default Header
