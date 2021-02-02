console.log('your insane check');

let male = false;
let either = true;
let female = false;

//select the following buttons: btn-male, btn-either, btn-female
const btnMale = document.querySelector('.btn-male')
const btnEither = document.querySelector('.btn-either')
const btnFemale = document.querySelector('.btn-female')


const removeBtnDisabled = () => {
    btnMale.classList.remove('btn-disabled')
    btnEither.classList.remove('btn-disabled')
    btnFemale.classList.remove('btn-disabled')
}

const clickMale = () => {
    console.log('male maine');
    male = true;
    female = false;
    either = false;
    removeBtnDisabled();
    btnFemale.classList.toggle('btn-disabled')
    btnEither.classList.toggle('btn-disabled')

}
const clickEither = () => {
    console.log('eithe rman');
    either = true;
    male = false;
    female = false;
    removeBtnDisabled();
    btnMale.classList.toggle('btn-disabled')
    btnFemale.classList.toggle('btn-disabled')    
}
const clickFemale = () => {
    console.log('female man');
    female = true;
    male = false;
    either = false;
    removeBtnDisabled();
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
    const newSrcValue = people[0].picture.large
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

    const person = people[0];

    //assign user's information to variables
    const nameValue = `${person.name.first} ${person.name.last}`;
    const ageValue = `${person.dob.age}`;
    const locationValue = `${person.location.city}, ${person.location.country}`;
    const phoneValue = `${person.phone}`
    
    //display information by using accessing textContent
    nameEl.textContent = nameValue
    ageEl.textContent = ageValue
    locationEl.textContent = locationValue
    phoneEl.textContent = phoneValue
    //console.log(nameValue, ageValue, locationValue, phoneValue);
}

    
    const clickNext = () => {
        fetch('https://randomuser.me/api/')
        .then((responseData) => {
            return responseData.json()
        })
        .then((jsonData) => { 
            people = jsonData.results;
            console.log(people[0])
            updatePicture();
            updateInfo();
        })
    }


    //select btn-next, add listener
    const btnNext = document.querySelector('.btn-next')
    btnNext.addEventListener('click',clickNext)

