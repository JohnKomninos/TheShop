const Total = (props) =>{

  return(
  <>
  <div className="total">
    <div className="place-order">
      <button>Place your order</button>
      <p>By placing your order, you agree to our privacy notice and conditions of use which don't exist</p>
    </div>
    <div className="order-summary">
      <h5>Order Summary</h5>
    </div>
    <div className="order-items">
      <div>
        <p>Items ("total # of items"):</p>
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
        <p>${props.totalPrice * .08}</p>
      </div>
    </div>
    <div className="order-items">
      <div>
        <p>Total before Tax:</p>
      </div>
      <div>
        <p>25</p>
      </div>
    </div>
    <div className="order-items">
    <div>
      <p>Estimated tax to be collected</p>
    </div>
    <div>
      <p>25</p>
    </div>
    </div>
    <div className="order-items">
      <div>
        <h2>Order Total:</h2>
      </div>
      <div>
        <h2>700</h2>
      </div>
    </div>
  </div>
  </>
  )
}

export default Total
