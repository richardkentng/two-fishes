
console.log('------------------sanity check -----------------------');

function sel(string) {
    return document.querySelector(string)
}

//grab first element
const first = sel('.first')

//update progress bar
function updateFirst() {
    console.log('%c WOOT YEAH!','color: lime; background: magenta;');
    //calculate percentage fraciton
    const num1 = currentIndex + 1;
    const num2 = peopleGbl.length;
    const fraction = num1/num2
    let percent = Math.floor(fraction * 100)
    console.log('num1', num1);
    console.log('num2',num2);
    console.log('percent',percent);
    if (percent === 99) {
        percent = 100;
    }
    first.style.width = `${percent}%`
    console.log('widfirstth should be set!!!!!!!!');

}


//first.style.width = "50%";





const countries = ["select country","Australia", "Brazil", "Canada", "Denmark", "Finland", "France", "Germany", "Iran", "Ireland", "Netherlands", "New Zealand", "Norway", "Spain", "Switzerland", "Turkey", "United Kingdom", "United States"]

//create drop-down menu to select country
const selectCountry = document.querySelector('.select-country')
countries.forEach((country) => {
    const newCountryOption = document.createElement('option')
    if (country === "select country") {
        newCountryOption.setAttribute('class','select-country')
    }
    newCountryOption.textContent = country;
    newCountryOption.setAttribute('value',country)
    selectCountry.appendChild(newCountryOption)
})

let sameParameters = true;


let numResults = 100;

let currentIndex = null;
let peopleGbl = [];
let personGbl = [];

let remMale = null;
let remEither = null;
let remFemale = null;
let remCountryValue = null;

let male = false;
let either = true;
let female = false;

let conErrors = 0;



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
    ageEl.innerHTML = `&nbsp;&nbsp;&nbsp;${ageValue}`
    locationEl.textContent = locationValue
    phoneEl.textContent = phoneValue
    //console.log(nameValue, ageValue, locationValue, phoneValue);

    //increase spacing before country-select based on length of city
        //select paragraph element of leftof-select-country
        const leftofSelectCountryValue = document.querySelector('.leftof-select-country')
        //select value from person - city 
        const cityLength = personGbl.location.city.length
        const extraSpacesBeforeSelectCountryBasedOnCityLength = "&nbsp;".repeat(cityLength)
        //add value to end of leftof-select-country textContent 
        leftofSelectCountryValue.innerHTML = extraSpacesBeforeSelectCountryBasedOnCityLength

    //replace innerHTML for first recolor with space
    document.querySelector('#recolor1').innerHTML = "&nbsp";


    //center class:  cont-info
    // const contInfo = document.querySelector('.cont-info')
    // const contIntro = document.querySelector('.cont-intro')
    // contIntro.style.marginLeft = "20px";
}


    const filterGender = () => {
        const peopleGendered = [];

        for (let i = 0; i < peopleGbl.length; i++) {
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

        peopleGbl = peopleGendered.slice()
    }   //end of function: filterGender


const filterCountry = () => {
    const countriedPeople = [];
    //push people of correct country into countriedPeople array
    peopleGbl.forEach((person) => {
        if (person.location.country === selectCountry.value) {
            countriedPeople.push(person)
        }
    })

    
    if (countriedPeople.length === 0) {
        console.log('%c CountriedPeople array is empty!  Going to rerun fetch.','color: yellow; background: black');
        if (numResults * 2 > 500) {
            numResults = 500; 
        } else {
            numResults *= 2;
        }
        clickNext()
    } else {
        numResults = 100;
        peopleGbl = countriedPeople.slice()
    }
}


    const updateRemValues = () => {
        remMale = male;
        remEither = either;
        remFemale = female;
        remCountryValue = selectCountry.value;
    }


    const clickNext = () => {
        console.log('%c YOU CLICKED NEXT','color: yellow; background: black;');
        //load gif animation
        const pic = document.querySelector('.pic')
        console.log('new stuff',pic);
        pic.setAttribute('src','https://thumbs.dreamstime.com/b/blue-illustration-two-fish-love-heart-21147009.jpg')
        
        if (remMale === null) {
            updateRemValues();
        } else {
            //are parameters the same or different from last time?
            if ((remMale !== male) || (remEither !== either) || (remFemale !== female) || (remCountryValue !== selectCountry.value)) {
                sameParameters = false;
                updateRemValues();             
            } else {
                sameParameters = true;
            }
        }

        //run fetch if page is first loading up, if search parameters change, or if array has no more persons
       if ((remMale === null) || (!sameParameters) || (currentIndex + 1 > peopleGbl.length - 1))
       {
            btnNext.disabled = true;
            if (!sameParameters) {
                console.log('%c DIFFERENT PARAMETERS INITIATED FETCH','color: cyan; background: black;');
            }
            console.log('%c gunna run fetch','color: lime; background: black;');

            fetch(`https://randomuser.me/api/?results=${numResults}`).then((res) => res.json()).then((jsonData) => {

                console.log('%c --------------.then top-----------','color: lime; background: black;');

                //globalize fresh array of persons
                peopleGbl = jsonData.results;  

                //if male or female is selected, then filter by gender
                if (!either) {
                    filterGender()
                }

                //if a country is selected, then filter by country
                if (selectCountry.value !== "select country") {
                    filterCountry()
                }

                currentIndex = 0;
                updateFirst()
                personGbl = peopleGbl[currentIndex];
                updatePicture();
                updateInfo();
                console.log('%c --------------.then bot-----------','color: lime; background: black;');
                console.log(`%cmatches: ${peopleGbl.length}`,'color: pink;','     total:',`${numResults}`);
                btnNext.disabled = false;

                //disable prev after running fetch
                btnPrev.disabled = true; 

            })
            .catch((error) => {
                btnNext.disabled = false;
                conErrors++
                if (conErrors === 3) {
                    conErrors = 0;
                    alert('API encountered 3 consecutive errors.  Please wait a moment before trying again.')
                } else {
                    console.log(`%c RAN INTO ERROR.  WILL clickNext.  Error consecutives: ${conErrors}`,'color: magenta; background: black;');
                    clickNext()
                }
            })
    } else {
        //page did not just load up, search paramaters are the same, and there are still more matches in array!
        currentIndex++;
        updateFirst()        
        console.log(`${currentIndex + 1}/${peopleGbl.length}`)
        personGbl = peopleGbl[currentIndex]
        updatePicture();
        updateInfo();


        //control btnPrev display
        if (currentIndex - 1 >= 0) {
            btnPrev.disabled = false;
            //console.log('button enabled because its possuble');
        } else {
            btnPrev.disabled = true;
            //console.log('button disabled because its not possible');
        }
    }


    }   //end clickNext function


    //add listener to btnNext
    btnNext.addEventListener('click',clickNext)
    //add listener to btnPrev
    btnPrev.addEventListener('click', () => {
        console.log('YOU CLICKED %C PREV','color: yellow; background: black;');
        currentIndex = currentIndex  - 2;
        clickNext()
    })

    selectCountry.addEventListener('change',() => {
        console.log(`%c${selectCountry.value}`,'color: orange; background: black;');
    })

    clickEither()
    clickNext()