let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const height = 500;
const width = 770;

var aLoopSize = 11, bLoopSize = 17;
var u = 10, v = 16, size = 23;
var timer, count = 0, speed = 33, running = false;

var maze = [];
var safe = [];
var prev = [];
var mst = [];

class Node {
  constructor(x, y, size, position){
    this.x = x * 2 * size;
    this.y = y * 2 * size;
    this.size = size;
    this.position = position; 

    this.isInMST = false;
    this.path = false;
    this.currentNode = false;
    this.edges = [];

    this.draw = this.draw;
  }

  draw() {
    if(this.isInMST) {
      if(this.path || this.currentNode){
        context.fillStyle = "red";
      } 
      else {
        context.fillStyle = "white";
      }
      context.fillRect(this.x, this.y, this.size, this.size);
    }
  }
}

class Edge {
  constructor(nodeA, nodeB, edge){
    this.a;
    this.b;
    this.weight;
    this.minimal = false;

    if(nodeA === undefined && nodeB === undefined && edge === undefined){
      this.weight = Infinity;
    }

    else if (edge === undefined) {
      this.weight = Math.round(Math.random());
      this.a = nodeA;
      this.b = nodeB;
    }
    
    else {
      this.weight = edge.weight;
      this.a = nodeA;
      this.b = nodeB;
    }
  
    this.draw = this.draw;
  }
  
  draw(){
    if (this.minimal) {
      var size = this.a.size;

      if(this.a.path && this.b.path) {
        context.fillStyle = "red"
      } else {
        context.fillStyle = "white";
      }
      context.fillRect((this.a.x + this.b.x) / 2, (this.a.y + this.b.y) / 2, size, size);
    }
  }
}

function initialize(){
  //Adiciona os nós ao array
  for(var i = 0; i < aLoopSize; i++){
    maze[i] = [];
    for(var j = 0; j < bLoopSize; j++) {
      maze[i][j] = new Node(j, i, size, i * bLoopSize + j);
    }
  }

  // Adiciona paredes laterais para cada nó
  for (var i = 0; i < aLoopSize; i++){
    for(var j = 0; j < bLoopSize - 1; j++){
      maze[i][j].edges[0] = new Edge(maze[i][j], maze[i][j + 1]);

      maze[i][j + 1].edges[2] = new Edge(maze[i][j + 1], maze[i][j], maze[i][j].edges[0]);
    }
  }

  // Adiciona paredes verticais para cada nó
  for (var i = 0; i < aLoopSize - 1; i++){
    for(var j = 0; j < bLoopSize; j++){
      maze[i][j].edges[1] = new Edge(maze[i][j], maze[i + 1][j]);

      maze[i + 1][j].edges[3] = new Edge(maze[i + 1][j], maze[i][j], maze[i][j].edges[1]);
    }
  }

  //Adiciona o primeiro nó como sendo da árvore geradora mínima.
  prev[0] = maze[0][0];

  safe[0] = maze[0][0].edges[0];
  safe[1] = maze[0][0].edges[1];

  maze[0][0].isInMST = true;
  maze[0][0].path = true;

  mst[0] = maze[0][0];
  mst[0].draw();
}

function prim() {
  var min = new Edge();

  // a cada execução, o novo nó selecionado é colorido de vermelho.
  // assim que a função é executada novamente, o nó anterior é pintado de branco.
  var lastNode = mst[mst.length - 1];
  lastNode.currentNode = false;
  lastNode.draw();

  // Verifica todos as laterais do nó e compara os pesos de cada uma e se ela 
  // não leva para um nó que já faz parte da árvore geradora mínima.
  for (var p = 0; p < safe.length; p++){
    if ((safe[p].weight < min.weight) && (!(safe[p].b.isInMST))){
      min = safe[p];
      if (min.weight === 0) {
        break;
      }
    }
  }

  // Todas as laterais do nó selecionado são adicionadas de forma crescente de peso.

  for(var i = 0; i < 4; i++){
    if(min.b.edges[i] !== undefined && !(min.b.edges[i].b.isInMST)) {
      if(min.b.edges[i].weight > 0) {
        safe[safe.length] = min.b.edges[i];
      } else{
        safe.splice(0, 0, min.b.edges[i]);
      }
    }
  }

  min.b.isInMST = true;
  min.b.currentNode = true;
  min.minimal = true;

  min.b.draw();
  min.draw();

  mst[mst.length] = min;
  mst[mst.length] = min.b;

  prev[min.b.position] = min.a;

  // Verifica se o algoritmo já terminou a execução
  count += 1;
  if (count === (aLoopSize * bLoopSize) - 1) {
    min.b.currentNode = false;
    min.b.draw();
    clearInterval(timer);
  }
}

// Mostra o caminho do primeiro nó até o último no canto direito inferior
function showPath() {
  var n = maze[u][v];
  while(prev[n.position].position !== n.position) {
    n.path = true;
    n = prev[n.position];
  }
  maze[0][0].path = true;
  drawPath();
}

function drawPath() {
  for (var i = 0; i < mst.length; i++) {
    mst[i].draw();
  }
}

// Inicia o gerador de labirinto

function startExec(){
  initialize();

  running = true;
  timer = setInterval(function(){
    prim();
  }, speed);
}

