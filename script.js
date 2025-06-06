window.onload = () => {
  window.mapa = L.map('mapa').setView([-23.561414, -46.655881], 15); // zoom 15 para detalhe da Av. Paulista

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(window.mapa);
};
