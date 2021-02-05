# [Twofish](https://richardkentng.github.io/two-fishes/)

### Decription:
A dating site where users can view profiles and contact information, and filter results based off gender and country!

![twofish](/images/twofish.png)

### Technologies Used:
- HTML
- CSS
- Javascript
- randomuser.me (API)

### User Stories:
##### MVP GOALS:
- (Bronze) As a user, when I click “male” or “female”, I only want to view profiles of that gender.
- (Bronze) As a user, when I click “next”, I want to view another user profile that meets the parameters specified above.
##### STRETCH GOALS:
- (Silver) As a user, I can click “either” to view both male and female profiles.
- (Silver) As a user, I can click “age range” to specify an age range.
- (Silver) As a user, I can click “prev fish” to see previous profile.
- (Gold) As a user, I can click “save fish” to save profile.  
- (Gold) As a user, I can click “pond” to view saved profiles.
- (Gold) As a user, when I click “save fish”, I want an animation of a fish to travel from the “save” button to the “pond” button.


## Bronze Layout
- User can choose to view only male or female profiles.
- User can click “next fish” to see another profile.
![bronze](/images/bronze.png)



## Silver Layout
- User can click “either” to view both male and female profiles.
- User can click “age range” to specify an age range.
- User can click “prev fish” to see previous profile.
![gold](/images/silver.png)



## Gold Layout
- User can click “save fish” to save profile.  
- User can click “pond” to view saved profiles.
![silver](/images/gold.png)


### Unsolved Problems
##### CORS error:
Sometimes, without explanation, the API will fail to fetch,
and will catch a CORS error.  When this happens 3 times in a
row, I will show the user an alert, asking them to wait for a
moment before continuing.
![silver](/images/cors.png)

### Bugs
Although the gender-selection works flawlessly,
the country-selection occassionaly ignores the 
selected country, and displays random countries
instead.

### Major hurdle
##### How to detect a change in search parameters?:
I needed to figure out a way to detect whether that search parameters were
changed between each click of the 'Next' button.  I realized that I could 
save all the search-paramter values at specific times, so that I could 
reference them later.
```
//the function below will record the current search parameters

//Whenever the user clicks 'Next', these remembered values will be checked.

//If current values are different than the remembered values, this means
//that at least one search paramter has been changed.  As a result, the API
//must run, so that it can attain a new array of results that match the 
//search parameters.

const updateRemValues = () => {
    remMale = male;
    remEither = either;
    remFemale = female;
    remCountryValue = selectCountry.value;
}
```

### Smart coding
##### API fetches at least 100 results at a time.
I do not want to run the API everytime the user presses 'Next'. 
That would take too long, and it would risk more API errors.
Instead, I wanted to grab at least a hundred results at a time,
so that I can strike a balance between user effciency and risk
of overwhelming the API.

```
let numResults = 100
fetch(`https://randomuser.me/api/?results=${numResults}`)
```
### Cool features
##### Progress bar:  
No application is complete without some kind of progress bar!
This baby simply uses two numbers, the current index, and the array length,
and divides them and stuff in order to get a percentage that I can feed into
the CSS width percentage of my progress bar.
```
//update progress bar
function updateFirst() {
    //calculate percentage fraciton
    const num1 = currentIndex + 1;
    const num2 = peopleGbl.length;
    const fraction = num1/num2
    let percent = Math.floor(fraction * 100)
    if (percent === 99) {
        percent = 100;
    }
    first.style.width = `${percent}%`
}
```

### Final Thoughts
I'm satisfied with what I was able to acccomplish in one week.
The look is good and the funcitonality is mostly good.
However, there are still bugs that need exploring, CORS errors
that need better handling, more inputs and features that need to be 
added, such as an age-range input, a loading animation, a media query 
to adjust the page on smaller screen widths, etc.  I plan to keep updating 
this project in the future!


