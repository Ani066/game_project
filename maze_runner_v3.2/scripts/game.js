// Simple Maze Runner game logic (keyboard controls only)
function qs(name){ const p=new URLSearchParams(location.search); return p.get(name); }
let levelIndex = Math.max(1, parseInt(qs('level')||'1',10));
let maze = null, cellSize=0, player={x:1,y:1,lives:3,score:0}, timer=null, timeCounter=0;

function startLevel(index){
  levelIndex = index;
  const size = 7 + Math.floor((index-1)/3)*2;
  maze = generateMaze(size);
  maze[1][1]=0; maze[size-2][size-2]=0;
  player = {x:1,y:1,lives: Math.max(3 - Math.floor(index/8),1), score:0};
  timeCounter = 0;
  cellSize = document.getElementById('gameCanvas').width / maze.length;
  draw();
  if(timer) clearInterval(timer);
  timer = setInterval(()=>{ timeCounter++; document.getElementById('time').textContent = timeCounter + 's'; },1000);
}

function generateMaze(size){
  if(size%2===0) size++;
  const w=size,h=size;
  const m = Array.from({length:h}, ()=> Array.from({length:w}, ()=>1));
  function carve(x,y){
    m[y][x]=0;
    const dirs = [[0,-2],[2,0],[0,2],[-2,0]].sort(()=>Math.random()-0.5);
    for(const [dx,dy] of dirs){
      const nx=x+dx, ny=y+dy;
      if(nx>0 && ny>0 && nx<w-1 && ny<h-1 && m[ny][nx]===1){
        m[y+dy/2][x+dx/2]=0;
        carve(nx,ny);
      }
    }
  }
  carve(1,1); return m;
}

function draw(){
  const canvas = document.getElementById('gameCanvas'); const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const N = maze.length; const cell = canvas.width / N;
  for(let y=0;y<N;y++){ for(let x=0;x<N;x++){ if(maze[y][x]===1){ ctx.fillStyle='#0b1220'; ctx.fillRect(x*cell,y*cell,cell,cell); } else { ctx.fillStyle='#cbd5e1'; ctx.globalAlpha=0.06; ctx.fillRect(x*cell,y*cell,cell,cell); ctx.globalAlpha=1; } } }
  ctx.fillStyle='#34d399'; ctx.fillRect((N-2)*cell,(N-2)*cell,cell,cell);
  ctx.beginPath(); ctx.fillStyle='#3b82f6'; ctx.arc(player.x*cell+cell/2, player.y*cell+cell/2, cell*0.3,0,Math.PI*2); ctx.fill();
  document.getElementById('lives').textContent = player.lives;
  document.getElementById('score').textContent = player.score;
}

function canMove(nx,ny){ if(!maze[ny] || typeof maze[ny][nx] === 'undefined') return false; if(maze[ny][nx]===1) return false; return true; }
function move(dir){
  let nx=player.x, ny=player.y;
  if(dir==='up') ny--; if(dir==='down') ny++; if(dir==='left') nx--; if(dir==='right') nx++;
  if(!canMove(nx,ny)) return;
  player.x=nx; player.y=ny; draw();
  if(player.x === maze.length-2 && player.y === maze.length-2){
    // cleared
    player.score += Math.max(100 - timeCounter*2, 10);
    localStorage.setItem('mr_best_v3', Math.max(parseInt(localStorage.getItem('mr_best_v3')||'0',10), player.score));
    showInterstitialAd({onClose: ()=>{
      const unlockedNow = Math.max(parseInt(localStorage.getItem('mr_unlocked_v3')||'1',10), levelIndex+1);
      localStorage.setItem('mr_unlocked_v3', unlockedNow);
      alert('Level cleared! Score: ' + player.score);
      window.location.href = 'levels.html';
    }});
  }
}

document.addEventListener('keydown', (e)=>{
  const tag = document.activeElement && document.activeElement.tagName.toLowerCase();
  if(tag === 'input' || tag === 'textarea') return;
  if(e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') move('up');
  if(e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') move('down');
  if(e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') move('left');
  if(e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') move('right');
});
