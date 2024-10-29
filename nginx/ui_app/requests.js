// requests.js

// Function to send POST request
async function sendPostRequest(event) {
    event.preventDefault(); // Zapobiega przeładowaniu strony

    // Pobieranie danych z formularza
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const role = document.getElementById("role").value;
    const agree = document.getElementById("agree").checked;

     // Sprawdzenie, czy polityka prywatności została zaakceptowana
     if (!agree) {
        alert("Musisz zaakceptować politykę prywatności.");
        return;
    }

    const data = {
        firstName: firstName,
        lastName: lastName,
        role: role
    };

    try {
        const response = await fetch("http://localhost:8000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        document.getElementById("postResponse").textContent = JSON.stringify(responseData, null, 2);
        // refresh the list after adding an user
        fetchUsers();

    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteUser(index) {
    const url = `http://localhost:8000/${index}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const responseData = await response.json();
        document.getElementById("deleteResponse").textContent = JSON.stringify(responseData, null, 2);

        fetchUsers();
    }
    catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsers() {
    const url = 'http://localhost:8000';
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayUsers(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';

    users.forEach((user, index) => {
        const userElement = document.createElement('div');

        // Tworzymy element <span> dla informacji o użytkowniku
        const userInfo = document.createElement('span');
        userInfo.classList.add('user-info');
        userInfo.textContent = `${user.firstName} ${user.lastName} - ${user.role}`;

        // Tworzymy przycisk usuwania
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Usuń';
        deleteButton.onclick = function() {
            deleteUser(index);
        };

        // Dodajemy elementy do kontenera użytkownika
        userElement.appendChild(userInfo);
        userElement.appendChild(deleteButton);

        // Dodajemy kontener użytkownika do listy
        usersList.appendChild(userElement);
    });
}



window.addEventListener('load', function() {
    // Nasłuchiwanie na zdarzenie 'submit' formularza o id 'userForm'
    document.getElementById('userForm').addEventListener('submit', sendPostRequest);
    
    // Pobierz początkową listę użytkowników
    fetchUsers();
});