// Smooth page transition system
(function() {
    'use strict';
  
    let selectedImages = JSON.parse(localStorage.getItem('selectedImages') || '{}');

    let selectedImage = localStorage.getItem('selectedImage');

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
            @keyframes slideInFromLeft {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
  
        const body = document.body;
        const html = document.documentElement;
  
        // Find main container
        const mainContainer = document.querySelector('section') || document.querySelector('.a') || document.querySelector('body > div') || body;
  
        // Set initial position for slide-in animation
        mainContainer.style.transform = 'translateX(-100%)';
        mainContainer.style.opacity = '0';
        mainContainer.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.5s ease-in-out';
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
  
        // Slide in from left
        setTimeout(() => {
            mainContainer.style.transform = 'translateX(0)';
            mainContainer.style.opacity = '1';
        }, 50);
  
        // Handle page-specific logic
        handlePageLogic();
        
        // Add click handler for epitaph blocks
        // Get all selectable groups
        const groups = document.querySelectorAll('.group-3, .group-5, .group-6, .group-7, .group-8, .group-10, .group-11');
        
        // Load saved selection from localStorage
        const savedSelection = localStorage.getItem('selectedEpitaph');
        if (savedSelection) {
            const selectedElement = document.querySelector(savedSelection);
            if (selectedElement) {
                selectedElement.classList.add('selected');
            }
        }

        // Add click event listeners
        groups.forEach(group => {
            group.addEventListener('click', function() {
                // Remove selected class from all groups
                groups.forEach(g => g.classList.remove('selected'));
                
                // Add selected class to clicked group
                this.classList.add('selected');
                
                // Save selection to localStorage
                const selector = '.' + Array.from(this.classList).find(cls => cls.startsWith('group-'));
                localStorage.setItem('selectedEpitaph', selector);
            });
        });

        // Function to make list items selectable
        function setupSelectableItems(containerSelector = '.a') {
            const container = document.querySelector(containerSelector);
            if (!container) return;
            
            // Add click event listener to the container (event delegation)
            container.addEventListener('click', function(event) {
                const item = event.target.closest('.selectable-item');
                if (!item) return;
                
                // Toggle selected class
                item.classList.toggle('selected');
                
                // If you want to allow only one selection at a time, uncomment the following lines:
                // const allItems = container.querySelectorAll('.selectable-item');
                // allItems.forEach(i => {
                //     if (i !== item) i.classList.remove('selected');
                // });
            });
        }

        // Initialize selectable items
        setupSelectableItems();
        
        // Make text wrappers clickable
        setupTextWrapperClicks();
    });

    // Add new function to handle text wrapper clicks
    function setupTextWrapperClicks() {
        // Get all text wrappers that should be clickable
        const textWrappers = [
            document.querySelector('.text-wrapper-9'),
            document.querySelector('.text-wrapper-11'),
            document.querySelector('.text-wrapper-12'),
            document.querySelector('.text-wrapper-13'),
            document.querySelector('.text-wrapper-17'),
            document.querySelector('.text-wrapper-18')
        ];

        // Add click event to each text wrapper
        textWrappers.forEach(wrapper => {
            if (wrapper) {
                wrapper.style.cursor = 'pointer';
                wrapper.addEventListener('click', function(e) {
                    e.preventDefault();
                    navigateToPage('6.html');
                });
            }
        });
    }

    function handlePageLogic() {
      // Load saved selections from localStorage
      const savedSelections = JSON.parse(localStorage.getItem('formSelections') || '{}');
      
      // Apply saved selections to current page if they exist
      if (Object.keys(savedSelections).length > 0) {
        applySavedSelections(savedSelections);
      }
      
      switch(pageNum) {
          case 1: handlePage1(); break;
          case 2: 
              // Make specific images clickable on page 2
              setupImageNavigation({
                  '.bez-znakov': { target: '3.html', page: 2, id: 'img1' },
                  '.img': { target: '3.html', page: 2, id: 'img2' },
                  '.bez-znakov-2': { target: '3.html', page: 2, id: 'img3' },
                  '.bez-znakov-3': { target: '3.html', page: 2, id: 'img4' },
                  '.bez-znakov-4': { target: '3.html', page: 2, id: 'img5' },
                  '.bez-znakov-5': { target: '3.html', page: 2, id: 'img6' }
              });
              handleAutoTransition(2, 3, 60000);
              break;
          case 3: 
              // Make images clickable on page 3
              setupImageNavigation({
                  'img': { target: '4.html', page: 3, id: 'img1' } // All images on page 3
              });
              // Auto-transition to page 5 after 60 seconds
              handleAutoTransition(3, 4, 60000);
              break;
          case 4:
              // Handle page 4 buttons
              setupPage4Buttons();
              // Auto-transition to page 5 after 60 seconds
              handleAutoTransition(4, 5, 60000);
              break;
          case 5:
              setupEpitaphSelection();
              handleAutoTransition(5, 6, 60000);
              break;
          case 6: 
              handlePage6();
              // Make images clickable on page 6
              setupImageNavigation({
                  'img': { target: '7.html', page: 6, id: 'img1' }
              });
              break;
          case 7: 
              handlePage7();
              // Make images clickable on page 7
              setupImageNavigation({
                  'img': { target: '8.html', page: 7, id: 'img1' }
              });
              break;
          case 8: 
              handlePage8();
              // Make images clickable on page 8
              setupImageNavigation({
                  'img': { target: '9.html', page: 8, id: 'img1' }
              });
              break;
          case 9:
              setupPhotoSelection();
              handleAutoTransition(9, 10, 60000);
              break;
          case 10:
              setupFontSelection();
              handleAutoTransition(10, 11, 60000);
              break;
          case 11:
              setupPaymentButton();
              handleAutoTransition(11, 12, 60000);
              break;
          case 12: 
          handleAutoTransition(12, 1, 60000);
              break;
      }
    }
  
    // Apply saved selections to the current page
    function applySavedSelections(selections) {
      // Clear any existing selections when returning to pages
      if (pageNum === 9) {
        // Clear photo selections
        const photo1 = document.querySelector('.a-a-edf');
        const photo2 = document.querySelector('.element');
        [photo1, photo2].forEach(el => {
          if (el) el.classList.remove('selected');
        });
        // Remove saved photo selection
        delete selections.selectedPhoto;
      } 
      else if (pageNum === 10) {
        // Clear font selections
        const font1 = document.querySelector('.gotham-pro-medium');
        const font2 = document.querySelector('.gotham-pro-black');
        const font3 = document.querySelector('.benzin-bold');
        const font4 = document.querySelector('.benzin-medium');
        [font1, font2, font3, font4].forEach(el => {
          if (el) el.classList.remove('selected');
        });
        // Remove saved font selection
        delete selections.selectedFont;
      }
      else if (pageNum === 11) {
        // Clear form data
        const formInputs = {
            name: document.querySelector('.rectangle-3'),
            dates: document.querySelector('.rectangle-4'),
            customerName: document.querySelector('.rectangle-5'),
            phone: document.querySelector('.rectangle-6'),
            email: document.querySelector('.rectangle-7'),
            agreement1: document.querySelector('.checkbox-container:nth-child(1) .checkbox'),
            agreement2: document.querySelector('.checkbox-container:nth-child(2) .checkbox')
        };
        
        // Reset all form fields
        if (formInputs.name) formInputs.name.value = '';
        if (formInputs.dates) formInputs.dates.value = '';
        if (formInputs.customerName) formInputs.customerName.value = '';
        if (formInputs.phone) formInputs.phone.value = '';
        if (formInputs.email) formInputs.email.value = '';
        if (formInputs.agreement1) formInputs.agreement1.checked = false;
        if (formInputs.agreement2) formInputs.agreement2.checked = false;
        
        // Remove saved form data
        delete selections.formData;
      }
      
      // Save the updated selections (with cleared data)
      localStorage.setItem('formSelections', JSON.stringify(selections));
      
      // Apply photo selection
      if (selections.selectedPhoto && pageNum === 9) {
        const selectedElement = document.querySelector(selections.selectedPhoto);
        if (selectedElement) {
          selectedElement.classList.add('selected');
        }
      }
      
      // Apply font selection
      if (selections.selectedFont && pageNum === 10) {
        const selectedElement = document.querySelector(selections.selectedFont);
        if (selectedElement) {
          selectedElement.classList.add('selected');
        }
      }
      
      // Apply form data
      if (selections.formData && pageNum === 11) {
        const formData = selections.formData;
        const formInputs = {
            name: document.querySelector('.rectangle-3'),
            dates: document.querySelector('.rectangle-4'),
            customerName: document.querySelector('.rectangle-5'),
            phone: document.querySelector('.rectangle-6'),
            email: document.querySelector('.rectangle-7'),
            agreement1: document.querySelector('.checkbox-container:nth-child(1) .checkbox'),
            agreement2: document.querySelector('.checkbox-container:nth-child(2) .checkbox')
        };
        
        if (formInputs.name) formInputs.name.value = formData.deceasedName || '';
        if (formInputs.dates) formInputs.dates.value = formData.dates || '';
        if (formInputs.customerName) formInputs.customerName.value = formData.customerName || '';
        if (formInputs.phone) formInputs.phone.value = formData.phone || '';
        if (formInputs.email) formInputs.email.value = formData.email || '';
        if (formInputs.agreement1) formInputs.agreement1.checked = formData.needsContract || false;
        if (formInputs.agreement2) formInputs.agreement2.checked = formData.agreedToTerms || false;
      }
    }

    // Helper function to clear all selections and form data
    function clearAllSelections() {
      // Clear all saved selections and form data
      localStorage.removeItem('formSelections');
      
      // Clear any active selections in the UI
      const allSelectableElements = document.querySelectorAll('.selected');
      allSelectableElements.forEach(el => el.classList.remove('selected'));
      
      // Clear all form fields
      const formInputs = document.querySelectorAll('input, textarea');
      formInputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = false;
        } else {
          input.value = '';
        }
      });
    }

    // Add a button to go back to the start
    function setupBackToStartButton() {
      const backButton = document.createElement('button');
      backButton.textContent = 'Вернуться в начало';
      backButton.style.position = 'fixed';
      backButton.style.bottom = '20px';
      backButton.style.right = '20px';
      backButton.style.padding = '10px 20px';
      backButton.style.backgroundColor = '#333';
      backButton.style.color = 'white';
      backButton.style.border = 'none';
      backButton.style.borderRadius = '5px';
      backButton.style.cursor = 'pointer';
      backButton.style.zIndex = '1000';
      
      backButton.addEventListener('click', function() {
        clearAllSelections();
        navigateToPage('1.html');
      });
      
      document.body.appendChild(backButton);
    }
  
    // Helper function to set up image navigation with specific targets
    function setupImageNavigation(selectorsToTargets) {
        Object.entries(selectorsToTargets).forEach(([selector, config]) => {
            const elements = document.querySelectorAll(selector);
            const target = config.target;
            const page = config.page;
            const imageId = config.id;
            
            elements.forEach((element, index) => {
                element.style.cursor = 'pointer';
                
                // Set data attributes for selection
                const uniqueId = `${page}-${imageId}${elements.length > 1 ? `-${index}` : ''}`;
                element.setAttribute('data-image-id', uniqueId);
                
                // Check if this image was previously selected
                if (selectedImages[page] === uniqueId) {
                    element.classList.add('selected-image');
                }
                
                // Remove any existing click handlers to avoid duplicates
                element.removeEventListener('click', element.navigationHandler);
                
                // Create new handler
                element.navigationHandler = (e) => {
                    // Update selection
                    document.querySelectorAll(`[data-page="${page}"]`).forEach(img => {
                        img.classList.remove('selected-image');
                    });
                    
                    // Add selection to clicked image
                    e.currentTarget.classList.add('selected-image');
                    
                    // Save selection
                    selectedImages[page] = uniqueId;
                    localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
                    
                    // Navigate to target page
                    navigateToPage(target);
                };
                
                // Add the new handler
                element.addEventListener('click', element.navigationHandler);
            });
        });
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
            color: #000000; 
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
  
    function handleAutoTransition(fromPage, toPage, delay) {
        const timerElement = document.createElement('div');
        timerElement.style.position = 'fixed';
        timerElement.style.top = '20px';
        timerElement.style.right = '20px';
        timerElement.style.color = '#000000';
        timerElement.style.fontSize = '24px';
        timerElement.style.zIndex = '1000';
        timerElement.style.fontFamily = '"Gotham Pro", sans-serif';
        timerElement.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';
        document.body.appendChild(timerElement);
        
        let timeLeft = delay / 1000;
        timerElement.textContent = timeLeft;
        
        const timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                document.body.style.color = '#ffffff';
                void document.body.offsetHeight;
                navigateToPage(toPage);
            }
        }, 1000);
        
        return () => {
            clearInterval(timer);
            if (timerElement.parentNode) {
                timerElement.parentNode.removeChild(timerElement);
            }
        };
    }
  
    // Prevent multiple rapid clicks
    let isNavigating = false;
  
    // Smooth navigation with slide effect
    function navigateToPage(nextPage) {
        if (isNavigating) return;
        isNavigating = true;
        
        // Set text color to white at the start of navigation
        document.documentElement.style.setProperty('color', '#ffffff', 'important');
        document.body.style.setProperty('color', '#ffffff', 'important');
        
        // Also set text color for all text elements
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.setProperty('color', '#ffffff', 'important');
            el.style.setProperty('transition', 'color 0.5s ease');
        });
        
        const mainContainer = document.querySelector('section') || document.querySelector('.a') || document.querySelector('body > div') || document.body;
        
        // Set the transition for the slide-out animation
        mainContainer.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease-in-out';
        
        // Force a reflow to ensure the style is applied
        void mainContainer.offsetHeight;
        
        // Slide out to left
        mainContainer.style.transform = 'translateX(-100%)';
        mainContainer.style.opacity = '0';
        
        // Increase the timeout to match the animation duration
        setTimeout(() => {
            window.location.href = typeof nextPage === 'number' ? nextPage + '.html' : nextPage;
        }, 1000); // Increased from 500ms to 1000ms (1 second)
    }
  
    // Setup payment button click handler for page 11
    function setupPaymentButton() {
        // Add click handler to the payment button
        const paymentButton = document.querySelector('.rectangle-8');
        if (paymentButton) {
            paymentButton.addEventListener('click', function(e) {
                e.preventDefault();
                // Navigate directly to page 12 without validation for now
                navigateToPage('12.html');
            });
        }
        
        // Also make the text clickable
        const paymentText = document.querySelector('.text-wrapper-14');
        if (paymentText) {
            paymentText.addEventListener('click', function(e) {
                e.preventDefault();
                // Trigger the payment button click
                if (paymentButton) paymentButton.click();
            });
        }
    }

    // Handle page 4 buttons
    function setupPage4Buttons() {
        const noButton = document.querySelector('.group-5');
        const yesButton = document.querySelector('.group-5 .rectangle-5').parentNode;
        const graveImage = document.querySelector('.pam');
      
        // Set initial selection from localStorage if exists
        const selectedOption = localStorage.getItem('page4Selection');
        if (selectedOption) {
            const selectedButton = selectedOption === 'yes' ? yesButton : noButton;
            selectedButton.classList.add('selected-button');
        }

        // Add click handler for grave image
        if (graveImage) {
            graveImage.style.cursor = 'pointer';
            graveImage.addEventListener('click', function(e) {
                // Toggle grave selection
                const isSelected = this.classList.toggle('grave-selected');
                
                if (isSelected) {
                    // Show highlight
                    const rect = this.getBoundingClientRect();
                    const containerRect = document.querySelector('section').getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                    
                    highlight.style.left = (rect.left + scrollLeft - containerRect.left) + 'px';
                    highlight.style.top = (rect.top + scrollTop - containerRect.top) + 'px';
                    highlight.style.width = rect.width + 'px';
                    highlight.style.height = rect.height + 'px';
                    highlight.style.display = 'block';
                    
                    // Check if grave is empty (you can modify this condition as needed)
                    const isEmpty = true; // Set this based on your condition
                    
                    if (isEmpty) {
                        // Position NET label in the center of the grave
                        netLabel.style.left = (rect.left + scrollLeft - containerRect.left + rect.width/2 - 25) + 'px';
                        netLabel.style.top = (rect.top + scrollTop - containerRect.top + rect.height/2 - 20) + 'px';
                        netLabel.style.display = 'block';
                    } else {
                        netLabel.style.display = 'none';
                    }
                } else {
                    // Hide highlight and NET label
                    highlight.style.display = 'none';
                    netLabel.style.display = 'none';
                }
            });
        }
        
        // Add click handlers
        if (noButton) {
            noButton.addEventListener('click', function() {
                // Remove selection from both buttons
                document.querySelectorAll('.group-5').forEach(btn => {
                    btn.classList.remove('selected-button');
                });
                
                // Add selection to clicked button
                this.classList.add('selected-button');
                
                // Save selection
                localStorage.setItem('page4Selection', 'no');
                
                // Navigate to next page after a short delay for visual feedback
                setTimeout(() => {
                    navigateToPage('5.html');
                }, 300);
            });
        }

        if (yesButton) {
            yesButton.addEventListener('click', function() {
                // Remove selection from both buttons
                document.querySelectorAll('.group-5').forEach(btn => {
                    btn.classList.remove('selected-button');
                });
                
                // Add selection to clicked button
                this.classList.add('selected-button');
                
                // Save selection
                localStorage.setItem('page4Selection', 'yes');
                
                // Navigate to next page after a short delay for visual feedback
                setTimeout(() => {
                    navigateToPage('5.html');
                }, 300);
            });
        }
    }

    function setupEpitaphSelection() {
        // Get all epitaph blocks
        const epitaphBlocks = [
            document.querySelector('.group-3'),
            document.querySelector('.group-5'),
            document.querySelector('.group-6'),
            document.querySelector('.group-7'),
            document.querySelector('.group-10'), // 5th option
            document.querySelector('.group-11'),
            document.querySelector('.group-8') // Custom epitaph
        ].filter(Boolean); // Remove any null elements

        // Select the 5th option (group-10) by default
        const defaultBlock = document.querySelector('.group-10');
        if (defaultBlock) {
            const priceBox = defaultBlock.querySelector('.rectangle-3');
            if (priceBox) {
                priceBox.classList.add('selected');
                priceBox.style.border = '2px solid #808080';
                priceBox.style.borderRadius = '5px';
                priceBox.style.boxSizing = 'border-box';
                localStorage.setItem('selectedBlockId', '#' + defaultBlock.id);
            }
        }

        // Add click handlers to all epitaph blocks
        epitaphBlocks.forEach(block => {
            // Ensure each block has an ID
            if (!block.id) {
                block.id = 'block-' + Math.random().toString(36).substr(2, 9);
            }

            // Find the price box within this block
            const priceBox = block.querySelector('.rectangle-3, .rectangle-4');
            if (!priceBox) return;

            // Add click handler to the entire block
            block.style.cursor = 'pointer';
            block.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Remove selection from all price boxes
                document.querySelectorAll('.rectangle-3, .rectangle-4')
                    .forEach(box => box.classList.remove('selected'));
                
                // Add selection to this block's price box
                priceBox.classList.add('selected');
                
                // Save selection
                localStorage.setItem('selectedBlockId', '#' + this.id);
                
                // If it's a custom epitaph, prompt for text
                if (this.classList.contains('group-8')) {
                    const customText = prompt('Введите ваш текст эпитафии:');
                    if (customText !== null) {
                        const price = customText.length * 50;
                        const priceElement = this.querySelector('.text-wrapper-8');
                        if (priceElement) {
                            priceElement.textContent = price + ' ₽';
                        }
                        localStorage.setItem('customEpitaphText', customText);
                        localStorage.setItem('customEpitaphPrice', price);
                    } else {
                        // If user cancels, select the 5th option by default
                        priceBox.classList.remove('selected');
                        const defaultBox = document.querySelector('.group-10 .rectangle-3');
                        if (defaultBox) {
                            defaultBox.classList.add('selected');
                            defaultBox.style.border = '2px solid #808080';
                            defaultBox.style.borderRadius = '5px';
                            localStorage.setItem('selectedBlockId', '.group-10');
                        }
                        return;
                    }
                }
                
                // Navigate to next page after a short delay
                setTimeout(() => {
                    navigateToPage('6.html');
                }, 300);
            });
        });
    }

    function setupPhotoSelection() {
        // Get both image elements
        const photo1 = document.querySelector('.a-a-edf');
        const photo2 = document.querySelector('.element');
        
        // Set initial selection from localStorage if exists
        const selectedPhoto = localStorage.getItem('selectedPhoto');
        if (selectedPhoto) {
            const selectedElement = document.querySelector(selectedPhoto);
            if (selectedElement) {
                selectedElement.classList.add('selected');
            }
        } else {
            // Select first photo by default if none is selected
            photo1.classList.add('selected');
            localStorage.setItem('selectedPhoto', '.a-a-edf');
        }

        // Function to handle selection
        function selectElement(element) {
            // Remove selection from both images
            [photo1, photo2].forEach(el => {
                if (el) el.classList.remove('selected');
            });
            
            // Add selection to clicked element
            element.classList.add('selected');
            
            // Save selection
            localStorage.setItem('selectedPhoto', '.' + element.className);
            
            // Navigate to next page after a short delay
            setTimeout(() => {
                navigateToPage('10.html');
            }, 300);
        }

        // Add click handlers to both images
        if (photo1) {
            photo1.addEventListener('click', function(e) {
                e.stopPropagation();
                selectElement(this);
            });
        }

        if (photo2) {
            photo2.addEventListener('click', function(e) {
                e.stopPropagation();
                selectElement(this);
            });
        }
    }

    function setupFontSelection() {
        // Get all selectable font elements
        const font1 = document.querySelector('.gotham-pro-medium').parentElement;
        const font2 = document.querySelector('.gotham-pro-black').parentElement;
        const font3 = document.querySelector('.benzin-bold');
        const font4 = document.querySelector('.benzin-medium');
        
        // Set initial selection from localStorage if exists
        const selectedFont = localStorage.getItem('selectedFont');
        if (selectedFont) {
            const selectedElement = document.querySelector(selectedFont);
            if (selectedElement) {
                selectedElement.classList.add('selected');
            }
        } else {
            // Select first font by default if none is selected
            font1.classList.add('selected');
            localStorage.setItem('selectedFont', '.gotham-pro-medium');
        }

        // Function to handle selection
        function selectFont(element, fontClass) {
            // Remove selection from all fonts
            [font1, font2, font3, font4].forEach(el => {
                if (el) el.classList.remove('selected');
            });
            
            // Add selection to clicked element
            element.classList.add('selected');
            
            // Save selection
            localStorage.setItem('selectedFont', '.' + fontClass);
            
            // Navigate to next page after a short delay
            setTimeout(() => {
                navigateToPage('11.html');
            }, 300);
        }

        // Add click handlers to all font elements
        if (font1) {
            font1.addEventListener('click', function(e) {
                e.stopPropagation();
                selectFont(this, 'gotham-pro-medium');
            });
        }

        if (font2) {
            font2.addEventListener('click', function(e) {
                e.stopPropagation();
                selectFont(this, 'gotham-pro-black');
            });
        }

        if (font3) {
            font3.addEventListener('click', function(e) {
                e.stopPropagation();
                selectFont(this, 'benzin-bold');
            });
        }

        if (font4) {
            font4.addEventListener('click', function(e) {
                e.stopPropagation();
                selectFont(this, 'benzin-medium');
            });
        }
    }

    function setupPaymentForm() {
        const paymentButton = document.querySelector('.text-wrapper-14');
        const formInputs = {
            name: document.querySelector('.rectangle-3'),
            dates: document.querySelector('.rectangle-4'),
            customerName: document.querySelector('.rectangle-5'),
            phone: document.querySelector('.rectangle-6'),
            email: document.querySelector('.rectangle-7'),
            agreement1: document.querySelector('.checkbox-container:nth-child(1) .checkbox'),
            agreement2: document.querySelector('.checkbox-container:nth-child(2) .checkbox')
        };

        // Format phone number input
        if (formInputs.phone) {
            formInputs.phone.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                let formatted = '';
                
                if (value.length > 0) {
                    formatted = '+7 (';
                    if (value.length > 1) {
                        formatted += value.substring(1, 4);
                    }
                    if (value.length >= 4) {
                        formatted += ') ' + value.substring(4, 7);
                    }
                    if (value.length >= 7) {
                        formatted += '-' + value.substring(7, 9);
                    }
                    if (value.length >= 9) {
                        formatted += '-' + value.substring(9, 11);
                    }
                }
                
                this.value = formatted;
            });
        }

        // Format date input
        if (formInputs.dates) {
            formInputs.dates.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                let formatted = '';
                
                if (value.length > 0) {
                    // Format first date
                    if (value.length > 0) formatted += value.substring(0, 2);
                    if (value.length > 2) formatted += '.' + value.substring(2, 4);
                    if (value.length > 4) formatted += '.' + value.substring(4, 8);
                    
                    // Add separator
                    if (value.length > 8) {
                        formatted += ' - ';
                        value = value.substring(8);
                        
                        // Format second date
                        if (value.length > 0) formatted += value.substring(0, 2);
                        if (value.length > 2) formatted += '.' + value.substring(2, 4);
                        if (value.length > 4) formatted += '.' + value.substring(4, 8);
                    }
                }
                
                this.value = formatted;
            });
        }

        // Validate email
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        // Validate phone
        function validatePhone(phone) {
            const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            return re.test(phone);
        }

        // Validate dates
        function validateDates(dates) {
            const re = /^\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}$/;
            if (!re.test(dates)) return false;
            
            // Basic date validation (can be enhanced)
            const [date1, date2] = dates.split(' - ');
            const [d1, m1, y1] = date1.split('.').map(Number);
            const [d2, m2, y2] = date2.split('.').map(Number);
            
            // Check if dates are valid
            const date1Obj = new Date(y1, m1 - 1, d1);
            const date2Obj = new Date(y2, m2 - 1, d2);
            
            return date1Obj.toString() !== 'Invalid Date' && 
                   date2Obj.toString() !== 'Invalid Date';
        }

        // Handle payment button click
        if (paymentButton) {
            paymentButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Check required fields
                let isValid = true;
                const errors = [];
                
                if (!formInputs.name.value.trim()) {
                    errors.push('Введите ФИО погибшего');
                    formInputs.name.style.borderColor = 'red';
                    isValid = false;
                } else {
                    formInputs.name.style.borderColor = '';
                }
                
                if (!validateDates(formInputs.dates.value)) {
                    errors.push('Введите корректные даты (ДД.ММ.ГГГГ - ДД.ММ.ГГГГ)');
                    formInputs.dates.style.borderColor = 'red';
                    isValid = false;
                } else {
                    formInputs.dates.style.borderColor = '';
                }
                
                if (!formInputs.customerName.value.trim()) {
                    errors.push('Введите ваше ФИО');
                    formInputs.customerName.style.borderColor = 'red';
                    isValid = false;
                } else {
                    formInputs.customerName.style.borderColor = '';
                }
                
                if (!validatePhone(formInputs.phone.value)) {
                    errors.push('Введите корректный номер телефона');
                    formInputs.phone.style.borderColor = 'red';
                    isValid = false;
                } else {
                    formInputs.phone.style.borderColor = '';
                }
                
                if (!validateEmail(formInputs.email.value)) {
                    errors.push('Введите корректный email');
                    formInputs.email.style.borderColor = 'red';
                    isValid = false;
                } else {
                    formInputs.email.style.borderColor = '';
                }
                
                if (!formInputs.agreement2.checked) {
                    errors.push('Необходимо согласие на обработку персональных данных');
                    isValid = false;
                }
                
                // If form is valid, proceed to payment
                if (isValid) {
                    // Save form data to localStorage
                    localStorage.setItem('formData', JSON.stringify({
                        deceasedName: formInputs.name.value.trim(),
                        dates: formInputs.dates.value,
                        customerName: formInputs.customerName.value.trim(),
                        phone: formInputs.phone.value,
                        email: formInputs.email.value.trim(),
                        needsContract: formInputs.agreement1.checked,
                        agreedToTerms: true,
                        timestamp: new Date().toISOString()
                    }));
                    
                    // Navigate to next page
                    navigateToPage('12.html');
                } else {
                    // Show error message
                    alert('Пожалуйста, исправьте следующие ошибки:\n\n' + errors.join('\n'));
                }
            });
        }
        
        // Add input event listeners to remove error state when user types
        Object.values(formInputs).forEach(input => {
            if (input && input.tagName === 'INPUT') {
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = '';
                    }
                });
            }
        });
    }
})();