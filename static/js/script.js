/**
 * JavaScript for Japanese Seasonal Illness and Herbal Medicine Service
 * Handles interactive features and future extensibility
 */

(function() {
    'use strict';

    /**
     * Main application object
     */
    const App = {
        /**
         * Initialize Feather Icons
         */
        initFeatherIcons: function() {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        },

        /**
         * Setup event listeners for interactive elements
         */
        setupEventListeners: function() {
            this.handleMonthCardClicks();
            this.handleCardHoverEffects();
            this.setupSmoothScrolling();
            this.setupAccessibility();
        },

        /**
         * Handle month card clicks
         */
        handleMonthCardClicks: function() {
            const monthCards = document.querySelectorAll('.month-card');
            monthCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    if (href) {
                        App.Utils.announceToScreenReader('月のページに移動しています');
                        window.location.href = href;
                    }
                });

                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
        },

        /**
         * Handle card hover effects
         */
        handleCardHoverEffects: function() {
            const cards = document.querySelectorAll('.month-card, .illness-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', this.handleCardHoverStart);
                card.addEventListener('mouseleave', this.handleCardHoverEnd);
            });
        },

        /**
         * Handle card hover end effects
         */
        handleCardHoverStart: function() {
            this.style.transform = 'translateY(-8px)';
        },

        handleCardHoverEnd: function() {
            this.style.transform = 'translateY(0)';
        },

        /**
         * Initialize animations
         */
        initAnimations: function() {
            const cards = document.querySelectorAll('.month-card, .illness-card, .kampo-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('fade-in-up');
            });
        },

        /**
         * Setup smooth scrolling for anchor links
         */
        setupSmoothScrolling: function() {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        },

        /**
         * Setup accessibility features
         */
        setupAccessibility: function() {
            this.createAriaLiveRegion();
            this.improveFocusManagement();
            this.addSkipLinks();
        },

        /**
         * Create ARIA live region for dynamic announcements
         */
        createAriaLiveRegion: function() {
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.classList.add('sr-only');
            liveRegion.id = 'aria-live-region';
            document.body.appendChild(liveRegion);
        },

        /**
         * Announce message to screen readers
         */
        announceToScreenReader: function(message) {
            const liveRegion = document.getElementById('aria-live-region');
            if (liveRegion) {
                liveRegion.textContent = message;
                setTimeout(() => {
                    liveRegion.textContent = '';
                }, 1000);
            }
        },

        /**
         * Improve focus management
         */
        improveFocusManagement: function() {
            const focusableElements = document.querySelectorAll(
                'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
            );

            focusableElements.forEach(element => {
                element.addEventListener('focus', function() {
                    this.setAttribute('data-focus-visible', 'true');
                });

                element.addEventListener('blur', function() {
                    this.removeAttribute('data-focus-visible');
                });
            });
        },

        /**
         * Add skip links for better keyboard navigation
         */
        addSkipLinks: function() {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'メインコンテンツにスキップ';
            skipLink.classList.add('sr-only');
            skipLink.style.position = 'absolute';
            skipLink.style.top = '0';
            skipLink.style.left = '0';
            skipLink.style.zIndex = '9999';

            skipLink.addEventListener('focus', function() {
                this.classList.remove('sr-only');
                this.style.background = '#000';
                this.style.color = '#fff';
                this.style.padding = '1rem';
            });

            skipLink.addEventListener('blur', function() {
                this.classList.add('sr-only');
            });

            document.body.insertBefore(skipLink, document.body.firstChild);
        },

        /**
         * Future: Data management for upcoming features
         */
        DataManager: {
            cache: new Map(),
            
            async fetchDiseaseData(month) {
                if (this.cache.has(month)) {
                    return this.cache.get(month);
                }
                
                try {
                    const response = await fetch(`/api/diseases/${month}`);
                    const data = await response.json();
                    this.cache.set(month, data);
                    return data;
                } catch (error) {
                    console.error('Failed to fetch disease data:', error);
                    return null;
                }
            },

            clearCache() {
                this.cache.clear();
            }
        },

        /**
         * Future: Quiz functionality placeholder
         */
        Quiz: {
            currentQuestion: 0,
            score: 0,
            questions: [],

            init() {
                console.log('Quiz system initialized for future use');
            },

            loadQuestions(month) {
                // Future implementation
                console.log(`Loading quiz questions for ${month}`);
            },

            showQuestion(index) {
                // Future implementation
                console.log(`Showing question ${index}`);
            },

            submitAnswer(answer) {
                // Future implementation
                console.log(`Answer submitted: ${answer}`);
            },

            showResults() {
                // Future implementation
                console.log('Showing quiz results');
            }
        },

        /**
         * Future: Recommendation system placeholder
         */
        Recommendations: {
            userProfile: {},
            
            init() {
                console.log('Recommendation system initialized for future use');
            },

            updateUserProfile(symptoms, season) {
                // Future implementation
                console.log(`Updating user profile with symptoms: ${symptoms}, season: ${season}`);
            },

            getPersonalizedRecommendations() {
                // Future implementation
                console.log('Getting personalized recommendations');
                return [];
            },

            trackUserInteraction(interaction) {
                // Future implementation
                console.log(`Tracking interaction: ${interaction}`);
            }
        },

        /**
         * Future: Search functionality placeholder
         */
        Search: {
            index: {},
            
            init() {
                console.log('Search system initialized for future use');
                this.buildSearchIndex();
            },

            buildSearchIndex() {
                // Future implementation
                console.log('Building search index');
            },

            search(query) {
                // Future implementation
                console.log(`Searching for: ${query}`);
                return [];
            },

            highlightSearchResults(results) {
                // Future implementation
                console.log('Highlighting search results');
            }
        }
    };

    /**
     * Utility functions
     */
    App.Utils = {
        /**
         * Debounce function for performance optimization
         */
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Check if device is mobile
         */
        isMobile: function() {
            return window.innerWidth <= 768;
        },

        /**
         * Format date for Japanese locale
         */
        formatDateJapanese: function(date) {
            return new Intl.DateTimeFormat('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        },

        /**
         * Announce message to screen readers
         */
        announceToScreenReader: function(message) {
            App.announceToScreenReader(message);
        }
    };

    /**
     * Initialize application when DOM is ready
     */
    document.addEventListener('DOMContentLoaded', function() {
        console.log('季節病と漢方薬ガイド - アプリケーション初期化完了');
        
        App.initFeatherIcons();
        App.setupEventListeners();
        App.initAnimations();
        
        // Initialize future features (placeholders)
        App.Quiz.init();
        App.Recommendations.init();
        App.Search.init();
    });

    /**
     * Handle page visibility changes (for future analytics)
     */
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('Page hidden');
        } else {
            console.log('Page visible');
        }
    });

    /**
     * Handle window resize events
     */
    window.addEventListener('resize', App.Utils.debounce(function() {
        console.log('Window resized');
        // Future: Adjust layout if needed
    }, 250));

    /**
     * Export for potential module use
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = App;
    } else if (typeof window !== 'undefined') {
        window.SeasonalKampoApp = App;
    }

})();
