window.addEventListener('DOMContentLoaded', event => {
    const listHoursArray = document.body.querySelectorAll('.list-hours li');

    // Highlight the current day
    listHoursArray[new Date().getDay()].classList.add('today');
    
    // Add hover effect to each list item
    listHoursArray.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.backgroundColor = 'lightgray';  // Change color on hover
        });
        item.addEventListener('mouseout', () => {
            item.style.backgroundColor = '';  // Reset the color when mouse leaves
        });
    });
    
    // Highlight the current hour
    const currentHour = new Date().getHours();
    listHoursArray.forEach((item, index) => {
        // Assuming the list contains hours of operation
        const itemHour = parseInt(item.textContent, 10);  // Get the hour from the text content
        if (itemHour === currentHour) {
            item.classList.add('current-hour');  // Add a 'current-hour' class to highlight it
        }
    });

    // Add a click event to each list item
    listHoursArray.forEach(item => {
        item.addEventListener('click', () => {
            alert(`You clicked on ${item.textContent}`);  // Show an alert with the clicked hour
        });
    });
});

// JavaScript to add sticky class when navbar becomes sticky
window.onscroll = function() { stickyNav() };

var navbar = document.getElementById("mainNav");
var sticky = navbar.offsetTop;

function stickyNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky-navbar");
    } else {
        navbar.classList.remove("sticky-navbar");
    }
}

// Countdown Timer Script

// Define restaurant opening hours for each day of the week
const hours = {
    Sunday: { open: null, close: null },  // Closed on Sundays
    Monday: { open: "07:00", close: "20:00" },
    Tuesday: { open: "07:00", close: "20:00" },
    Wednesday: { open: "07:00", close: "20:00" },
    Thursday: { open: "07:00", close: "20:00" },
    Friday: { open: "07:00", close: "20:00" },
    Saturday: { open: "09:00", close: "17:00" }
  };
  
  // Function to update the countdown timer
  function updateCountdown() {
    const now = new Date();
    const dayOfWeek = now.toLocaleString('en-us', { weekday: 'long' });
    const currentTime = now.getHours() * 100 + now.getMinutes(); // Time in "HHMM" format (e.g., 1305 for 1:05 PM)
  
    let nextEvent = '';
    let nextEventTime = 0;
  
    // Determine the next event (open or close)
    const todayHours = hours[dayOfWeek];
  
    // Check if the restaurant is currently open or closed and set the next event
    if (currentTime < parseInt(todayHours.open.replace(":", ""))) {
      nextEvent = 'Open';
      nextEventTime = parseInt(todayHours.open.replace(":", ""));
    } else if (currentTime >= parseInt(todayHours.open.replace(":", "")) && currentTime < parseInt(todayHours.close.replace(":", ""))) {
      nextEvent = 'Close';
      nextEventTime = parseInt(todayHours.close.replace(":", ""));
    } else {
      // If it's after closing, get the opening time for the next day
      const nextDay = getNextDay(dayOfWeek);
      nextEvent = 'Open';
      nextEventTime = parseInt(hours[nextDay].open.replace(":", ""));
    }
  
    // Calculate the time remaining until the next event
    const nextEventDate = new Date();
    const nextEventHours = Math.floor(nextEventTime / 100);
    const nextEventMinutes = nextEventTime % 100;
    nextEventDate.setHours(nextEventHours);
    nextEventDate.setMinutes(nextEventMinutes);
    nextEventDate.setSeconds(0);
  
    const timeRemaining = nextEventDate - now;
  
    // Convert time remaining to hours, minutes, seconds
    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
    // Display the countdown
    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = `${nextEvent}: ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`;
  
    // Update the timer every second
    setTimeout(updateCountdown, 1000);
  }
  
  // Get the next day of the week
  function getNextDay(currentDay) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = daysOfWeek.indexOf(currentDay);
    const nextDayIndex = (currentDayIndex + 1) % 7; // Loop back to Sunday after Saturday
    return daysOfWeek[nextDayIndex];
  }
  
  // Initialize the countdown timer
  updateCountdown();
  