/**
 * Constante que define o intervalo de tempo (em milissegundos) entre cada iteração de treinamento
 * @constant {number}
 */
const TRAINING_INTERVAL_MS = 5;

/**
 * Instância global do Perceptron com 2 entradas e sem função de ativação
 * @type {Perceptron}
 */
var perceptron1 = Perceptron.create({ n: 2, activationFunction: null });

/**
 * Desenha texto no canvas com configurações personalizáveis
 * 
 * @param {Object} config - Objeto de configuração do texto
 * @param {p5} config.p - Instância do p5.js
 * @param {string} config.label - Texto a ser exibido
 * @param {number} config.x - Posição X do texto
 * @param {number} config.y - Posição Y do texto
 * @param {number|string|p5.Color} [config.fill=0] - Cor de preenchimento do texto
 * @param {number} [config.textSize=16] - Tamanho da fonte
 * @param {boolean} [config.noStroke=false] - Se true, remove o contorno do texto
 * @param {number} [config.alignX=p.CENTER] - Alinhamento horizontal (p.LEFT, p.CENTER, p.RIGHT)
 * @param {number} [config.alignY=p.CENTER] - Alinhamento vertical (p.TOP, p.CENTER, p.BOTTOM)
 */
function drawText({p, label, x, y, fill = 0, textSize = 16, noStroke = false, alignX = p.CENTER, alignY = p.CENTER }) {
  p.fill(fill);
  if (noStroke) p.noStroke();
  p.textSize(textSize);
  p.textAlign(alignX, alignY);
  p.text(label, x, y);
}

/**
 * Desenha um nó de entrada com valor e rótulo
 * A cor do nó varia de acordo com o valor
 * 
 * @param {p5} p - Instância do p5.js
 * @param {number} x - Posição X do centro do nó
 * @param {number} y - Posição Y do centro do nó
 * @param {number} size - Diâmetro do círculo
 * @param {number} value - Valor numérico do nó (usado para coloração)
 * @param {string} label - Rótulo a ser exibido acima do nó
 */
function drawNode(p, x, y, size, value, label) {
    let c = p.map(value, -1, 1, 0, 255);
    p.fill(c, 150, 255 - c);
    p.stroke(0);
    p.strokeWeight(2);
    p.circle(x, y, size);
    
    drawText({ p, label, x, y: y - size/2 - 20, noStroke: true });
    
    drawText({ p, label: value.toFixed(1), x, y, textSize: 14 });
}

/**
 * Desenha o neurônio/perceptron com efeito de gradiente e símbolo de soma (Σ)
 * Representa visualmente a unidade de processamento neural
 * 
 * @param {p5} p - Instância do p5.js
 * @param {number} x - Posição X do centro do neurônio
 * @param {number} y - Posição Y do centro do neurônio
 * @param {number} size - Diâmetro do círculo do neurônio
 */
function drawNeuron(p, x, y, size) {
    // Gradiente
    for(let r = size; r > 0; r -= 2) {
        let alpha = p.map(r, 0, size, 255, 100);
        p.fill(102, 126, 234, alpha);
        p.noStroke();
        p.circle(x, y, r);
    }
    
    // Borda
    p.noFill();
    p.stroke(0);
    p.strokeWeight(3);
    p.circle(x, y, size);
    
    drawText({ p, label: 'Σ', x, y, textSize: 32, fill: 255, noStroke: true });
    
    drawText({ p, label: 'Perceptron', x, y: y - size/2 - 20 });
}

/**
 * Desenha o nó de saída com cor indicando o resultado
 * Verde para valores positivos, vermelho para valores negativos
 * 
 * @param {p5} p - Instância do p5.js
 * @param {number} x - Posição X do centro do nó
 * @param {number} y - Posição Y do centro do nó
 * @param {number} size - Diâmetro do círculo
 * @param {number} value - Valor de saída do perceptron
 */
function drawOutputNode(p, x, y, size, value) {
    // Cor baseada na saída
    if(value > 0) {
        p.fill(76, 175, 80);
    } else {
        p.fill(244, 67, 54);
    }
    p.stroke(0);
    p.strokeWeight(2);
    p.circle(x, y, size);
    
    drawText({ p, label: 'Saída', x, y: y - size/2 - 20, noStroke: true });
    
    drawText({ p, label: value.toFixed(2), x, y, fontSize: 14, fill: 255 });
}

