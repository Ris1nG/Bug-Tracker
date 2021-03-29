document.addEventListener("DOMContentLoaded", function () {
  edit = document.getElementById("edit-btn");
  save = document.getElementById("save-btn");

  editSection = document.getElementById("edit-section");
  viewSection = document.getElementById("view-section");

  cPassword = document.getElementById("changePassword-trigger");

  edit.addEventListener("click", () => {
    name = document.getElementById("name").textContent;
    email = document.getElementById("email").textContent;
    mobile = document.getElementById("mobile").textContent;

    office = document.getElementById("office").textContent;
    github = document.getElementById("github").value;
    linkedin = document.getElementById("linkedin").value;

    if (name != "None" && name.charAt(0) != "-")
      document.getElementById("edit-name").value = name;

    if (email != "None")
      document.getElementById("edit-email").value = email;

    if (mobile != "None" && mobile.charAt(0) != "-")
      document.getElementById("edit-mobile").value = mobile;

    if (office != "None" && office.charAt(0) != "-")
      document.getElementById("edit-office").value = office;

    if (github != "None")
      document.getElementById("edit-github").value = github;

    if (linkedin != "None")
      document.getElementById("edit-linkedin").value = linkedin;

    viewSection.style.display = "none";
    editSection.style.display = "flex";
    edit.style.display = "none";

    save.style.display = "block";
    cPassword.style.display = "block";
  });

  save.addEventListener("click", () => {
    editName = document.getElementById("edit-name").value;
    editEmail = document.getElementById("edit-email").value;
    editMobile = document.getElementById("edit-mobile").value;
    editOffice = document.getElementById("edit-office").value;
    editGithub = document.getElementById("edit-github").value;
    editLinkedin = document.getElementById("edit-linkedin").value;

    if (editGithub != null) editGithub = editGithub.trim();
    if (editEmail == "") return;

    form = new FormData();
    form.append("name", editName);
    form.append("email", editEmail);
    form.append("mobile", editMobile);
    form.append("office", editOffice);
    form.append("github", editGithub);
    form.append("linkedin", editLinkedin);

    fetch("/profile/", {
      method: "POST",
      body: form,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          document.getElementById("name").textContent = editName;
          document.getElementById("email").textContent = editEmail;
          document.getElementById("mobile").textContent = editMobile;
          document.getElementById("office").textContent = editOffice;
          document.getElementById("github").value = editGithub;
          document.getElementById("linkedin").value = editLinkedin;

          if (editGithub != null && editGithub != "") {
            document.getElementById("user-image").src = `https://github.com/${editGithub}.png`;
          }

          if (editLinkedin != null && editLinkedin != "" && document.getElementById("linkedin-link") != null) {
            document.getElementById("linkedin-link").href = `https://www.linkedin.com/in/${editLinkedin}`;
          }

          if (editGithub != null && editGithub != "" && document.getElementById("github-link") != null) {
            document.getElementById("github-link").href = `https://github.com/${editGithub}`;
          }

          viewSection.style.display = "flex";
          editSection.style.display = "none";

          edit.style.display = "block";
          save.style.display = "none";
          cPassword.style.display = "none";
        } else {
          document.getElementById("edit-email").setAttribute("class", "invalid");
        }
      });
  });

  document.getElementById("change_pass").addEventListener("click", () => {
    currentPassword = document.getElementById("old-password").value;

    password = document.getElementById("password").value;
    confirmPassword = document.getElementById("confirm-password").value;
    error = document.getElementById("password-error");

    if (currentPassword == "" || password == "" || confirmPassword == "") return;
    if (password != confirmPassword) return;

    form = new FormData();
    form.append("old-password", currentPassword);
    form.append("password", password);

    fetch("/password_change/", {
      method: "POST",
      body: form,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          document.getElementById("cancel-btn").click();
        } else {
          error.style.display = "flex";
        }
      });
  });

  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});


document.getElementById("delete-id").addEventListener("click", () => {
  let delAccount = confirm(`Delete your account?`)
  if (delAccount == true) {
    fetch('/delete_account/', {
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) location.href = "/"
      });
  }
});