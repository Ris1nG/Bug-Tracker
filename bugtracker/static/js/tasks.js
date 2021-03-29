document.querySelectorAll('.submit').forEach(element => {
    element.addEventListener("click", () => {
        dataId = e.getAttribute("data-id")
        solution = document.getElementById(`solution-${dataId}`).value

        form = new FormData()
        form.append("task_id", dataId)
        form.append("solution", solution)

        fetch('/task/', {
            method: "POST",
            body: form
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    project_id = document.getElementById("project-id").value
                    location.href = `/project/${project_id}`
                }
            });
    })
});