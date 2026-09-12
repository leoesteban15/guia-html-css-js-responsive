async function cargarUsuarios() {
    const mensaje = document.querySelector("#mensaje");
    try{
        mensaje.textContent = "Cargando usuarios...";
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const usuarios = await response.json();
        mostrarUsuarios(usuarios);
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