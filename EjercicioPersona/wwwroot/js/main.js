"use strict";
class MiPrimerHTML {
    g;
    constructor(LibreriaHTML) {
        this.g = LibreriaHTML;
    }
    dameHTML() {
        let contenido = this.g.dameCss();
        contenido += this.g.dameDiv("formulario");
        contenido += "<br />";
        contenido += this.g.dameTextBox("nombre1", "nombre");
        contenido += this.g.dameTextBox("nombreIntermedio", "intermedio");
        contenido += this.g.dameTextBox("apellido1", "apellido1");
        contenido += this.g.dameTextBox("apellido2", "apellido2");
        contenido += "<br />";
        contenido += this.g.dameTextBox("identificativo", "identificativo");
        contenido += this.g.dameNumberBox("nac", "año nacimiento");
        contenido += this.g.dameCheckBox("activo", "Activo");
        contenido += this.g.dameBoton("boton", "Dale");
        return contenido;
    }
}
class ConfiguradorEspañolBasico {
    dameGenerador() {
        return new MiPrimerHTML(new HTMLBootStrap());
    }
    dameCreador() {
        return new CreadorHTML();
    }
    dameValidador() {
        return new ValidadorIngles();
    }
    dameMostrador() {
        return new MuestraHTML();
    }
}
class CreadorManualEspañol {
    damePersona() {
        let MiPersona = new Persona();
        MiPersona.primerNombre = "Jacinto";
        MiPersona.nombreIntermedio = "";
        MiPersona.apellido1 = "Aisa";
        MiPersona.apellido2 = "Ibañez";
        MiPersona.añoNacimiento = 2000;
        MiPersona.identificador = "2323232";
        MiPersona.activo = true;
        return MiPersona;
    }
}
class ConfiguradorAdjunto {
    dameGenerador() {
        return new MiPrimerHTML(new HTMLChurrutero());
    }
    dameCreador() {
        return new CreadorManualEspañol();
    }
    dameValidador() {
        return new ValidadorEspañol();
    }
    dameMostrador() {
        return new MuestraHTML2();
    }
}
class CreadorHTML {
    damePersona() {
        let MiPersona = new Persona();
        MiPersona.primerNombre = this.dameValorTexto("nombre1");
        MiPersona.nombreIntermedio = this.dameValorTexto("nombreIntermedio");
        MiPersona.apellido1 = this.dameValorTexto("apellido1");
        MiPersona.apellido2 = this.dameValorTexto("apellido2");
        MiPersona.identificador = this.dameValorTexto("identificativo");
        MiPersona.añoNacimiento = this.dameValorNumero("nac");
        MiPersona.activo = this.dameValorBooleano("activo");
        return MiPersona;
    }
    dameValorNumero(elementoId) {
        return Number(this.dameValorTexto(elementoId));
    }
    dameValorBooleano(elementoId) {
        return document.getElementById(elementoId).checked;
    }
    dameValorTexto(elementoId) {
        return document.getElementById(elementoId).value;
    }
}
class HTMLChurrutero {
    dameDiv(id) {
        return (`<div id='${id}'></div><br/>`);
    }
    dameCss() {
        return "<br />";
    }
    dameBoton(id, texto) {
        return `<input type='button' id=${id} value='${texto}' />`;
    }
    dameCheckBox(id, contenido) {
        return `<input type='checkbox' id='${id}'/><label for='${id}'> ${contenido} </label>`;
    }
    dameTextBox(id, placeholder) {
        return `<input type ='text' id='${id}' placeholder='${placeholder}'/>`;
    }
    dameNumberBox(id, placeholder) {
        return `<input type='number' id='${id}' placeholder='${placeholder}' />`;
    }
}
class HTMLBootStrap {
    dameDiv(id) {
        return (`<div id='${id}' class='form-group col-md-6'></div><br/>`);
    }
    dameCss() {
        return `<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet'>`;
    }
    dameBoton(id, texto) {
        return `<input type='button' id=${id} value='${texto}'/>`;
    }
    dameCheckBox(id, contenido) {
        return `<input type='checkbox' id='${id}'/><label for='${id}'> ${contenido} </label>`;
    }
    dameTextBox(id, placeholder) {
        return `<input type ='text' id='${id}' placeholder='${placeholder}' class='form-control'>`;
    }
    dameNumberBox(id, placeholder) {
        return `<input type='number' id='${id}' placeholder='${placeholder}' />`;
    }
}
class MuestraHTML {
    dameContenido(MiPersona) {
        return (`<p> ${MiPersona.primerNombre}  ${MiPersona.apellido1} </p>`);
    }
}
class MuestraHTML2 {
    dameContenido(MiPersona) {
        return (`<p> ${MiPersona.primerNombre}  ${MiPersona.apellido2} </p>`);
    }
}
class Persona {
    primerNombre = "";
    nombreIntermedio = "";
    apellido1 = "";
    apellido2 = "";
    añoNacimiento = 0;
    identificador = "";
    activo = true;
}
class ValidadorEspañol {
    isValid(MiPersona) {
        return (MiPersona.identificador.length > 0 &&
            MiPersona.apellido1.length > 0 &&
            MiPersona.apellido2.length > 0 &&
            MiPersona.primerNombre.length > 0);
    }
}
class ValidadorIngles {
    isValid(MiPersona) {
        return (MiPersona.identificador.length > 0 &&
            MiPersona.apellido1.length > 0 &&
            MiPersona.nombreIntermedio.length > 0 &&
            MiPersona.primerNombre.length > 0);
    }
}
let ConfiguradorGeneral = new ConfiguradorAdjunto();
let GeneradorHTML = ConfiguradorGeneral.dameGenerador();
let _formulario = document.getElementById("formulario");
if (_formulario != null) {
    _formulario.innerHTML = GeneradorHTML.dameHTML().toString();
}
let _boton = document.getElementById("boton");
if (_boton != null) {
    _boton.addEventListener("click", valida);
}
function valida() {
    let Creador = ConfiguradorGeneral.dameCreador();
    let ValidadorPersona = ConfiguradorGeneral.dameValidador();
    let Mostrador = ConfiguradorGeneral.dameMostrador();
    let MiPersona = Creador.damePersona();
    let _verde = document.getElementById("verde");
    let _rojo = document.getElementById("rojo");
    if (ValidadorPersona.isValid(MiPersona)) {
        if (_verde != null) {
            _verde.innerHTML = Mostrador.dameContenido(MiPersona).toString();
        }
        if (_rojo != null) {
            _rojo.innerHTML = "";
        }
    }
    else {
        if (_rojo != null) {
            _rojo.innerHTML = Mostrador.dameContenido(MiPersona).toString();
        }
        if (_verde != null) {
            _verde.innerHTML = "";
        }
    }
}
