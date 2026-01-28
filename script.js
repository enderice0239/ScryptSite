const CONFIG = {
    logo: {
        src: 'https://cdn.discordapp.com/attachments/1458250010788630581/1466069930163179540/2raw.png?ex=697b6785&is=697a1605&hm=2ad2c0fda030fabc78060b047dbe7f31becb7dd1a737cf4d0dd2f910307de79f&', // URL del tuo logo
        alt: 'Scrypt logo'
    },
    
    title: {
        text: '>Scrypt',
        show: true
    },

    buttons: [
        {
            icon: 'https://cdn.simpleicons.org/instagram/E4405F',
            text: 'Instagram',
            url: 'https://www.instagram.com/scryptroleplay/'
        },
        {
            icon: 'https://cdn.simpleicons.org/tiktok/000000',   
            text: 'TikTok',
            url: 'https://www.tiktok.com/@scryptroleplay?lang=e'
        },
        {
            icon: 'https://cdn.simpleicons.org/youtube/FF0000',  
            text: 'YouTube',
            url: 'https://youtube.com/@tuoaccount'
        },
        {
            icon: 'https://cdn.simpleicons.org/twitch/9146FF',   
            text: 'Twitch',
            url: 'https://twitch.tv/tuoaccount'
        },
        {
            icon: 'https://cdn.simpleicons.org/discord/9146FF',
            text: 'Discord',
            url: 'https://discord.gg/EPcWRvJcdv'
        }
        // - instagram
        // - tiktok
        // - youtube
        // - twitch
        // - twitter/x
        // - facebook
        // - discord
        // - telegram
        // - snapchat
        // - linkedin
        // - github
        // - spotify
        // - soundcloud
        // - patreon
        // - onlyfans
        // - reddit
        // https://simpleicons.org

    ]
};

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    setupLogo();
    setupTitle();
    setupButtons();
    enableLogoDrag();
}

function setupLogo() {
    const logoElement = document.getElementById('logo');
    const logoContainer = document.getElementById('logoContainer');
    
    if (CONFIG.logo.src && CONFIG.logo.src !== 'https://i.imgur.com/placeholder.png') {
        logoElement.src = CONFIG.logo.src;
        logoElement.alt = CONFIG.logo.alt;
        logoContainer.classList.remove('hidden');
    } else {
        logoContainer.classList.add('hidden');
    }
}

function setupTitle() {
    const titleElement = document.getElementById('title');
    
    if (CONFIG.title.show && CONFIG.title.text) {
        titleElement.textContent = CONFIG.title.text;
        titleElement.classList.remove('hidden');
    } else {
        titleElement.classList.add('hidden');
    }
}

function setupButtons() {
    const menuElement = document.getElementById('menu');
    menuElement.innerHTML = '';
    
    CONFIG.buttons.forEach((button, index) => {
        const buttonElement = createButton(button, index);
        menuElement.appendChild(buttonElement);
    });
}

function createButton(buttonData, index) {
    const link = document.createElement('a');
    link.href = buttonData.url;
    link.className = 'menu-item';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.animationDelay = `${0.05 + (index * 0.05)}s`;
    
    if (buttonData.icon) {
        const iconContainer = document.createElement('span');
        iconContainer.className = 'menu-item-icon';
        
        if (buttonData.icon.startsWith('http://') || buttonData.icon.startsWith('https://')) {
            const iconImg = document.createElement('img');
            iconImg.src = buttonData.icon;
            iconImg.alt = buttonData.text + ' icon';
            iconImg.onerror = function() {
                iconContainer.textContent = '🔗';
            };
            iconContainer.appendChild(iconImg);
        } else {
            iconContainer.textContent = buttonData.icon;
        }
        
        link.appendChild(iconContainer);
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = buttonData.text;
    link.appendChild(textSpan);
    
    return link;
}

function enableLogoDrag() {
    const logo = document.getElementById('logo');
    if (!logo) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    let originalRect = null;
    let restoreTimer = null;
    let savedInlineStyle = "";

    logo.draggable = false;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

    const clearRestoreTimer = () => {
        if (restoreTimer) {
            clearTimeout(restoreTimer);
            restoreTimer = null;
        }
    };

    const startDrag = (clientX, clientY) => {
        clearRestoreTimer();

        originalRect = logo.getBoundingClientRect();
        savedInlineStyle = logo.getAttribute("style") || "";

        logo.style.position = 'fixed';
        logo.style.left = `${originalRect.left}px`;
        logo.style.top = `${originalRect.top}px`;
        logo.style.margin = '0';
        logo.style.zIndex = '9999';
        logo.style.transition = 'none';

        offsetX = clientX - originalRect.left;
        offsetY = clientY - originalRect.top;

        isDragging = true;
        logo.classList.add('dragging');
    };

    const moveDrag = (clientX, clientY) => {
        if (!isDragging) return;

        const w = logo.offsetWidth;
        const h = logo.offsetHeight;

        const left = clamp(clientX - offsetX, 0, window.innerWidth - w);
        const top  = clamp(clientY - offsetY, 0, window.innerHeight - h);

        logo.style.left = `${left}px`;
        logo.style.top = `${top}px`;
    };

    const animateBackToOriginal = () => {
        if (!originalRect) return;

        logo.style.transition = 'left 450ms ease, top 450ms ease, transform 450ms ease';
        logo.style.left = `${originalRect.left}px`;
        logo.style.top = `${originalRect.top}px`;

        const onEnd = (e) => {
            if (e.propertyName !== 'left' && e.propertyName !== 'top') return;

            logo.removeEventListener('transitionend', onEnd);

            if (savedInlineStyle) logo.setAttribute("style", savedInlineStyle);
            else logo.removeAttribute("style");

            logo.classList.remove('dragging');
            originalRect = null;
        };

        logo.addEventListener('transitionend', onEnd);
    };

    const endDrag = () => {
        if (!isDragging) return;

        isDragging = false;
        logo.classList.remove('dragging');

        clearRestoreTimer();
        restoreTimer = setTimeout(() => {
            animateBackToOriginal();
        }, 5000);
    };

    logo.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
    window.addEventListener('mouseup', endDrag);

    logo.addEventListener('touchstart', (e) => {
        if (!e.touches || !e.touches[0]) return;
        e.preventDefault();
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (!e.touches || !e.touches[0]) return;
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', endDrag);

    window.addEventListener('resize', () => {
        if (!isDragging) return;
        const rect = logo.getBoundingClientRect();
        logo.style.left = `${clamp(rect.left, 0, window.innerWidth - logo.offsetWidth)}px`;
        logo.style.top  = `${clamp(rect.top, 0, window.innerHeight - logo.offsetHeight)}px`;
    });
}

console.log('%c✅ Link Hub Initialized', 'color: #ffffff; font-size: 14px; font-weight: bold; font-family: JetBrains Mono;');
console.log('%cConfigured with ' + CONFIG.buttons.length + ' buttons', 'color: #a3a3a3; font-family: JetBrains Mono;');
