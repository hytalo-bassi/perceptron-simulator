var perceptron1 = Perceptron.create({ n: 2, activationFunction: null });

function drawText({p, label, x, y, fill = 0, textSize = 16, noStroke = false, alignX = p.CENTER, alignY = p.CENTER }) {
  p.fill(fill);
  if (noStroke) p.noStroke();
  p.textSize(textSize);
  p.textAlign(alignX, alignY);
  p.text(label, x, y);
}

function drawNode(p, x, y, size, value, label) {
    let c = p.map(value, -1, 1, 0, 255);
    p.fill(c, 150, 255 - c);
    p.stroke(0);
    p.strokeWeight(2);
    p.circle(x, y, size);
    
    drawText({ p, label, x, y: y - size/2 - 20, noStroke: true });
    
    drawText({ p, label: value.toFixed(1), x, y, textSize: 14 });
}

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

function drawWeightLabel(p, x, y, weight, label) {
    p.fill(255, 255, 255, 200);
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(x - 30, y - 12, 60, 24, 5);
    
    drawText({ p, label: `${label}: ${weight.toFixed(1)}`, x, y, textSize: 12, noStroke: true });
}

function getVal(id) {
  return parseFloat(document.getElementById(id).value);
}

function sketch1(p) {
  let perceptron = Perceptron.create({ n: 2, activationFunction: null });
  let x1;
  let x2;
  let output;

  p.setup = function () {
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

new p5(sketch1);
