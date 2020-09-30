let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let map= [
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
      if (map[i][j] === 1) {
        context.beginPath();
        context.fillStyle = '#000000';
        context.fillRect(j * 50, i * 50, 50, 50);
      }
    }
  }
}


window.onload = function() {
  drawMap(map);
}