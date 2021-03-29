function addComponent(id, user, ver) {
  div = document.createElement("div")
  div.setAttribute("class", "dev-item")
  div.setAttribute("id", `${ver}-dev-item-${id}`)

  a = document.createElement("a")
  a.setAttribute("href", `/u/${user}`)
  a.setAttribute("target", "_blank")

  i = document.createElement("i")
  i.setAttribute("class", "fa fa-code")

  span = document.createElement("span")
  span.textContent = user
  span.setAttribute("id", `dev-username-${ver}${id}`)

  i2 = document.createElement("i")
  i2.setAttribute("class", "fa fa-trash delete-dev")
  i2.setAttribute("data-did", id)
  i2.setAttribute("style", "margin-left: 0.8rem")


  a.appendChild(i)
  a.appendChild(span)

  div.appendChild(a)
  div.appendChild(i2)

  document.querySelector(`#${ver}-dev-add-root`).prepend(div)
  i2.addEventListener("click", () => deleteDev(i2))
}

function deleteDev(element) {
  projectId = document.getElementById('project-id').value;
  id = element.getAttribute("data-did")
  devUser = document.querySelector(`#dev-username-d${id}`)
  mUser = document.querySelector(`#dev-username-m${id}`)

  username = (devUser) ? devUser.textContent : mUser.textContent;

  let deleteDev = confirm(`Delete ${username} from the list of Devs?`)
  if (deleteDev == true) {
    form = new FormData()
    form.append("dev_id", id)
    form.append("projectId", projectId)

    // dont forget to change URL
    fetch('/delete_dev/', {
      method: "POST",
      body: form,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          document.querySelector(`#d-dev-item-${id}`).remove()
          document.querySelector(`#m-dev-item-${id}`).remove()
        }
      });
  }
}


function clearDevAdd() {
  input = document.getElementById("dev-email");
  preview = document.getElementById("dev-preview");

  if (input) input.value = "";
  if (preview) preview.style.display = "none";
}


document.querySelectorAll(".assign-btn").forEach((element) => {
  element.addEventListener("click", () => {

    id = element.getAttribute("data-id");
    dev = document.getElementById(`select-${id}`).value;

    if (dev == "") return;

    form = new FormData();
    form.append("id", id);
    form.append("username", dev);

    fetch("/assign/", {
      method: "POST",
      body: form,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          p = document.createElement("p");
          i = document.createElement("i");

          i.setAttribute("class", "fa fa-code");
          i.setAttribute("style", "margin-right: 0.5rem;");

          span = document.createElement("span");
          span.textContent = "Assigned to";
          span.setAttribute("style", "margin-right: 0.5rem;");

          a = document.createElement("a");
          a.setAttribute("target", "_blank");
          a.setAttribute("class", "white-text");
          a.setAttribute("href", `/u/${dev}`);
          a.innerHTML = `<b>${dev}</b>`;

          p.appendChild(i);
          p.appendChild(span);
          p.appendChild(a);

          document.getElementById(`div-${id}`).innerHTML = "";
          document.getElementById(`div-${id}`).appendChild(p);
          document.getElementById("assigned-c").textContent = parseInt(document.getElementById("assigned-c").textContent) + 1;

          document.getElementById("bugs-count").textContent = parseInt(document.getElementById("bugs-count").textContent) - 1;

          previous_data = myChart.data.datasets[0].data
          myChart.data.datasets[0].data = [previous_data[0] - 1, previous_data[1] + 1, previous_data[2]]
          myChart.update()

          btn = document.getElementById(`delete-task-${id}`)
          if (btn) btn.style.display = "none"
        }
      });
  });
});

document.querySelectorAll(".delete-btn").forEach((element) => {
  element.addEventListener("click", () => {
    id = element.getAttribute("data-id");

    form = new FormData();
    form.append("id", id);

    fetch("/delete_task/", {
      method: "POST",
      body: form,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 200) {
          document.getElementById(`post-${id}`).remove()

          previous_data = myChart.data.datasets[0].data
          myChart.data.datasets[0].data = [previous_data[0] - 1, previous_data[1], previous_data[2]]
          myChart.update()

          document.getElementById("bugs-count").textContent = parseInt(document.getElementById("bugs-count").textContent) - 1;
        }
      });
  });
});

document.querySelector("#delete-project").addEventListener("click", () => {
  id = document.getElementById('project-id').value;

  form = new FormData();
  form.append("id", id);

  fetch("/delete_project/", {
    method: "POST",
    body: form,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) location.href = "/dashboard";
    });
});

document.querySelector("#edit-project-save").addEventListener("click", () => {
  id = document.getElementById('project-id').value;
  title = document.getElementById('title').value;
  description = document.getElementById('description').value;

  if (title == "" || description == "") return;

  form = new FormData();
  form.append("id", id);
  form.append("title", title);
  form.append("description", description);

  fetch("/edit_project/", {
    method: "POST",
    body: form,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        document.getElementById("project-title").textContent = title.trim();
        document.getElementById("cancel-modal-edit").click();
      }
    });
});



document.querySelector("#search-dev").addEventListener("click", () => {
  email = document.getElementById("dev-email").value;

  if (email == "") return;

  form = new FormData();
  form.append("email", email);

  fetch("/search_dev/", {
    method: "POST",
    body: form,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        if (data.github == undefined)
          document.getElementById("dev-img").src = `/static/img/user.png`;
        else {
          document.getElementById("dev-img").src = `https://github.com/${data.github}.png`;
          document.getElementById("dev-name").textContent = data.name;
          document.getElementById("dev-preview").style.display = "block";
          document.getElementById("username").value = data.username;
        }
      }
      else {
        document.getElementById("dev-email").classList.add("invalid");
        document.getElementById("dev-preview").style.display = "none";
      }
    });
});


document.querySelector("#save-dev").addEventListener("click", () => {
  username = document.getElementById("username").value;
  projectId = document.getElementById('project-id').value;

  form = new FormData();
  form.append("dev_username", username);
  form.append("projectId", projectId);

  fetch("/save_dev/", {
    method: "POST",
    body: form,
  })
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        document.getElementById("cancel-modal-dev-add").click();
        // work for both mobile version or desktop.
        addComponent(data.user_id, username, "d"); // D is for desktop versions
        addComponent(data.user_id, username, "m"); // M is for mobile versions
        clearDevAdd();
      }
      else if (data.status == 403) document.getElementById("cancel-modal-dev-add").click();
    });
});

document.getElementById("cancel-modal-dev-add").addEventListener("click", () => clearDevAdd());

document.querySelectorAll(".delete-dev").forEach(element => {
  element.addEventListener("click", () => {
    deleteDev(element);
  });
});

document.getElementById("copy-btn").addEventListener("click", () => {
  input = document.createElement("input"),
    document.body.appendChild(input);
  input.value = `http://127.0.0.1:8000/issue/public/${document.getElementById('project-id').value}`;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);

});