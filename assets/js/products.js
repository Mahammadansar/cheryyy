// Products Page JavaScript
// Filtering and Pagination functionality

(function() {
    'use strict';

    // ============================================
    // Product Filtering
    // ============================================
    const categoryFilter = document.getElementById('category-filter');
    const countryFilter = document.getElementById('country-filter');
    const sortFilter = document.getElementById('sort-filter');
    const productsGrid = document.getElementById('productsGrid');

    if (!productsGrid) return;

    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));

    function filterProducts() {
        const categoryValue = categoryFilter ? categoryFilter.value : 'all';
        const countryValue = countryFilter ? countryFilter.value : 'all';

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardCountry = card.getAttribute('data-country');

            let showCard = true;

            // Category filter
            if (categoryValue !== 'all' && cardCategory !== categoryValue) {
                showCard = false;
            }

            // Country filter (only for sold products page)
            if (countryFilter && countryValue !== 'all' && cardCountry !== countryValue) {
                showCard = false;
            }

            // Show/hide card
            if (showCard) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });

        // Update results count
        updateResultsCount();
    }

    function updateResultsCount() {
        const visibleCards = productCards.filter(card => card.style.display !== 'none');
        // You can add a results counter here if needed
    }

    function sortProducts() {
        if (!sortFilter) return;

        const sortValue = sortFilter.value;
        const cards = Array.from(productsGrid.querySelectorAll('.product-card'));
        const visibleCards = cards.filter(card => card.style.display !== 'none');

        // Simple sorting - you can enhance this with actual data attributes
        if (sortValue === 'newest') {
            // Sort by data attributes or other criteria
            visibleCards.sort((a, b) => {
                // Add your sorting logic here
                return 0;
            });
        } else if (sortValue === 'oldest') {
            visibleCards.sort((a, b) => {
                // Add your sorting logic here
                return 0;
            });
        }

        // Re-append sorted cards
        visibleCards.forEach(card => {
            productsGrid.appendChild(card);
        });
    }

    // Event listeners
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }

    if (countryFilter) {
        countryFilter.addEventListener('change', filterProducts);
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            sortProducts();
        });
    }

    // ============================================
    // Pagination
    // ============================================
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    let currentPage = 1;
    const itemsPerPage = 6;

    function updatePagination() {
        const visibleCards = productCards.filter(card => card.style.display !== 'none');
        const totalPages = Math.ceil(visibleCards.length / itemsPerPage);

        paginationBtns.forEach(btn => {
            if (btn.textContent.trim() === 'Previous') {
                btn.disabled = currentPage === 1;
            } else if (btn.textContent.trim() === 'Next') {
                btn.disabled = currentPage >= totalPages;
            }
        });

        const paginationInfo = document.querySelector('.pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
        }

        // Show/hide cards based on current page
        visibleCards.forEach((card, index) => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            if (index >= startIndex && index < endIndex) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;

            if (this.textContent.trim() === 'Previous') {
                currentPage = Math.max(1, currentPage - 1);
            } else if (this.textContent.trim() === 'Next') {
                const visibleCards = productCards.filter(card => card.style.display !== 'none');
                const totalPages = Math.ceil(visibleCards.length / itemsPerPage);
                currentPage = Math.min(totalPages, currentPage + 1);
            }

            updatePagination();
        });
    });

    // Initialize
    if (paginationBtns.length > 0) {
        updatePagination();
    }

    // ============================================
    // Smooth scroll for contact links
    // ============================================
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#contact') {
                // If on same page, scroll to contact section
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    e.preventDefault();
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

})();

