// Character group interaction handler
document.addEventListener('DOMContentLoaded', function() {
    const characters = document.querySelectorAll('.character');
    let isMobile = window.innerWidth <= 767;

    // Update mobile detection on resize
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 767;
        // Reset all zoomed states on resize
        characters.forEach(character => {
            character.classList.remove('zoomed');
        });
    });

    characters.forEach(character => {
        let isZoomed = false;

        character.addEventListener('click', function(e) {
            if (isMobile) {
                e.preventDefault();

                if (!isZoomed) {
                    // First tap: zoom in and show text
                    character.classList.add('zoomed');
                    isZoomed = true;

                    // Remove zoom from other characters
                    characters.forEach(otherChar => {
                        if (otherChar !== character) {
                            otherChar.classList.remove('zoomed');
                        }
                    });

                } else {
                    // Second tap: navigate to URL
                    const url = character.getAttribute('data-url');
                    if (url) {
                        window.location.href = url;
                    }
                }
            } else {
                // Desktop: immediate navigation
                const url = character.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            }
        });

        // Reset zoom when clicking outside on mobile
        if (isMobile) {
            document.addEventListener('click', function(e) {
                if (!character.contains(e.target)) {
                    character.classList.remove('zoomed');
                    isZoomed = false;
                }
            });
        }
    });

    // Handle touch events for better mobile experience
    characters.forEach(character => {
        character.addEventListener('touchstart', function(e) {
            if (isMobile) {
                e.stopPropagation();
            }
        });
    });
});