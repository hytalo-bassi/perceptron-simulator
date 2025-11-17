/**
 * Implementação de um Perceptron para aprendizado de máquina
 * 
 * Um Perceptron é um algoritmo de aprendizado supervisionado usado para 
 * classificação binária. Ele calcula uma soma ponderada das entradas e 
 * aplica uma função de ativação para produzir a saída.
 */
class Perceptron {
  /**
   * Cria uma nova instância do Perceptron
   * 
   * @param {Object} features - Configurações iniciais do perceptron
   * @param {number[]} [features.weights] - Array de pesos para cada entrada
   * @param {number} [features.bias] - Valor de viés (bias) da rede
   * @param {number} [features.learningRate] - Taxa de aprendizado para ajuste dos pesos
   * @param {Function} [features.activationFunction] - Função de ativação a ser aplicada na saída
   */
  constructor(features) {
    // propriedades padroes que necessitam ser definidas
    this.bias = 0;
    this.learningRate = 0.0001;

    this.updateFeatures(features);
  }

  /**
   * Atualiza as características/configurações do Perceptron.
   * 
   * @param {Object} config - Objeto contendo as configurações a serem atualizadas
   * @param {number[]} [config.weights] - Novos pesos para as entradas
   * @param {number} [config.bias] - Novo valor de viés
   * @param {number} [config.learningRate] - Nova taxa de aprendizado
   * @param {Function} [config.activationFunction] - Nova função de ativação
   */
  updateFeatures({ weights, bias, learningRate, activationFunction }) {
    if (weights) this.weights = weights;
    if (bias) this.bias = bias;
    if (learningRate) this.learningRate = learningRate;
    if (activationFunction) this.activationFunction = activationFunction;
  }

  /**
   * Calcula a saída do Perceptron aplicando a função de ativação
   * 
   * @param {...number} X - Valores de entrada (features)
   * @returns {number} Saída após aplicar a função de ativação, ou a predição bruta se não houver função de ativação
   */
  output(...X) {
    const res = this.predict(...X);
    if (this.activationFunction) {
      return this.activationFunction(res);
    }

    return res;
  }

  /**
   * Calcula a predição bruta (sem função de ativação)
   * Realiza a soma ponderada das entradas mais o viés
   * 
   * @param {...number} X - Valores de entrada (features)
   * @returns {number} Resultado da soma ponderada: Σ(Xi * Wi) + bias
   */
  predict(...X) {
    return X.map((_, i) => X[i] * this.weights[i]).reduce((m, n) => m + n) + this.bias;
  }

  /**
   * Treina o Perceptron ajustando os pesos e o viés
   * Utiliza a regra de aprendizado do Perceptron para atualizar os parâmetros
   * 
   * @param {number[]} X - Array de valores de entrada (features)
   * @param {number} y - Valor esperado/desejado (label/target)
   */
  train(X, y) {
    const res = this.output(...X);
    const error = y - res

    for (let i = 0; i < X.length; i++)
      this.weights[i] += this.learningRate * error * X[i];

    this.bias += this.learningRate * error;
  }

  /**
   * Método estático para criar um novo Perceptron com configurações padrão
   * Os pesos e o viés são inicializados aleatoriamente
   * 
   * @param {Object} config - Configurações para criação do Perceptron
   * @param {number} [config.n=1] - Número de entradas (features)
   * @param {number} [config.learningRate=0.0001] - Taxa de aprendizado
   * @param {number} [config.bias] - Valor inicial do viés (aleatório por padrão)
   * @param {Function} [config.activationFunction=sigmoid] - Função de ativação (sigmoid por padrão)
   * @returns {Perceptron} Nova instância do Perceptron
   */
  static create({ n = 1, learningRate = 0.0001, bias = Math.random() * 2 - 1, activationFunction = sigmoid }) {
    let weights = Array.from({ length: n }, (_) => Math.random() * 2 - 1);
  
    return new Perceptron({
      learningRate,
      weights,
      bias,
      activationFunction
    });
  }
}

/**
 * Função de ativação Sigmoid
 * Transforma qualquer valor de entrada em um valor entre 0 e 1
 * 
 * @param {number} x - Valor de entrada
 * @returns {number} Valor entre 0 e 1 calculado pela fórmula: 1 / (1 + e^(-x))
 */
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Função de ativação Step (Degrau)
 * Retorna 0 se x <= 0.5, caso contrário retorna 1
 * 
 * @param {number} x - Valor de entrada
 * @returns {number} 0 ou 1 dependendo do limiar de 0.5
 */
function step(x) {
  if (x <= 0.5)
    return 0;
  return 1;
}
