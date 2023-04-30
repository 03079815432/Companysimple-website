const form = document.querySelector('form');

form.addEventListener('submit', e => {
	e.preventDefault();

	const username = form.username.value;
	const password = form.password.value;

	if (username === 'naseem1112' && password === '03025102808') {
		window.location.href = 'home.html'; // change this to your home page URL
	} else {
		document.getElementById('error-message').textContent = 'Incorrect username or password. Please try again.';
	}
});
