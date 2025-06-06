window.onload = () => {
  const mapa = L.map('mapa').setView([-23.561414, -46.655881], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapa);
};
