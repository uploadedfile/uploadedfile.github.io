var pickers = {
	date: document.querySelector('input[type="date"]'),
	time: document.querySelector('input[type="time"]'),
	text: document.querySelector('#text'),
	origen: document.getElementById('origen'),
	destino: document.getElementById('destino'),
	radiovalue:document.querySelector('input[name="exactdate"]:checked').value,
	transportvalue:document.querySelector('input[name="exacttrans"]:checked').value,
	passengersList:[]
};
var reserva=false;
const urlParams2 = new URLSearchParams(document.location.search);
if (urlParams2.has('reserva')){
	reserva=true;	
	}else{
	document.getElementById('passengerTable').style.display = "none";
	}
document.getElementById("addPassenger").onclick = function() {
			var tbody = document.getElementById("passengerTable").getElementsByTagName('tbody')[0];
			var input = document.createElement("input");			
			var input2 = document.createElement("input");	
			input.classList.add("passenger");
			input.type = "text";
			input.placeholder="Nombre y apellidos"
			input2.classList.add("ci");
			input2.type = "text";
			input2.placeholder="Carnet de Identidad"					
			var tr = document.createElement("tr");			
			var td = document.createElement("td");
			var td2 = document.createElement("td");
			td.appendChild(input);
			td2.appendChild(input2);
			tr.appendChild(td);
			tr.appendChild(td2);
			tbody.appendChild(tr);
			document.getElementById('passengerTable').addEventListener('input', pickHandler)
		}
