// import firebase from "firebase/app";
// import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBin0MffN_ZR0C_cGdQT4aptMSnmy4ke44",
    authDomain: "datos-de-formulario-52f82.firebaseapp.com",
    projectId: "datos-de-formulario-52f82",
    storageBucket: "datos-de-formulario-52f82.firebasestorage.app",
    messagingSenderId: "286074122363",
    appId: "1:286074122363:web:f9e2f20c162aaf5a5232de",
    measurementId: "G-TSDF9T2Z2D"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();





document.getElementById("formulario").addEventListener("submit",(event)=>{
    event.preventDefault()

    // validar campo nombre
    let entradaNombre=document.getElementById("name")
    let errorNombre=document.getElementById("nameError")

    if (entradaNombre.value.trim()==="") {
        errorNombre.textContent="Por favor, ingrese tu nombre"
        errorNombre.classList.add("error-message")
    }else{
        errorNombre.textContent=""
        errorNombre.classList.remove("error-message")
    }

    // validar campo correo electronico
    let emailEntrada=document.getElementById("email")
    let emailError=document.getElementById("emailError")
    let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent="Por favor, ingrese un mail valido"
        emailError.classList.add("error-message")
    }else{
        emailError.textContent=""
        emailError.classList.remove("error-message")
    }

    // validar campo contraseña
    let contrasenaEntrada=document.getElementById("password")
    let contrasenaError=document.getElementById("passwordError")
    let contrasenaPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent="La contraseña debe tener al menos 8 caracteres,numeros,mayusculas y minusculas y caracteres especiales."
        contrasenaError.classList.add("error-message")
    }else{
        contrasenaError.textContent=""
        contrasenaError.classList.remove("error-message")
    }

    if (!errorNombre.textContent&&!emailError.textContent&&!contrasenaError.textContent) {

        // BACKEND QUE RECIBA LA INFORMACION
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert(`El formulario se ha enviado con exito with ID: ${docRef.id}`)
        document.getElementById("formulario").reset()

        })
        .catch((error) => {
            alert("Error adding document: ", error);
        });

        
    }
})

// 07:44:55