//ELEMENT SELECTORS
const gallerySection = document.getElementById("gallery")

//FETCH METHODS
async function getUsers () {
    try {
        const users = await fetch("https://randomuser.me/api/?results=12")
            .then(response => response.json())
        createUserCards(users.results)
    }
    catch (error) {
        console.log(`Something went wrong - ${error}`)
    }
}

//HTML CARD CREATION METHODS
function createUserCards (userData) {
    let userCards = ""
    for (let i = 0; i < userData.length; i++) {
        let user = userData[i]
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

//FUNCTION CALL
getUsers()
