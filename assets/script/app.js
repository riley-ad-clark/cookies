'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Initial Cookie Modal
    const blurredOverlay = document.querySelector('.blurred-overlay');
    const cookieModal = document.querySelector('.cookie-modal');
    const acceptButton = document.querySelector('.cookie-modal .accept');
    const preferencesButton = document.querySelector('.cookie-modal .preferences');

    // Preferences Modal
    const cookiePreferences = document.querySelector('.cookie-preferences');
    const browserCheck = document.querySelector('.browser-type-check');
    const osCheck = document.querySelector('.operating-system-check');
    const heightCheck = document.querySelector('.device-height-check');
    const widthCheck = document.querySelector('.device-width-check');
    const applyChangesButton = document.querySelector('.preferences-accept .accept');

    // Functions

    // Gets operating system
    function getOS() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf('Win') !== -1) {
            return 'System Type: Windows'
        } else if (userAgent.indexOf('Mac') !== -1) {
            return 'System Type: Mac/IOS'
        } else if (userAgent.indexOf('Linux') !== -1) {
            return 'System Type: Linux';
        } else {
            return 'Unknown OS';
        }
    }

    // Gets browser
    function getBrowser() {
        let platform = navigator.userAgent;
        // I learned that !== -1 means that it will scan the string until it finds win, if it doesn't, it will not
        // execute and move onto the next statement! (It's serving as functional filler)
        if (platform.indexOf('Edge') !== -1) {
            return 'Browser: Microsoft Edge';
        } else if (platform.indexOf('Firefox') !== -1) {
            return 'Browser: Firefox';
        } else if (platform.indexOf('Chrome') !== -1) {
            return'Browser: Chrome / Chromium';
        } else if (platofmr.indexOf('Safari') !== -1) {
            return 'Browser: Safari'
        } else {
            return 'Could not compute: irrelevant browser';
        }
    }

    function getHeight() {
        return `Window Height: ${window.innerHeight}`;
    }

    function getWidth() {
        return `Window Width: ${window.innerWidth}`;
    }

    // Function to log selected variables
    function logSelectedVariables() {      
        if (
            !osCheck.checked &&
            !browserCheck.checked &&
            !widthCheck.checked &&
            !heightCheck.checked
            ) {
                console.log('All cookies were rejected');
            } else if (
                    osCheck.checked &&
                    browserCheck.checked &&
                    widthCheck.checked &&
                    heightCheck.checked
            ) {
                    console.log('All cookies were accepted');
            } else {
                console.log(osCheck.checked ? getOS() : 'System Type: rejected');
                console.log(browserCheck.checked ? getBrowser() : 'Browser: rejected');
                console.log(widthCheck.checked ? getWidth() : 'Window Width: rejected');
                console.log(heightCheck.checked ? getHeight() : 'Window Height: rejected');
            }
    }

    // Function to check if cookies are enabled
    function areCookiesEnabled() {
        document.cookie = 'testCookie=1; SameSite=Lax';
        const cookiesEnabled = document.cookie.indexOf('testCookie=') !== -1;
        document.cookie = 'testCookie=1; SameSite=Lax; expires=Thu, 01-Jan-1899 00:00:01 GMT'; // Clear test cookie
        return cookiesEnabled;
    }

    // Function to check if the user has already accepted cookies
    function hasAcceptedCookies() {
        return document.cookie.indexOf('acceptedCookies=1') !== -1;
    }

    // Function to set cookies
    function setCookie(name, value, expires) {
        const date = new Date();
        date.setTime(date.getTime() + expires * 1000); // Convert seconds to milliseconds
        const expiresString = 'expires=' + date.toUTCString();
        document.cookie = `${name}= ${value}; ${expiresString}; path=/; SameSite=Lax`;
    }   

    // Function to handle cookie acceptance
    function acceptCookies() {
        setCookie('acceptedCookies', '1', 15); // Set a cookie to remember user's choice for 15 seconds
        hideModal(cookieModal);
        hideOverlay();
        logSelectedVariables();
    }

    // Function to show a modal
    function showModal(modal) {
        modal.classList.remove('invisible');
        modal.classList.add('visible');
    }

    // Function to hide a modal
    function hideModal(modal) {
        modal.classList.remove('visible');
        modal.classList.add('invisible');
    }

    // Function to show the blurred overlay
    function showOverlay() {
        blurredOverlay.classList.remove('invisible');
        blurredOverlay.classList.add('visible');
    }

    // Function to hide the blurred overlay
    function hideOverlay() {
        blurredOverlay.classList.remove('visible');
        blurredOverlay.classList.add('invisible');
    }

    // Event listeners
    // Check if cookies are enabled and if the user has accepted cookies
    if (!areCookiesEnabled() || !hasAcceptedCookies()) {
        // Show initial cookie modal with a delay
        setTimeout( function() {
            showModal(cookieModal);
            showOverlay();
        }, 1000);
    }

    // Event listener for Accept button in initial modal
    acceptButton.addEventListener('click', acceptCookies);

    // Event listener for Preferences button in initial modal
    preferencesButton.addEventListener('click', function() {
        showModal(cookiePreferences);
    });

    // Event listener for Apply Changes button in preferences modal
    applyChangesButton.addEventListener('click', function(){
        acceptCookies(); // Call acceptCookies function
        hideModal(cookiePreferences);
        hideOverlay();
    });  
});
