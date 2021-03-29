document.getElementById("submit").addEventListener("click", () => {
    email = document.getElementById("email")
    title = document.getElementById("title")
    steps = document.getElementById("steps")
    environment = document.getElementById("environment")
    comment = document.getElementById("comment")


    if (title.value == "") {
        title.classList.add("invalid")
        return;
    }

    else {
        title.classList.remove("invalid")
    }

    if (steps.value == "") {
        steps.classList.add("invalid")
        return;
    }

    else {
        steps.classList.remove("invalid")
    }

    if (environment.value == "") {
        environment.classList.add("invalid")
        return;
    }

    else {
        environment.classList.remove("invalid")
    }

    if (email.value == "") {
        email.classList.add("invalid")
        return;
    }

    else {
        title.classList.remove("invalid")
    }

    form = new FormData()
    form.append("title", title.value)
    form.append("steps", steps.value)
    form.append("environment", environment.value)
    form.append("comment", comment.value)
    form.append("email", email.value)

    id = document.getElementById('project-id').value

    fetch(`/issue/public/${id}`, {
        method: "POST",
        body: form
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                document.getElementById("bug-report").remove()
                document.getElementById("message").style.display = "block";
            }
        });
});