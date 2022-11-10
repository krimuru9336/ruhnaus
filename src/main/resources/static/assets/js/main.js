(function() {
	"use strict";

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
			return [...document.querySelectorAll(el)]
		} else {
			return document.querySelector(el)
		}
	}

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all)
		if (selectEl) {
			if (all) {
				selectEl.forEach(e => e.addEventListener(type, listener))
			} else {
				selectEl.addEventListener(type, listener)
			}
		}
	}

	/**
	 * Easy on scroll event listener 
	 */
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
		let position = window.scrollY + 200
		navbarlinks.forEach(navbarlink => {
			if (!navbarlink.hash) return
			let section = select(navbarlink.hash)
			if (!section) return
			if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
				navbarlink.classList.add('active')
			} else {
				navbarlink.classList.remove('active')
			}
		})
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		let header = select('#header')
		let offset = header.offsetHeight

		let elementPos = select(el).offsetTop
		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth'
		})
	}

	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
	let selectHeader = select('#header')
	let selectTopbar = select('#topbar')
	if (selectHeader) {
		const headerScrolled = () => {
			if (window.scrollY > 100) {
				selectHeader.classList.add('header-scrolled')
				if (selectTopbar) {
					selectTopbar.classList.add('topbar-scrolled')
				}
			} else {
				selectHeader.classList.remove('header-scrolled')
				if (selectTopbar) {
					selectTopbar.classList.remove('topbar-scrolled')
				}
			}
		}
		window.addEventListener('load', headerScrolled)
		onscroll(document, headerScrolled)
	}


	/* Navigation Toggle for mobile */
	on('click', '.mobile-nav-toggle', function(e) {
		select('#navbar').classList.toggle('navbar-mobile')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	})

	/* Activate mobile navigation dropdowns	 */
	on('click', '.navbar .dropdown > a', function(e) {
		if (select('#navbar').classList.contains('navbar-mobile')) {
			e.preventDefault()
			this.nextElementSibling.classList.toggle('dropdown-active')
		}
	}, true)

	/*Scroll with offset on links */
	on('click', '.scrollto', function(e) {
		if (select(this.hash)) {
			e.preventDefault()

			let navbar = select('#navbar')
			if (navbar.classList.contains('navbar-mobile')) {
				navbar.classList.remove('navbar-mobile')
				let navbarToggle = select('.mobile-nav-toggle')
				navbarToggle.classList.toggle('bi-list')
				navbarToggle.classList.toggle('bi-x')
			}
			scrollto(this.hash)
		}
	}, true)

	/*Scroll to the place with # in URL  */
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash)
			}
		}
	});

	/**
	 * Hero carousel 
	 */
	let heroCarouselIndicators = select("#hero-carousel-indicators")
	let heroCarouselItems = select('#heroCarousel .carousel-item', true)

	heroCarouselItems.forEach((item, index) => {
		(index === 0) ?
			heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>" :
			heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
	});

	/**
	 * Menu isotope and filter
	 */
	window.addEventListener('load', () => {
		let menuContainer = select('.menu-container');
		if (menuContainer) {
			let menuIsotope = new Isotope(menuContainer, {
				itemSelector: '.menu-item',
				layoutMode: 'fitRows'
			});

			let menuFilters = select('#menu-flters li', true);

			on('click', '#menu-flters li', function(e) {
				if (this.getAttribute('data-filter') == ".filter-sonntags-karte") {
					document.getElementById("timingMessage").innerHTML = "Available	only from 10 am to 11 pm on Sunday";
				}
				else {
					document.getElementById("timingMessage").innerHTML = "";
				}
				e.preventDefault();
				menuFilters.forEach(function(el) {
					el.classList.remove('filter-active');
				});
				this.classList.add('filter-active');

				menuIsotope.arrange({
					filter: this.getAttribute('data-filter')
				});

			}, true);
		}

	});

	/**
	 * Carasoul Animation
	 */
	new Swiper('.events-slider', {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});

	/**
	 * Initiate gallery lightbox 
	 */
	const galleryLightbox = GLightbox({
		selector: '.gallery-lightbox'
	});

	/* Display Message only for sonntags karte*/
	function setVisibility() {
		alert("HI");
	}

	/**
	 * Testimonials slider
	 */
	new Swiper('.testimonials-slider', {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});

	repeat

})()