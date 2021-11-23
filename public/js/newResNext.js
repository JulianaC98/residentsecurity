/*Formulario de registro denuevos residentes*/
const newResidentForm = document.getElementById('newResidentForm');

function emptyFields(nombre, docId, casa) {
	const nombreFcn = nombre;
	const docIdFcn = docId;
	const casaFcn = casa;

	if (nombreFcn == "" || docIdFcn == "" || casaFcn == "") {
		document.getElementById('emptyFields').innerHTML = '<p>Todos los campos deben ser rellenados</p>';
	}
	else {
		document.getElementById('emptyFields').style.display == "none"; 
		data = {
			nombre: nombreFcn,
			docId: docIdFcn
		}
		db.ref('residentes/' + casaFcn).set(data);
		db.ref('temp/').set({'casa':casaFcn});
		db.ref('temp/').set({ 'flagNewRes': 1 });

		document.getElementById("fingerprint").innerHTML += "<p>Pase su nueva tarjeta de ingreso sobre el lector de tarjeta y seguidamente ponga su dedo sobre el lector de huella para ser registrado.</p>";

		//rpi lee bandera y lee huella y tarjeta
		//rpi levanta bandera de terminado

		const refFinNewRes = db.ref('temp/' + finNewRes);
		refFinNewRes.on('value', (snapshot) => {
			finNewResDB = snapshot.val();
			if (finNewResDB != null) {
				console.log('finNewResDB es ' + finNewResDB);
				if (finNewResDB === "1") {
					console.log('fin registro');
					document.getElementById("NewResSuccess").innerHTML += "<p>Proceso finalizado. Ha registrado un nuevo usuario con éxito.</p>";
					document.getElementById("NewResFin").innerHTML += "<button>Finalizar y volver.</button>";
					db.ref('temp/').set({ 'flagNewRes': "0" });
				}
				else {
					document.getElementById("NewResSuccess").innerHTML += "<p>Registrando datos...</p>";
				}
			}
		});
	}
}

newResidentForm.addEventListener('submit', e => {

	e.preventDefault()

	const nombre = newResidentForm['nombre'].value;
	const docId = newResidentForm['docId'].value;
	const casa = newResidentForm['casa'].value;

	emptyFields(nombre, docId, casa);
});