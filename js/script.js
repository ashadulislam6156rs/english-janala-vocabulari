function loadLessons() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displyLesson(data.data));
}

const displyLesson = (lessons) => {
  const lessonBtns = document.getElementById("lesson-btn");
  for (let lesson of lessons) {
    const btn = document.createElement("button");
    btn.onclick = () => loadWordsId(lesson.level_no);
    btn.id = `lessonBtn-${lesson.level_no}`;
    btn.className = "btn btn-outline btn-primary lesson-btn";
    btn.innerHTML = `
    <i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}
    `;
    lessonBtns.appendChild(btn);
  }
};

loadLessons();

function activeRemove() {
  const btns = document.querySelectorAll(".lesson-btn")
  btns.forEach(btn => btn.classList.remove("active"))

}



function searchVocabulary() {
  const userInput = document.getElementById("user-input");
  userInput.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
      // event.preventDefault();
      let value = userInput.value.trim().toLowerCase();
      fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
          const allWords = data.data;
          const filterData = allWords.filter(word => word.word.toLowerCase().includes(value))
          
          displayAllData(filterData)
        
      })
      

    }
  })
}
searchVocabulary() 

const loadWordsId = (id) => {
  loadingIcon(true);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((words) => {
      const clickBtn = document.getElementById(`lessonBtn-${id}`)
      activeRemove()
      clickBtn.classList.add("active")
        displayAllData(words.data) 
      });
  
 
};

function displayAllData(words) {

  const displayData = document.getElementById("displayData");
        displayData.innerHTML = "";
        if (words.length === 0) {
          let div = document.createElement("div");
          div.className = "col-span-full space-y-5 lg:space-y-2 py-15 rounded-md"
        div.innerHTML = `
            <img class="m-auto" src="./assets/alert-error.png" alt="">
          <p class="font-medium text-[8px] lg:text-sm text-[#79716B] bangla-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। <i class="text-base fa-regular fa-face-frown text-green-500"></i></p>
          <h1 class="font-semibold text-xl lg:text-4xl text-[#292524] bangla-font">পরবর্তী Lesson এ যান!!</h1>  
            `;
          displayData.appendChild(div);
          loadingIcon(false);
          return;
          
        }

        words.forEach((word) => {
          let div = document.createElement("div");
          div.className = "p-4 space-y-4 bg-white rounded-lg text-center"
       
        div.innerHTML = `
            <h1 class="text-[#18181B] text-xl lg:text-2xl font-semibold">${word.word}</h1>
            <p class="font-medium text-[8px] lg:text-sm text-[#79716B] bangla-font">Meaning / Pronounciation</p>
            <h2 class="font-semibold text-xl lg:text-2xl text-[#292524] bangla-font">"${word.meaning ? word.meaning : "অর্থ খোঁজে পাওয়া যায়নি!"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ খোঁজে পাওয়া যায়নি!"}</h2>
            <div class="flex justify-between items-center">
              <button onclick="modalDisplyDetails(${word.id})" class=" bg-[#e7f3fe] px-4 py-2 hover:bg-[#80b2f7] rounded-lg cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
              <button class="hover:bg-[#80b2f7] bg-[#e7f3fe] px-4 py-2 rounded-lg cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
              
            </div>`;
          displayData.appendChild(div);
          
          
       
        });
         loadingIcon(false);
  
  
}

function loadingIcon(status) {
  const loadingEl = document.getElementById("loading-icon");
  const WordsEl = document.getElementById("displayData");
  if (status == true) {
    loadingEl.classList.remove("hidden")
    WordsEl.classList.add("hidden")
  }
  else {
    loadingEl.classList.add("hidden")
    WordsEl.classList.remove("hidden")
  }
  
}

function loadSynonyms (arr){
  const synonymWords = arr.map((el) => `<li class="p-2 rounded-md bg-[#EDF7FF]">${el}</li>`)

  return synonymWords.join(" ");
  
}

const modalDisplyDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(words => {
        const my_modal = document.getElementById("my_modal_5");
        
          let divModal = document.createElement("div")
          divModal.className = "modal-box"
          divModal.innerHTML = `
          <h1 class="text-2xl font-semibold">${words.data.word} (<i class="fa-solid fa-microphone-lines"></i>: ${words.data.pronunciation})</h1>
    <p class="py-4 text-xl font-semibold">Meaning</p>
    <p class="text-xl bangla-font">${words.data.meaning}</p>
    <h3 class="font-semibold mt-1">Example</h3>
    <p class="text-sm text-[#000000]">${words.data.sentence}</p>
    <h3 class="text-xl bangla-font mt-2">সমার্থক শব্দ গুলো</h3>
    <ul id="modal-ul" class="flex justify-start items-center mt-1 gap-3">
      ${loadSynonyms(words.data.synonyms)}
    </ul>
    <div class="modal-action flex justify-start items-center">
      
      <form method="dialog">
         
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn cursor-pointer text-white px-3 py-2 rounded-xl bg-[#422AD5]">Complete Learning</button>
        
      </form>
    </div>
          `
           my_modal.appendChild(divModal)
        
      my_modal.showModal();
      
      
  })
  
}

