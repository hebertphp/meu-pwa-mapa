let mapa = L.map('mapa').setView([-23.561684, -46.655981], 15); // Av. Paulista

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

let marcadorUsuario;

document.getElementById('btnLocalizar').addEventListener('click', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        document.getElementById('info').innerText = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;

        // Atualiza mapa e marcador
        mapa.setView([latitude, longitude], 16);
        if (marcadorUsuario) {
          marcadorUsuario.setLatLng([latitude, longitude]);
        } else {
          marcadorUsuario = L.marker([latitude, longitude]).addTo(mapa)
            .bindPopup("Você está aqui!").openPopup();
        }
      },
      err => {
        document.getElementById('info').innerText = "Erro ao obter localização.";
        console.error(err);
      }
    );
  } else {
    document.getElementById('info').innerText = "Geolocalização não suportada.";
  }
});
