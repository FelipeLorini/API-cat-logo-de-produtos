const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do produto é obrigatório'],
      trim: true,
      minlength: [2, 'O nome deve ter no mínimo 2 caracteres'],
      maxlength: [100, 'O nome deve ter no máximo 100 caracteres'],
    },
    descricao: {
      type: String,
      required: [true, 'A descrição é obrigatória'],
      trim: true,
    },
    preco: {
      type: Number,
      required: [true, 'O preço é obrigatório'],
      min: [0, 'O preço não pode ser negativo'],
    },
    categoria: {
      type: String,
      required: [true, 'A categoria é obrigatória'],
      enum: {
        values: ['eletronicos', 'vestuario', 'alimentos', 'moveis', 'esportes', 'outros'],
        message: 'Categoria inválida',
      },
    },
    estoque: {
      type: Number,
      required: [true, 'A quantidade em estoque é obrigatória'],
      min: [0, 'O estoque não pode ser negativo'],
      default: 0,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    atributos: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    criadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
  }
);

produtoSchema.virtual('emEstoque').get(function () {
  return this.estoque > 0;
});

produtoSchema.index({ nome: 'text', descricao: 'text' });

module.exports = mongoose.model('Produto', produtoSchema);
