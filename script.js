console.log("script.js carregado");


document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("data").valueAsDate = new Date();

    const photoGrid = document.getElementById("photo-grid");

    let quantidadeFotos = 0;


    function preview(input, id) {

        const file = input.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            document.getElementById(id).src = e.target.result;
        };

        reader.readAsDataURL(file);
    }


    window.preview = preview;


    window.limpar = function(){

        if(confirm("Limpar todos os campos?")){
            location.reload();
        }

    };


    window.atualizarTitulo = function(input, id){

        document.getElementById(id).textContent = input.value;

    };


    function criarPhotoBox(numero){

        const div = document.createElement("div");

        div.className = "photo-box";

        div.innerHTML = `
            <input
                type="text"
                class="foto-titulo"
                placeholder="Título da foto"
                value="Foto ${numero}"
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


    window.adicionarFoto = function(){

        quantidadeFotos++;

        photoGrid.appendChild(
            criarPhotoBox(quantidadeFotos)
        );

    };


    window.removerFoto = function(){

        if(quantidadeFotos <= 4){
            return;
        }


        photoGrid.removeChild(
            photoGrid.lastElementChild
        );


        quantidadeFotos--;

    };


    for(let i = 1; i <= 4; i++){
        adicionarFoto();
    }


    window.carregarAssinatura = function(event, idImagem){

        const arquivo = event.target.files[0];

        if(!arquivo) return;


        const reader = new FileReader();


        reader.onload = (e)=>{

            const img = document.getElementById(idImagem);

            img.src = e.target.result;

            img.style.display="block";

        };


        reader.readAsDataURL(arquivo);

    };


});



if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => console.log("Service Worker registrado."));

    });

}