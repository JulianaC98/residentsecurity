const admiFormButton = document.getElementById('admiFormButton');
const adminsForm = document.getElementById('adminsForm');

function emptyFields(user, pass) {
	userFcn = user;
	passFcn = pass;

	if (userFcn == "" || passFcn == "") {
		document.getElementById('emptyFields').innerHTML = '<p>Todos los campos deben ser rellenados</p>';
	}
	else {

		/*db.ref('residentes').orderByChild('usuario').equalTo(usuarioFcn).on('child_added', (snapshot) => {
			console.log(snapshot.val().height);
		});
		*/
		console.log('3');
	}
}

residentesForm.addEventListener('submit', e => {

	const user = adminsForm['user'].value;
	const pass = adminsForm['pass'].value;

	emptyFields(user, pass);
});