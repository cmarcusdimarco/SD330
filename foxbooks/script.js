async function viewCourses() {
    const courseList = document.getElementById("courseList");

    courseList.innerHTML = "";
    
    const response = await fetch("bookstore.json");
    const data = await response.json();

    courseList.innerHTML = "<ul>"

    for (let course of data.courses) {
        courseList.innerHTML += `<li>${course.title}</li>`;
    }

    courseList.innerHTML += "</ul>";
}