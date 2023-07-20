import React, {useState} from "react"

//generate a random 6 digits code
function generateRandomCode() {
    let lastDigit = 0;
    let code = '';
    //repeats until the code has 6 numbers
    while (code.length !== 6) {
      let digit = generateNumber();
      if (code.length > 0) {
        //if the last digit is equal, less or grater than the new digit, it regenerate anotherone
        if (lastDigit === digit + 1 || lastDigit === digit - 1 || lastDigit === digit) {
          continue;
        }
      }
      //add the digit to the code
      code += digit;
      //update the last digit
      lastDigit = digit;
    }
    
    return code;
}
  //generate a random number from 0-9
function generateNumber() {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber;
}

//validation code of the 2fa
const validationCode = generateRandomCode();

export const Validation = () =>{
    const [code,setCode] = useState('');
    const [showMessageCorrect, setShowMessageCorrect] = useState(false);
    const [showMessageIncorrect, setShowMessageIncorrect] = useState(false);


    //if the code is correct shows the message
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(code === validationCode){
            setShowMessageIncorrect(false);
            setShowMessageCorrect(true);
            console.log('Code correct');
        }
        if(code !== validationCode){
            setShowMessageCorrect(false);
            setShowMessageIncorrect(true);
            console.log('Please try again, the validation code is incorrect');
        }
    }
    const handleClick = async(e) => {
        e.preventDefault();
        console.log('Validation code:');
        console.log(validationCode);
      };

    return (
        <form className="validation-form" >
            <label>For logging in, please enter the validation code </label>
            <div></div>
            <div></div>
            <label for = "code"> Validation Code </label>  
            <input value = {code} onChange={(e) => setCode(e.target.value)} type = "Code" placeholder="Enter the validation code" id= "code" name = "code"/>
            <button onClick={handleClick} type="Generate">generate code</button>
            <button onClick={handleSubmit} type="Verify">Verify</button>
            
            {showMessageCorrect && (
        <div>
          <p>Code correct!</p>
        </div>
      )}
        {showMessageIncorrect && (
        <div>
          <p>Code incorrect!</p>
        </div>
        )}
        </form>
    )
}