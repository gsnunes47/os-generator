console.log("script.js carregado");

function preview(input, id) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => (document.getElementById(id).src = e.target.result);
  reader.readAsDataURL(file);
}

function limpar() {
  if (confirm("Limpar todos os campos?")) location.reload();
}
document.getElementById("data").valueAsDate = new Date();

function atualizarTitulo(input, id) {
  document.getElementById(id).textContent = input.value;
}

const photoGrid = document.getElementById("photo-grid");

let quantidadeFotos = 0;

function criarPhotoBox(numero) {
  const div = document.createElement("div");

  div.className = "photo-box";

  div.innerHTML = `
        <input
            type="text"
            class="foto-titulo"
            placeholder="Título da foto"
            value="Foto ${numero} "
            oninput="atualizarTitulo(this,'titulo${numero}')">

        <b id="titulo${numero}" class="titulo-impressao">
            Foto ${numero}
        </b>

        <input
            type="file"
            accept="image/*"
            onchange="preview(this,'f${numero}')">

        <img id="f${numero}">
    `;

  return div;
}

function adicionarFoto() {
  quantidadeFotos++;

  photoGrid.appendChild(criarPhotoBox(quantidadeFotos));
}

function removerFoto() {
  if (quantidadeFotos <= 4) {
    return;
  }

  photoGrid.removeChild(photoGrid.lastElementChild);

  quantidadeFotos--;
}

// Cria as 4 fotos iniciais
for (let i = 1; i <= 4; i++) {
  adicionarFoto();
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
        .register("./sw.js")
        .then(() => console.log("Service Worker registrado."));
    });
}
