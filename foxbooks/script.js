async function viewCourses() {
    const courseList = document.getElementById("courseList");

    courseList.innerHTML = "";
    
    const response = await fetch("bookstore.json");
    const data = await response.json();

    courseList.innerHTML = "<ul>";

    data.courses.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        } else {
            return 1;
        }
    });

    for (let course of data.courses) {
        courseList.innerHTML += `<li><a href="./books.html?courseId=${encodeURIComponent(course.courseId)}">${course.title}</a></li>`;
    }

    courseList.innerHTML += "</ul>";
}

async function getDesiredCourse() {
    const urlParams = new URL(window.location.toLocaleString()).searchParams;
    const courseId = urlParams.get('courseId');

    const bookList = document.getElementById('bookList');
    const bookHeading = document.getElementById('bookFilterHeading');

    bookList.innerHTML = "<ul>";

    const response = await fetch("bookstore.json");
    const data = await response.json();

    data.books.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        } else {
            return 1;
        }
    });

    bookHeading.innerText = "Books for";

    if (courseId) {
        const course = data.courses.filter(course => {
            return course.courseId === courseId;
        });

        bookHeading.innerText += ` ${course[0].title}`;
        for (let book of data.books) {
            book.courseId === courseId ? bookList.innerHTML += `<li><a href="https://marist.bncollege.com/search/?text=${book.isbn}" target="_blank">${book.title}</a></li>` : null;
        }
    } else {
        bookHeading.innerText += " all courses";

        for (let book of data.books) {
            bookList.innerHTML += `<li><a href="https://marist.bncollege.com/search/?text=${book.isbn}" target="_blank">${book.title}</a></li>`;
        }
    }

    bookList.innerHTML += "</ul>";
}