/**
 * Desenha uma etiqueta com o valor do peso em um retângulo arredondado
 * 
 * @param {p5} p - Instância do p5.js
 * @param {number} x - Posição X do centro da etiqueta
 * @param {number} y - Posição Y do centro da etiqueta
 * @param {number} weight - Valor do peso a ser exibido
 * @param {string} label - Rótulo do peso (ex: 'W₁', 'W₂')
 */
function drawWeightLabel(p, x, y, weight, label) {
    p.fill(255, 255, 255, 200);
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(x - 30, y - 12, 60, 24, 5);
    
    drawText({ p, label: `${label}: ${weight.toFixed(1)}`, x, y, textSize: 12, noStroke: true });
}

/**
 * Obtém o valor numérico de um elemento HTML input pelo ID
 * 
 * @param {string} id - ID do elemento HTML
 * @returns {number} Valor numérico parseado do input
 */
function getVal(id) {
  return parseFloat(document.getElementById(id).value);
}

/**
 * Sketch 1: Visualização interativa de um Perceptron com 2 entradas
 * Permite ajustar manualmente as entradas (X₁, X₂), pesos (W₁, W₂) e bias através de sliders
 * Mostra visualmente como os valores fluem pela rede e produzem uma saída
 * 
 * @param {p5} p - Instância do p5.js no modo de instância
 */
function sketch1(p) {
  let perceptron = Perceptron.create({ n: 2, activationFunction: null });
  let x1;
  let x2;
  let output;

  /**
   * Função de configuração inicial do p5.js
   * Cria o canvas, inicializa valores e configura event listeners para os controles
   */
  p.setup = function () {

    /**
     * Atualiza os valores do perceptron com base nos inputs do usuário
     * Recalcula a saída sempre que algum valor muda
     */
    function updateValues() {
      x1 = getVal('p1-x1');
      x2 = getVal('p1-x2');
      let w1 = getVal('p1-w1');
      let w2 = getVal('p1-w2');
      let bias = getVal('p1-b');
        
      document.getElementById('p1-x1-value').textContent = x1.toFixed(1);
      document.getElementById('p1-x2-value').textContent = x2.toFixed(1);
      document.getElementById('p1-w1-value').textContent = w1.toFixed(1);
      document.getElementById('p1-w2-value').textContent = w2.toFixed(1);
      document.getElementById('p1-b-value').textContent = bias.toFixed(1);
        
      perceptron.updateFeatures({
        weights: [w1, w2],
        bias
      })
    
      // Calcular saída
      output = perceptron.output(x1, x2);
    }

    let canvas = p.createCanvas(800, 400);
    canvas.parent('canvas-container-1');
    
    // Inicializar valores
    updateValues();
    
    // Event listeners
    document.getElementById('p1-x1').addEventListener('input', updateValues);
    document.getElementById('p1-x2').addEventListener('input', updateValues);
    document.getElementById('p1-w1').addEventListener('input', updateValues);
    document.getElementById('p1-w2').addEventListener('input', updateValues);
    document.getElementById('p1-b').addEventListener('input', updateValues);
  }

  /**
   * Função de desenho contínuo do p5.js
   * Renderiza a visualização completa da rede neural incluindo:
   * - Nós de entrada (X₁, X₂)
   * - Conexões com pesos (W₁, W₂)
   * - Neurônio/Perceptron com bias
   * - Nó de saída
   */
  p.draw = function () {
    p.background(248, 249, 250);
    
    let inputX = 150;
    let neuronX = 400;
    let outputX = 650;
    let y1 = 120;
    let y2 = 280;
    let w1 = perceptron.weights[0];
    let w2 = perceptron.weights[1];
    let neuronY = 200;

    p.strokeWeight(p.abs(w1 * 3));
    p.stroke(w1 > 0 ? p.color(102, 126, 234) : p.color(234, 102, 102));
    p.line(inputX, y1, neuronX, neuronY);
    
    p.strokeWeight(p.abs(w2 * 3));
    p.stroke(w2 > 0 ? p.color(102, 126, 234) : p.color(234, 102, 102));
    p.line(inputX, y2, neuronX, neuronY);
    
    p.strokeWeight(4);
    p.stroke(output > 0 ? p.color(76, 175, 80) : p.color(244, 67, 54));
    p.line(neuronX, neuronY, outputX, neuronY);
    
    drawNode(p, inputX, y1, 40, x1, 'X₁');
    drawNode(p, inputX, y2, 40, x2, 'X₂');
    
    drawNeuron(p,neuronX, neuronY, 80);
    
    drawOutputNode(p, outputX, neuronY, 50, output);
    
    drawWeightLabel(p, inputX + 80, y1 - 30, w1, 'W₁');
    drawWeightLabel(p, inputX + 80, y2 + 30, w2, 'W₂');
    
    p.fill(118, 75, 162);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER);
    p.text('b = ' + perceptron.bias.toFixed(1), neuronX, neuronY + 60);
  }
}

