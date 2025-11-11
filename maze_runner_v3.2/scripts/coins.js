// Simple coin helpers
function addCoins(n){ const key='mr_coins_v3'; let c = parseInt(localStorage.getItem(key) || '0',10); c += n; localStorage.setItem(key, c); updateCoinsUI(); }
function updateCoinsUI(){ const v = localStorage.getItem('mr_coins_v3') || '0'; const el = document.getElementById('coins'); if(el) el.textContent = v; const el2 = document.getElementById('coinsLabel'); if(el2) el2.textContent = v; }
window.addEventListener('load', updateCoinsUI);
