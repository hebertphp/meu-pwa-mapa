// Inicializa o mapa centralizado na Av. Paulista
const mapa = L.map('mapa').setView([-23.561684, -46.655981], 16); // Av. Paulista

// Adiciona camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// Variável global para o marcador
let marcadorUsuario = null;

// Botão para localizar o usuário
document.getElementById('btnLocalizar').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // Atualiza texto da posição
      document.getElementById('info').innerHTML =
        `Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`;

      // Move o mapa para a posição atual
      mapa.setView([lat, lng], 16);

      // Remove marcador anterior (se existir)
      if (marcadorUsuario) {
        mapa.removeLayer(marcadorUsuario);
      }

      // Cria novo marcador com popup
      marcadorUsuario = L.marker([lat, lng])
        .addTo(mapa)
        .bindPopup('📍 Você está aqui!')
        .openPopup();

    }, err => {
      console.error('Erro ao obter localização:', err);
      document.getElementById('info').innerText = 'Não foi possível obter sua localização.';
    });
  } else {
    alert('Geolocalização não suportada pelo navegador.');
  }
});
