// Dynamic website functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const dynamicBtn = document.getElementById('dynamicBtn');
    const dynamicContent = document.getElementById('dynamicContent');
    const servicesList = document.getElementById('servicesList');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Sample process data
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

    // Sample pricing plans
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

    // Function to display process
    function displayProcess() {
        const processContainer = document.querySelector('#process .container');
        if(processContainer) {
            const processGrid = document.createElement('div');
            processGrid.className = 'services-grid';
            processGrid.id = 'processGrid';
            
            process.forEach(item => {
                const processCard = document.createElement('div');
                processCard.className = 'service-card';
                processCard.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                `;
                processGrid.appendChild(processCard);
            });
            
            // Append after the heading
            processContainer.appendChild(processGrid);
        }
    }

    // Function to display pricing
    function displayPricing() {
        const pricingContainer = document.querySelector('#pricing .container');
        if(pricingContainer) {
            const pricingGrid = document.createElement('div');
            pricingGrid.className = 'services-grid';
            pricingGrid.id = 'pricingGrid';
            
            pricingPlans.forEach(plan => {
                const planCard = document.createElement('div');
                planCard.className = 'service-card';
                planCard.innerHTML = `
                    <h3>${plan.title}</h3>
                    <h2>${plan.price}</h2>
                    <ul style="list-style: none; text-align: left; margin-top: 15px;">
                        ${plan.features.map(feature => `<li style="margin: 8px 0; padding-left: 20px; position: relative;">• ${feature}</li>`).join('')}
                    </ul>
                `;
                pricingGrid.appendChild(planCard);
            });
            
            // Append after the heading
            pricingContainer.appendChild(pricingGrid);
        }
    }

    // Function to handle button click
    function handleButtonClick() {
        // Change button text temporarily
        const originalText = dynamicBtn.textContent;
        dynamicBtn.textContent = 'Magic is happening...';

        // Create a random color
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        
        // Apply color change to body background
        document.body.style.backgroundColor = randomColor;

        // Show dynamic content
        dynamicContent.innerHTML = `<p style="padding: 20px; background-color: rgba(255,255,0.8); border-radius: 10px; text-align: center;">Background color changed to ${randomColor}!</p>`;
        
        // Change button text back after 2 seconds
        setTimeout(() => {
            dynamicBtn.textContent = originalText;
            // Reset background color after 5 seconds
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 5000);
        }, 2000);
    }

    // Function to handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if(name && email && message) {
            // Show success message
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'success';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            // Show error message
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'error';
            formMessage.style.display = 'block';
        }
    }

    // Function to highlight active navigation link
    function highlightActiveLink() {
        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                // Remove active class from all links
                document.querySelectorAll('.nav-links a').forEach(a => {
                    a.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize the page
    displayProcess();
    displayPricing();
    dynamicBtn.addEventListener('click', handleButtonClick);
    contactForm.addEventListener('submit', handleFormSubmit);
    highlightActiveLink();

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            header.style.background = '#fff';
        }
    });
});
