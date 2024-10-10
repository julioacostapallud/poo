import Animal from './Animal';

class Perro extends Animal {
    constructor(nombre, fechaNacimiento, overrideEnabled) {
        super(nombre, fechaNacimiento);

        // Controlamos si se redefine el método hacerSonido dependiendo de overrideEnabled
        if (overrideEnabled) {
            this.hacerSonido = function () {
                const sound = new Audio(`/sounds/perro.mp3`);
                sound.play();
            };
        }
        // Si overrideEnabled es false, se mantiene el método genérico de Animal
    }
}

export default Perro;
