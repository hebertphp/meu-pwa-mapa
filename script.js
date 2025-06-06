// Inicia o mapa na Av. Paulista
const mapa = L.map('mapa').setView([-23.561684, -46.655981], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

let marcador = null;

document.getElementById('btnLocalizacao').addEventListener('click', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      mapa.setView([lat, lon], 16);

      if (marcador) {
        marcador.setLatLng([lat, lon]);
      } else {
        marcador = L.marker([lat, lon]).addTo(mapa);
      }

      // Requisição para obter nome da rua, cidade etc
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const resposta = await fetch(url);
      const dados = await resposta.json();
      const end = dados.address;

      const texto = `
        Latitude: ${lat.toFixed(5)}<br>
        Longitude: ${lon.toFixed(5)}<br>
        Rua: ${end.road || 'N/D'}<br>
        Bairro: ${end.suburb || end.neighbourhood || 'N/D'}<br>
        Cidade: ${end.city || end.town || end.village || 'N/D'}<br>
        Estado: ${end.state || 'N/D'}
      `;
      document.getElementById('info').innerHTML = texto;
    }, erro => {
      alert('Erro ao obter localização: ' + erro.message);
    });
  } else {
    alert('Geolocalização não suportada neste navegador.');
  }
});
