let global_email = "";

document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    var inst = M.Sidenav.init(elems);

    var elems = document.querySelectorAll(".modal");
    var inst = M.Modal.init(elems);
});

forgot = document.getElementById("forgot");
login = document.getElementById("login");
reset = document.getElementById("reset");

document.getElementById("forgot-trigger").addEventListener("click", () => {
    login.style.display = "none";
    forgot.style.display = "block";
});

document.getElementById("login-trigger").addEventListener("click", () => {
    forgot.style.display = "none";
    login.style.display = "block";
});

document.getElementById("login-trigger2").addEventListener("click", () => {
    reset.style.display = "none";
    login.style.display = "block";
});

document.getElementById("reset-trigger").addEventListener("click", () => {
    forgot.style.display = "none";
    login.style.display = "none";
    reset.style.display = "block";
});

document.getElementById("login-btn").addEventListener("click", () => {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    if (email == "" || password == "") return;

    form = new FormData();
    form.append("username", email);
    form.append("password", password);
    form.append("login", "");

    fetch("/", {
        method: "POST",
        body: form,
    })
        .then(response => response.json())
        .then((data) => {
            if (data.status == 200) location.href = "/dashboard";
            else document.getElementById("loginERROR").style.display = "flex";
        });
});

document.getElementById("signup-btn").addEventListener("click", () => {

    username = document.getElementById("sign-username").value;
    email = document.getElementById("sign-email").value;
    password = document.getElementById("sign-password").value;

    if (email == "" || password == "") return;

    form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);
    form.append("signup", "");

    fetch("/", {
        method: "POST",
        body: form,
    })
        .then(response => response.json())
        .then((data) => {
            if (data.status == 200) location.href = "/profile";
            else document.getElementById("signup-error").style.display = "flex";
        });
});

document.getElementById("forgot-btn").addEventListener("click", () => {
    email = document.getElementById("forgot-email").value;
    if (email == "") return;

    global_email = email;

    form = new FormData();
    form.append("email", email);

    fetch("/forgot/", {
        method: "POST",
        body: form,
    })
        .then(response => response.json())
        .then((data) => {
            if (data.status == 200) document.getElementById("reset-trigger").click();
            else document.getElementById("forgot-error").style.display = "flex";
        });
});

document.getElementById("reset-btn").addEventListener("click", () => {
    code = document.getElementById("reset-code").value;
    password = document.getElementById("reset-pass").value;
    cPassword = document.getElementById("conf-r-pass").value;

    if (code == "" || password == "" || cPassword == "") return;
    if (password != cPassword) {
        document.getElementById("reset-error").style.display = "flex";
        document.getElementById("error-text-reset").textContent = "Password didn't match.";
        return;
    }

    form = new FormData();
    form.append("code", code);
    form.append("password", password);
    form.append("email", global_email);

    fetch("/reset/", {
        method: "POST",
        body: form,
    })
        .then(response => response.json())
        .then((data) => {
            if (data.status == 200) location.href = "/dashboard";
            else {
                document.getElementById("reset-error").style.display = "flex";
                document.getElementById("error-text-reset").textContent = "Your Email or password is wrong! Please try again";
            }
        });
});
