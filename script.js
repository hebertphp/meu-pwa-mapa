// Corrigir o ícone padrão do marcador Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'libs/marker-icon-2x.png',
  iconUrl: 'libs/marker-icon.png',
  shadowUrl: 'libs/marker-shadow.png'
});



// Inicializa o mapa centralizado na Av. Paulista
const mapa = L.map('mapa').setView([-23.561684, -46.655981], 16); // Av. Paulista

// Adiciona camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// Variável global para o marcador
let marcadorUsuario = null;

// Botão para localizar o usuário
document.getElementById('btnLocalizacao').addEventListener('click', async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
      const resposta = await fetch(url);
      const dados = await resposta.json();
      const end = dados.address;

      const texto = `
        Latitude: ${lat.toFixed(5)}<br>
        Longitude: ${lng.toFixed(5)}<br>
        Rua: ${end.road || 'N/D'}<br>
        Bairro: ${end.suburb || end.neighbourhood || 'N/D'}<br>
        Cidade: ${end.city || end.town || end.village || 'N/D'}<br>
        Estado: ${end.state || 'N/D'}
      `;
      document.getElementById('info').innerHTML = texto;

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

    }, erro => {
      alert('Erro ao obter localização: ' + erro.message);
    });
  } else {
    alert('Geolocalização não suportada neste navegador.');
  }
});
