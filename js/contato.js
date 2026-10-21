function cadastrar(event) {
    event.preventDefault()
}

function buscar(event) {
    if (event.key == "Enter") {
        event.preventDefault()

        const logradouro = document.getElementById('logradouro')
        const bairro = document.getElementById('bairro')
        const cidade = document.getElementById('cidade')
        const estado = document.getElementById('estado')
        const uf = document.getElementById('uf')
        const cep = document.getElementById('cep')

        const url = `https://viacep.com.br/ws/${cep.value}/json/`

        fetch(url)
            .then(response => response.json())
            .then(dados => {
                if (dados.erro) {
                    alert("CEP não encontrado!")
                    return
                }

                logradouro.value = dados.logradouro
                bairro.value = dados.bairro
                cidade.value = dados.localidade
                estado.value = dados.estado
                uf.value = dados.uf
            })
            .catch(erro => {
                alert("Erro ao buscar dados!")
                console.log(erro)
            })
    }
}


function cadastrar(event) {
    event.preventDefault()
}

const precos = {
    chocolate: 45.00,
    morango: 50.00,
    laranja: 35.00,
    cenoura: 35.00,
    abacaxi: 45.00,
    cereja: 55.00
}

function calcularTotal() {
    const item = document.getElementById("item").value
    const quantidade = Number(document.getElementById("quantidade").value)
    const total = document.getElementById("total")

    let valor = 0

    if (precos[item] && quantidade > 0) {
        valor = precos[item] * quantidade
    }

    total.value = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    if (document.getElementById("pagamento").value == "pix") {
        mostrarPix()
    }
}

function mostrarPix() {
    const pagamento = document.getElementById("pagamento").value
    const areaPix = document.getElementById("area-pix")

    if (pagamento != "pix") {
        areaPix.style.display = "none"
        return
    }

    areaPix.style.display = "block"

    const item = document.getElementById("item").value
    const quantidade = Number(document.getElementById("quantidade").value)

    if (!precos[item] || quantidade <= 0) {
        document.getElementById("pix-valor").textContent =
            "Selecione um bolo e uma quantidade válida."
        document.getElementById("qrcode").innerHTML = ""
        document.getElementById("pix-copia-cola").value = ""
        return
    }

    const valor = precos[item] * quantidade

    document.getElementById("pix-valor").textContent =
        "Valor a pagar: " + valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

    gerarPix(valor)
}

function campoPix(id, valor) {
    return id + String(valor.length).padStart(2, "0") + valor
}

function calcularCRC(texto) {
    let crc = 0xFFFF

    for (let i = 0; i < texto.length; i++) {
        crc ^= texto.charCodeAt(i) << 8

        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021
            } else {
                crc = crc << 1
            }

            crc &= 0xFFFF
        }
    }

    return crc.toString(16).toUpperCase().padStart(4, "0")
}

function gerarPix(valor) {
    // SUBSTITUA pelos dados verdadeiros da confeitaria
    const chavePix = "SUA_CHAVE_PIX"
    const nome = "CONFEITARIA GASQUE"
    const cidade = "PIRACICABA"

    if (chavePix == "SUA_CHAVE_PIX") {
        document.getElementById("pix-valor").textContent =
            "Configure sua chave PIX no index.js para gerar o pagamento."
        document.getElementById("qrcode").innerHTML = ""
        document.getElementById("pix-copia-cola").value = ""
        return
    }

    const conta = campoPix("00", "BR.GOV.BCB.PIX") +
        campoPix("01", chavePix)

    let codigo = campoPix("00", "01") +
        campoPix("26", conta) +
        campoPix("52", "0000") +
        campoPix("53", "986") +
        campoPix("54", valor.toFixed(2)) +
        campoPix("58", "BR") +
        campoPix("59", nome) +
        campoPix("60", cidade) +
        campoPix("62", campoPix("05", "***")) +
        "6304"

    codigo += calcularCRC(codigo)

    document.getElementById("pix-copia-cola").value = codigo
    document.getElementById("qrcode").innerHTML = ""

    new QRCode(document.getElementById("qrcode"), {
        text: codigo,
        width: 200,
        height: 200
    })
}

function cadastrar(event) {
    event.preventDefault()

    const formulario = event.target

    if (!formulario.checkValidity()) {
        formulario.reportValidity()
        return
    }

    alert("Pedido preenchido corretamente!")
}