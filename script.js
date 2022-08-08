const player = document.querySelector('.player'),
      playerBtns = document.querySelector('.player-buttons'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.play-prev'),
      nextBtn = document.querySelector('.play-next'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress__container'),
      progress = document.querySelector('.progress'),
      imgSrc = document.querySelector('.img__src'),
      title = document.querySelector('.song')
      

const songs = ['Золотой Мальчик', 'Секрет', 'Солнце Золотое', 'Ууу'];

let songIndex = 0;
// Init

function loadSong(song) {
    title.innerHTML = song
    audio.src = `./assets/audio/song/${song}.mp3` 
}

loadSong(songs[songIndex])

//Play
function playSong() {
    player.classList.add('play-icon')
    imgSrc.src = 'assets/audio/svg/pause.svg'
    audio.play()
}

//Pause

function pauseSong() {
    player.classList.remove('play-icon')
    imgSrc.src = 'assets/audio/svg/play.svg'
    audio.pause()
}

playerBtns.addEventListener('click', (event) => {
    const isPlaying = player.classList.contains('play-icon');
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    };

    if (event.target.classList.contains('next')) {
        nextSong()
    }

    if (event.target.classList.contains('prev')) {
        prevSong()
    }
})

//next song

function nextSong() {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex])
    playSong()
}

function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

//Progress

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

audio.addEventListener('timeupdate', updateProgress)

//Set progress

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress)

//Autoplay

audio.addEventListener('ended', nextSong)   

/*===== Date =====*/

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'november', 'December'];


const body = document.querySelector('body');
const main = document.querySelector('main');
let nameOfTheDay = ''; 

window.onload = function() {
    let amountImg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    let room = amountImg[Math.floor(Math.random() * 20)]
    if (room < 10) {
        room = '0' + room
    };

    main.addEventListener('click', (event) => {
        if (event.target.classList.contains('arrow-prev')) {
            --room
            if (room < 10) {
                room = '0' + room
            }
            if (room < 1) {
                room = 20
            }
        } else if (event.target.classList.contains('arrow-next')) {
            ++room

            if (room < 10) {
                room = '0' + room
            }

            if (room > 20) {
                room = '0' + 1
            }
        }
    })

    window.setInterval(function() {
        
        const greeting = document.getElementById('greeting');
        const dateClass = document.getElementById('date');

        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        


        if (hours < 10) {hours = `0${hours}`};
        if (minutes < 10) {minutes = `0${minutes}`};
        if (seconds < 10) {seconds = `0${seconds}`};
 
        let clock = `${hours} : ${minutes} : ${seconds}`;
        document.getElementById('time').innerHTML = clock;

        if (hours >= 00 && hours <= 06) {
            if (sum === 0) { 
                greeting.textContent = 'Good night'
            } else {
                greeting.textContent = 'спокойной ночи'
            }

            nameOfTheDay = 'night';
         
        } else if (hours >= 06 && hours <= 12) {
            if (sum === 0) {
                greeting.textContent = 'Good morning'
            } else {
                greeting.textContent = 'Доброе утро' 
            }

            nameOfTheDay = 'morning';
       
        } else if (hours >= 06 && hours <= 18) {
            if (sun === 0) {
                greeting.textContent = 'Good afternoon'
            } else {
                greeting.textContent = 'Доброго дня'
            }
            nameOfTheDay = 'afternoon';
            
        } else {
            if (sum === 0) {
                greeting.textContent = 'Good evening'
            } else {
                greeting.textContent = 'Хорошего вечера'
            }
            
            nameOfTheDay = 'evening';
        }

        function nameDay(date) {

            return days[date.getDate()]
        }


        function nameMonth(date) {
            return months[date.getMonth()]
        }

        dateClass.innerHTML = `${nameDay(date)}, ${nameMonth(date)} ${date.getDay()}`
        body.style.backgroundImage = `url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${nameOfTheDay}/${room}.jpg)`;

    }, 1000);
}


/*===== Date =====*/

/*===== Weather =====*/

const name = document.querySelector('.name'),
      temperature = document.querySelector('.temperature'),
      cloudiness = document.querySelector('.cloudiness'),
      wind = document.querySelector('.wind'),
      humidity = document.querySelector('.humidity'),
      weatherIcon = document.querySelector('.weather-icon'),
      weatherError = document.querySelector('.weather-error'),
      titleCity = document.querySelector('.city');



async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${titleCity.value}&appid=55a124c8d199110cb7dc23f6ea5106f0`;
    const res = await fetch(url);
    const data = await res.json();
          temperature.innerHTML = Math.round(data.main.temp - 273) + '&deg' + 'C';
          cloudiness.innerHTML = data.weather[0].description;
          wind.innerHTML = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
          humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
          weatherIcon.classList.add(`owf-${data.weather[0].id}`, 'owf');
  }

  
getWeather()

titleCity.onchange = function() {
    getWeather()

    if (titleCity.value === '') {
        weatherError.innerHTML = 'Error! Nothing to geocode for!'
        temperature.innerHTML = ''
        cloudiness.innerHTML = ''
        wind.innerHTML = ''
        humidity.innerHTML = ''
        weatherIcon.style.display = 'none'
    } else {
        weatherError.innerHTML = ''
        weatherIcon.style.display = 'block'
    }
    
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', titleCity.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name')
    }

    if (titleCity.value === '') {
        titleCity.value = 'Minsk'
        getWeather()

    }

    if (localStorage.getItem('city')) {
        titleCity.value = localStorage.getItem('city')
        getWeather()
    } 
}

window.addEventListener('load', getLocalStorage)


/*===== Weather =====*/

/*===== Widget =====*/


const btnQuote = document.querySelector('.change-quote'),
      quote = document.querySelector('.quote'),
      author = document.querySelector('.author');


const quotesEn = 'data.json';
const quotesRu = 'translate.json'
let sumDeg = 0;

btnQuote.addEventListener('click', () => {
    sumDeg += 360;
    btnQuote.style.transform = `rotate(${sumDeg}deg)`;
    
    if (sum === 0) {
        getQuotesEn()
    } else if (sum === 1) {
        getQuotesRu()
    }
})

async function getQuotesEn() {
    const res = await fetch(quotesEn);
    const data = await res.json();

    let arrNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let number = 0;
    number += arrNumber[Math.floor(Math.random() * 10)]

    quote.textContent = data[number].text
    author.textContent = data[number].author
}

getQuotesEn()

async function getQuotesRu() {
    const res = await fetch(quotesRu);
    const translateRu = await res.json();

    let arrNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let number = 0;
    number += arrNumber[Math.floor(Math.random() * 10)]

    quote.textContent = translateRu[number].text
    author.textContent = translateRu[number].author
}


/*===== Widget =====*/

/*===== Language =====*/

const translate = document.querySelector('.translate');
const language = document.querySelectorAll('.language');
let sum = 0;

translate.addEventListener('click', (e) => {
    language.forEach((e) => {
        e.classList.toggle('active')
    })

    if (e.target.classList.contains('en')) {
        sum = 0
        getQuotesEn()
        
    } else if (e.target.classList.contains('ru')) {
        sum = 1
        getQuotesRu()   
    }  
})