const setDefaultValues = (pickers) => {
	const current = new Date();
	
	const date = [ current.getFullYear(), current.getMonth() + 1, current.getDate() ]
		.map(item => item.toString().padStart(2, "0"))
		.join("-");

	pickers.date.value = date;

	const time = [ current.getHours(), current.getMinutes() ]
		.map(item => item.toString().padStart(2, "0"))
		.join(":");

	pickers.time.value = time;
}
setDefaultValues(pickers);
pickers.origen.addEventListener('input', pickHandler)
pickers.destino.addEventListener('input', pickHandler)
document.getElementById('passengerTable').addEventListener('input', pickHandler)
function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
		  /*check if the item starts with the same letters as the text field value:*/
		  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
			b.addEventListener("click", function(e) {
				/*insert the value for the autocomplete text field:*/
				inp.value = this.getElementsByTagName("input")[0].value;
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
			});
			a.appendChild(b);
		  }
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
		  /*If the arrow DOWN key is pressed,
		  increase the currentFocus variable:*/
		  currentFocus++;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 38) { //up
		  /*If the arrow UP key is pressed,
		  decrease the currentFocus variable:*/
		  currentFocus--;
		  /*and and make the current item more visible:*/
		  addActive(x);
		} else if (e.keyCode == 13) {
		  /*If the ENTER key is pressed, prevent the form from being submitted,*/
		  e.preventDefault();
		  if (currentFocus > -1) {
			/*and simulate a click on the "active" item:*/
			if (x) x[currentFocus].click();
		  }
		}
	});
	function addActive(x) {
	  /*a function to classify an item as "active":*/
	  if (!x) return false;
	  /*start by removing the "active" class on all items:*/
	  removeActive(x);
	  if (currentFocus >= x.length) currentFocus = 0;
	  if (currentFocus < 0) currentFocus = (x.length - 1);
	  /*add class "autocomplete-active":*/
	  x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
	  /*a function to remove the "active" class from all autocomplete items:*/
	  for (var i = 0; i < x.length; i++) {
		x[i].classList.remove("autocomplete-active");
	  }
	}
	function closeAllLists(elmnt) {
	  /*close all autocomplete lists in the document,
	  except the one passed as an argument:*/
	  var x = document.getElementsByClassName("autocomplete-items");
	  for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
		  x[i].parentNode.removeChild(x[i]);
		}
	  }
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
		pickHandler()
	});	
  }
  
  /*An array containing all the country names in the world:*/
  var places=[{"clave":853,"nombre":"19 de noviembre"},{"clave":"065","nombre":"Abreus"},{"clave":267,"nombre":"Agramonte"},{"clave":929,"nombre":"Aguacate (Matanzas)"},{"clave":268,"nombre":"Aguacate (Palma Soriano)"},{"clave":"096","nombre":"Aguada de Pasajeros"},{"clave":382,"nombre":"Almendares"},{"clave":356,"nombre":"Amancio"},{"clave":725,"nombre":"Amarilla"},{"clave":380,"nombre":"Angosta"},{"clave":192,"nombre":"Antilla"},{"clave":"021","nombre":"Artemisa"},{"clave":732,"nombre":"Asignación a Localidades"},{"clave":202,"nombre":"Autopista"},{"clave":604,"nombre":"Baez"},{"clave":239,"nombre":"Báguano"},{"clave":355,"nombre":"Bahía Honda"},{"clave":339,"nombre":"Baire"},{"clave":136,"nombre":"Banes"},{"clave":"082","nombre":"Baracoa"},{"clave":456,"nombre":"Bartolomé Masó"},{"clave":150,"nombre":"Batabanó"},{"clave":346,"nombre":"Bauta"},{"clave":"090","nombre":"Bayamo"},{"clave":385,"nombre":"Bayamo_Manzanillo"},{"clave":359,"nombre":"Bolondrón"},{"clave":366,"nombre":"Buenaventura"},{"clave":282,"nombre":"Cabaiguán"},{"clave":248,"nombre":"Cabañas"},{"clave":252,"nombre":"Cabezas"},{"clave":916,"nombre":"Cacocum"},{"clave":149,"nombre":"Caibarién"},{"clave":372,"nombre":"Calabazar de Sagua"},{"clave":354,"nombre":"Calimete"},{"clave":360,"nombre":"Camagüey"},{"clave":151,"nombre":"Camajuaní"},{"clave":365,"nombre":"Campechuela"},{"clave":900,"nombre":"Campo Florido"},{"clave":341,"nombre":"Candelaria"},{"clave":280,"nombre":"Cárdenas"},{"clave":607,"nombre":"Carrillo"},{"clave":"068","nombre":"Cascajal"},{"clave":129,"nombre":"Cascorro"},{"clave":727,"nombre":"Castillo de Jagua"},{"clave":585,"nombre":"Cauto Cristo"},{"clave":233,"nombre":"Cayo Mambí"},{"clave":"070","nombre":"Cayo Ramona"},{"clave":"030","nombre":"Céspedes"},{"clave":245,"nombre":"Chambas"},{"clave":687,"nombre":"Chaparra"},{"clave":655,"nombre":"Ciego de Ávila"},{"clave":105,"nombre":"Cienfuegos"},{"clave":"045","nombre":"Cifuentes"},{"clave":"042","nombre":"Coliseo"},{"clave":317,"nombre":"Colombia"},{"clave":229,"nombre":"Colón"},{"clave":921,"nombre":"Combinado"},{"clave":310,"nombre":"Consolacion del Sur"},{"clave":207,"nombre":"Contramaestre"},{"clave":"088","nombre":"Corralillo"},{"clave":369,"nombre":"Cortés"},{"clave":925,"nombre":"Costa Rica"},{"clave":658,"nombre":"Cotilla"},{"clave":307,"nombre":"Cruces"},{"clave":470,"nombre":"Cruces Cienfuego"},{"clave":212,"nombre":"Cueto"},{"clave":154,"nombre":"Cumanayagua"},{"clave":384,"nombre":"El Cano"},{"clave":603,"nombre":"El Santo"},{"clave":164,"nombre":"Encrucijada"},{"clave":628,"nombre":"Entrada de Caballeria"},{"clave":462,"nombre":"Entronque de Aguada de Pasajeros"},{"clave":724,"nombre":"Entronque de Céspedes"},{"clave":328,"nombre":"Entronque de Herradura"},{"clave":611,"nombre":"Entronque de Jagüey"},{"clave":850,"nombre":"Entronque de Jagüey Grande"},{"clave":219,"nombre":"Entronque de Los Palacios"},{"clave":463,"nombre":"Entronque de Ranchuelo"},{"clave":187,"nombre":"Esmeralda"},{"clave":261,"nombre":"Esperanza"},{"clave":285,"nombre":"Falcón"},{"clave":507,"nombre":"Fallas"},{"clave":"091","nombre":"Fierro"},{"clave":185,"nombre":"Florida"},{"clave":184,"nombre":"Fomento"},{"clave":130,"nombre":"Gaspar"},{"clave":333,"nombre":"Guáimaro"},{"clave":904,"nombre":"Guamo"},{"clave":231,"nombre":"Guane"},{"clave":193,"nombre":"Guantánamo"},{"clave":188,"nombre":"Guaro"},{"clave":101,"nombre":"Guayos"},{"clave":"089","nombre":"Herradura"},{"clave":306,"nombre":"Holguín"},{"clave":206,"nombre":"II Frente"},{"clave":131,"nombre":"Imias"},{"clave":126,"nombre":"Isabel Rubio"},{"clave":110,"nombre":"Jagüey Grande"},{"clave":910,"nombre":"Jaruco"},{"clave":158,"nombre":"Jatibonico"},{"clave":190,"nombre":"Jesús Menéndez"},{"clave":194,"nombre":"Jicotea"},{"clave":284,"nombre":"Jiguaní"},{"clave":367,"nombre":"Jobabo"},{"clave":299,"nombre":"Jovellanos"},{"clave":370,"nombre":"La Chola"},{"clave":234,"nombre":"La Habana"},{"clave":361,"nombre":"La Maya"},{"clave":329,"nombre":"La Mulata"},{"clave":260,"nombre":"La Palma"},{"clave":116,"nombre":"Lajas"},{"clave":383,"nombre":"Las Mangas"},{"clave":337,"nombre":"Las Martinas"},{"clave":"001","nombre":"Las Terrazas"},{"clave":243,"nombre":"Las Tunas"},{"clave":632,"nombre":"Levisa"},{"clave":"041","nombre":"Limonar"},{"clave":"085","nombre":"Los Arabos"},{"clave":321,"nombre":"Los Palacios"},{"clave":745,"nombre":"Los Pinos"},{"clave":923,"nombre":"Los Reynaldo"},{"clave":909,"nombre":"Mabay"},{"clave":135,"nombre":"Maisí"},{"clave":293,"nombre":"Majagua"},{"clave":223,"nombre":"Manacas"},{"clave":680,"nombre":"Manatí"},{"clave":232,"nombre":"Mango Dulce"},{"clave":726,"nombre":"Manguito"},{"clave":"098","nombre":"Manicaragua"},{"clave":"057","nombre":"Mantua"},{"clave":186,"nombre":"Manzanillo"},{"clave":242,"nombre":"Mariel"},{"clave":124,"nombre":"Martí"},{"clave":609,"nombre":"Matagua"},{"clave":"034","nombre":"Matanzas"},{"clave":"081","nombre":"Maximo Gomez"},{"clave":294,"nombre":"Mayajigua"},{"clave":340,"nombre":"Mayarí"},{"clave":210,"nombre":"Media Luna"},{"clave":"044","nombre":"Minas"},{"clave":"027","nombre":"Minas de Matahambre"},{"clave":995,"nombre":"Mir"},{"clave":249,"nombre":"Moa"},{"clave":"046","nombre":"Mordazo"},{"clave":"015","nombre":"Morón"},{"clave":782,"nombre":"Najasa"},{"clave":631,"nombre":"Nicaro"},{"clave":145,"nombre":"Niquero"},{"clave":"053","nombre":"Nueva Gerona"},{"clave":281,"nombre":"Nueva Paz"},{"clave":"077","nombre":"Nuevitas"},{"clave":344,"nombre":"Palma Soriano"},{"clave":375,"nombre":"Palmira"},{"clave":"017","nombre":"Pedro Betancourt"},{"clave":104,"nombre":"Perico"},{"clave":256,"nombre":"Pilón"},{"clave":224,"nombre":"Pinar del Rio (Autopista)"},{"clave":999,"nombre":"Pinar del Rio (C.Central)"},{"clave":"073","nombre":"Placetas"},{"clave":313,"nombre":"Playa Girón"},{"clave":345,"nombre":"Playa Larga"},{"clave":114,"nombre":"Puerto Padre"},{"clave":856,"nombre":"Punta Brava"},{"clave":197,"nombre":"Quemado de Güines"},{"clave":111,"nombre":"Quiebra Hacha"},{"clave":"004","nombre":"Quintín Banderas"},{"clave":"086","nombre":"Rancho Veloz"},{"clave":327,"nombre":"Ranchuelo"},{"clave":181,"nombre":"Remedios"},{"clave":922,"nombre":"Reynaldo Broock"},{"clave":903,"nombre":"Rio Cauto"},{"clave":"013","nombre":"Rodas"},{"clave":551,"nombre":"S.Spiritus \/ Santa Clara"},{"clave":191,"nombre":"Sábalo"},{"clave":319,"nombre":"Sagua de Tánamo"},{"clave":"067","nombre":"Sagua la Grande"},{"clave":132,"nombre":"San Antonio del Sur"},{"clave":357,"nombre":"San Cristóbal"},{"clave":152,"nombre":"San Diego de Los Baños"},{"clave":241,"nombre":"San José de las Lajas"},{"clave":"060","nombre":"San Juan y Martinez"},{"clave":"072","nombre":"San Luis (Pinar del Rio)"},{"clave":147,"nombre":"San Luis (Santiago de Cuba)"},{"clave":125,"nombre":"Sancti Spíritus"},{"clave":323,"nombre":"Sandino"},{"clave":"029","nombre":"Santa Clara"},{"clave":556,"nombre":"Santa Clara \/ S.Spiritus"},{"clave":263,"nombre":"Santa Cruz del Sur"},{"clave":"040","nombre":"Santa Lucía"},{"clave":269,"nombre":"Santa Marta"},{"clave":208,"nombre":"Santa Rita"},{"clave":138,"nombre":"Santiago de Cuba"},{"clave":"075","nombre":"Santo Domingo"},{"clave":303,"nombre":"Sibanicú"},{"clave":901,"nombre":"Siboney"},{"clave":265,"nombre":"Tacajó"},{"clave":289,"nombre":"Trinidad"},{"clave":"084","nombre":"Unión de Reyes"},{"clave":221,"nombre":"Universidad de Ciego de Avila"},{"clave":272,"nombre":"Vado del Yeso"},{"clave":312,"nombre":"Varadero"},{"clave":"031","nombre":"Vázquez"},{"clave":288,"nombre":"Veguita"},{"clave":168,"nombre":"Velazco"},{"clave":255,"nombre":"Vertientes"},{"clave":274,"nombre":"Viñales"},{"clave":"026","nombre":"Vueltas"},{"clave":"062","nombre":"Yaguajay"},{"clave":471,"nombre":"Yaguanabo"},{"clave":363,"nombre":"Yara"},{"clave":555,"nombre":"Zaza del Medio"},{"clave":270,"nombre":"Zulueta"}]
  var lugares= places.map(x=>x['nombre'])
  console.log(lugares);
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("origen"), lugares);
  autocomplete(document.getElementById("destino"),lugares); 
  var data=Date(pickers.date.value);
  console.log(data);
  console.log(pickers.date.value);
  console.log(reserva);
