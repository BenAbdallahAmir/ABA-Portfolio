
gsap.registerPlugin(ScrollTrigger, SplitText);

// Animate Text (split + effects)
function animationText() {
	const elements = document.querySelectorAll(".split-text");
	if (!elements.length) return;

	elements.forEach((el) => {
		const target = el.querySelector("p, a") || el;

		const pxlSplit = new SplitText(target, {
			type: "words, chars, lines",
			lineThreshold: 0.5,
			wordsClass: "word",
			linesClass: "split-line",
		});

		let splitTypeSet = pxlSplit.chars;
		gsap.set(target, { perspective: 400 });

		const settings = {
			scrollTrigger: {
				trigger: target,
				start: "top 86%",
				toggleActions: "play none none reset",
				fastScrollEnd: true,
				once: true,
			},
			duration: 0.9,
			stagger: 0.02,
			ease: "power3.out",
		};

		if (el.classList.contains("effect-fade")) settings.opacity = 0;
		if (el.classList.contains("effect-right")) {
			settings.opacity = 0;
			settings.x = 50;
		}
		if (el.classList.contains("effect-left")) {
			settings.opacity = 0;
			settings.x = -50;
		}
		if (el.classList.contains("effect-up")) {
			settings.opacity = 0;
			settings.y = 80;
		}
		if (el.classList.contains("effect-down")) {
			settings.opacity = 0;
			settings.y = -80;
		}
		if (el.classList.contains("effect-rotate")) {
			settings.opacity = 0;
			settings.rotateX = 50;
		}
		if (el.classList.contains("effect-scale")) {
			settings.opacity = 0;
			settings.scale = 0.5;
		}

		if (
			el.classList.contains("split-lines-transform") ||
			el.classList.contains("split-lines-rotation-x")
		) {
			pxlSplit.split({
				type: "lines",
				lineThreshold: 0.5,
				linesClass: "split-line",
			});
			splitTypeSet = pxlSplit.lines;
			settings.opacity = 0;
			settings.stagger = 0.5;

			if (el.classList.contains("split-lines-rotation-x")) {
				settings.rotationX = -120;
				settings.transformOrigin = "top center -50";
			} else {
				settings.yPercent = 100;
				settings.autoAlpha = 0;
			}
		}

		if (el.classList.contains("split-words-scale")) {
			pxlSplit.split({ type: "words" });
			splitTypeSet = pxlSplit.words;

			splitTypeSet.forEach((elw, index) => {
				gsap.set(elw, {
					opacity: 0,
					scale: index % 2 === 0 ? 0 : 2,
					force3D: true,
				});
			});

			gsap.to(splitTypeSet, {
				scrollTrigger: {
					trigger: el,
					start: "top 86%",
				},
				rotateX: 0,
				scale: 1,
				opacity: 1,
			});
		} else {
			gsap.from(splitTypeSet, settings);
		}
	});
}

// Effect on Scroll (x, y, scale, fade)
function scrollingEffect() {
	const elements = document.querySelectorAll(".scrolling-effect");
	elements.forEach((el) => {
		const settings = {
			scrollTrigger: {
				trigger: el,
				scrub: 3,
				start: "30px bottom",
				end: "bottom bottom",
				delay: 3,
				once: true,
			},
			duration: 0.9,
			ease: "power3.out",
		};

		if (el.classList.contains("effectRight")) {
			settings.opacity = 0;
			settings.x = 80;
		}
		if (el.classList.contains("effectLeft")) {
			settings.opacity = 0;
			settings.x = -80;
		}
		if (el.classList.contains("effectBottom")) {
			settings.opacity = 0;
			settings.y = 100;
		}
		if (el.classList.contains("effectTop")) {
			settings.opacity = 0;
			settings.y = -80;
		}
		if (el.classList.contains("effectZoomIn")) {
			settings.opacity = 0;
			settings.scale = 0.5;
		}

		gsap.from(el, settings);
	});
}

// ScrollTransform: translate element based on data-direction and data-distance
function scrollTransform() {
	const elements = document.querySelectorAll(".scroll-tranform");
	elements.forEach((el) => {
		const direction = el.dataset.direction || "up";
		const distance = el.dataset.distance || "10%";
		let animationProp = {};

		switch (direction.toLowerCase()) {
			case "left":
				animationProp = { x: `-${distance}` };
				break;
			case "right":
				animationProp = { x: `${distance}` };
				break;
			case "up":
				animationProp = { y: `-${distance}` };
				break;
			case "down":
				animationProp = { y: `${distance}` };
				break;
			default:
				animationProp = { y: `-${distance}` };
		}

		gsap.to(el, {
			...animationProp,
			scrollTrigger: {
				trigger: el,
				start: "top center",
				end: "bottom top",
				scrub: 2,
			},
		});
	});
}

// Banner Scroll Effect (horizontal movement)
function scrollBanners() {
	const elements = document.querySelectorAll(".scroll-banners");
	elements.forEach((el) => {
		const settings = {
			scrollTrigger: {
				trigger: el,
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
			},
			ease: "none",
		};

		if (
			el.classList.contains("effect-left") ||
			el.classList.contains("effect-right")
		) {
			settings.x = "-25%";
		}

		gsap.to(el, settings);
	});
}

// Run all on DOM ready
document.addEventListener("DOMContentLoaded", () => {
	scrollTransform();
	scrollBanners();
	scrollingEffect();
	animationText();
});
