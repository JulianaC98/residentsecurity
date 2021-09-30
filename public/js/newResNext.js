const newResidentForm = document.getElementById('newResidentForm');

/*var ff1 = db.ref('flags/' + enableFingerprint1).get()
var fid = db.ref('flags/' + enableRFID).get()
var fid1 = db.ref('flags/' + enableRFID1).get()
*/
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

		document.getElementById("fingerprint").innerHTML += "<p>Pase su nueva tarjeta de ingreso sobre el lector de tarjeta y seguidamente ponga su dedo sobre el lector de huella para ser registrado.</p>";
			
		//db.ref('flags/' + enableFingerprint1).set({ enable: 1 });

		//document.getElementById("fingerprint").innerHTML += "<p>Por favor, pase su nueva tarjeta de ingreso sobre el lector de tarjeta para ser registrado.</p>";
		//db.ref('flags/' + enableRFID1).set({ enable: 1 });
	}
}

newResidentForm.addEventListener('submit', e => {

	e.preventDefault()

	const nombre = newResidentForm['nombre'].value;
	const docId = newResidentForm['docId'].value;
	const casa = newResidentForm['casa'].value;

	emptyFields(nombre, docId, casa);
});