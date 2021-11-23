const admiFormButton = document.getElementById('admiFormButton');
const adminForm = document.getElementById('adminForm');

function emptyFields(user, pass) {
	userFcn = user;
	passFcn = pass;

	if (userFcn == "" || passFcn == "") {
		document.getElementById('emptyFields').innerHTML = '<p>Todos los campos deben ser rellenados</p>';
	}
	else {
		const refAdminPass = db.ref('admins/' + userFcn);
		//busca nombre con el docId
		refAdminPass.on('value', (snapshot) => {
			adminPass = snapshot.val();
			if (adminPass != null) {
				console.log('admin es ' + userFcn + 'y admin pass es ' + adminPass);
				if (adminPass == passFcn) {
					console.log('pass and user are equal');
					localStorage.setItem("adminUserRS", userFcn);
					localStorage.setItem("adminPassRS", passFcn);
					localStorage.setItem("adminLoggedRS", "1");
					window.location.href = 'admin.html';

				}
				else {
					console.log('user is NOT equal');
					document.getElementById('nonUser').innerHTML = '<p>El usuario/contraseña no existe.</p>';
				}
			}
			else {
				console.log('nom es null');
				document.getElementById('nonUser').innerHTML = '<p>El usuario/contraseña no existe.</p>';
			}
		});
	}
}

adminForm.addEventListener('submit', e => {

	e.preventDefault();

	const user = adminForm['user'].value;
	const pass = adminForm['pass'].value;

	emptyFields(user, pass);
});