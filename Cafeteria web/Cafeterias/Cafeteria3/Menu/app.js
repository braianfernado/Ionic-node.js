
var config = {
    apiKey: "AIzaSyD_ICBFLFjS1GPG_cnHhnRYjfdWWGslfg8",
    authDomain: "cafeteriauniajc.firebaseapp.com",
    databaseURL: "https://cafeteriauniajc.firebaseio.com",
    projectId: "cafeteriauniajc",
    storageBucket: "cafeteriauniajc.appspot.com",
    messagingSenderId: "309466368229"
  };
  firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var database = firebase.database();
//Crea variable para referenciar el menu
var refTest = firebase.database().ref("/Cafeterias/Cafeteria3/Menu/");

function recargar(){
	window.location.reload();
}

//Agregar Menu
function guardarMenu() {

var principio =document.getElementById('Principio').value;
var sobremesa =document.getElementById('Sobremesa').value;
var jugo =document.getElementById('Jugo').value;
var ensalada =document.getElementById('Ensalada').value;
var precio =document.getElementById('Precio').value;
var imagen =document.getElementById('Imagen').value;

	var objeto = {
        Principio: principio,
	    Sobremesa: sobremesa,
	    Jugo: jugo,
	    Ensalada: ensalada,
		Precio: precio,
		Imagen: imagen
        }
    
    refTest.push(objeto).then(function(){
        recargar();
    }).catch(function(){
        alert("Tuvimos un error");
        console.log(err);
    })
}

//Leer Documentos en Tiempo Real
var tabla = document.getElementById('tabla');
	//limpia la tabla
	tabla.innerHTML="";

	refTest.orderByChild('Principio').once('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){

		var childKey = childSnapshot.key;
		var d = childSnapshot.val();
		
		{
			var row = tabla.insertRow(0);

			var celda_id= row.insertCell(0);
			var celda_princ = row.insertCell(1);
			var celda_sobre = row.insertCell(2);
			var celda_ensa = row.insertCell(3);
			var celda_jugo = row.insertCell(4);
			var celda_prec = row.insertCell(5);
			var celda_image = row.insertCell(6);
			var btnEdit = row.insertCell(7);
			var btnDelete = row.insertCell(8);
			

		celda_id.innerHTML = childKey;
		celda_princ.innerHTML = d.Principio;
		celda_sobre.innerHTML = d.Sobremesa;
		celda_ensa.innerHTML = d.Ensalada;
		celda_jugo.innerHTML = d.Jugo;
		celda_prec.innerHTML = d.Precio;
		celda_image.innerHTML = d.Imagen;

		btnEdit.innerHTML = `<button type="button" class="btn btn-info" onclick="editar('${childKey}','${d.Principio}','${d.Sobremesa}','${d.Ensalada}','${d.Jugo}','${d.Precio}','${d.Imagen}')" id="boton2"> Editar</button>`;
		btnDelete.innerHTML = `<button type="button" class="btn btn-danger" onclick="eliminar('${childKey}')" id="boton3"> Eliminar</button>`;


			}
		});
	});

//Borrar Menu

function eliminar(id){

	firebase.database().ref().child('/Cafeterias/Cafeteria3/Menu/' + id).remove();
	console.log("Document successfully deleted!");
	recargar();
}

//Editar Documentos

function editar(id,principio,sobremesa,ensalada,jugo,precio,imagen){

	
		document.getElementById('Principio').value= principio;
		document.getElementById('Sobremesa').value= sobremesa;
		document.getElementById('Ensalada').value= ensalada;
		document.getElementById('Jugo').value= jugo;
		document.getElementById('Precio').value= precio;
		document.getElementById('Imagen').value= imagen;

		var boton =document.getElementById('boton');
		boton.innerHTML='Editar';

		boton.onclick=function(){

		var washingtonRef =firebase.database().ref().child('/Cafeterias/Cafeteria3/Menu/' + id);
		
		var principio =document.getElementById('Principio').value;
		var sobremesa =document.getElementById('Sobremesa').value;
		var ensalada =document.getElementById('Ensalada').value;
		var jugo =document.getElementById('Jugo').value;
		var precio =document.getElementById('Precio').value;
		var imagen =document.getElementById('Imagen').value;

		return washingtonRef.update({
	
		    Principio: principio,
		    Sobremesa: sobremesa,
		    Ensalada: ensalada,
		    Jugo: jugo,
		    Precio: precio,
		    Imagen: imagen
		})
		.then(function() {

	    console.log("Documento Actualiado Satisfactoriamente!");
	    boton.innerHTML='Guardar';
	    
	    document.getElementById('Ensalada').value ='';
	    document.getElementById('Jugo').value ='';
	    document.getElementById('Precio').value ='';
	    document.getElementById('Principio').value ='';
	    document.getElementById('Sobremesa').value ='';
	    document.getElementById('Imagen').value ='';
			recargar();
		})
		.catch(function(error) {
	    // The document probably doesn't exist.
	    console.error("Error updating document: ", error);
		});
	}


	
}
