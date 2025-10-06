import dados from "../models/dados.js";
const {  funkos  } = dados;

const getAllFunkos = (req, res) => {
    const {  franquia, raridade, condicao, edicaoEspeial  } = req.query
    let resultado = funkos;

    if (franquia) {
        resultado = resultado.filter((f) => f.franquia.toLowerCase().includes(franquia.toLowerCase()))
    }
}