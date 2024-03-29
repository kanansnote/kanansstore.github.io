// Implement light/dark mode switch with replacing images
var darkModeToggle = document.querySelector('#darkModeToggle');
var bothModeIcons = document.querySelector('#bothModeIcons');

// Check if dark mode was enabled in a previous session
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    bothModeIcons.src = 'media/icons/moon.svg';
} else {
    bothModeIcons.src = 'media/icons/sunny.svg';
}

// Display the image once the correct source has been set
bothModeIcons.style.display = 'inline-block';

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    // Save the dark mode setting in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        bothModeIcons.src = 'media/icons/moon.svg';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        bothModeIcons.src = 'media/icons/sunny.svg';
    }
});

// Update year in footer tag
const updateYear = new Date().getFullYear();
const copyrightElement = document.getElementById("copyright");

copyrightElement.innerHTML = "© " + updateYear + " Kanan N. All rights reserved.";

// Get the navPanel and searchContainer elements
var navPanel = document.querySelector('#navPanel');
var searchContainer = document.querySelector('.search-container');

// Save the original navPanel HTML
var originalNavPanelHTML = navPanel.innerHTML;

// Function to setup the search bar
function setupSearchBar() {
    // Create a new search bar element
    var searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.placeholder = 'Search Products';
    searchBar.classList.add('search-bar');  // Add a class for styling if needed

    // Create a close button
    var closeButton = document.createElement('button');
    closeButton.classList.add('close-button');  // Add a class for styling if needed

    // Create an SVG element for the 'x'
    var closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    closeIcon.setAttribute('viewBox', '0 0 40 40');
    closeIcon.style.cursor = 'pointer';
    closeIcon.classList.add('close-icon');  // Add a class for styling if needed

    // Create the 'x' path
    var closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    closePath.setAttribute('d', 'M 10,10 L 30,30 M 30,10 L 10,30');
    closePath.setAttribute('stroke', '#000');
    closePath.setAttribute('stroke-width', '2');

    // Add the 'x' path to the SVG
    closeIcon.appendChild(closePath);

    // Add the SVG to the close button
    closeButton.appendChild(closeIcon);

    // Replace the navPanel contents with the search bar and close button
    navPanel.innerHTML = '';
    navPanel.appendChild(searchBar);
    navPanel.appendChild(closeButton);

    // Add an event listener to the close button to restore the original navPanel contents when clicked
    closeButton.addEventListener('click', function() {
        navPanel.innerHTML = originalNavPanelHTML;
        setupSearchIcon();  // Setup the search icon event listener again
    });
}

// Function to setup the search icon
function setupSearchIcon() {
    searchContainer = document.querySelector('.search-container');  // Get the searchContainer element again in case it was replaced
    searchContainer.addEventListener('click', setupSearchBar);
}

// Setup the search icon event listener initially
setupSearchIcon();


// Initiating video carousel in the Home page
var videoCarousel = document.querySelector('.videoCarousel')
var videos = Array.from(document.querySelectorAll('.video-slide'));
var currentVideoIndex = 0;

if (videoCarousel) {
  // Initially show the first video
  videos[currentVideoIndex].style.opacity = "1";

  setInterval(function () {
    // Hide the current video
    videos[currentVideoIndex].style.opacity = "0";

    // Move to the next video
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;

    // Show the next video
    videos[currentVideoIndex].style.opacity = "1";
  }, 5000); // Change videos every 5 seconds
}

const productsContainer = document.querySelector('#productsContainer');

