const textarea = document.querySelector('.caja-texto');
const contenedorImagenSinEncriptar = document.querySelector('.contenedor-imagen-sin-encriptar');
const btnCopiar = document.querySelector('.btn-copiar');

//Función para limpiar el texto sin acentos ni mayúsculas
function limpiarTexto(texto) {   
    function eliminarAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const textoTransformado = eliminarAcentos(texto.toLowerCase());
    return textoTransformado;
}
//función para escribir el texto en la caja de texto de resultado
function manejarEntradaUsuario() {
    const textarea = document.querySelector('.caja-texto');
    const resultado = document.querySelector('.resultado-texto');
    const textoIngresado = textarea.value;
    
    if (!verificarTexto(textoIngresado)) {
        return;
    }
    
    const textoLimpiado = limpiarTexto(textoIngresado);

    resultado.textContent = textoLimpiado;
}

textarea.addEventListener('input', manejarEntradaUsuario);

//Función para quitar la imagen y el texto
function manejarVisibilidadImagen() {
    if (textarea.value.trim() === '') {
            contenedorImagenSinEncriptar.classList.remove('oculto');
    } else {
            contenedorImagenSinEncriptar.classList.add('oculto');
    }
}
//imágen para quitar de vista el botón copiar
textarea.addEventListener('input', manejarVisibilidadImagen);
manejarVisibilidadImagen();

function manejarVisibilidadBoton() {
    if (textarea.value.trim() === '') {
        btnCopiar.style.display = 'none';
    } else {
        btnCopiar.style.display = 'inline-block';
    }
}

textarea.addEventListener('input', manejarVisibilidadBoton);
manejarVisibilidadBoton();

//función que no permite las mayusculas o los acentos
function verificarTexto(texto) {
    const regexMayusculas = /[A-Z]/;
    const regexAcentos = /[áéíóúÁÉÍÓÚ´]/;
    
    if (regexMayusculas.test(texto) || regexAcentos.test(texto)) {
        swal('Precaución','Por favor, reescribe el texto sin mayúsculas ni acentuaciones.','error');
        textarea.value = "";
        manejarEntradaUsuario();
        return false;
    }
    return true; 
}

//función para decodificar
function encriptar(texto) {
    let textoEncriptado = "";
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] === "a") {
            textoEncriptado += "ai";
        } else if (texto[i] === "e") {
            textoEncriptado += "enter";
        } else if (texto[i] === "i") {
            textoEncriptado += "imes";
        } else if (texto[i] === "o") {
            textoEncriptado += "ober";
        } else if (texto[i] === "u") {
            textoEncriptado += "ufat";
        } else {
            textoEncriptado += texto[i];
        }
    }
    return textoEncriptado;
}
// Agregar al evento para que funcione con el boton
const btnEncriptar = document.querySelector('.btn-encriptar');
btnEncriptar.addEventListener('click', function() {
    const textarea = document.querySelector('.caja-texto');
    const resultado = document.querySelector('.resultado-texto');
    const textoIngresado = textarea.value;
    const textoEncriptado = encriptar(textoIngresado);

    resultado.textContent = textoEncriptado;
});

// Función para desencriptar el texto
function desencriptar(textoEncriptado) {
    let textoDesencriptado = "";
    for (let i = 0; i < textoEncriptado.length; i++) {
        if (textoEncriptado.slice(i, i + 2) === "ai") {
            textoDesencriptado += "a";
            i += 1;
        } else if (textoEncriptado.slice(i, i + 5) === "enter") {
            textoDesencriptado += "e";
            i += 4;
        } else if (textoEncriptado.slice(i, i + 4) === "imes") {
            textoDesencriptado += "i";
            i += 3;
        } else if (textoEncriptado.slice(i, i + 4) === "ober") {
            textoDesencriptado += "o";
            i += 3;
        } else if (textoEncriptado.slice(i, i + 4) === "ufat") {
            textoDesencriptado += "u";
            i += 3;
        } else {
            textoDesencriptado += textoEncriptado[i];
        }
    }
    return textoDesencriptado;
}

// Asociar la función de desencriptar con el botón "Desencriptar"
const btnDesencriptar = document.querySelector('.btn-desencriptar');
btnDesencriptar.addEventListener('click', function() {
    const textarea = document.querySelector('.caja-texto');
    const resultado = document.querySelector('.resultado-texto');
    const textoEncriptado = textarea.value;
    const textoDesencriptado = desencriptar(textoEncriptado);

    resultado.textContent = textoDesencriptado;
});
// Agregar el evento para que funcione con el botón "Copiar"
btnCopiar.addEventListener('click', function() {
    const resultado = document.querySelector('.resultado-texto');
    const textoEncriptado = resultado.textContent;
    if (textoEncriptado.trim() !== '') {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textoEncriptado;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        swal('Estado','Texto copiado al portapapeles.','success');
    } else {
        swal('Estado','No hay texto para copiar.','success');
    }
});

