
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener('click',
    () =>{
        const userName = document.getElementById("input-username");
        const userValue = userName.value;

        const password = document.getElementById("input-passwrod");
        const pass = password.value;

        if(userValue === 'admin' && pass === 'admin123'){
            alert('Login Successfull');
            window.location.assign("home.html");
        }
        else{
            alert("Login failed");
            return;
        }
    }
)