function productSlider() {
  // Get references to products' container, slide container, and slides
  const slideContainer = productsContainer.querySelector('#productsSlides');
  const slides = slideContainer.querySelectorAll('.productsSlide');

  // Calculate single slide width
  const singleSlideWidth = productsContainer.offsetWidth / slides.length;

  // Set initial current slide index and translateX value
  let currentSlideIndex = 0;
  slideContainer.style.transform = `translateX(0px)`;

  var bothArrows = productsContainer.querySelectorAll('.leftArrow, .rightArrow');

  // Optional: Add event listeners for arrow buttons (if present)
  if (bothArrows.length > 0) {
    const leftArrow = productsContainer.querySelector('.leftArrow');
    const rightArrow = productsContainer.querySelector('.rightArrow');

    leftArrow.addEventListener('click', () => {
      slideLeft();
    });

    rightArrow.addEventListener('click', () => {
      slideRight();
    });
  }

  // Function to slide left
  function slideLeft() {
    if (currentSlideIndex === 0) return; // Prevent sliding beyond first slide

    currentSlideIndex++;
    slideContainer.style.transform = `translateX(${currentSlideIndex * singleSlideWidth}px)`;
  }

  // Function to slide right
  function slideRight() {
    if (currentSlideIndex === slides.length - 1) return; // Prevent sliding beyond last slide

    currentSlideIndex--;
    slideContainer.style.transform = `translateX(${currentSlideIndex * singleSlideWidth}px)`;
  }
}

if (productsContainer) {
    productSlider(); // Call the productSlider function to initialize the carousel
}

// Get the navigation items
var pageLinks = document.querySelectorAll('.pageLinks');

// Get the current URL
var currentUrl = window.location.href;

// Loop through the navigation items
for (var i = 0; i < pageLinks.length; i++) {
    // Get the href of the navigation item
    var navItemUrl = pageLinks[i].href;

    // If the navigation item URL matches the current URL, add the 'active' class
    if (navItemUrl === currentUrl) {
        pageLinks[i].classList.add('active');
    }
}

// Get the userDropdown element
var userDropdown = document.querySelector('#userDropdown');

// Create a new div element for the dropdown menu
var dropdownMenu = document.createElement('div');
dropdownMenu.style.display = 'none';  // Set the initial display style to 'none'

// Add some options to the dropdown menu
var options = ['Sign In', 'Create Account', 'Orders', 'My Account'];  // Add more options as needed
for (var i = 0; i < options.length; i++) {
    var option = document.createElement('a');
    option.href = options[i].toLowerCase().replace(' ', '') + '.html';
    option.textContent = options[i];
    dropdownMenu.appendChild(option);

    // Add a divider after 'Create Account'
    if (options[i] === 'Create Account') {
        var divider = document.createElement('hr');
        dropdownMenu.appendChild(divider);
    }
}

// Add the dropdown menu to the userDropdown element
userDropdown.appendChild(dropdownMenu);

// Add an event listener to the userDropdown element to show and hide the dropdown menu when clicked
userDropdown.addEventListener('click', function() {
    event.stopPropagation();  // Prevent the document's click event from being triggered
    if (dropdownMenu.style.display === 'none') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
});

// Add an event listener to the document to hide the dropdown menu when clicked
document.addEventListener('click', function() {
    dropdownMenu.style.display = 'none';
});

// Create burger menu
const burgerMenu = document.querySelector(".burger-menu");

window.onload = function() {
    if (window.innerWidth <= 790) {
        navPanel.style.display = 'none';
    }
};

burgerMenu.addEventListener("click", () => {
    if (window.innerWidth < 790) {
        navPanel.style.display = navPanel.style.display === "none" ? "flex" : "none";
        navPanel.style.justifyContent = 'center';
    }

    for (var i = 0; i < pageLinks.length; i++) {
        pageLinks[i].classList.remove("active");
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 790) {
        navPanel.style.display = 'flex';
    } else {
        navPanel.style.display = 'none';
    }
});

// Actions on contact submit form
var dropLine = document.getElementById('dropLine');
var contactSubmitForm = document.querySelector('.contactSubmitForm');

contactSubmitForm.style.display = 'none';

dropLine.addEventListener('click', function() {
    event.stopPropagation();  // Prevent the document's click event from being triggered
    if (contactSubmitForm.style.display === 'none') {
        contactSubmitForm.style.display = 'block';

    }
});

// Make headline id element disappear when scrolling down
window.onscroll = function() {
  const scrollPosition = window.scrollY;

  // Determine desired scroll threshold (e.g., 50px):
  const threshold = 0;

  if (scrollPosition > threshold) {
    headline.style.display = 'none'; // Adjust top position as needed
  } else {
    headline.style.display = 'block';
  }
};
