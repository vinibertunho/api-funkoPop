import dados from "../models/dados.js";
const { funkos } = dados;

const getAllFunkos = (req, res) => {
    const { franquia, raridade, condicao, edicaoEspecial } = req.query;
    let resultado = funkos;

    if (franquia) {
        resultado = resultado.filter((f) =>
            f.franquia.toLowerCase().includes(franquia.toLowerCase())
        );
    }
    if (raridade) {
        resultado = resultado.filter((r) =>
            r.raridade.toLowerCase().includes(raridade.toLowerCase())
        );
    }
    if (condicao) {
        resultado = resultado.filter(
            (c) => c.condicao.toLowerCase() === condicao.toLowerCase()
        );
    } if (edicaoEspecial) {
        resultado = resultado.filter(
            (es) => es.edicaoEspecial === (edicaoEspecial === "true")
        );
    }

    res.status(200).json({
        status: "200",
        success: true,
        mensagem: "Lista de Funkos Pop! retornada com sucesso",
        data: resultado,
        total: resultado.length,
    });
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const funkoEncontrado = funkos.find((f) => f.id === id);
    if (!funkoEncontrado) {
        return res.status(404).json({
            status: "404",
            success: false,
            mensagem: "Funko Pop! não encontrado",
            data: null,
        });
    } else {
        return res.status(200).json({
            status: "200",
            success: true,
            mensagem: "Funko Pop! encontrado com sucesso",
            data: funkoEncontrado,
        });
    }
};

export { getAllFunkos, getById };
