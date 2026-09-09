//Declaração de variáveis//
let indice = 0
let imagens = [
    "img/bolo1.png",
    "img/bolo2.png",
    "img/bolo3.png"
]

//Função para trocar a imagem//
function trocar(){
    let img = document.getElementById("img")
    img.src = imagens[indice]
}


//Lógica para trocar de imagem
setInterval(function(){
    trocar()
    indice++

    if (indice >= imagens.length) {
        indice = 0
    }

}, 5000)

//trocar()