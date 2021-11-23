/*Ingreso al dashboard como residente*/
const resiFormButton = document.getElementById('resiFormButton');
const residentesForm = document.getElementById('residentesForm');

function emptyFields(usuario, docId, casa) {
	usuarioFcn = usuario;
	docIdFcn = docId;
	casaFcn = casa;

	if (usuarioFcn == "" || docIdFcn == "" || casaFcn == "") {
		document.getElementById('emptyFields').innerHTML = '<p>Todos los campos deben ser rellenados</p>';
	}
	else {
		const refUser = db.ref('residentes/' + casa + '/' + docIdFcn);
		//busca nombre con el docId
		refUser.on('value', (snapshot) => {
			nom = snapshot.val();
			if (nom != null) {
				nom1 = nom.nombre;
				console.log('nom1 es ' + nom1);
				if (nom1 == usuarioFcn) {
					console.log('user is equal');
					localStorage.setItem("user", usuarioFcn);
					localStorage.setItem("docId", docIdFcn);
					localStorage.setItem("logged", "1");
					window.location.href = '../bienvenido.html';

				}
				else {
					console.log('user is NOT equal');
					document.getElementById('nonUser').innerHTML = '<p>El usuario/documento no existe.</p>';
				}
			}
			else {
				console.log('nom es null');
				document.getElementById('nonUser').innerHTML = '<p>El usuario/documento no existe.</p>';
			}
		});
	}
}

residentesForm.addEventListener('submit', e => {

	e.preventDefault();

	const usuario = residentesForm['usuario'].value;
	const docId = residentesForm['docId'].value;
	const casa = residentesForm['casa'].value;

	emptyFields(usuario, docId, casa);
});