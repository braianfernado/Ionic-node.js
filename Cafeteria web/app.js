function registrar(){
	var email= document.getElementById('correo').value;
	var contrasena= document.getElementById('pass').value;

	firebase.auth().createUserWithEmailAndPassword(email, contrasena)
	.then(function(){
 	verificar()
 	})
 	.catch(function(error){
 	var errorCode = error.code;
  	var errorMessage = error.message;
  	console.log(errorCode);
  	console.log(errorMessage);
  });
}

function ingresar(){
	var email2= document.getElementById('correo2').value;
	var contrasena2= document.getElementById('pass2').value;


	firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {

  var errorCode = error.code;
  var errorMessage = error.message;
	console.log(errorCode);
  	console.log(errorMessage);
});
}

function observador(){
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	console.log('Existe usuario Activo');
  	aparece(user);
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    console.log('---------------');
    console.log(user.emailVerified);
    console.log('---------------');
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    console.log('No existe usuario Activo');
    contenido.innerHTML= `
	<div class="alert alert-warning alert-dismissible fade show" role="alert">
	  <strong>Session Finalizada</strong>
	  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	    <span aria-hidden="true">&times;</span>
	  </button>
	</div>
	`;
  }
});
}
observador();

function aparece(user){
	var usert = user;
	var contenido = document.getElementById('contenido');
	if(user.emailVerified){

	contenido.innerHTML= `
	<div class="alert alert-success" role="alert">
  		<h4 class="alert-heading">Bienvenido! ${user.email}</h4>
  		<p>Te damos la bienvenida al administrador de gastronomia de la UNIAJC</p>
  		<hr>
  		<p class="mb-0">Puedes realizar cualquier solicitud o implementar nuevos platos para el menu de la universidad.</p>
  		

	</div>
	<button onclick="cerrar()" class="btn btn-danger">Cerrar Sesion</button> 
  <br><br>
  <div class="container">

    <table class="table">
    <thead>
      <tr>
        <th><button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo1" >Cafeteria Sede Central</button></th>
        <th><button type="button" class="btn btn-secondary" data-toggle="collapse" data-target="#demo2">Cafeteria Sede Estacion</button></th>
        <th><button type="button" class="btn btn-success" data-toggle="collapse" data-target="#demo3">Cafeteria Sede Sur</button></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td >
          <div id="demo1" class="btn-group; collapse">
              <button type="button" class="btn btn-dark" onclick="location.href='Cafeterias/Cafeteria1/Menu'">Menu</button>
              <button type="button" class="btn btn-light" onclick="location.href='Cafeterias/Cafeteria1/Promociones'">Promociones</button>
              
        </div>
      </td>
        <td>
          <div id="demo2" class="btn-group; collapse">
              <button type="button" class="btn btn-dark" onclick="location.href='Cafeterias/Cafeteria2/Menu'">Menu</button>
              <button type="button" class="btn btn-light" onclick="location.href='Cafeterias/Cafeteria2/Promociones'">Promociones</button>
           
        </div>
          </td>
        <td><div id="demo3" class="btn-group; collapse">
              <button type="button" class="btn btn-dark" onclick="location.href='Cafeterias/Cafeteria3/Menu'">Menu</button>
              <button type="button" class="btn btn-light" onclick="location.href='Cafeterias/Cafeteria3/Promociones'">Promociones</button>
        </div>
      </td>
      </tr>
      
    </tbody><h1> Gestionar Cafeterias</h1>
  </table>
         
   </div>
   <h1> Gestionar Usuarios</h1>
   
   <div class="container">
   
          <br>
      <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo4">Gestionar Usuarios</button>
      <div id="demo4" class="btn-group; collapse">
          <button type="button" class="btn btn-warning" onclick="location.href='Usuarios/'">Ver</button>
      </div>
   </div> 

	`;
}
}

function cerrar(){
	firebase.auth().signOut()
	.then(function(){
		console.log('Saliendo....');
	})
	.catch(function(error){
		console.log(error);
	})
}

function verificar(){
	var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  console.log('Enviando correo....');
}).catch(function(error) {
  console.log(error);
});
}