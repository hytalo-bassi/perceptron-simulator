class Perceptron {
  constructor(features) {
    // propriedades padroes que necessitam ser definidas
    this.bias = 0;
    this.learningRate = 0.0001;

    this.updateFeatures(features);
  }

  updateFeatures({ weights, bias, learningRate, activationFunction }) {
    if (weights) this.weights = weights;
    if (bias) this.bias = bias;
    if (learningRate) this.learningRate = learningRate;
    if (activationFunction) this.activationFunction = activationFunction;
  }

  output(...X) {
    const res = this.predict(...X);
    if (this.activationFunction) {
      return this.activationFunction(res);
    }

    return res;
  }

  predict(...X) {
    return X.map((_, i) => X[i] * this.weights[i]).reduce((m, n) => m + n) + this.bias;
  }

  train(X, y) {
    const res = this.output(...X);
    const error = y - res

    for (i = 0; i < X.length; i++)
      this.weights[i] += this.learningRate * error * X[i];

    this.bias += this.learningRate * error;
  }

  train(X, y, epochs = 1000) {
    for (let epoch = 0; epoch < epochs; epoch++) {
      for (let i = 0; i < X.length; i++) {
        const prediction = this.output(X[i]);
        const error = y[i] - prediction;

        this.weights[i] += this.learningRate * error * X[i];
        this.bias += this.learningRate * error;
      }
    }
  }

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

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function step(x) {
  if (x <= 0.5)
    return 0;
  return 1;
}
