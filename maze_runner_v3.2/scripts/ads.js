// Ad placeholders - replace these with real ad SDK calls when ready
function showBannerAd(){ const b = document.getElementById('banner'); if(b) b.style.display = 'block'; }
function hideBannerAd(){ const b = document.getElementById('banner'); if(b) b.style.display = 'none'; }

function showInterstitialAd(opts){ opts = opts || {}; const modal = document.getElementById('adModal'); if(!modal){ if(opts.onClose) opts.onClose(); return; }
  document.getElementById('adTitle').textContent = 'Interstitial Ad (placeholder)'; modal.style.display = 'flex';
  let t = 3; document.getElementById('adTime').textContent = t; document.getElementById('closeAd').disabled = true;
  const iv = setInterval(()=>{ t--; document.getElementById('adTime').textContent = t; if(t<=0){ clearInterval(iv); document.getElementById('closeAd').disabled=false; document.getElementById('closeAd').textContent='Close Ad'; } },1000);
  document.getElementById('closeAd').onclick = ()=>{ modal.style.display='none'; document.getElementById('closeAd').disabled=true; document.getElementById('closeAd').textContent='Close'; if(opts.onClose) opts.onClose(); };
}

function showRewardedAd(opts){ opts = opts || {}; const modal = document.getElementById('adModal'); if(!modal){ if(opts.onComplete) opts.onComplete(); return; }
  document.getElementById('adTitle').textContent = 'Rewarded Ad (placeholder)'; modal.style.display = 'flex';
  let t = 5; document.getElementById('adTime').textContent = t; document.getElementById('closeAd').disabled = true;
  const iv = setInterval(()=>{ t--; document.getElementById('adTime').textContent = t; if(t<=0){ clearInterval(iv); document.getElementById('closeAd').disabled=false; document.getElementById('closeAd').textContent='Claim Reward'; } },1000);
  document.getElementById('closeAd').onclick = ()=>{ modal.style.display='none'; document.getElementById('closeAd').disabled=true; document.getElementById('closeAd').textContent='Close'; if(opts.onComplete) opts.onComplete(); };
}
