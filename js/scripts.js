// ELEMENT SELECTORS
const gallerySection = document.getElementById("gallery")

const modalWindow = document.querySelector(".modal-container")
const modalContent = document.querySelector(".modal-info-container")
const modalCloseButton = document.querySelector(".modal-close-btn")
const modalPrevButton = document.querySelector("#modal-prev")
const modalNextButton = document.querySelector("#modal-next")

const searchText = document.getElementById("search-input")
const searchSubmit = document.getElementById("search-submit")

// GLOBAL VARIABLES
let userDirectory;
let currentModalIndex;

// GLOBAL CONSTANTS
const ENTRIES_MAX_INDEX = 11
const NO_MATCHES = `<h4> No matching records - Please search again </h4>`

// FETCH METHODS
async function getUsers () {
    try {
        const users = await fetch("https://randomuser.me/api/?results=12")
            .then(response => response.json())
        userDirectory = users.results
        directoryGenerator(userDirectory)
    }
    catch (error) {
        console.log(`Something went wrong - ${error}`)
    }
}

// HTML CARD CREATION METHODS
function directoryGenerator (userRecords) {
    console.log(userRecords.length)
    if (userRecords.length <= 0) {
        gallerySection.innerHTML = NO_MATCHES
    } else {
        let userCards = ""
        for (let i = 0; i < userRecords.length; i++) {
            let user = userRecords[i]
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
}

// MODAL WINDOW GENERATION METHOD
function generateModalWindow (username) {
    let modalRecord = searchDirectory(username)
    console.log(modalRecord)
    console.log(modalRecord.cell)

    //Format the Birthday Info
    let userDOBArray = modalRecord.dob.date.split("T")[0].split("-")
    let userDOBDate = `${userDOBArray[1]}/${userDOBArray[2]}/${userDOBArray[0]}`

    let modalInfo = `
        <img class="modal-img" src="${modalRecord.picture.medium}" alt="profile picture for ${username}">
        <h3 id="name" class="modal-name cap">${username}</h3>
        <p class="modal-text">${modalRecord.email}</p>
        <p class="modal-text cap">${modalRecord.location.city}</p>
        <hr>
        <p class="modal-text">${modalRecord.cell}</p>
        <p class="modal-text">${modalRecord.location.street.number} ${modalRecord.location.street.name}</p>
        <p class="modal-text">${modalRecord.location.state} ${modalRecord.location.postcode}</p>
        <p class="modal-text">Birthday: ${userDOBDate}</p>
    `

    modalContent.innerHTML = modalInfo
}

// HELPER FUNCTIONS
function searchDirectory(username) {
    for (let i = 0; i < userDirectory.length; i++) {
        let directoryUser = userDirectory[i]
        let directoryName = getFullName(directoryUser)
        if (directoryName.includes(username)) {
            currentModalIndex = i
            return directoryUser
        }
    }
    return null
}

function searchForMatches(searchTerm) {
    let matchedUsers = []
    for (let i = 0; i < userDirectory.length; i++) {
        let directoryUser = userDirectory[i]
        let directoryName = getFullName(directoryUser).toLowerCase()
        if (directoryName.includes(searchTerm)) {
            matchedUsers.push(directoryUser)
        }
    }
    return matchedUsers
}

function getFullName(userEntry) {
    return `${userEntry.name.title} ${userEntry.name.first} ${userEntry.name.last}`
}

// EVENT LISTENER for SEARCH BAR INPUT
searchSubmit.addEventListener("click", () => {
    let searchTerm = searchText.value
    let matchedUsers = searchForMatches(searchTerm)
    directoryGenerator(matchedUsers)
})

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

modalPrevButton.addEventListener("click", () => {
    if (currentModalIndex - 1 >= 0) {
        currentModalIndex -= 1
    } else {
        currentModalIndex = ENTRIES_MAX_INDEX
    }

    let currentUser = getFullName(userDirectory[currentModalIndex])
    generateModalWindow(currentUser)
})

modalNextButton.addEventListener("click", () => {
    if (currentModalIndex + 1 <= ENTRIES_MAX_INDEX) {
        currentModalIndex += 1
    } else {
        currentModalIndex = 0
    }
    
    let currentUser = getFullName(userDirectory[currentModalIndex])
    generateModalWindow(currentUser)
})


//FUNCTION CALL
getUsers()
