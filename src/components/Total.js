const Total = (props) =>{

  return(
  <>
  <div className="parent-flex">
    <div className="details">
      <div className="address">
        <div className="street1">
          <h4>Shipping Address</h4>
          <p>(Name)</p>
          <p>(Street)</p>
          <p>(City, State)</p>
          <p>(Phone)</p>
        </div>
        <div className="street2">
          <div>
          <h4 className="payment">Payment method</h4>
          Visa ending in XXX
          </div>
          <div>
          <h4>Billing address</h4>
          Same as shipping address
          </div>
        </div>
        <div className="street3">
          <h4>Add a gift card, promtion code, or voucher</h4>
          <input className="voucher" type="text" placeholder="Enter Code"/>
          <input type="submit" value="Apply"/>
        </div>
      </div>
      <div className="delivery">
        <div className="options">
        <h4>Choose a delivery option:</h4>
        <div className="input" >
          <input type="radio" value="Free"/>
          <label for="Free"><span className="green">Free One-Day Delivery</span><br/>
          With your trial of TheShop platinum plus
          </label>
        </div>
        <div className="input" >
          <input type="radio" value="Free"/>
          <label for="Free"><span className="green">Friday, December 25</span><br/>
          FREE Shipping
          </label>
        </div>
        <div className="input" >
          <input type="radio" value="Free"/>
          <label for="Free"><span className="green">Tuesday, September 7</span><br/>
          $5.99 - Shipping
          </label>
        </div>
        <div className="input">
          <input type="radio" value="Free"/>
          <label for="Free"><span className="green">Wednesday, July 14</span><br/>
          $12.00 - Shipping
          </label>
        </div>
        </div>
      </div>
    </div>
    <div className="total">
      <div className="place-order">
        <button>Place your order</button>
        <p>By placing your order, you agree to our <span className="blue">privacy notice</span> and <span className="blue">conditions of use</span> which don't exist.</p>
      </div>
      <div className="order-summary">
        <h5>Order Summary</h5>
      </div>
      <div className="order-items">
        <div>
          <p>Items ({props.totalQuantity}):</p>
        </div>
        <div>
          <p className = 'inline'>$</p>
          <p className = 'inline'>{props.totalPriceHumanize}</p>
          <p className = 'inline'>.00</p>
        </div>
      </div>
      <div className="order-items">
        <div>
          <p>Shipping & handling:</p>
        </div>
        <div>
          <p>${(props.totalPrice * .08).toFixed(2)}</p>
        </div>
      </div>
      <div className="order-items">
        <div>
          <p>Processing fee:</p>
        </div>
        <div>
          <p>${(props.totalPrice * .02).toFixed(2)}</p>
        </div>
      </div>
      <div className="order-items">
        <div>
          <p>Delivery fee:</p>
        </div>
        <div>
          <p>${(props.totalPrice * .05).toFixed(2)}</p>
        </div>
      </div>
      <div className="order-items">
        <div>
          <p>Convenience fee:</p>
        </div>
        <div>
          <p>${(props.totalPrice * .1).toFixed(2)}</p>
        </div>
      </div>
      <div className="order-items">
        <div>
          <p>(Non-descript fee):</p>
        </div>
        <div>
          <p className="underline">${(props.totalPrice * .2).toFixed(2)}</p>
        </div>
      </div>
      <div className="order-items">
        <div>
          <p>Total before Tax:</p>
        </div>
        <div>
          <p>${(props.totalPrice + (props.totalPrice*.08) + (props.totalPrice*.02) + (props.totalPrice*.05) + (props.totalPrice*.1)+(props.totalPrice * .2)).toFixed(2)}</p>
        </div>
      </div>
      <div className="order-items bottom-border">
      <div>
        <p>Estimated tax:</p>
      </div>
      <div>
        <p>${(props.totalPrice * .08).toFixed(2)}</p>
      </div>
      </div>
      <div className="order-total">
        <div>
          <h3>Order Total:</h3>
        </div>
        <div>
          <h3>${(props.totalPrice + (props.totalPrice*.08) + (props.totalPrice*.02) + (props.totalPrice*.05) + (props.totalPrice*.1)+(props.totalPrice * .2)+(props.totalPrice * .08)).toFixed(2)}</h3>
        </div>
      </div>
      <div className="order-bottom">
        <div>
          <p>How are shipping costs calculated? We really would like to know.</p>
        </div>
      </div>
    </div>
  </div>
  <button onClick={props.viewCart}>Return to Cart</button>
  </>
  )
}

export default Total
