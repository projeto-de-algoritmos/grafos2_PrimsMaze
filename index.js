let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

var maze = [
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];




function prims() {
  var toBeExplored = [];

  var start = [0, 0];
  toBeExplored.push(start);

  while(toBeExplored.length > 0) {
    let currentNode = toBeExplored.shift();

    let neighbors = getNeighbors(currentNode[0], currentNode[1]);
    let randomIndex = Math.floor(Math.random() * 4); 
    maze[neighbors[randomIndex][0]][neighbors[randomIndex][1]] = 0;

    neighbors = neighbors.slice(randomIndex, 1);


    neighbors.map(neighbor => toBeExplored.push(neighbor));

  }
  console.log(maze);
}

function getNeighbors(x, y){
  let queue = [];
  if(x - 1 > 0 && maze[x - 1][y] !== 0){
    queue.push([x - 1, y]);
  }
  if(y - 1 > 0 && maze[x][y - 1] !== 0){
    queue.push([x, y - 1]);
  }
  if(x + 1 < 10 && maze[x + 1][y] !== 0){
    queue.push([x + 1, y]);
  }
  if(y + 1 < 10  && maze[x][y + 1] !== 0){
    queue.push([x, y + 1]);
  }

  return queue;
}

prims();

function drawMaze(maze){
  for (i = 0; i < maze.length; i++){
    for (j = 0; j < maze[i].length; j++){
      if(i === 9 && j === 9){
        context.beginPath();
        context.fillStyle = '#FF0000';
        context.fillRect(j * 50, i * 50, 50, 50);
      } else {
        if (maze[i][j] === 1) {
          context.beginPath();
          context.fillStyle = '#000000';
          context.fillRect(j * 50, i * 50, 50, 50);
        }
      }
    }
  }
}

// Player Functionality

function drawPlayer(player){
  context.clearRect(player.x * 50, player.y * 50, 50, 50);

  context.beginPath();
  context.fillStyle = '#00FF00';
  context.fillRect(player.nextX * 50, player.nextY * 50, 50, 50);

  player.x = player.nextX;
  player.y = player.nextY;

  if (player.x === 9 && player.y === 9){
    alert('Ganhou!');
  }
}

var player = {
  x: 0,
  y: 0,
  nextX: 0,
  nextY: 0
};

window.onkeydown = function(e){
  if(e.key === "ArrowLeft"){
    if(player.x !== 0) {
      player.nextX -= 1;
      if(maze[player.nextY][player.nextX] !== 1){
        drawPlayer(player);
      } else {
        player.nextX += 1;
      } 
    }
  }
  if(e.key === "ArrowUp"){
    if(player.y !== 0) {
      player.nextY -= 1;
      if(maze[player.nextY][player.nextX] !== 1){
        drawPlayer(player);
      } else {
        player.nextY += 1;
      } 
    }
  }
  if(e.key === "ArrowRight"){
    if(player.x !== 9) {
      player.nextX += 1;
      if(maze[player.nextY][player.nextX] !== 1){
        drawPlayer(player);
      } else {
        player.nextX -= 1;
      } 
    }
  }
  if(e.key === "ArrowDown"){
    if(player.y !== 9) {
      player.nextY += 1;
      if(maze[player.nextY][player.nextX] !== 1){
        drawPlayer(player);
      } else {
        player.nextY -= 1;
      } 
    }
  } 
}

// Initialize the game

window.onload = function() {
  // drawMaze(maze);
  // drawPlayer(player);
}

