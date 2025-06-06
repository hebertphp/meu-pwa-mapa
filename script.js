document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o mapa focado na Av. Paulista
  const mapa = L.map('mapa').setView([-23.561684, -46.655981], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapa);

  let marcadorUsuario = null;

  document.getElementById('btnLocalizacao').addEventListener('click', () => {
    if (!navigator.geolocation) {
      document.getElementById('saidaLocalizacao').textContent = 'Geolocalização não suportada.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        document.getElementById('saidaLocalizacao').textContent =
          `Latitude: ${lat.toFixed(6)}, Longitude: ${lon.toFixed(6)}`;

        // Move o mapa para a posição atual
        mapa.setView([lat, lon], 16);

        // Remove o marcador anterior, se houver
        if (marcadorUsuario) {
          mapa.removeLayer(marcadorUsuario);
        }

        // Adiciona marcador na posição atual
        marcadorUsuario = L.marker([lat, lon]).addTo(mapa)
          .bindPopup('Você está aqui!').openPopup();
      },
      (error) => {
        document.getElementById('saidaLocalizacao').textContent = 'Erro ao obter localização.';
      }
    );
  });
});
