document.getElementById("submit").addEventListener("click", () => {
    select = document.getElementById("select")
    title = document.getElementById("title")
    steps = document.getElementById("steps")
    environment = document.getElementById("environment")
    comment = document.getElementById("comment")

    if (select.value == "")
        return;

    else if (title.value == "") {
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

    form = new FormData()
    form.append("title", title.value)
    form.append("steps", steps.value)
    form.append("environment", environment.value)
    form.append("comment", comment.value)
    form.append("project_id", select.value)

    fetch("/issue/", {
        method: "POST",
        body: form
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) location.href = `/project/${select.value}`
        });
});