document.addEventListener("DOMContentLoaded", () => {
	/*================================== Display current time ================================*/
	function displayTime() {
		const now = new Date();
		let hours = now.getHours();
		let minutes = now.getMinutes();
		let period = hours >= 12 ? "PM" : "AM";

		if (hours > 12) hours -= 12;
		if (hours === 0) hours = 12;

		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;

		document.getElementById(
			"time"
		).textContent = `${hours}:${minutes} ${period}`;
	}

	/*================================== Display year ================================*/
	function displayYear() {
		document.getElementById("year").textContent = new Date().getFullYear();
	}

	/*================================== Back to Top Button =================================*/
	const backToTopBtn = document.getElementById("backToTop");
	window.addEventListener("scroll", () => {
		backToTopBtn.classList.toggle("show", window.pageYOffset > 700);
	});
	backToTopBtn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	/*================================== Typing Effect =================================*/
	const typedTextSpan = document.querySelector(".typed-text");
	const cursorSpan = document.querySelector(".cursor");
	const textArray = [
		"Amir Ben Abdallah",
		"Software Engineering Student",
		"Freelance Graphic Designer",
	];
	const typingDelay = 200;
	const erasingDelay = 100;
	const newTextDelay = 2000;
	let textArrayIndex = 0;
	let charIndex = 0;

	function type() {
		if (charIndex < textArray[textArrayIndex].length) {
			cursorSpan.classList.add("typing");
			typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
			charIndex++;
			setTimeout(type, typingDelay);
		} else {
			cursorSpan.classList.remove("typing");
			setTimeout(erase, newTextDelay);
		}
	}

	function erase() {
		if (charIndex > 0) {
			cursorSpan.classList.add("typing");
			typedTextSpan.textContent = textArray[textArrayIndex].substring(
				0,
				charIndex - 1
			);
			charIndex--;
			setTimeout(erase, erasingDelay);
		} else {
			cursorSpan.classList.remove("typing");
			textArrayIndex = (textArrayIndex + 1) % textArray.length;
			setTimeout(type, typingDelay + 1100);
		}
	}

	if (textArray.length) setTimeout(type, newTextDelay + 250);

	/*============================ Tabs ============================*/
	function tabs() {
		document.querySelectorAll(".wg-tabs").forEach((tabContainer) => {
			const contentContainer = tabContainer.querySelector(
				".widget-content-tab"
			);
			const menuItems = tabContainer.querySelectorAll(".menu-tab .item");
			const contentItems = contentContainer.querySelectorAll(
				".widget-content-inner"
			);

			contentItems.forEach((item, i) => {
				item.style.display = item.classList.contains("active")
					? "block"
					: "none";
			});

			menuItems.forEach((item, index) => {
				item.addEventListener("click", () => {
					if (item.classList.contains("active")) return;

					menuItems.forEach((i) => i.classList.remove("active"));
					item.classList.add("active");

					contentItems.forEach((content) => {
						content.classList.remove("active");
						content.style.display = "none";
					});

					const target = contentItems[index];
					target.classList.add("active");
					target.style.display = "block";
				});
			});
		});
	}

	/*======================== Sticky Tabs ========================*/
	function stickyTabs() {
		const sectionIds = document.querySelectorAll("a.scroll-to");
		const sections = [];

		// Build sections array with their corresponding nav links
		sectionIds.forEach((link) => {
			const selector = link.getAttribute("href");
			if (selector && selector.startsWith("#")) {
				const container = document.querySelector(selector);
				if (container) {
					sections.push({
						id: selector,
						element: container,
						navLinks: document.querySelectorAll(
							`a.scroll-to[href="${selector}"]`
						),
					});
				}
			}
		});

		function updateActiveSection() {
			const scrollPosition = window.scrollY + 100;
			let activeSection = null;

			// Find the current active section
			sections.forEach((section) => {
				const offsetTop = section.element.offsetTop;
				const height = section.element.offsetHeight;

				if (
					scrollPosition >= offsetTop &&
					scrollPosition < offsetTop + height
				) {
					activeSection = section;
				}
			});

			// If no section is active, default to the first one (home)
			if (!activeSection && sections.length > 0) {
				activeSection = sections[0];
			}

			// Remove active class from all navigation links
			sectionIds.forEach((link) => {
				link.classList.remove("active");
			});

			// Add active class to current section's navigation links
			if (activeSection) {
				activeSection.navLinks.forEach((link) => {
					link.classList.add("active");
				});
			}
		}

		document.addEventListener("scroll", updateActiveSection);

		// Initial call to set active section on page load
		updateActiveSection();

		// Handle click events for smooth scrolling and immediate active state update
		sectionIds.forEach((link) => {
			link.addEventListener("click", function (e) {
				e.preventDefault();

				const targetId = this.getAttribute("href");
				const targetSection = document.querySelector(targetId);

				if (targetSection) {
					// Remove active from all links
					sectionIds.forEach((l) => l.classList.remove("active"));

					// Add active to all links with the same href
					const allSameLinks = document.querySelectorAll(
						`a.scroll-to[href="${targetId}"]`
					);
					allSameLinks.forEach((l) => l.classList.add("active"));

					// Smooth scroll to target
					targetSection.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			});
		});
	}

	/*================================== Animate Text ================================*/
	function animateText() {
		const textColorChangeElements =
			document.querySelectorAll(".text-color-change");
		textColorChangeElements.forEach((element) => {
			if (element.wordSplit) element.wordSplit.revert();
			if (element.charSplit) element.charSplit.revert();

			element.wordSplit = new SplitText(element, {
				type: "words",
				wordsClass: "word-wrapper",
			});
			element.charSplit = new SplitText(element.wordSplit.words, {
				type: "chars",
				charsClass: "char-wrapper",
			});

			gsap.set(element.charSplit.chars, {
				color: "#DDDDDD4D",
				opacity: 1,
			});

			element.animation = gsap.to(element.charSplit.chars, {
				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					end: "bottom 35%",
					toggleActions: "play none none reverse",
					scrub: true,
				},
				color: "#ffffff",
				stagger: { each: 0.05, from: "start" },
				duration: 0.5,
				ease: "power2.out",
			});
		});

		const fadeRightElements = document.querySelectorAll(".text-fade-right");
		fadeRightElements.forEach((element) => {
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}
			element.split = new SplitText(element, { type: "lines" });
			gsap.set(element, { perspective: 400 });
			gsap.set(element.split.lines, { opacity: 0, y: 30 });
			element.animation = gsap.to(element.split.lines, {
				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					toggleActions: "play reverse play reverse",
				},
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "back",
				stagger: { amount: 0.1, from: "start", ease: "sine.inOut" },
			});
		});
	}

	/*================================== EmailJS configuration ===============================*/
	const EMAILJS_CONFIG = {
		publicKey: "etDLPqr75fUfomYOM",
		serviceId: "service_fbh754s",
		templateId: "template_cpcd65m",
	};
	// Initialize EmailJS
	(function () {
		emailjs.init(EMAILJS_CONFIG.publicKey);
	})();
	/*================================== Form handling ================================*/
	document
		.getElementById("contact-form")
		.addEventListener("submit", function (event) {
			event.preventDefault();

			const submitBtn = document.getElementById("submit-btn");
			const alertContainer = document.getElementById("alert-container");

			submitBtn.disabled = true;
			submitBtn.innerHTML =
				'<span>Sending...</span><div class="loading"></div>';

			alertContainer.innerHTML = "";

			const formData = {
				fullname: document.getElementById("fullname").value,
				email: document.getElementById("email").value,
				phone: document.getElementById("phone").value,
				message: document.getElementById("message").value,
				to_name: "Amir Ben Abdallah",
				from_name: document.getElementById("fullname").value,
				reply_to: document.getElementById("email").value,
			};

			emailjs
				.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, formData)
				.then(function () {
					showAlert(
						"Message sent successfully! I will reply to you soon.",
						"success"
					);
					document.getElementById("contact-form").reset();
				})
				.catch(function () {
					showAlert("Error sending the message. Please try again.", "error");
				})
				.finally(function () {
					submitBtn.disabled = false;
					submitBtn.innerHTML =
						'<span class="flex-grow-1 text-start">Send Now</span><i class="icon fas fa-paper-plane"></i>';
				});
		});

	// Show alerts
	function showAlert(message, type) {
		const alertContainer = document.getElementById("alert-container");
		const alertClass = type === "success" ? "alert-success" : "alert-error";

		alertContainer.innerHTML = `
<div class="alert ${alertClass}">
	${message}
</div>
`;
		setTimeout(() => {
			alertContainer.innerHTML = "";
		}, 5000);
	}

	// Real-time validation
	const inputs = document.querySelectorAll("input, textarea");
	inputs.forEach((input) => {
		input.addEventListener("blur", function () {
			validateField(this);
		});
	});

	function validateField(field) {
		const value = field.value.trim();
		field.style.borderColor = "";

		if (field.hasAttribute("required") && !value) {
			field.style.borderColor = "#f3500f";
			return false;
		}

		if (field.type === "email" && value) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				field.style.borderColor = "#f3500f";
				return false;
			}
		}

		if (field.type === "tel" && value) {
			const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
			if (!phoneRegex.test(value)) {
				field.style.borderColor = "#f3500f";
				return false;
			}
		}

		field.style.borderColor = "#1ef482";
		return true;
	}

	/*================================== Smooth scrolling ===============================*/
	function smoothScroll() {
		const scrollLinks = document.querySelectorAll("a.scroll-to");

		scrollLinks.forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				const targetId = link.getAttribute("href");
				const targetSection = document.querySelector(targetId);

				if (targetSection) {
					targetSection.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});

					// Close mobile menu if open
					closeMobileMenu();
				}
			});
		});
	}

	/*================================== Mobile menu functionality ===============================*/
	function initMobileMenu() {
		const hamburgerBtn = document.getElementById("hamburgerBtn");
		const slideMenu = document.getElementById("slideMenu");
		const overlay = document.getElementById("overlay");

		hamburgerBtn.addEventListener("click", toggleMobileMenu);
		overlay.addEventListener("click", closeMobileMenu);

		// Close menu when clicking on menu items
		const menuLinks = slideMenu.querySelectorAll("a");
		menuLinks.forEach((link) => {
			link.addEventListener("click", closeMobileMenu);
		});
	}

	function toggleMobileMenu() {
		const hamburgerBtn = document.getElementById("hamburgerBtn");
		const slideMenu = document.getElementById("slideMenu");
		const overlay = document.getElementById("overlay");

		hamburgerBtn.classList.toggle("active");
		slideMenu.classList.toggle("active");
		overlay.classList.toggle("active");
	}

	function closeMobileMenu() {
		const hamburgerBtn = document.getElementById("hamburgerBtn");
		const slideMenu = document.getElementById("slideMenu");
		const overlay = document.getElementById("overlay");

		hamburgerBtn.classList.remove("active");
		slideMenu.classList.remove("active");
		overlay.classList.remove("active");
	}

	/*================================== Run all functions ===============================*/
	displayYear();
	displayTime();
	setInterval(displayTime, 1000);
	tabs();
	stickyTabs();
	animateText();
	smoothScroll();
	initMobileMenu();

	// Initialize GLightbox
	GLightbox({
		selector: ".glightbox",
		loop: false,
		zoomable: false,
		draggable: true,
		touchNavigation: false,
	});
});
