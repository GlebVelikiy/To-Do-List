/*Функция добавления задач*/
getLocal();
const blocks = document.querySelectorAll(".block");
for (let block of blocks) {
    const btn = block.querySelector(".block__button");
    const input = block.querySelector(".block__input");
    const ul = block.querySelector(".block__ul")
    btn.addEventListener("click", addTask);
    functionCounterBegin (block, ul);
}

function addTask () {  //Функция добавления задачи
    const block = this.closest(".block");
    const input = block.querySelector(".block__input");
    const ul = block.querySelector(".block__ul");
    if (input.value.length > 0) { //Проверка на то, что сообщение не пустое
        ul.insertAdjacentHTML("afterbegin", `
            <li class="block__li">
                        <input type="checkbox" class="block__checkbox">
                        <span class="block__span text">${input.value}</span>
                        <div class="block__delete">
                            <svg class="black" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            <svg class="white" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                    </li>`);
        input.value = "";
        functionCounter(block, ul); //Изменяем счетчик задач
        setLocal();
    }
}

//Функции счета задач

function functionCounter (block, ul) {
    const counterAll = document.querySelectorAll(".counter-all");
    const arr = ul.querySelectorAll(".block__li");
    let length = [...arr].length;
    if (block.classList.contains("block-today")) { //Изменение счетчика Today
        const counterToday = document.querySelector(".counter-today");
        counterToday.textContent = length;
    }
    for (let el of counterAll) { //Изменение общего счетчика задач
        el.textContent = Number(el.textContent) + 1; //Прибавляется один
    }
    

}

function functionCounterBegin (block, ul) { //Считывает количество задач в начале
    const counterAll = document.querySelectorAll(".counter-all");
    const arr = ul.querySelectorAll(".block__li");
    let length = [...arr].length;
    if (block.classList.contains("block-today")) { //Изменение счетчика Today
        const counterToday = document.querySelector(".counter-today");
        counterToday.textContent = length;
    }
    for (let el of counterAll) { 
        el.textContent = Number(el.textContent) + Number(length); //Прибавляется длина всего списка в этом блоке
    }
}

//Функция галочки закрытия задачи 

document.addEventListener("click", () => { //Делегирую события чтобы работало с новыми заметками
    const checkbox = event.target.closest(".block__checkbox");
    if (!checkbox) {
        return
    }
    const li = checkbox.closest(".block__li");
    li.classList.toggle("done"); //Изменяю стиль выполненной кнопки
});

//Функция удаления задачи 

document.addEventListener("click", () => {
    const buttonDelete = event.target.closest(".block__delete");
    const li = buttonDelete.closest(".block__li");
    const block = li.closest(".block");
    li.remove();
    const counterAll = document.querySelectorAll(".counter-all");
    for (let el of counterAll) { 
        el.textContent--; //общий счетчик понижаю на один
    }
    if (block.classList.contains("block-today")) {
        const counterToday = document.querySelector(".counter-today");
        counterToday.textContent--; //понижаю счетчик today если удаление произошло в today
    }
    setLocal();
});

//Функция изменения темы 

const btnTheme = document.querySelector(".theme");
btnTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList);
});

//LocalStorage 

function setLocal () {
    //Получаем массивы в локальной памяти из каждого раздела
    const todayUl = document.querySelector(".today-ul");
    const todaySpan = todayUl.querySelectorAll(".block__span");
    const todayArr = [];
    for (let span of todaySpan) {
        todayArr.push(span.innerHTML);
        console.log(todayArr);
    };
    localStorage.setItem("todayArr", JSON.stringify(todayArr));
    
    const tomorrowUl = document.querySelector(".tomorrow-ul");
    const tomorrowSpan = tomorrowUl.querySelectorAll(".block__span");
    const tomorrowArr = [];
    for (let span of tomorrowSpan) {
        tomorrowArr.push(span.innerHTML);
        console.log(tomorrowArr);
    };
    localStorage.setItem("tomorrowArr", JSON.stringify(tomorrowArr));
    
    const thisWeekUl = document.querySelector(".this-week-ul");
    const thisWeekSpan = thisWeekUl.querySelectorAll(".block__span");
    const thisWeekArr = [];
    for (let span of thisWeekSpan) {
        thisWeekArr.push(span.innerHTML);
        console.log(thisWeekArr)
    }
    localStorage.setItem("thisWeekArr", JSON.stringify(thisWeekArr));
};

function getLocal () {
    const todayArr = localStorage.getItem("todayArr")
    const tomorrowArr = localStorage.getItem("tomorrowArr");
    const thisWeekArr = localStorage.getItem("thisWeekArr");

    if (todayArr) {
        const arr = JSON.parse(todayArr);
        const todayUl = document.querySelector(".today-ul");
        arr.forEach((el) => {
            todayUl.insertAdjacentHTML("beforeend", `<li class="block__li">
                        <input type="checkbox" class="block__checkbox">
                        <span class="block__span text">${el}</span>
                        <div class="block__delete">
                            <svg class="black" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            <svg class="white" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                    </li>`)
        })
    }
    if (tomorrowArr) {
        const arr = JSON.parse(tomorrowArr);
        const tomorrowUl = document.querySelector(".tomorrow-ul");
        arr.forEach((el) => {
            tomorrowUl.insertAdjacentHTML("beforeend", `<li class="block__li">
                        <input type="checkbox" class="block__checkbox">
                        <span class="block__span text">${el}</span>
                        <div class="block__delete">
                            <svg class="black" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            <svg class="white" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                    </li>`)
        })
    }
    if (thisWeekArr) {
        const arr = JSON.parse(thisWeekArr);
        const thisWeekUl = document.querySelector(".this-week-ul");
        arr.forEach((el) => {
            thisWeekUl.insertAdjacentHTML("beforeend", `<li class="block__li">
                        <input type="checkbox" class="block__checkbox">
                        <span class="block__span text">${el}</span>
                        <div class="block__delete">
                            <svg class="black" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            <svg class="white" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </div>
                    </li>`)
        })
    }
};

// Проверка выбранной темы 
 function themeLocal () {
    const theme = localStorage.getItem("theme");
    if (theme === "dark-theme") {
        document.body.classList.add("dark-theme");
    }
 }
 themeLocal();

