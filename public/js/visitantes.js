/*Formulario de registro de visitantes*/ 
const visitFormButton = document.getElementById('visitFormButton');
const visitantesForm = document.getElementById('visitantesForm');
var hora = new Date();

function emptyFields(nombre, docId, destino) {
	const nombreFcn = nombre;
	const docIdFcn = docId;
	const destinoFcn = destino;

	if (nombreFcn == "" || docIdFcn == "" || destinoFcn == "") {
		document.getElementById('emptyFields').innerHTML = '<p>Todos los campos deben ser rellenados</p>';
	}
	else {
		console.log(hora.getHours());
		db.ref('visitantes/' + destinoFcn + "/" + docIdFcn).set({
			nombre: nombreFcn,
			day: String(hora.getDate()),
			month: String(hora.getMonth()),
			year: String(hora.getFullYear()),
			hour: String(hora.getHours())
		});
		document.getElementById('exitoVisitante').innerHTML = '<p class="lead text-success">Visita registrada exitosamente.</p>';
		visitantesForm.reset();
	}
}

visitantesForm.addEventListener('submit', e => {

	e.preventDefault();

	const nombre = visitantesForm['nombre'].value;
	const docId = visitantesForm['docId'].value;
	const destino = visitantesForm['destino'].value;

	emptyFields(nombre, docId, destino);
});