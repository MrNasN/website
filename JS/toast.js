
(function () {
    // Ensure container exists
    function getContainer() {
        let container = document.querySelector('.site-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'site-toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    // Global Toast Function
    window.showToast = function (title, message, duration = 3500) {
        const container = getContainer();

        const toast = document.createElement('div');
        toast.className = 'site-toast';

        // Checkmark Circle Icon SVG
        const iconSvg = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15879a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        `;

        toast.innerHTML = `
            <div class="site-toast-icon">${iconSvg}</div>
            <div class="site-toast-content">
                <div class="site-toast-title">${title}</div>
                <div class="site-toast-message">${message}</div>
            </div>
            <button class="site-toast-close" title="Close" aria-label="Close">&times;</button>
        `;

        const closeBtn = toast.querySelector('.site-toast-close');
        let timer = null;

        function dismiss() {
            if (timer) clearTimeout(timer);
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 350);
        }

        closeBtn.onclick = dismiss;
        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        timer = setTimeout(dismiss, duration);
    };

    // Initialize Form Listeners
    document.addEventListener('DOMContentLoaded', function () {
        // 1. Contact Form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const nameInput = document.getElementById('contactname');
                const senderName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Doctor';

                showToast(
                    'Message Sent!',
                    `Done! Thank you, ${senderName}. Your message has been received promptly.`
                );

                contactForm.reset();
            });
        }

        // 2. Login Form
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const usernameInput = document.getElementById('username');
                const user = usernameInput && usernameInput.value.trim() ? usernameInput.value.trim() : 'Doctor';

                showToast(
                    'Login Successful!',
                    `Done! Welcome back, ${user}. Taking you to the homepage...`
                );

                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 1800);
            });
        }
    });
})();
