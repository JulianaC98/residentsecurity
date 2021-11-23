const logoutBtn = document.getElementById('logout');
const aceptarBtn = document.getElementById('aceptar');
const rechazarBtn = document.getElementById('rechazar');
const newVisitTxt = document.getElementById('newVisitTxt');

function checkVisits(casaFcn) {
	let casaFcn1 = casaFcn;
	const refVisits = db.ref("visitantes/" + casaFcn);
	refVisits.on('value', (snapshot) => {
		newVisitsDB = snapshot.val();
		if (newVisitsDB != null) {
			console.log('newVisitsDB es ' + newVisitsDB);
			return true;
		}
		else
			return false;
	});
}
function loadDashboard(casaFcn) {

	casaFcnCheck = casaFcn;

	if (checkVisits(casaFcnCheck)) {
		console.log("hay visitante");
		console.log(docVisitante);

		//nuevo visitante
		newVisitTxt.innerHTML = 'Tienes un nuevo visitante';
		aceptarBtn.innerHTML = 'Aceptar';
		rechazarBtn.innerHTML = 'Rechazar';

		//historial
		document.getElementById("history").innerHTML = 'Historial de las últimas 5 visitas';
		document.getElementById("historyTable").innerHTML =
			'<tr><td>c1</td><td>Celda 2</td><td>Celda 3</td></tr>';
		//estadisticas
		document.getElementById("stats").innerHTML = 'Estadísticas';
		//aquí va la gráfica
	}
	else {
		newVisitTxt.innerHTML = 'No tienes nuevas visitas por el momento.';
		aceptarBtn.style.display = 'none';
		rechazarBtn.style.display = 'none';

	}
}

function aceptar() {
	db.ref("/").set({ "actuador": "1" });
	db.ref("visitantes/" + casa).remove();
}
function rechazar() {
	db.ref("visitantes/" + casa).remove();
}
function logout() {

	localStorage.removeItem("loggedCheck");
	localStorage.removeItem("logged");
	localStorage.removeItem("user");
	localStorage.removeItem("docId");
}
function searchInDB(loggedUser, loggeddocId, loggedCasa, logged1) {
	const usuarioFcn = loggedUser;
	const docIdFcn = loggeddocId;
	const casaFcn = loggedCasa;
	const logged2 = logged1;
	const refUser = db.ref('residentes/' + casaFcn + '/' + docIdFcn);
	//busca nombre con el docId
	refUser.on('value', (snapshot) => {
		nom = snapshot.val();
		nom1 = nom.nombre;
		console.log(nom);
		if (nom1 != null) {
			if (nom == usuarioFcn) {
				console.log('user is equal');
				document.getElementById("UserName").innerHTML = usuarioFcn;
				loadDashboard(casaFcn);
			}
			else {
				console.log('user is NOT equal');
				window.location.href = 'login.html';
				//document.getElementById('nonUser').innerHTML = '<p>El usuario/documento no existe.</p>';
			}
		}
		else {
			console.log('nom es null');
			window.location.href = 'login.html';
			//document.getElementById('nonUser').innerHTML = '<p>El usuario/documento no existe.</p>';
		}
	});
}

logoutBtn.addEventListener('click', e => {
	logout();
});
aceptarBtn.addEventListener('click', e => {
	aceptar();
});
rechazarBtn.addEventListener('click', e => {
	rechazar();
});
window.onload = function () {
    const loggedUser = localStorage.getItem("user");
	const loggeddocId = localStorage.getItem("docId");
	const loggedCasa = localStorage.getItem("casa");
    const logged1 = localStorage.getItem("logged");

	if (logged1 === "1") {
		searchInDB(loggedUser, loggeddocId, loggedCasa, logged1);
		const loggedCheck = localStorage.getItem("loggedCheck");
		if (loggedCheck === "1") {
			const username = document.getElementById('UserName');
		}
		else {
			window.location.href = 'login.html';
		}
    }
    else {
        window.location.href = 'login.html';
	}
};