const modals = () => {
	let btnPressed = false,
		 scroll = calcScroll();

	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	function openModal(selector) {
		document.querySelector(selector).style.display = 'block';
		document.body.style.overflow = "hidden";
		document.body.style.marginRight = `${scroll}px`;
	}

	function bindModal(triggerSelector, modalSelector, closeSelector,
							 animation = 'fadeInDown', destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector),
				modal = document.querySelector(modalSelector),
				close = document.querySelector(closeSelector),
				windows = document.querySelectorAll('[data-modal]');

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				btnPressed = true;

				if (destroy) {
					item.remove();
				}

				windows.forEach(item => {
					item.style.display = 'none';
					item.classList.add('animated', animation);
				});

				openModal(modalSelector);
			});
		});

		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
				item.classList.remove('animated', animation);
			});

			modal.style.display = "none";
			document.body.style.overflow = "";
			document.body.style.marginRight = '0px';
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && modal.style.display == 'block') {
				modal.style.display = "none";

				windows.forEach(item => {
					item.style.display = 'none';
					item.classList.remove('animated', animation);
				});

				document.body.style.marginRight = '0px';
				document.body.style.overflow = "";
			}

			if (e.target.getAttribute('data-close') == "") {
				setTimeout(() => {
					modal.style.display = "none";
					document.body.style.marginRight = '0px';
					document.body.style.overflow = "";
				}, 1000);
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(function () {
			let display;

			document.querySelectorAll('[data-modal]').forEach(item => {
				if (getComputedStyle(item).display !== 'none') {
					display = 'block';
				}
			});

			if (!display) {
				openModal(selector);
			}
		}, time);
	}

	function showModalByScroll(selector) {
		window.addEventListener('scroll', () => {
			let scrollHeight = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);

			if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= 
				  scrollHeight)) {
					document.querySelector(selector).click();
			}
		});
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close', 'zoomIn');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', 'jackInTheBox', true);

	// showModalByTime('.popup-consultation', 60000);
	showModalByScroll('.fixed-gift');

};

export default modals;