/**
 * Sketch 2: Visualização de treinamento automático do Perceptron
 * Demonstra o aprendizado do perceptron através de exemplos de treinamento
 * Permite iniciar/parar o treinamento e observar a evolução dos pesos e bias
 * 
 * @param {p5} p - Instância do p5.js no modo de instância
 */
function sketch2(p) {
  let perceptron = Perceptron.create({ n: 1, activationFunction: null, learningRate: 0.001 });
  let x1;
  let x2;
  let y1;
  let y2;
  let output;
  let training = false;
  let epoch = 0;

  /**
   * Função de configuração inicial do p5.js
   * Configura o loop de treinamento, canvas e event listeners
   */
  p.setup = function () {
      /**
       * Intervalo de treinamento que executa a cada TRAINING_INTERVAL_MS
       * Treina o perceptron com dois exemplos (x1->y1 e x2->y2)
       * Incrementa o contador de épocas e atualiza a saída
       */
      setInterval(function () {
        if (!training) return;
        perceptron.train([x1], y1);
        perceptron.train([x2], y2);
        
        epoch++;
        output = perceptron.output(x1);
      }, TRAINING_INTERVAL_MS);

    /**
     * Atualiza os valores das entradas e saídas desejadas
     * Recalcula a saída atual do perceptron
     */
    function updateValues() {
      x1 = getVal('p2-x1');
      x2 = getVal('p2-x2');
      y1 = getVal('p2-y1');
      y2 = getVal('p2-y2');

      document.getElementById('p2-x1-value').textContent = x1.toFixed(1);
      // document.getElementById('p2-x2-value').textContent = x2.toFixed(1);
      document.getElementById('p2-y1-value').textContent = y1.toFixed(1);
      document.getElementById('p2-y2-value').textContent = y2.toFixed(1);
        
      output = perceptron.output(x1);
    }

    let canvas = p.createCanvas(800, 400);
    canvas.parent('canvas-container-2');
    
    updateValues();
    
    // Event listeners
    document.getElementById('p2-x1').addEventListener('input', updateValues);
    document.getElementById('p2-x2').addEventListener('input', updateValues);
    document.getElementById('p2-y1').addEventListener('input', updateValues);
    document.getElementById('p2-y2').addEventListener('input', updateValues);

    document.getElementById('start-training').addEventListener('click', function () {
      training = true;
    });
    document.getElementById('stop-training').addEventListener('click', function () {
      training = false;
    });
  }

  /**
   * Função de desenho contínuo do p5.js
   * Renderiza a visualização da rede neural durante o treinamento:
   * - Contador de épocas
   * - Nó de entrada (X₁)
   * - Conexão com peso (W₁)
   * - Neurônio/Perceptron com bias
   * - Nó de saída
   */
  p.draw = function () {
    p.background(248, 249, 250);
    
    let inputX = 150;
    let neuronX = 400;
    let outputX = 650;
    let w1 = perceptron.weights[0];

    let neuronY = 200;

    drawText({ p, label: `Época ${epoch}`, x: 400, y: 20 });

    p.strokeWeight(p.abs(w1 * 3));
    p.stroke(w1 > 0 ? p.color(102, 126, 234) : p.color(234, 102, 102));
    p.line(inputX, neuronY, neuronX, neuronY);
    
    p.strokeWeight(4);
    p.stroke(output > 0 ? p.color(76, 175, 80) : p.color(244, 67, 54));
    p.line(neuronX, neuronY, outputX, neuronY);
    
    drawNode(p, inputX, neuronY, 40, x1, 'X₁');
    
    drawNeuron(p, neuronX, neuronY, 80);
    
    drawOutputNode(p, outputX, neuronY, 50, output);
    
    drawWeightLabel(p, inputX + 80, neuronY - 30, w1, 'W₁');
    
    p.fill(118, 75, 162);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER);
    p.text('b = ' + perceptron.bias.toFixed(1), neuronX, neuronY + 60);
  }
}

new p5(sketch1);
new p5(sketch2);
