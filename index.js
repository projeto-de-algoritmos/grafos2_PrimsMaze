let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const height = 500;
const width = 770;

var aLoopSize = 11, bLoopSize = 17;
var u = 10, v = 16, size = 23;

var maze = [];
var safe = [];
var mst = [];

class Node {
  constructor(x, y, size, value){
    this.x = x * 2 * size;
    this.y = y * 2 * size;
    this.size = size;
    this.value = value;

    this.isInMST = false;
    this.path = false;
    this.currentNode = false;
    this.goal = false;
    this.edges = [];

    this.draw = this.draw;
  }

  draw() {
    if(this.isInMST) {
      if(this.path || this.currentNode){
        context.fillStyle = "red";
      } 
      else if (this.goal){
        context.fillStyle = "green";
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
  for(var i = 0; i < aLoopSize; i++){
    maze[i] = [];
    for(var j = 0; j < bLoopSize; j++) {
      maze[i][j] = new Node(j, i, size, i * bLoopSize + j);
    }
  }

  // Adiciona paredes laterais
  for (var i = 0; i < aLoopSize; i++){
    for(var j = 0; j < bLoopSize - 1; j++){
      maze[i][j].edges[0] = new Edge(maze[i][j], maze[i][j + 1]);

      maze[i][j + 1].edges[2] = new Edge(maze[i][j + 1], maze[i][j], maze[i][j].edges[0]);
    }
  }

  // Adiciona paredes inferiores
  for (var i = 0; i < aLoopSize - 1; i++){
    for(var j = 0; j < bLoopSize; j++){
      maze[i][j].edges[1] = new Edge(maze[i][j], maze[i + 1][j]);

      maze[i + 1][j].edges[3] = new Edge(maze[i + 1][j], maze[i][j], maze[i][j].edges[1]);
    }
  }

  safe[0] = maze[0][0].edges[0];
  safe[1] = maze[0][0].edges[1];

  maze[0][0].isInMST = true;
  maze[0][0].currentNode = true;

  maze[4][4].goal = true;
  maze[4][4].draw();

  mst[0] = maze[0][0];
  mst[0].draw();

  while(true){
    prim();
  }
}

function prim() {
  var min = new Edge();

  for (var p = 0; p < safe.length; p++){
    if(safe[p].a.isInMST && safe[p].b.isInMST){
      safe.splice(p, 1);
    }

    if ((safe[p].weight < min.weight) && (!(safe[p].b.isInMST))){
      min = safe[p];
      if (min.weight === 0) {
        break;
      }
    }
  }

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
  min.minimal = true;

  min.b.draw();
  min.draw();

  mst[mst.length] = min;
  mst[mst.length] = min.b;
}


// Player Functionality

var playerPosition = [0, 0];

window.onkeydown = function(e){

  if(e.key === "ArrowLeft"){
    if (maze[playerPosition[0]][playerPosition[1] - 1].isInMST){
      maze[playerPosition[0]][playerPosition[1]].currentNode = false;
      maze[playerPosition[0]][playerPosition[1]].draw();

      playerPosition[1] -= 1;
      maze[playerPosition[0]][playerPosition[1]].currentNode = true;
      maze[playerPosition[0]][playerPosition[1]].draw();
    }    
  }
  if(e.key === "ArrowUp"){
    if (maze[playerPosition[0] - 1][playerPosition[1]].isInMST){
      maze[playerPosition[0]][playerPosition[1]].currentNode = false;
      maze[playerPosition[0]][playerPosition[1]].draw();

      playerPosition[0] -= 1;
      maze[playerPosition[0]][playerPosition[1]].currentNode = true;
      maze[playerPosition[0]][playerPosition[1]].draw();
    }
  }
  if(e.key === "ArrowRight"){
    if (maze[playerPosition[0]][playerPosition[1] + 1].isInMST){
      maze[playerPosition[0]][playerPosition[1]].currentNode = false;
      maze[playerPosition[0]][playerPosition[1]].draw();

      playerPosition[1] += 1;
      maze[playerPosition[0]][playerPosition[1]].currentNode = true;
      maze[playerPosition[0]][playerPosition[1]].draw();
    }
  }
  if(e.key === "ArrowDown"){
    if (maze[playerPosition[0] + 1][playerPosition[1]].isInMST){
      maze[playerPosition[0]][playerPosition[1]].currentNode = false;
      maze[playerPosition[0]][playerPosition[1]].draw();

      playerPosition[0] += 1;
      maze[playerPosition[0]][playerPosition[1]].currentNode = true;
      maze[playerPosition[0]][playerPosition[1]].draw();
    }
  } 
}

// Initialize the game

window.onload = function() {
  initialize();
}

