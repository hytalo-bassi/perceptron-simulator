# Visualizador Interativo de Perceptron

## Sobre o Projeto

Este projeto apresenta uma visualização interativa e dinâmica de um perceptron, a unidade fundamental das redes neurais artificiais. Através de uma interface gráfica intuitiva, os usuários podem observar em tempo real como um perceptron processa entradas, aplica pesos e bias, e gera uma saída.

O sistema permite ajustar valores de entrada dinamicamente e visualizar graficamente o fluxo de informação através do neurônio artificial, facilitando a compreensão do funcionamento básico de aprendizado de máquina.

## Importância

O perceptron, proposto por Frank Rosenblatt em 1958, representa um dos conceitos fundamentais da inteligência artificial e do aprendizado de máquina. Compreender seu funcionamento é essencial para:

- **Fundação do aprendizado profundo**: O perceptron é o bloco construtor das redes neurais modernas
- **Intuição matemática**: Demonstra como operações matemáticas simples (soma ponderada e função de ativação) podem criar comportamento inteligente
- **Educação em IA**: Oferece uma ponte entre teoria e prática para estudantes de ciência da computação e áreas relacionadas
- **Desmistificação da IA**: Torna conceitos abstratos tangíveis através de visualização interativa

Este visualizador serve como ferramenta pedagógica para facilitar o entendimento desses conceitos de forma prática e visual.

## Tecnologias Utilizadas

- **HTML5**: Estrutura da página web
- **CSS3**: Estilização e layout responsivo
- **JavaScript**: Lógica de interação e cálculos
- **p5.js**: Biblioteca para visualização gráfica e interatividade

## Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para carregar a biblioteca p5.js via CDN)

Não é necessário instalar nenhum software adicional ou dependências.

## Como Executar

### Método 1: Execução Local

1. Clone ou baixe este repositório:
```bash
git clone https://github.com/hytalo-bassi/perceptron-simulator.git
cd perceptron-simulator
```

2. Abra o arquivo `index.html` diretamente no seu navegador:
   - **Windows**: Clique duas vezes no arquivo ou arraste para o navegador
   - **Mac/Linux**: Clique duas vezes ou use o comando `open index.html`

3. Interaja com os controles para ajustar as entradas e observe o comportamento do perceptron

### Método 2: Servidor Local (Recomendado)

Para melhor experiência, utilize um servidor HTTP local:

**Usando Python 3:**
```bash
cd perceptron-simulator     # deve estar dentro da pasta do projeto
python -m http.server 8000
```

Acesse `http://localhost:8000` no navegador.

## Estrutura do Projeto

```
perceptron-simulator/
│
├── index.html          # Página principal
├── style.css           # Estilos visuais
├── sketch.js           # Lógica do p5.js e visualização
└── perceptron.js       # Classe do perceptron
```

## Como Usar

1. **Ajuste as entradas**: Use os controles interativos (sliders ou campos) para modificar os valores de entrada
2. **Observe os pesos**: Visualize graficamente como cada peso influencia o resultado
3. **Analise o bias**: Veja como o bias desloca a função de decisão
4. **Veja a saída**: Observe o resultado calculado pelo perceptron em tempo real

## Funcionamento do Perceptron

O perceptron calcula sua saída através da seguinte fórmula:

```
saída = f(Σ(xi × wi) + b)
```

Onde:
- `xi` = valores de entrada
- `wi` = pesos correspondentes
- `b` = bias (viés)
- `f` = função de ativação (geralmente step function ou sigmoid)

## Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## Contato

Para dúvidas, sugestões ou feedback, abra uma issue no repositório.

---

**Desenvolvido com fins educacionais**
