class Animal {
    constructor(nombre, fechaNacimiento) {
        if (this.constructor === Animal) {
            throw new Error("No se puede instanciar la clase abstracta 'Animal'.");
        }
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
    }

    // Método abstracto simulado
    hacerSonido() {
        alert('- Este es un comportamiento genérico para la clase abstracta Animal.\n- Las clases abstractas no implementan comportamientos específicos.\n- Es necesario redefinir el método hacerSonido() en cada subclase concreta para representar el sonido característico de cada tipo de animal.');
    }

}

export default Animal;

