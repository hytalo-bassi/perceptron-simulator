var perceptron1 = Perceptron.create({ n: 2, activationFunction: null });

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent('canvas-container');
  
  // Inicializar valores
  updateValues();
  
  // Event listeners
  document.getElementById('x1').addEventListener('input', updateValues);
  document.getElementById('x2').addEventListener('input', updateValues);
  document.getElementById('w1').addEventListener('input', updateValues);
  document.getElementById('w2').addEventListener('input', updateValues);
  document.getElementById('b').addEventListener('input', updateValues);
}

function draw() {
  background(248, 249, 250);
  
  // Calcular posições
  let inputX = 150;
  let neuronX = 400;
  let outputX = 650;
  let y1 = 120;
  let y2 = 280;
  let neuronY = 200;

  // Desenhar conexões com espessura baseada no peso
  strokeWeight(abs(w1 * 3));
  stroke(w1 > 0 ? color(102, 126, 234) : color(234, 102, 102));
  line(inputX, y1, neuronX, neuronY);
  
  strokeWeight(abs(w2 * 3));
  stroke(w2 > 0 ? color(102, 126, 234) : color(234, 102, 102));
  line(inputX, y2, neuronX, neuronY);
  
  // Conexão do neurônio para saída
  strokeWeight(4);
  stroke(output > 0 ? color(76, 175, 80) : color(244, 67, 54));
  line(neuronX, neuronY, outputX, neuronY);
  
  // Desenhar nós de entrada
  drawNode(inputX, y1, 40, x1, 'X₁');
  drawNode(inputX, y2, 40, x2, 'X₂');
  
  // Desenhar neurônio
  drawNeuron(neuronX, neuronY, 80);
  
  // Desenhar nó de saída
  drawOutputNode(outputX, neuronY, 50, output);
  
  // Desenhar labels dos pesos
  drawWeightLabel(inputX + 80, y1 - 30, w1, 'W₁');
  drawWeightLabel(inputX + 80, y2 + 30, w2, 'W₂');
  
  // Desenhar bias no neurônio
  fill(118, 75, 162);
  noStroke();
  textSize(14);
  textAlign(CENTER);
  text('b = ' + bias.toFixed(1), neuronX, neuronY + 60);
}

function drawNode(x, y, size, value, label) {
    // Cor baseada no valor
    let c = map(value, -1, 1, 0, 255);
    fill(c, 150, 255 - c);
    stroke(0);
    strokeWeight(2);
    circle(x, y, size);
    
    // Label
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(label, x, y - size/2 - 20);
    
    // Valor
    textSize(14);
    text(value.toFixed(1), x, y);
}

function drawNeuron(x, y, size) {
    // Gradiente
    for(let r = size; r > 0; r -= 2) {
        let alpha = map(r, 0, size, 255, 100);
        fill(102, 126, 234, alpha);
        noStroke();
        circle(x, y, r);
    }
    
    // Borda
    noFill();
    stroke(0);
    strokeWeight(3);
    circle(x, y, size);
    
    // Símbolo sigma
    fill(255);
    noStroke();
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Σ', x, y - 5);
    
    // Label
    fill(0);
    textSize(16);
    text('Perceptron', x, y - size/2 - 20);
}

function drawOutputNode(x, y, size, value) {
    // Cor baseada na saída
    if(value > 0) {
        fill(76, 175, 80);
    } else {
        fill(244, 67, 54);
    }
    stroke(0);
    strokeWeight(2);
    circle(x, y, size);
    
    // Label
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text('Saída', x, y - size/2 - 20);
    
    // Valor
    fill(255);
    textSize(14);
    text(value.toFixed(2), x, y);
}

function drawWeightLabel(x, y, weight, label) {
    fill(255, 255, 255, 200);
    stroke(0);
    strokeWeight(1);
    rect(x - 30, y - 12, 60, 24, 5);
    
    fill(0);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(label + ': ' + weight.toFixed(1), x, y);
}

function updateValues() {
  // Ler valores dos sliders
  x1 = parseFloat(document.getElementById('x1').value);
  x2 = parseFloat(document.getElementById('x2').value);
  w1 = parseFloat(document.getElementById('w1').value);
  w2 = parseFloat(document.getElementById('w2').value);
  bias = parseFloat(document.getElementById('b').value);
  
  // Atualizar displays
  document.getElementById('x1-value').textContent = x1.toFixed(1);
  document.getElementById('x2-value').textContent = x2.toFixed(1);
  document.getElementById('w1-value').textContent = w1.toFixed(1);
  document.getElementById('w2-value').textContent = w2.toFixed(1);
  document.getElementById('b-value').textContent = bias.toFixed(1);
  
  perceptron1.updateFeatures({
    weights: [w1, w2],
    bias
  })

  // Calcular saída
  output = perceptron1.output(x1, x2);
}

