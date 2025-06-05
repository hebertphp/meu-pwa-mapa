document.getElementById('mostrarMapa').addEventListener('click', () => {
  const mapaDiv = document.getElementById('mapa');
  mapaDiv.style.display = 'block';

  if (!window.mapa) {
    window.mapa = L.map('mapa').setView([-23.55052, -46.63331], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(window.mapa);
  }
});
