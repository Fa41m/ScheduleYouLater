// https://www.youtube.com/watch?v=m9OSBJaQTlM
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let recurringEvents = localStorage.getItem('recurringEvents') ? JSON.parse(localStorage.getItem('recurringEvents')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const RecEventsModal = document.getElementById('reccuringEventsModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventDayRec = document.getElementById('eventDayRec');
const eventTitleInputRec = document.getElementById('eventTitleInputRec');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function openModalRecEvent() {
  RecEventsModal.style.display = 'block';
  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    const dayOfWeek = weekdays[new Date(`${month + 1}/${i - paddingDays -1}/${year}`).getDay()];
    console.log(dayOfWeek);
    
    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);
      const RecEventForDay = recurringEvents.find(e => e.day === dayOfWeek);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      if (RecEventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('RecEvent');
        eventDiv.innerText = RecEventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  RecEventsModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function AddRecEvent() {
  if (eventDayRec.value) {
    if (eventTitleInputRec.value) {
      if(weekdays.indexOf(eventDayRec.value) > -1) {
        eventTitleInputRec.classList.remove('error');
        eventDayRec.classList.remove('error');
  
        recurringEvents.push({
          day: eventDayRec.value,
          title: eventTitleInputRec.value,
        });
  
        localStorage.setItem('recurringEvents', JSON.stringify(recurringEvents));
        closeModal();
        } else {
          eventDayRec.classList.add('error');
        }
      } else {
        eventTitleInputRec.classList.add('error');
      }
    } else {
      eventDayRec.classList.add('error');
    }
}  

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
  document.getElementById('saveButtonReccuringEvents').addEventListener('click', AddRecEvent);
  document.getElementById('cancelButtonReccuringEvents').addEventListener('click', closeModal);
  document.getElementById('AddReccuringEvents').addEventListener('click', openModalRecEvent);
}

initButtons();
load();