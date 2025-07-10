if (document.querySelector(".slider-blogs")) {
	const swiper = new Swiper(".slider-blogs", {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".pagination-blogs",
			type: "progressbar",
		},
		breakpoints: {
			768: {
				slidesPerView: 1.5,
				spaceBetween: 0,
			},
			991: {
				slidesPerView: 1.775,
				spaceBetween: 0,
			},
		},
	});

	swiper.autoplay.stop();
	const sliderElement = document.querySelector(".slider-blogs");
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					swiper.autoplay.start();
				} else {
					swiper.autoplay.stop();
				}
			});
		},
		{
			threshold: 0.5,
		}
	);
	observer.observe(sliderElement);

	sliderElement.addEventListener("mouseenter", () => {
		swiper.autoplay.stop();
	});
	sliderElement.addEventListener("mouseleave", () => {
		swiper.autoplay.start();
	});
}

if (document.querySelector(".slider-blogs1")) {
	const swiper = new Swiper(".slider-blogs1", {
		slidesPerView: 1,
		spaceBetween: 16,
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".pagination-blogs1",
			type: "progressbar",
		},
		breakpoints: {
			768: {
				slidesPerView: 1.5,
			},
			991: {
				slidesPerView: 1.775,
			},
		},
	});

	swiper.autoplay.stop();
	const sliderElement = document.querySelector(".slider-blogs1");
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					swiper.autoplay.start();
				} else {
					swiper.autoplay.stop();
				}
			});
		},
		{
			threshold: 0.5,
		}
	);
	observer.observe(sliderElement);

	sliderElement.addEventListener("mouseenter", () => {
		swiper.autoplay.stop();
	});
	sliderElement.addEventListener("mouseleave", () => {
		swiper.autoplay.start();
	});
}
