const admiFormButton = document.getElementById('admiFormButton');

residentesForm.addEventListener('submit', e => {

	const user = adminsForm['user'].value;
	const pass = adminsForm['pass'].value;

	emptyFields(user, pass);
});