
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
var refTest = firebase.database().ref("Usuarios/");

function registrar(){
	var email= document.getElementById('correo').value;
	var contrasena= document.getElementById('pass').value;

	firebase.auth().createUserWithEmailAndPassword(email, contrasena)
	.then(function(){
 
 	})
 	.catch(function(error){
 	var errorCode = error.code;
  	var errorMessage = error.message;
  	console.log(errorCode);
  	console.log(errorMessage);
  });
}

function recargar(){
	window.location.reload();
}

//Agregar Menu
function guardarMenu() {

var nombre =document.getElementById('Nombre').value;
var apellido =document.getElementById('Apellido').value;
var cedula =document.getElementById('Cedula').value;
var facultad =document.getElementById('Facultad').value;
var sede =document.getElementById('Sede').value;
var programa =document.getElementById('Programa').value;
var rol =document.getElementById('Rol').value;
var email =document.getElementById('correo').value;
var password =document.getElementById('pass').value;


firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

	var objeto = {
        Nombre: nombre,
	    Apellido: apellido,
	    Cedula: cedula,
	    Facultad: facultad,
	    Sede: sede,
	    Programa: programa,
	    Rol: rol,
	    Email: email,
		Password: password
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

	refTest.orderByChild('Nombre').once('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){

		var childKey = childSnapshot.key;
		var d = childSnapshot.val();
		
		{
			var row = tabla.insertRow(0);

			var celda_id= row.insertCell(0);
			var celda_nom = row.insertCell(1);
			var celda_apell = row.insertCell(2);
			var celda_cedu = row.insertCell(3);
			var celda_facul = row.insertCell(4);
			var celda_sede = row.insertCell(5);
			var celda_progra = row.insertCell(6);
			var celda_rol = row.insertCell(7);
			var celda_email = row.insertCell(8);
			var btnEdit = row.insertCell(9);
			var btnDelete = row.insertCell(10);
			

		celda_id.innerHTML = childKey;
		celda_nom.innerHTML = d.Nombre;
		celda_apell.innerHTML = d.Apellido;
		celda_cedu.innerHTML = d.Cedula;
		celda_facul.innerHTML = d.Facultad;
		celda_sede.innerHTML = d.Sede;
		celda_progra.innerHTML = d.Programa;
		celda_rol.innerHTML = d.Rol;
		celda_email.innerHTML = d.Email;
		btnEdit.innerHTML = `<button type="button" class="btn btn-info" onclick="editar('${childKey}')" id="boton2"> Editar</button>`;
		btnDelete.innerHTML = `<button type="button" class="btn btn-danger" onclick="eliminar('${childKey}')" id="boton3"> Eliminar</button>`;


			}
		});
	});

//Borrar Menu

function eliminar(id){

	firebase.database().ref().child('Usuarios/' + id).remove();
	console.log("Document successfully deleted!");
	recargar();
}

//Editar Documentos

function editar(id,principio,sobremesa,ensalada,jugo,precio){

	
		document.getElementById('Principio').value= principio;
		document.getElementById('Sobremesa').value= sobremesa;
		document.getElementById('Ensalada').value= ensalada;
		document.getElementById('Jugo').value= jugo;
		document.getElementById('Precio').value= precio;

		var boton =document.getElementById('boton');
		boton.innerHTML='Editar';

		boton.onclick=function(){

		var washingtonRef =firebase.database().ref().child('/Cafeterias/Cafeteria1/Menu/' + id);
		
		var principio =document.getElementById('Principio').value;
		var sobremesa =document.getElementById('Sobremesa').value;
		var ensalada =document.getElementById('Ensalada').value;
		var jugo =document.getElementById('Jugo').value;
		var precio =document.getElementById('Precio').value;

		return washingtonRef.update({
	
		    Principio: principio,
		    Sobremesa: sobremesa,
		    Ensalada: ensalada,
		    Jugo: jugo,
		    Precio: precio
		})
		.then(function() {

	    console.log("Documento Actualiado Satisfactoriamente!");
	    boton.innerHTML='Guardar';
	    
	    document.getElementById('Ensalada').value ='';
	    document.getElementById('Jugo').value ='';
	    document.getElementById('Precio').value ='';
	    document.getElementById('Principio').value ='';
	    document.getElementById('Sobremesa').value ='';
			recargar();
		})
		.catch(function(error) {
	    // The document probably doesn't exist.
	    console.error("Error updating document: ", error);
		});
	}


	
}
