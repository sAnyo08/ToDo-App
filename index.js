import { initializeApp }from"https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js"
//const { initializeApp } = require("https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js");
import { getDatabase, ref, push ,onValue, remove}from"https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
//const { getDatabase, ref, push } = require("https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js");


const appSettings = {
    databaseURL:"https://psgr-d714c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesIn = ref(database, "movies")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const ListEl = document.getElementById("MoviesList");


addButtonEl.addEventListener("click",function(){
    let inputValue = inputFieldEl.value
    push(moviesIn, inputValue)
    clearInputFieldEl()

})

onValue(moviesIn,function (snapshot){
    if(snapshot.exists()){
        let movArray = Object.entries(snapshot.val())

        clearMovieListEl()
        for (let i=0;i<movArray.length;i++){
            let currentMovie=movArray[i]
            let currentMovieID = currentMovie[0]
            let currentMovieValue = currentMovie[1]
            innerML(currentMovie)

        }
    }
    else {
        ListEl.innerHTML = "Your tasks are done"
    }
})

function clearMovieListEl(){
    ListEl.innerHTML=""
}
function clearInputFieldEl(){
    inputFieldEl.value = ""

}
function innerML(Movie){
    let MovieID = Movie[0]
    let MovieValue = Movie[1]
    let newEl = document.createElement("li")
    newEl.textContent = MovieValue

    newEl.addEventListener("click",function(){
        let exactlocation = ref(database,`movies/${MovieID}`)
        remove(exactlocation)
    })
    ListEl.append(newEl)
}
