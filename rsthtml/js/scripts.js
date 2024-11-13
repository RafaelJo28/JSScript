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