function pickHandler () {
	// let other = e.target.type == 'date' ? 'time' : 'date'
	if(reserva==true){
		pickers.passengersList=[]
		// trs = document.querySelectorAll('#passengerTable tr');
		var passengers=Array.from(document.getElementsByClassName("passenger"))
		var cis=Array.from(document.getElementsByClassName("ci"))		
		passengers.forEach(function (passenger, i) {
			ci=cis[i]
			console.log(passenger);
			console.log(ci);
			if(ci.value.trim().length==11 && passenger.value.trim()!='' && !isNaN(ci.value.trim()) ){
				pickers.passengersList.push({'nombre':passenger.value.trim(),'dni':ci.value.trim()})
			}
			
			console.log('%d: %s',i,passenger);
		});	
	 	console.log(pickers.passengersList)
	}
	if(lugares.includes(pickers.origen.value.trim()) && lugares.includes(pickers.destino.value.trim()) &&pickers.destino.value!=pickers.origen.value.trim()){
		console.log(pickers.origen.value)
		console.log(pickers.destino.value)
		pickers.radiovalue=document.querySelector('input[name="exactdate"]:checked').value
		pickers.transportvalue=document.querySelector('input[name="exacttrans"]:checked').value
		var data=JSON.stringify({"passengers":pickers.passengersList,"reserva":reserva,"date":pickers.date.value,"destino":places.find(element => element['nombre']==pickers.destino.value.trim())['clave'],"origen":places.find(element => element['nombre']==pickers.origen.value.trim())['clave'],"exactdate":pickers.radiovalue,"transporte":pickers.transportvalue})
	    console.log(data)
		console.log('Showing Telegram');		
		Telegram.WebApp.MainButton.show();

	}else{
		console.log(pickers.origen.value)
		console.log(pickers.destino.value)
		console.log(reserva);
		console.log('Hidding Telegram');
		Telegram.WebApp.MainButton.hide();
	}
	// if (options.hide !== other && pickers[other].value == '') {
	// 	return (false)
	// }
		
}

function sendDateTime () {
	var timestamp = pickers.date.value
		? new Date(pickers.date.value)
		: new Date()

	var [ h, m ] = pickers.time.value.split(':')
	timestamp.setHours(h || 0, m || 0)

	// var data = timestamp.getTime()+'_'+timestamp.getTimezoneOffset()
	var data=JSON.stringify({"passengers":pickers.passengersList,"reserva":reserva,"date":pickers.date.value,"destino":places.find(element => element['nombre']==pickers.destino.value.trim())['clave'],"origen":places.find(element => element['nombre']==pickers.origen.value.trim())['clave'],"exactdate":pickers.radiovalue,"transporte":pickers.transportvalue})
	console.log(data)
	Telegram.WebApp.sendData(data)
}

function init () {
	setupOptions()

	Telegram.WebApp.ready()
	Telegram.WebApp.MainButton
		.setText('Vigilar Viaje')
		.onClick(sendDateTime)
}

document.addEventListener('DOMContentLoaded', init)
