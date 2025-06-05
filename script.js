document.getElementById('mostrarMapa').addEventListener('click', () => {
  const divMapa = document.getElementById('mapa');
  divMapa.style.display = 'block';

  if (!window.mapa) {
    window.mapa = L.map('mapa').setView([-23.55052, -46.63331], 13); // São Paulo
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(window.mapa);
  } else {
    window.mapa.invalidateSize(); // corrige erro se o mapa for reexibido
  }
});
