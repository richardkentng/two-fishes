console.log('your insane check');


// let either = true;
// let male = false;
// let female = false;

// const selMale = () => {
//     male = true;
//     female = false;
//     either = false;
// }
// const selFemale = () => {
//     female = true;
//     male = false;
//     either = false;
// }
// const selEither = () => {
//     either = true;
//     male = false;
//     female = false;
// }



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

    
    const hitNext = () => {
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
    btnNext.addEventListener('click',hitNext)

