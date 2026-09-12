let usuariosGlobales = [];

async function cargarUsuarios() {
    const mensaje = document.querySelector("#mensaje");
    try{
        mensaje.textContent = "Cargando usuarios...";
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }
        usuariosGlobales = await response.json();
        mostrarUsuarios(usuariosGlobales);
        mensaje.textContent = "";
    } catch (error){
        mensaje.textContent = "No fue posible cargar la información.";
        console.error(error);
    }
}
cargarUsuarios();

const contenedor = document.querySelector("#contenedorUsuarios");
function mostrarUsuarios(usuarios){
    contenedor.innerHTML = "";
    usuarios.forEach(usuario => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
    <h3>${usuario.name}</h3>
    <p>${usuario.email}</p>
    <p>${usuario.address.city}</p>
    <p>${usuario.company.name}</p>
    `;
    contenedor.appendChild(tarjeta);
    });
}

const buscar = document.querySelector("#buscar");

buscar.addEventListener("input", () => {
    const texto = buscar.value.toLowerCase();
    const filtrados = usuariosGlobales.filter(usuario =>
    usuario.name.toLowerCase().includes(texto)
    );
    mostrarUsuarios(filtrados);
});