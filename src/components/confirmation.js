import React, {useState} from 'react'

const Confirmation = (props) => {

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M" , "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  const confirmationNumber = []



  for(let i = 0; i < 3000; i++){
    confirmationNumber.push(numbers[Math.floor((Math.random()*36))])
  }

  return(
    <>
      <div className="flex-parent2">
        <div>
          <h1>Thank you for your order!!!! Your confirmation number is: </h1>
        </div>
        <div>
          <p>{confirmationNumber}</p>
        </div>
      </div>
      <button className="button" onClick={props.viewShop}>Return to shop page</button>
    </>
  )
}

export default Confirmation
