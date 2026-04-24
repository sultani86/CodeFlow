// CodeFlow Community Core Logic

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initGlitchEffect();
    initTeamData();
    initContactForm();
    initChatbot();
    initScrollAnimations();
});

// --- Navigation Logic ---
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        const isDisplay = navLinks.style.display === 'flex';
        navLinks.style.display = isDisplay ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(5, 5, 8, 0.95)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--neon-blue)';
    });
}

// --- Glitch Effect on Hero Text ---
function initGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    const originalText = glitchText.getAttribute('data-text');
    const chars = '!<>-_\\\\/[]{}—=+*^?#________';
    
    // Start initial glitch with slight delay
    setTimeout(() => {
        let iterations = 0;
        
        const interval = setInterval(() => {
            glitchText.innerText = originalText.split('').map((letter, index) => {
                if(index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            
            iterations += 1 / 3;
            
            if(iterations >= originalText.length) {
                clearInterval(interval);
                glitchText.innerText = originalText;
            }
        }, 30);
    }, 500); // Trigger once after 500ms
}

// --- Dynamic Team Loading ---
function initTeamData() {
    // Array of 7-8 members for the community
    const teamMembers = [
        { name: "Member 1", role: "Web Developer", icon: "ri-user-star-line", skills: ["React", "Node.js", "HTML/CSS"] },
        { name: "Member 2", role: "UI/UX Designer", icon: "ri-paint-brush-line", skills: ["Figma", "CSS3", "Design"] },
        { name: "Member 3", role: "Backend Developer", icon: "ri-server-line", skills: ["Python", "Django", "PostgreSQL"] },
        { name: "Member 4", role: "AI Specialist", icon: "ri-brain-line", skills: ["TensorFlow", "OpenAI", "Python"] },
        { name: "Member 5", role: "Frontend Dev", icon: "ri-code-s-slash-line", skills: ["HTML5", "JS", "Vue"] },
        { name: "Member 6", role: "Security Ops", icon: "ri-shield-keyhole-line", skills: ["Docker", "CyberSec", "Linux"] },
        { name: "Member 7", role: "Database Admin", icon: "ri-database-2-line", skills: ["MongoDB", "SQL", "Redis"] },
        { name: "Member 8", role: "QA Engineer", icon: "ri-bug-line", skills: ["Jest", "Selenium", "Testing"] }
    ];

    const teamGrid = document.getElementById('team-grid');

    teamMembers.forEach(member => {
        const skillsHTML = member.skills.map(skill => `<span>${skill}</span>`).join('');
        
        const memberHTML = `
            <div class="team-member animate-on-scroll">
                <div class="member-avatar">
                    <i class="${member.icon}"></i>
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <div class="member-role">${member.role}</div>
                    <div class="member-skills">
                        ${skillsHTML}
                    </div>
                </div>
            </div>
        `;
        teamGrid.insertAdjacentHTML('beforeend', memberHTML);
    });
}

// --- Contact Form (Google Sheets Preparation) ---
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `<span>Transmitting...</span><i class="ri-loader-4-line spin"></i>`;
        
        // Simulating network request to Google Apps Script Endpoint
        // In real setup, you would use fetch() to send to your Google Script URL
        /*
        const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => { ... })
        */
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            statusDiv.innerHTML = `<span class="status-success"><i class="ri-check-line"></i> Transmission Successful. System logged.</span>`;
            form.reset();
            
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        }, 2000);
    });
}

// --- AI Chatbot Widget Logic ---
function initChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chat-window');
    const closeBtn = document.getElementById('close-chat');
    const quickReplies = document.getElementById('quick-replies');
    const chatBody = document.getElementById('chat-body');

    toggle.addEventListener('click', () => {
        window.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        window.classList.remove('active');
    });

    // Pre-programmed bot responses
    const botBrain = {
        "What is CodeFlow?": "CodeFlow is a community of 7-8 developers focused on creating modern web and IT solutions. We are evolving into a full-fledged startup.",
        "View Projects": "Currently, we are working on our Community Website, a Future Mobile App, and Open Source Libraries. Navigate to the 'Our Projects' section for details.",
        "Talk to Human": "Initializing direct chat... Please use the WhatsApp button below to speak directly with our team."
    };

    // Handle Quick Replies
    quickReplies.addEventListener('click', (e) => {
        if(e.target.classList.contains('qr-btn')) {
            const userText = e.target.getAttribute('data-reply');
            
            // Add User Message
            addMessage(userText, 'user-message');
            
            // Hide quick replies temporarily
            quickReplies.style.display = 'none';

            // Simulate typing delay
            setTimeout(() => {
                const botReply = botBrain[userText] || "Command not recognized.";
                addMessage(botReply, 'bot-message');
                
                // Show quick replies again
                quickReplies.style.display = 'flex';
                scrollToBottom();
            }, 800);
        }
    });

    function addMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        
        // Insert before quick replies
        chatBody.insertBefore(msgDiv, quickReplies);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
}
