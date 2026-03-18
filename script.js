/* ===================================
   DYNAMIC WEBSITE FUNCTIONALITY
   This file handles all interactive features
   =================================== */

// Event listener that waits for the entire HTML document to be loaded before running JavaScript
// This ensures all HTML elements exist before we try to manipulate them
document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // GET DOM ELEMENTS
    // Store references to HTML elements we'll interact with
    // ===================================
    const dynamicBtn = document.getElementById('dynamicBtn');           // "Click for Magic" button
    const dynamicContent = document.getElementById('dynamicContent');   // Div to show dynamic messages
    const servicesList = document.getElementById('servicesList');       // Services list (if exists)
    const contactForm = document.getElementById('contactForm');         // Contact form element
    const formMessage = document.getElementById('formMessage');         // Div for form success/error messages

    // ===================================
    // DATA ARRAYS
    // Store content that will be dynamically generated on the page
    // ===================================

    // Process steps: Array of objects describing our work process
    const process = [
        {
            title: "Discovery",
            description: "We start by understanding your needs and goals."
        },
        {
            title: "Planning",
            description: "We create a detailed plan for your project."
        },
        {
            title: "Execution",
            description: "We develop and implement the solution."
        },
        {
            title: "Review",
            description: "We review and refine the solution together."
        }
    ];

    // Pricing plans: Array of objects with different pricing tiers
    const pricingPlans = [
        {
            title: "Basic",
            price: "$99",
            features: ["Feature 1", "Feature 2", "Feature 3"]
        },
        {
            title: "Professional",
            price: "$199",
            features: ["Everything in Basic", "Feature 4", "Feature 5", "Priority Support"]
        },
        {
            title: "Enterprise",
            price: "$299",
            features: ["Everything in Professional", "Feature 6", "Feature 7", "24/7 Support"]
        }
    ];

    // ===================================
    // FUNCTION: displayProcess()
    // Dynamically creates and displays process step cards
    // ===================================
    function displayProcess() {
        // Find the process section container in the HTML
        const processContainer = document.querySelector('#process .container');

        // Check if the container exists before manipulating it
        if(processContainer) {
            // Create a new div element to hold the grid of process cards
            const processGrid = document.createElement('div');
            processGrid.className = 'services-grid';  // Apply CSS grid styling
            processGrid.id = 'processGrid';           // Give it an ID for potential future reference

            // Loop through each process step in the array
            process.forEach(item => {
                // Create a card div for each process step
                const processCard = document.createElement('div');
                processCard.className = 'service-card';  // Apply card styling

                // Set the HTML content inside the card (title and description)
                processCard.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                `;

                // Add the card to the grid
                processGrid.appendChild(processCard);
            });

            // Add the complete grid to the process section container
            processContainer.appendChild(processGrid);
        }
    }

    // ===================================
    // FUNCTION: displayPricing()
    // Dynamically creates and displays pricing plan cards
    // ===================================
    function displayPricing() {
        // Find the pricing section container in the HTML
        const pricingContainer = document.querySelector('#pricing .container');

        // Check if the container exists before manipulating it
        if(pricingContainer) {
            // Create a new div element to hold the grid of pricing cards
            const pricingGrid = document.createElement('div');
            pricingGrid.className = 'services-grid';  // Apply CSS grid styling
            pricingGrid.id = 'pricingGrid';           // Give it an ID for potential future reference

            // Loop through each pricing plan in the array
            pricingPlans.forEach(plan => {
                // Create a card div for each pricing plan
                const planCard = document.createElement('div');
                planCard.className = 'service-card';  // Apply card styling

                // Set the HTML content inside the card (title, price, and features list)
                planCard.innerHTML = `
                    <h3>${plan.title}</h3>
                    <h2>${plan.price}</h2>
                    <ul style="list-style: none; text-align: left; margin-top: 15px;">
                        ${plan.features.map(feature => `<li style="margin: 8px 0; padding-left: 20px; position: relative;">• ${feature}</li>`).join('')}
                    </ul>
                `;
                // Note: plan.features.map() converts the features array into HTML list items
                // .join('') combines all list items into a single string

                // Add the card to the grid
                pricingGrid.appendChild(planCard);
            });

            // Add the complete grid to the pricing section container
            pricingContainer.appendChild(pricingGrid);
        }
    }

    // ===================================
    // FUNCTION: handleButtonClick()
    // Handles the "Click for Magic" button interaction
    // Changes background color to random color and shows a message
    // ===================================
    function handleButtonClick() {
        // Save the original button text so we can restore it later
        const originalText = dynamicBtn.textContent;

        // Change button text to show something is happening
        dynamicBtn.textContent = 'Magic is happening...';

        // Generate a random color in hexadecimal format
        // Math.random() generates number between 0 and 1
        // Multiply by 16777215 (decimal for FFFFFF) to get full color range
        // Math.floor() rounds down to integer
        // .toString(16) converts to hexadecimal (base 16)
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        // Apply the random color to the page background
        document.body.style.backgroundColor = randomColor;

        // Display a message showing what color was applied
        dynamicContent.innerHTML = `<p style="padding: 20px; background-color: rgba(255,255,0.8); border-radius: 10px; text-align: center;">Background color changed to ${randomColor}!</p>`;

        // Use setTimeout to delay actions (creates timed effects)

        // After 2 seconds (2000 milliseconds), restore the original button text
        setTimeout(() => {
            dynamicBtn.textContent = originalText;

            // After another 5 seconds (7 seconds total), reset the background color
            setTimeout(() => {
                document.body.style.backgroundColor = '';  // Empty string returns to default
            }, 5000);
        }, 2000);
    }

    // ===================================
    // FUNCTION: handleFormSubmit()
    // Handles contact form submission
    // Validates input and shows success/error messages
    // ===================================
    function handleFormSubmit(e) {
        // Prevent the default form submission behavior (which would reload the page)
        e.preventDefault();

        // Get the values entered by the user in each form field
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation: Check if all fields have values (are not empty)
        if(name && email && message) {
            // All fields are filled - show success message

            // Set the success message text
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';

            // Apply the 'success' CSS class (green background)
            formMessage.className = 'success';

            // Clear all form fields
            contactForm.reset();

            // After 5 seconds, hide the success message
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            // One or more fields are empty - show error message

            // Set the error message text
            formMessage.textContent = 'Please fill in all fields.';

            // Apply the 'error' CSS class (red background)
            formMessage.className = 'error';

            // Make the error message visible
            formMessage.style.display = 'block';
        }
    }

    // ===================================
    // FUNCTION: highlightActiveLink()
    // Manages the active state of navigation links
    // Highlights the clicked link in blue
    // ===================================
    function highlightActiveLink() {
        // First, remove 'active' class from all navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        // Add click event listeners to all navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                // When a link is clicked:

                // 1. Remove 'active' class from ALL links (make all gray)
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.classList.remove('active');
                });

                // 2. Add 'active' class to the clicked link (make it blue)
                // 'this' refers to the link that was clicked
                this.classList.add('active');
            });
        });
    }

    // ===================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // When clicking navigation links, scroll smoothly to sections instead of jumping
    // ===================================

    // Find all links that start with "#" (anchor links that point to sections on same page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Add click event listener to each anchor link
        anchor.addEventListener('click', function(e) {
            // Prevent default jump behavior
            e.preventDefault();

            // Get the href attribute value (e.g., "#about", "#contact")
            const targetId = this.getAttribute('href');

            // Find the section element with that ID
            const targetElement = document.querySelector(targetId);

            // If the target section exists, scroll to it
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,  // Scroll position: section top minus 70px for fixed header
                    behavior: 'smooth'                  // Smooth animated scrolling instead of instant jump
                });
            }
        });
    });

    // ===================================
    // INITIALIZE THE PAGE
    // Run all setup functions when page loads
    // ===================================

    displayProcess();         // Create and display the process cards
    displayPricing();         // Create and display the pricing cards

    // Attach event listeners to interactive elements
    dynamicBtn.addEventListener('click', handleButtonClick);      // Button click changes background color
    contactForm.addEventListener('submit', handleFormSubmit);     // Form submission validation
    highlightActiveLink();    // Set up navigation link highlighting

    // ===================================
    // SCROLL EFFECT ON HEADER
    // Changes header shadow/opacity when user scrolls down
    // Creates a more prominent header when scrolling
    // ===================================
    window.addEventListener('scroll', function() {
        // Get the header element
        const header = document.querySelector('header');

        // Check how far the page has been scrolled (in pixels from top)
        if(window.scrollY > 50) {
            // User has scrolled more than 50px down
            // Make header shadow more prominent
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            // Make background slightly transparent
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            // User is at top of page (scrolled less than 50px)
            // Use original subtle shadow
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            // Use solid white background
            header.style.background = '#fff';
        }
    });

// End of DOMContentLoaded event listener
});
