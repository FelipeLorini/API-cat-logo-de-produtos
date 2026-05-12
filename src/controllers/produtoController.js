const Produto = require('../models/Produto');


const listarProdutos = async (req, res) => {
  try {
    const { categoria, busca, pagina = 1, limite = 10 } = req.query;

    const filtro = { ativo: true };

    if (categoria) filtro.categoria = categoria;
    if (busca) filtro.nome = { $regex: busca, $options: 'i' };

    const skip = (Number(pagina) - 1) * Number(limite);

    const [produtos, total] = await Promise.all([
      Produto.find(filtro)
        .populate('criadoPor', 'nome email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limite)),
      Produto.countDocuments(filtro),
    ]);

    res.status(200).json({
      total,
      pagina: Number(pagina),
      totalPaginas: Math.ceil(total / Number(limite)),
      produtos,
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar produtos.' });
  }
};


const buscarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id).populate('criadoPor', 'nome email');

    if (!produto || !produto.ativo) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    res.status(200).json({ produto });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ mensagem: 'ID inválido.' });
    }
    res.status(500).json({ mensagem: 'Erro ao buscar produto.' });
  }
};


const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria, estoque, atributos } = req.body;

    const produto = await Produto.create({
      nome,
      descricao,
      preco,
      categoria,
      estoque,
      atributos,
      criadoPor: req.usuario._id,
    });

    res.status(201).json({ mensagem: 'Produto criado com sucesso!', produto });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ mensagem: mensagens.join(', ') });
    }
    res.status(500).json({ mensagem: 'Erro ao criar produto.' });
  }
};


const atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (!produto || !produto.ativo) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

  
    if (produto.criadoPor.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({ mensagem: 'Sem permissão para editar este produto.' });
    }

    const campos = ['nome', 'descricao', 'preco', 'categoria', 'estoque', 'atributos'];
    campos.forEach((campo) => {
      if (req.body[campo] !== undefined) produto[campo] = req.body[campo];
    });

    await produto.save();
    res.status(200).json({ mensagem: 'Produto atualizado com sucesso!', produto });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ mensagem: mensagens.join(', ') });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ mensagem: 'ID inválido.' });
    }
    res.status(500).json({ mensagem: 'Erro ao atualizar produto.' });
  }
};


const deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (!produto || !produto.ativo) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

   
    if (produto.criadoPor.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({ mensagem: 'Sem permissão para deletar este produto.' });
    }

    
    produto.ativo = false;
    await produto.save();

    res.status(200).json({ mensagem: 'Produto removido com sucesso.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ mensagem: 'ID inválido.' });
    }
    res.status(500).json({ mensagem: 'Erro ao deletar produto.' });
  }
};

module.exports = { listarProdutos, buscarProduto, criarProduto, atualizarProduto, deletarProduto };