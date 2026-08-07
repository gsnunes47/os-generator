console.log("script.js carregado");


document.addEventListener("DOMContentLoaded", () => {

    const ehIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    document.documentElement.classList.toggle("ios", ehIOS);

    document.getElementById("data").valueAsDate = new Date();

    const photoGrid = document.getElementById("photo-grid");

    let quantidadeFotos = 0;


    function preview(input, id) {

        const file = input.files[0];

        if(!file) return;

        const limiteArquivo = 25 * 1024 * 1024;
        const limiteDimensao = 1600;

        if(file.type && !file.type.startsWith("image/")){
            alert("O arquivo selecionado não é uma imagem válida.");
            input.value = "";
            return;
        }

        if(file.size > limiteArquivo){
            alert("A imagem é muito grande. Selecione uma foto de até 25 MB.");
            input.value = "";
            return;
        }

        const urlTemporaria = URL.createObjectURL(file);
        const imagemOriginal = new Image();

        function finalizarLeitura(){
            imagemOriginal.onload = null;
            imagemOriginal.onerror = null;
            URL.revokeObjectURL(urlTemporaria);
            imagemOriginal.removeAttribute("src");
            input.value = "";
        }

        function informarFalha(){
            finalizarLeitura();
            alert(
                "Não foi possível abrir esta imagem. " +
                "Tente outra foto ou converta o arquivo para JPEG.",
            );
        }

        imagemOriginal.onload = () => {
            try{
                const larguraOriginal = imagemOriginal.naturalWidth;
                const alturaOriginal = imagemOriginal.naturalHeight;

                if(!larguraOriginal || !alturaOriginal){
                    informarFalha();
                    return;
                }

                const escala = Math.min(
                    1,
                    limiteDimensao / Math.max(larguraOriginal, alturaOriginal),
                );

                const largura = Math.max(1, Math.round(larguraOriginal * escala));
                const altura = Math.max(1, Math.round(alturaOriginal * escala));
                const canvas = document.createElement("canvas");
                const contexto = canvas.getContext("2d");

                canvas.width = largura;
                canvas.height = altura;
                contexto.fillStyle = "#fff";
                contexto.fillRect(0, 0, largura, altura);
                contexto.drawImage(imagemOriginal, 0, 0, largura, altura);

                finalizarLeitura();

                canvas.toBlob((imagemOtimizada) => {
                    if(!imagemOtimizada){
                        alert("Não foi possível otimizar esta imagem.");
                        return;
                    }

                    const reader = new FileReader();

                    reader.onload = (event) => {
                        document.getElementById(id).src = event.target.result;
                    };

                    reader.onerror = () => {
                        alert("Não foi possível carregar a imagem otimizada.");
                    };

                    reader.readAsDataURL(imagemOtimizada);
                }, "image/jpeg", 0.82);
            }catch(error){
                console.error("Falha ao processar a imagem.", error);
                informarFalha();
            }
        };

        imagemOriginal.onerror = informarFalha;
        imagemOriginal.src = urlTemporaria;
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

            <div class="foto-acoes">
                <button
                    type="button"
                    onclick="document.getElementById('galeria${numero}').click()">
                    Galeria
                </button>

                <button
                    type="button"
                    class="btn2"
                    onclick="document.getElementById('camera${numero}').click()">
                    Câmera
                </button>

                <input
                    id="galeria${numero}"
                    class="foto-input"
                    type="file"
                    accept="image/*"
                    onchange="preview(this,'f${numero}')">

                <input
                    id="camera${numero}"
                    class="foto-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onchange="preview(this,'f${numero}')">
            </div>

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


    const modalAssinatura = document.getElementById("modal-assinatura");
    const canvasAssinatura = document.getElementById("assinatura-canvas");
    const contextoAssinatura = canvasAssinatura.getContext("2d");

    let alvoAssinatura = null;
    let desenhandoAssinatura = false;
    let assinaturaDesenhada = false;
    let redimensionamentoAssinatura = null;


    function configurarPincelAssinatura(){

        const proporcao = window.devicePixelRatio || 1;

        contextoAssinatura.setTransform(proporcao, 0, 0, proporcao, 0, 0);
        contextoAssinatura.strokeStyle = "#111";
        contextoAssinatura.lineWidth = 3;
        contextoAssinatura.lineCap = "round";
        contextoAssinatura.lineJoin = "round";

    }


    function redimensionarCanvasAssinatura(preservarConteudo = true){

        const area = canvasAssinatura.getBoundingClientRect();

        if(!area.width || !area.height) return;

        let copia = null;

        if(preservarConteudo && canvasAssinatura.width && canvasAssinatura.height){
            copia = document.createElement("canvas");
            copia.width = canvasAssinatura.width;
            copia.height = canvasAssinatura.height;
            copia.getContext("2d").drawImage(canvasAssinatura, 0, 0);
        }

        const proporcao = window.devicePixelRatio || 1;

        canvasAssinatura.width = Math.round(area.width * proporcao);
        canvasAssinatura.height = Math.round(area.height * proporcao);
        configurarPincelAssinatura();

        if(copia){
            contextoAssinatura.drawImage(
                copia,
                0,
                0,
                copia.width,
                copia.height,
                0,
                0,
                area.width,
                area.height,
            );
        }

    }


    function carregarAssinaturaNoCanvas(){

        redimensionarCanvasAssinatura(false);
        assinaturaDesenhada = Boolean(alvoAssinatura?.getAttribute("src"));

        if(!assinaturaDesenhada) return;

        const imagem = new Image();

        imagem.onload = () => {
            const area = canvasAssinatura.getBoundingClientRect();
            const escala = Math.min(area.width / imagem.width, area.height / imagem.height);
            const largura = imagem.width * escala;
            const altura = imagem.height * escala;

            contextoAssinatura.drawImage(
                imagem,
                (area.width - largura) / 2,
                (area.height - altura) / 2,
                largura,
                altura,
            );
        };

        imagem.src = alvoAssinatura.src;

    }


    function pontoDaAssinatura(event){

        const area = canvasAssinatura.getBoundingClientRect();

        return {
            x: event.clientX - area.left,
            y: event.clientY - area.top,
        };

    }


    canvasAssinatura.addEventListener("pointerdown", (event) => {
        const ponto = pontoDaAssinatura(event);

        event.preventDefault();
        canvasAssinatura.setPointerCapture(event.pointerId);
        contextoAssinatura.beginPath();
        contextoAssinatura.moveTo(ponto.x, ponto.y);
        contextoAssinatura.lineTo(ponto.x, ponto.y);
        contextoAssinatura.stroke();
        desenhandoAssinatura = true;
        assinaturaDesenhada = true;
    });


    canvasAssinatura.addEventListener("pointermove", (event) => {
        if(!desenhandoAssinatura) return;

        const ponto = pontoDaAssinatura(event);

        event.preventDefault();
        contextoAssinatura.lineTo(ponto.x, ponto.y);
        contextoAssinatura.stroke();
    });


    function finalizarTracoAssinatura(){
        if(!desenhandoAssinatura) return;

        contextoAssinatura.closePath();
        desenhandoAssinatura = false;
    }


    canvasAssinatura.addEventListener("pointerup", finalizarTracoAssinatura);
    canvasAssinatura.addEventListener("pointercancel", finalizarTracoAssinatura);


    window.abrirAssinatura = async function(idImagem){

        alvoAssinatura = document.getElementById(idImagem);
        modalAssinatura.classList.add("ativo");
        modalAssinatura.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-assinatura-aberta");

        const dispositivoAndroid = /Android/i.test(navigator.userAgent);

        if(dispositivoAndroid){
            try{
                if(!document.fullscreenElement && modalAssinatura.requestFullscreen){
                    await modalAssinatura.requestFullscreen();
                }

                if(screen.orientation?.lock){
                    await screen.orientation.lock("landscape");
                }
            }catch(error){
                console.info("Orientação landscape não pôde ser bloqueada.", error);
            }
        }

        requestAnimationFrame(carregarAssinaturaNoCanvas);

    };


    window.limparCanvasAssinatura = function(){

        const area = canvasAssinatura.getBoundingClientRect();
        contextoAssinatura.clearRect(0, 0, area.width, area.height);
        assinaturaDesenhada = false;

    };


    async function encerrarModalAssinatura(){

        modalAssinatura.classList.remove("ativo");
        modalAssinatura.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-assinatura-aberta");
        desenhandoAssinatura = false;

        try{
            screen.orientation?.unlock?.();
        }catch(error){
            console.info("A orientação da tela não precisou ser desbloqueada.", error);
        }

        if(document.fullscreenElement === modalAssinatura && document.exitFullscreen){
            await document.exitFullscreen().catch(() => {});
        }

    }


    window.fecharAssinatura = function(){
        return encerrarModalAssinatura();
    };


    window.salvarAssinatura = function(){

        if(assinaturaDesenhada){
            alvoAssinatura.src = canvasAssinatura.toDataURL("image/png");
            alvoAssinatura.style.display = "block";
        }else{
            alvoAssinatura.removeAttribute("src");
            alvoAssinatura.style.display = "none";
        }

        return encerrarModalAssinatura();

    };


    window.addEventListener("resize", () => {
        if(!modalAssinatura.classList.contains("ativo")) return;

        clearTimeout(redimensionamentoAssinatura);
        redimensionamentoAssinatura = setTimeout(
            () => redimensionarCanvasAssinatura(true),
            150,
        );
    });


    document.addEventListener("keydown", (event) => {
        if(event.key === "Escape" && modalAssinatura.classList.contains("ativo")){
            fecharAssinatura();
        }
    });

    let tituloOriginal = document.title;
    let impressaoPreparada = false;


    function prepararImpressao(){

        document.querySelectorAll(".photo-box").forEach((photoBox) => {
            const imagem = photoBox.querySelector("img");
            photoBox.classList.toggle("oculto-impressao", !imagem?.getAttribute("src"));
        });

        const campoObservacoes = document.getElementById("campo-observacoes");
        const observacoes = document.getElementById("observacoes");

        campoObservacoes.classList.toggle(
            "oculto-impressao",
            !observacoes.value.trim(),
        );

        if(!impressaoPreparada){
            tituloOriginal = document.title;
            impressaoPreparada = true;
        }

        document.title = " ";

    }


    window.imprimir = function(){

        if(ehIOS){
            prepararImpressao();
        }

        window.print();

    };


    function restaurarAposImpressao(){

        document.title = tituloOriginal;
        impressaoPreparada = false;

    }


    window.addEventListener("beforeprint", prepararImpressao);
    window.addEventListener("afterprint", restaurarAposImpressao);


});



if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => console.log("Service Worker registrado."));

    });

}
