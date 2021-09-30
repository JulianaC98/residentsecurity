const resiFormButton = document.getElementById('resiFormButton');
const residentesForm = document.getElementById('residentesForm');
var userIsEqual = false;
var docIdIsEqual = false;

function emptyFields(usuario, docId, casa) {
	usuarioFcn = usuario;
	docIdFcn = docId;
	casaFcn = casa;

	if (usuarioFcn == "" || docIdFcn == "" || casaFcn == "") {
		document.getElementById('emptyFields').innerHTML = '<p>Todos los campos deben ser rellenados</p>';
	}
	else {
		const refUser = db.ref('residentes/' + casa + '/' + 'nombre');
		refUser.on('value', (snapshot) => {
			console.log(snapshot.val());
			if (snapshot.val() != null) {
				if (snapshot.val() == usuarioFcn) {
					userIsEqual = true;
				}
				else {
					userIsEqual = false;
				}
			}
			else {
				userIsEqual = false;
			}
		});
		const refPass = db.ref('residentes/' + casa + '/' + 'docId');
		refPass.on('value', (snapshot) => {
			console.log(snapshot.val());
			if (snapshot.val() != null) {
				if (snapshot.val() == docIdFcn) {
					docIdIsEqual = true;
				}
				else {
					docIdIsEqual = false;
				}
			}
			else {
				docIdIsEqual = false;
			}
		});

		if (docIdIsEqual == userIsEqual) {
			window.location.href = '../bienvenido.html';
		}
		else {
			document.getElementById('nonUser').innerHTML = '<p>El usuario/documento no existe.</p>';
		}
	}
}

residentesForm.addEventListener('submit', e => {

	e.preventDefault();

	const usuario = residentesForm['usuario'].value;
	const docId = residentesForm['docId'].value;
	const casa = residentesForm['casa'].value;

	emptyFields(usuario, docId, casa);
});