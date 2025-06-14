const calendarGrid = document.getElementById('calendarGrid');
const reminderForm = document.getElementById('reminderForm');
const reminders = JSON.parse(localStorage.getItem('reminders')) || [];

const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function populateMonthYearSelectors() {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  monthNames.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = month;
    if (index === currentMonth) option.selected = true;
    monthSelect.appendChild(option);
  });

  for (let y = 2000; y <= 2100; y++) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    if (y === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  }
}

function saveReminders() {
  localStorage.setItem('reminders', JSON.stringify(reminders));
}

function renderCalendar() {
  calendarGrid.innerHTML = '';

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  daysOfWeek.forEach(day => {
    const div = document.createElement('div');
    div.classList.add('day-name');
    div.textContent = day;
    calendarGrid.appendChild(div);
  });

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to end

  for (let i = 0; i < startDay; i++) {
    const div = document.createElement('div');
    div.className = 'day empty';
    calendarGrid.appendChild(div);
  }

  for (let date = 1; date <= lastDate; date++) {
    const div = document.createElement('div');
    div.className = 'day';
    div.innerHTML = `<strong>${date}</strong>`;

    const thisDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const dayReminders = reminders.filter(r => r.date === thisDate);

    dayReminders.forEach((r, index) => {
      const ev = document.createElement('div');
      ev.className = 'event';
      ev.innerHTML = `${r.time}<br>${r.title}`;

      const controls = document.createElement('div');
      controls.className = 'event-controls';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        document.getElementById('reminderTitle').value = r.title;
        document.getElementById('reminderDate').value = r.date;
        document.getElementById('reminderTime').value = r.time;
        document.getElementById('editIndex').value = reminders.indexOf(r);
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => {
        const i = reminders.indexOf(r);
        if (i > -1) {
          reminders.splice(i, 1);
          saveReminders();
          renderCalendar();
        }
      };

      controls.appendChild(editBtn);
      controls.appendChild(deleteBtn);
      ev.appendChild(controls);
      div.appendChild(ev);
    });

    calendarGrid.appendChild(div);
  }
}

reminderForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('reminderTitle').value;
  const date = document.getElementById('reminderDate').value;
  const time = document.getElementById('reminderTime').value;
  const index = document.getElementById('editIndex').value;

  if (index === '-1') {
    reminders.push({ title, date, time });
  } else {
    reminders[index] = { title, date, time };
    document.getElementById('editIndex').value = -1;
  }

  saveReminders();
  reminderForm.reset();
  renderCalendar();
});

document.getElementById('prevBtn').onclick = () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  updateSelectors();
  renderCalendar();
};

document.getElementById('nextBtn').onclick = () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  updateSelectors();
  renderCalendar();
};

monthSelect.addEventListener('change', () => {
  currentMonth = parseInt(monthSelect.value);
  renderCalendar();
});

yearSelect.addEventListener('change', () => {
  currentYear = parseInt(yearSelect.value);
  renderCalendar();
});

function updateSelectors() {
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
}

populateMonthYearSelectors();
renderCalendar();
