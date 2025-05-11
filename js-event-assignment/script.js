document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // Click Event
    const clickBox = document.getElementById('clickBox');
    clickBox.addEventListener('click', function() {
        this.textContent = 'Clicked!';
        this.style.backgroundColor = '#e74c3c';
        setTimeout(() => {
            this.textContent = 'Click me again!';
            this.style.backgroundColor = '#3498db';
        }, 1000);
    });
    
    // Hover Event
    const hoverBox = document.getElementById('hoverBox');
    hoverBox.addEventListener('mouseenter', function() {
        this.textContent = 'Mouse entered!';
    });
    hoverBox.addEventListener('mouseleave', function() {
        this.textContent = 'Hover over me!';
    });
    
    // Keypress Event
    const keypressBox = document.getElementById('keypressBox');
    keypressBox.setAttribute('tabindex', '0'); // Make it focusable
    keypressBox.addEventListener('keydown', function(e) {
        this.textContent = `Key pressed: ${e.key}`;
        setTimeout(() => {
            this.textContent = 'Press any key while focused';
        }, 1000);
    });
    
    // Secret Actions (Double click and long press)
    const secretBox = document.getElementById('secretBox');
    let pressTimer;
    
    secretBox.addEventListener('dblclick', function() {
        this.textContent = 'Double click detected! 🎉';
        this.style.backgroundColor = '#9b59b6';
        setTimeout(resetSecretBox, 1500);
    });
    
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            this.textContent = 'Long press detected! 🎊';
            this.style.backgroundColor = '#f39c12';
            setTimeout(resetSecretBox, 1500);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function resetSecretBox() {
        secretBox.textContent = 'Double click or long press me!';
        secretBox.style.backgroundColor = '#3498db';
    }
    
    // ========== Interactive Elements ==========
    
    // Color Changing Button
    const colorChanger = document.getElementById('colorChanger');
    const colors = ['#2ecc71', '#e74c3c', '#3498db', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1}`;
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    });
    
    // Auto-rotate gallery every 3 seconds
    setInterval(() => {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    }, 3000);
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update contents
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('userForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordStrength = document.querySelector('.password-strength');
    
    // Real-time validation
    username.addEventListener('input', validateUsername);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    // Validation functions
    function validateUsername() {
        const error = username.nextElementSibling;
        if (username.value.trim() === '') {
            error.textContent = 'Username is required';
            error.style.display = 'block';
            return false;
        } else if (username.value.length < 3) {
            error.textContent = 'Username must be at least 3 characters';
            error.style.display = 'block';
            return false;
        } else {
            error.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const error = email.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.value.trim() === '') {
            error.textContent = 'Email is required';
            error.style.display = 'block';
            return false;
        } else if (!emailRegex.test(email.value)) {
            error.textContent = 'Please enter a valid email';
            error.style.display = 'block';
            return false;
        } else {
            error.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        const error = password.nextElementSibling;
        
        if (password.value.trim() === '') {
            error.textContent = 'Password is required';
            error.style.display = 'block';
            updatePasswordStrength(0);
            return false;
        } else if (password.value.length < 8) {
            error.textContent = 'Password must be at least 8 characters';
            error.style.display = 'block';
            updatePasswordStrength(password.value.length / 8);
            return false;
        } else {
            error.style.display = 'none';
            updatePasswordStrength(1);
            return true;
        }
    }
    
    function updatePasswordStrength(strength) {
        const strengthBar = passwordStrength.querySelector('::after') || passwordStrength;
        const colors = ['#e74c3c', '#f39c12', '#2ecc71'];
        let color;
        
        if (strength < 0.5) {
            color = colors[0];
        } else if (strength < 0.75) {
            color = colors[1];
        } else {
            color = colors[2];
        }
        
        passwordStrength.style.setProperty('--strength-color', color);
        passwordStrength.style.width = `${strength * 100}%`;
    }
});