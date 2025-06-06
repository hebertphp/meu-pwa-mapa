window.onload = () => {
  window.mapa = L.map('mapa').setView([-23.55052, -46.63331], 13); // São Paulo

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(window.mapa);
};
