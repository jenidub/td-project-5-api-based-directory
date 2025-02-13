//ELEMENT SELECTORS
const gallerySection = document.getElementById("gallery")
const modalWindow = document.querySelector(".modal-container")
const modalContent = document.querySelector(".modal-info-container")
const modalCloseButton = document.querySelector(".modal-close-btn")
const searchSubmitButton = document.querySelector(".search-submit")

let userDirectory;
let currentUserIndex;

//FETCH METHODS
async function getUsers () {
    try {
        const users = await fetch("https://randomuser.me/api/?results=12")
            .then(response => response.json())
        userDirectory = users.results
        createUserCards(userDirectory)
    }
    catch (error) {
        console.log(`Something went wrong - ${error}`)
    }
}

//HTML CARD CREATION METHODS
function createUserCards () {
    let userCards = ""
    for (let i = 0; i < userDirectory.length; i++) {
        let user = userDirectory[i]
        const userHTML =
        `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `
        userCards += userHTML
    }
    gallerySection.innerHTML = userCards
}

// MODAL WINDOW GENERATION METHOD
function generateModalWindow (username) {
    let modalRecord
    for (let i = 0; i < userDirectory.length; i++) {
        let directoryUser = userDirectory[i]
        let directoryName = `${directoryUser.name.title} ${directoryUser.name.first} ${directoryUser.name.last}`
        if (directoryName === username) {
            currentUserIndex = i
            modalRecord = directoryUser
            break
        }
    }

    //Format the Birthday Info
    let userDOBArray = modalRecord.dob.date.split("T")[0].split("-")
    let userDOBDate = `${userDOBArray[1]}/${userDOBArray[2]}/${userDOBArray[0]}`

    let modalInfo = `
        <img class="modal-img" src="${modalRecord.picture.medium}" alt="profile picture for ${username}">
        <h3 id="name" class="modal-name cap">${username}</h3>
        <p class="modal-text">${modalRecord.email}</p>
        <p class="modal-text cap">${modalRecord.location.city}</p>
        <hr>
        <p class="modal-text"${modalRecord.phone}</p>
        <p class="modal-text">${modalRecord.location.street.number} ${modalRecord.location.street.name}, ${modalRecord.location.city}, ${modalRecord.location.state} ${modalRecord.location.postcode}</p>
        <p class="modal-text">Birthday: ${userDOBDate}</p>
    `

    modalContent.innerHTML = modalInfo
}

// EVENT LISTENERS for MODAL WINDOW TOGGLE
document.addEventListener("click", (e) => {
    let userDiv = e.target.closest(".card")
    if (userDiv) {
        let userName = userDiv.querySelector("#name").textContent
        generateModalWindow(userName)
        modalWindow.classList.toggle("hidden")
    }
})

modalCloseButton.addEventListener("click", () => {
    modalWindow.classList.toggle("hidden")
})

// EVENT LISTENER for SEARCH BAR INPUT


//FUNCTION CALL
getUsers()
