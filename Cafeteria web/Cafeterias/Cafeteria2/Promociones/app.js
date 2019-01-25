
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
var refTest = firebase.database().ref("/Cafeterias/Cafeteria2/Promociones/");

function recargar(){
	window.location.reload();
}

//Agregar Menu
function guardarPromo() {

var comida =document.getElementById('Comida').value;
var bebida =document.getElementById('Bebida').value;
var valor =document.getElementById('Precio').value;
var imagen =document.getElementById('Imagen').value;


	var objeto = {
        Comida: comida,
	    Bebida: bebida,
	  	Precio: valor,
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

	refTest.once('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){

		var childKey = childSnapshot.key;
		var d = childSnapshot.val();
		
		{
			var row = tabla.insertRow(0);

			var celda_id= row.insertCell(0);
			var celda_comi = row.insertCell(1);
			var celda_bebi = row.insertCell(2);
			var celda_precio = row.insertCell(3);
			var celda_imagen = row.insertCell(4);
			var btnEdit = row.insertCell(5);
			var btnDelete = row.insertCell(6);
			

		celda_id.innerHTML = childKey;
		celda_comi.innerHTML = d.Comida;
		celda_bebi.innerHTML = d.Bebida;
		celda_precio.innerHTML = d.Precio;
		celda_imagen.innerHTML = d.Imagen;
		btnEdit.innerHTML = `<button type="button" class="btn btn-info" onclick="editar('${childKey}','${d.Comida}','${d.Bebida}','${d.Precio}','${d.Imagen}')" id="boton2"> Editar</button>`;
		btnDelete.innerHTML = `<button type="button" class="btn btn-danger" onclick="eliminar('${childKey}')" id="boton3"> Eliminar</button>`;


			}
		});
	});

//Borrar Menu

function eliminar(id){

	firebase.database().ref().child('/Cafeterias/Cafeteria2/Promociones/' + id).remove();
	console.log("Document successfully deleted!");
	recargar();
}

//Editar Documentos

function editar(id,comida,bebida,precio,imagen){

	
		document.getElementById('Comida').value= comida;
		document.getElementById('Bebida').value= bebida;
		document.getElementById('Precio').value= precio;
		document.getElementById('Imagen').value= imagen;
		

		var boton =document.getElementById('boton');
		boton.innerHTML='Editar';

		boton.onclick=function(){

		var washingtonRef =firebase.database().ref().child('/Cafeterias/Cafeteria2/Promociones/' + id);
		
		var comida =document.getElementById('Comida').value;
		var bebida =document.getElementById('Bebida').value;
		var precio =document.getElementById('Precio').value;
		var imagen =document.getElementById('Imagen').value;

		return washingtonRef.update({
	
		    Comida: comida,
		    Bebida: bebida,
		    Precio: precio,
		    Imagen: imagen
		})
		.then(function() {

	    console.log("Documento Actualiado Satisfactoriamente!");
	    boton.innerHTML='Guardar';
	    
	    document.getElementById('Comida').value ='';
	    document.getElementById('Bebida').value ='';
	    document.getElementById('Precio').value ='';
	    document.getElementById('Imagen').value ='';
			recargar();
		})
		.catch(function(error) {
	    // The document probably doesn't exist.
	    console.error("Error updating document: ", error);
		});
	}


	
}
