let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

var map = [
  [0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
];

function drawMap(map){
  for (i = 0; i < map.length; i++){
    for (j = 0; j < map[i].length; j++){
      if(i === 9 && j === 9){
        context.beginPath();
        context.fillStyle = '#FF0000';
        context.fillRect(j * 50, i * 50, 50, 50);
      } else {
        if (map[i][j] === 1) {
          context.beginPath();
          context.fillStyle = '#000000';
          context.fillRect(j * 50, i * 50, 50, 50);
        }
      }
    }
  }
}

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

// function animate(x, y) {
//   requestAnimationFrame(animate);
//   context.clearRect(x, y, 50, 50);

//   context.beginPath();
//   context.fillStyle = '#00FF00';
//   context.fillRect(player.x, player.y, 50, 50);
// }
// animate(50, 100);

window.onkeydown = function(e){
  if(e.key === "ArrowLeft"){
    if(player.x !== 0) {
      player.nextX -= 1;
      if(map[player.nextY][player.nextX] !== 1){
        drawPlayer(player);
      } else {
        player.nextX += 1;
      } 
    }
  }
  if(e.key === "ArrowUp"){
    if(player.y !== 0) {
      player.nextY -= 1;
      if(map[player.nextY][player.nextX] !== 1){
        drawPlayer(player);
      } else {
        player.nextY += 1;
      } 
    }
  }
  if(e.key === "ArrowRight"){
    if(player.x !== 9) {
      player.nextX += 1;
      if(map[player.nextY][player.nextX] !== 1){
        drawPlayer(player);
      } else {
        player.nextX -= 1;
      } 
    }
  }
  if(e.key === "ArrowDown"){
    if(player.y !== 9) {
      player.nextY += 1;
      if(map[player.nextY][player.nextX] !== 1){
        drawPlayer(player);
      } else {
        player.nextY -= 1;
      } 
    }
  } 
}

window.onload = function() {
  drawMap(map);
  drawPlayer(player);
}

