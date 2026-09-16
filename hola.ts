


let numero: number|string = 234567;
numero = 654;

interface Materia {
    nombre: string,
    profesor: string
}

interface Persona {
    nombre: string,
    apellido: string,
}

const persona1:Persona = {
    nombre: "Gonzalo",
    apellido: "Bechara"
}

const persona2:Persona = {
    nombre: "Juan",
    apellido: "3456789"
}

const personas:Persona[] = [persona1,persona2];

for (let index = 0; index < personas.length; index++) {
    console.log(personas[index].apellido.toUpperCase());
    
}