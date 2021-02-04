
console.log('------------------sanity check -----------------------');

let currentIndex = null;
let peopleGbl = [];
let personGbl = [];

let male = false;
let either = true;
let female = false;


//store button elements
const btnMale = document.querySelector('.btn-male')
const btnEither = document.querySelector('.btn-either')
const btnFemale = document.querySelector('.btn-female')

const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')

btnPrev.disabled = true;






const removeBluesOnGenderButtons = () => {
    btnMale.classList.remove('btn-disabled')
    btnEither.classList.remove('btn-disabled')
    btnFemale.classList.remove('btn-disabled')
}

const clickMale = () => {
    male = true;
    female = false;
    either = false;
    removeBluesOnGenderButtons();
    btnFemale.classList.toggle('btn-disabled')
    btnEither.classList.toggle('btn-disabled')

}
const clickEither = () => {
    either = true;
    male = false;
    female = false;
    removeBluesOnGenderButtons();
    btnMale.classList.toggle('btn-disabled')
    btnFemale.classList.toggle('btn-disabled')    
}
const clickFemale = () => {
    female = true;
    male = false;
    either = false;
    removeBluesOnGenderButtons();
    btnMale.classList.toggle('btn-disabled')
    btnEither.classList.toggle('btn-disabled')    
}

//add event listeners to male, either, female buttons
btnMale.addEventListener('click',clickMale)
btnEither.addEventListener('click',clickEither)
btnFemale.addEventListener('click',clickFemale)

// update picture
const updatePicture = () => {
    const img = document.querySelector('.pic')
    const newSrcValue = personGbl.picture.large
    img.setAttribute('src',`${newSrcValue}`)
}


//update textContent of informational paragraphs-elements 
const updateInfo = () => {
    //select informational elements to alter
    const nameEl = document.querySelector('.name-value');
    const ageEl = document.querySelector('.age-value');
    const locationEl = document.querySelector('.location-value');
    const phoneEl = document.querySelector('.phone-value');
    //console.log(nameValue, ageValue, locationValue, phoneValue);

    //assign user's information to variables
    const nameValue = `${personGbl.name.first} ${personGbl.name.last}`;
    const ageValue = `${personGbl.dob.age}`;
    const locationValue = `${personGbl.location.city}, ${personGbl.location.country}`;
    const phoneValue = `${personGbl.phone}`
    
    //display information by using accessing textContent
    nameEl.textContent = nameValue
    ageEl.textContent = ageValue
    locationEl.textContent = locationValue
    phoneEl.textContent = phoneValue
    //console.log(nameValue, ageValue, locationValue, phoneValue);
}


    const filterGender = () => {
        // console.log('enterFilterGender');
        // console.log('peopleGbl:', peopleGbl);
        const peopleGendered = [];

        for (let i = 0; i < peopleGbl.length; i++) {
            // const msg = male ? "check user for male":"check user for female";
            // console.log(msg)

            if (male) {
                if (peopleGbl[i].gender === "male") {
                    peopleGendered.push(peopleGbl[i]);
                }
            } else if (female) {
                if (peopleGbl[i].gender === "female") {
                    peopleGendered.push(peopleGbl[i]);
                }
            }
        }   //end for loop 

        if (peopleGendered.length === 0) {
            console.log('%c peopleGendered array is empty!','color: red; background: black;');
        }

        peopleGbl = peopleGendered.slice()
        // for (let i = 0; i < peopleGbl.length; i++) {
        //     console.log(peopleGbl[i].gender);
        // }
    }   //end of function: filterGender



let remMale = null;
let remEither = null;
let remFemale = null;


    const clickNext = () => {

        let sameParamaters = true;
        if (remMale === null) {
            remMale = male;
            remEither = either;
            remFemale = female;
        } else {
            if ((remMale !== male) || (remEither !== either) || (remFemale !== female)) {
                sameParamaters = false;
                remMale = male;
                remEither = either;
                remFemale = female;                
            }
        }

       if ((remMale === null) || (!sameParamaters) || (currentIndex + 1 > peopleGbl.length - 1))
       {
            console.log('%c gunna run fetch','color: lime; background: black;');

            fetch('https://randomuser.me/api/?results=100')
            .then((responseData) => {
                return responseData.json()
            })
            .then((jsonData) => { //THENTEHNTEHNTEHNEHTENETHENTHENETHENTHETNETHENTEHTNEHTEN
                console.log('%c --------------.then top-----------','color: lime; background: black;');

                //get array of people objects
                peopleGbl = jsonData.results;  

                if (!either) {
                    filterGender()
                }

                currentIndex = 0;
                personGbl = peopleGbl[currentIndex];
                updatePicture();
                updateInfo();
                console.log('%c --------------.then bot-----------','color: lime; background: black;');
            })  // end .then
    } else {
        //search paramaters are the same!  Thre are still more matches in array!
        currentIndex++;        
        console.log(`${currentIndex}/${peopleGbl.length - 1}`)
        personGbl = peopleGbl[currentIndex]
        updatePicture();
        updateInfo();
    }


    }   //end clickNext function


    //add listener to btnNext
    btnNext.addEventListener('click',clickNext)

    clickEither()
    clickNext()




    function z() {
        console.log('male',remMale);
        console.log('either',remEither);
        console.log('female',remFemale);
    }