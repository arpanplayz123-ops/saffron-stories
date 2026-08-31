/* =================================================================
   CONFIG OBJECT 
   Edit these details to convert the demo for a real client
================================================================= */
const CONFIG = {
    businessName: "Saffron Stories",
    phone: "+91 90000 00000",
    whatsapp: "919000000000", // No plus sign, just country code & number for API link
    email: "hello@saffronstories.demo",
    instagram: "@saffronstories.demo",
    instagramUrl: "https://instagram.com",
    address: "Station Road, Kharagpur, West Bengal",
    mapsLink: "https://maps.google.com/?q=Station+Road,+Kharagpur",
    openingHours: [
        "Monday - Thursday: 11:00 AM - 10:00 PM",
        "Friday - Sunday: 11:00 AM - 11:00 PM"
    ]
};

/* =================================================================
   MENU DATA
================================================================= */
const menuData = [
    { category: "starters", name: "Paneer Tikka", desc: "Cottage cheese marinated in yogurt and spices, roasted in tandoor.", price: "₹249", veg: true },
    { category: "starters", name: "Chicken Tikka", desc: "Tender chicken chunks marinated in traditional spices and grilled.", price: "₹299", veg: false },
    { category: "starters", name: "Veg Seekh Kebab", desc: "Minced vegetable skewers cooked in a clay oven.", price: "₹229", veg: true },
    { category: "starters", name: "Crispy Corn", desc: "Fried corn kernels tossed with onions, peppers, and spicy tang.", price: "₹199", veg: true },
    
    { category: "mains", name: "Butter Chicken", desc: "Classic tandoori chicken simmered in a rich tomato and butter gravy.", price: "₹399", veg: false },
    { category: "mains", name: "Paneer Lababdar", desc: "Cottage cheese cubes in a creamy, onion-tomato based rich gravy.", price: "₹349", veg: true },
    { category: "mains", name: "Dal Makhani", desc: "Black lentils slow-cooked overnight with cream and butter.", price: "₹249", veg: true },
    { category: "mains", name: "Kadhai Chicken", desc: "Spicy and flavorful chicken cooked with bell peppers and whole spices.", price: "₹389", veg: false },
    
    { category: "rice", name: "Chicken Biryani", desc: "Aromatic basmati rice cooked with marinated chicken and fragrant spices.", price: "₹349", veg: false },
    { category: "rice", name: "Vegetable Biryani", desc: "Basmati rice dum-cooked with mixed vegetables and saffron.", price: "₹299", veg: true },
    { category: "rice", name: "Jeera Rice", desc: "Basmati rice tempered with cumin seeds.", price: "₹149", veg: true },
    
    { category: "desserts", name: "Gulab Jamun", desc: "Deep-fried milk dumplings soaked in sugar syrup.", price: "₹99", veg: true },
    { category: "desserts", name: "Rasmalai", desc: "Soft paneer discs soaked in thickened, sweetened milk.", price: "₹129", veg: true },
    { category: "desserts", name: "Kulfi", desc: "Traditional Indian dense ice cream flavored with cardamom and nuts.", price: "₹119", veg: true }
];


/* =================================================================
   INITIALIZATION & DOM MANIPULATION
================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Populate Config Data
    document.getElementById('conf-address').textContent = CONFIG.address;
    document.getElementById('conf-phone').textContent = CONFIG.phone;
    document.getElementById('conf-phone-link').href = `tel:${CONFIG.phone.replace(/\s+/g, '')}`;
    document.getElementById('conf-whatsapp-link').href = `https://wa.me/${CONFIG.whatsapp}`;
    document.getElementById('conf-email').textContent = CONFIG.email;
    document.getElementById('conf-email-link').href = `mailto:${CONFIG.email}`;
    document.getElementById('conf-ig').textContent = CONFIG.instagram;
    document.getElementById('conf-ig-link').href = CONFIG.instagramUrl;
    document.getElementById('conf-maps').href = CONFIG.mapsLink;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const hoursContainer = document.getElementById('conf-hours');
    CONFIG.openingHours.forEach(hours => {
        const li = document.createElement('li');
        li.textContent = hours;
        hoursContainer.appendChild(li);
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Render Menu
    const menuContainer = document.getElementById('menu-container');
    
    function renderMenu(filterCategory = 'all') {
        menuContainer.innerHTML = '';
        
        const filteredMenu = filterCategory === 'all' 
            ? menuData 
            : menuData.filter(item => item.category === filterCategory);
            
        filteredMenu.forEach(item => {
            const vegClass = item.veg ? 'veg-icon' : 'non-veg-icon veg-icon';
            const menuItemHTML = `
                <div class="menu-item fade-up visible">
                    <div class="menu-item-info">
                        <h4>
                            <span class="${vegClass}" title="${item.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                            ${item.name}
                        </h4>
                        <p>${item.desc}</p>
                    </div>
                    <div class="menu-item-price">${item.price}</div>
                </div>
            `;
            menuContainer.insertAdjacentHTML('beforeend', menuItemHTML);
        });
    }

    renderMenu('all'); // Initial render

    // 5. Menu Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            // Re-render menu
            const category = e.target.getAttribute('data-filter');
            renderMenu(category);
        });
    });

    // 6. Lightbox for Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryImages = document.querySelectorAll('.gallery-img');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = "block";
            // Strip any small-width params for a higher-res lightbox if desired, or just use source
            lightboxImg.src = this.src.replace('&w=600', '&w=1200');
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = "none";
    });

    // Close lightbox on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });

    // 7. Mock Reservation Form Submission
    const resForm = document.getElementById('reservation-form');
    const formMessage = document.getElementById('form-message');

    resForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show mock success message
        formMessage.textContent = "Demo reservation request received. Connect this form to WhatsApp/email/backend for a real restaurant.";
        formMessage.classList.remove('hidden');
        formMessage.classList.add('success');
        
        // Reset form
        resForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
            formMessage.classList.remove('success');
        }, 5000);
    });

    // 8. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run animation once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
});
