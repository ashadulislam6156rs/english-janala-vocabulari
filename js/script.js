function loadLessons() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
    .then(data => displyLesson(data.data))
}

const displyLesson = (lessons) => {
  
const lessonBtns = document.getElementById("lesson-btn");
for (let lesson of lessons) {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline btn-primary";
    btn.innerHTML = `
    <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
    `
    lessonBtns.appendChild(btn)
}
    
}

loadLessons()

