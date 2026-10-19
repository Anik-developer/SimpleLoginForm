const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Open a blank window/tab immediately to prevent popup blockers
    const newWindow = window.open('', '_blank');

    const nameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const loginData = {
        username: nameInput,
        password: passwordInput
    };

    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        // Get the HTML string returned by Java
        const htmlResponse = await response.text();

        // Write the response into the new tab
        newWindow.document.open();
        newWindow.document.write(htmlResponse);
        newWindow.document.close();
    }
    catch (error) {
        alert("Connection error: " + error);
    }
});