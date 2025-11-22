// Smooth page transition system
(function() {
    'use strict';
  
    // Get current page number from filename
    const currentPage = window.location.pathname.split('/').pop() || '1.html';
    const pageNum = parseInt(currentPage.replace('.html', '')) || 1;
  
    // Add fade-in animation on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Add pulse and slide animations CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            @keyframes slideInFromRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
  
        const body = document.body;
        const html = document.documentElement;
  
        // Find main container
        const mainContainer = document.querySelector('section') || document.querySelector('.a') || document.querySelector('body > div') || body;
  
        // Set initial position for slide-in animation
        mainContainer.style.transform = 'translateX(100%)';
        mainContainer.style.opacity = '0';
        mainContainer.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
  
        // Slide in from right
        setTimeout(() => {
            mainContainer.style.transform = 'translateX(0)';
            mainContainer.style.opacity = '1';
        }, 50);
  
        // Handle page-specific logic
        handlePageLogic();
    });
  
    function handlePageLogic() {
      switch(pageNum) {
          case 1: handlePage1(); break;
          case 2:
          case 3:
          case 4:
          case 5: handleAutoTransition(pageNum, pageNum + 1, 60000); break; // 60 sec
          case 6: handlePage6(); break;
          case 7: handlePage7(); break;
          case 8: handlePage8(); break;
  
          // FIXED HERE ↓↓↓
          case 9: handleAutoTransition(9, 10, 60000); break; // 9 → 10
          case 10: handleAutoTransition(10, 11, 60000); break; // 10 → 11
          // ↑↑↑ FIXED
  
          case 11: handleAutoTransition(11, 12, 60000); break; // 60 sec
          case 12: handleAutoTransition(12, 1, 60000); break; // back to 1
      }
  }
  
    // Page 1: "НАЧАТЬ" button click
    function handlePage1() {
        const startButton = document.querySelector('.group-2');
        if (startButton) {
            startButton.style.cursor = 'pointer';
            startButton.addEventListener('click', function() {
                navigateToPage('2.html');
            });
        }
    }
  
    // Page 6,7,8: "ДАЛЬШЕ" button click
    function handlePage6() { setupNextButton('.text-wrapper-9', '7.html'); }
    function handlePage7() { setupNextButton('.text-wrapper-9', '8.html'); }
    function handlePage8() { setupNextButton('.text-wrapper-10', '9.html'); }
  
    function setupNextButton(selector, nextPage) {
        const nextButton = document.querySelector(selector);
        const rectangle = document.querySelector('.rectangle-5');
  
        if (nextButton) {
            nextButton.style.cursor = 'pointer';
            nextButton.addEventListener('click', function() {
                navigateToPage(nextPage);
            });
        }
  
        if (rectangle) {
            rectangle.style.cursor = 'pointer';
            rectangle.addEventListener('click', function() {
                navigateToPage(nextPage);
            });
        }
    }
  
    // Create countdown timer
    function createCountdownTimer(seconds) {
        const existingTimer = document.getElementById('countdown-timer');
        if (existingTimer) existingTimer.remove();
  
        const timer = document.createElement('div');
        timer.id = 'countdown-timer';
        timer.style.cssText = `
            position: fixed;
            top: 15px;
            right: 15px;
            background: rgba(0,0,0,0.6);
            color: #fff;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
            font-family: Arial, sans-serif;
            z-index: 10000;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.15);
            text-align: center;
            transition: all 0.3s ease;
        `;
        timer.textContent = seconds;
        document.body.appendChild(timer);
        return timer;
    }
  
    // Auto-transition with countdown
    function handleAutoTransition(fromPage, toPage, delay) {
        const seconds = delay / 1000;
        const timer = createCountdownTimer(seconds);
        let remaining = seconds;
  
        const interval = setInterval(() => {
            remaining--;
            if (remaining > 0) {
                timer.textContent = remaining;
                if (remaining <= 3) {
                    timer.style.animation = 'pulse 0.5s ease-in-out';
                }
            } else {
                clearInterval(interval);
                timer.textContent = '0';
            }
        }, 1000);
  
        setTimeout(() => {
            clearInterval(interval);
            if (typeof toPage === 'number') toPage = toPage + '.html';
            navigateToPage(toPage);
        }, delay);
    }
  
    // Prevent multiple rapid clicks
    let isNavigating = false;
  
    // Smooth navigation with slide effect
    function navigateToPage(nextPage) {
        if (isNavigating) return;
        isNavigating = true;
  
        const body = document.body;
        const html = document.documentElement;
        const mainContainer = document.querySelector('section') || document.querySelector('.a') || document.querySelector('body > div') || body;
  
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        body.style.position = 'relative';
  
        const nextPageFrame = document.createElement('iframe');
        nextPageFrame.src = nextPage;
        nextPageFrame.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            transform: translateX(100%);
            opacity: 0;
            transition: transform 1.2s ease-in-out, opacity 1.2s ease-in-out;
            z-index: 1000;
            background: #000;
            pointer-events: none;
        `;
        body.appendChild(nextPageFrame);
  
        nextPageFrame.onload = function() {
            nextPageFrame.offsetHeight;
  
            requestAnimationFrame(() => {
                mainContainer.style.transition = 'transform 1.2s ease-in-out, opacity 1.2s ease-in-out';
                mainContainer.style.transform = 'translateX(-100%)';
                mainContainer.style.opacity = '0';
  
                nextPageFrame.style.transform = 'translateX(0)';
                nextPageFrame.style.opacity = '1';
            });
  
            setTimeout(() => {
                window.location.href = nextPage;
            }, 1200);
        };
  
        setTimeout(() => {
            if (nextPageFrame.style.opacity === '0') {
                mainContainer.style.transition = 'transform 1.2s ease-in-out, opacity 1.2s ease-in-out';
                mainContainer.style.transform = 'translateX(-100%)';
                mainContainer.style.opacity = '0';
                setTimeout(() => { window.location.href = nextPage; }, 1200);
            }
        }, 3000);
    }
  
  })();
  