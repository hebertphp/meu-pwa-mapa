document.addEventListener('DOMContentLoaded', () => {
    const showLocationButton = document.getElementById('showLocationButton');
    const mapDiv = document.getElementById('map');
    let mymap = null; // Variável para armazenar a instância do mapa
    let marker = null; // Variável para armazenar o marcador

    showLocationButton.addEventListener('click', () => {
        if (mapDiv.style.display === 'none') {
            // Se o mapa estiver oculto, mostre-o e tente obter a localização
            mapDiv.style.display = 'block';
            showLocationButton.textContent = 'Ocultar Mapa';

            if (!mymap) {
                // Inicializa o mapa apenas uma vez
                mymap = L.map('map').setView([0, 0], 2); // Posição inicial genérica

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mymap);
            }

            // Invalida o tamanho do mapa para garantir que ele seja renderizado corretamente
            // (importante se o mapa estiver oculto inicialmente)
            mymap.invalidateSize();

            // Obter a localização do usuário
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // Centraliza o mapa na localização atual do usuário
                    mymap.setView([lat, lon], 15); // Zoom mais próximo

                    // Remove o marcador anterior, se existir
                    if (marker) {
                        mymap.removeLayer(marker);
                    }

                    // Adiciona um marcador na localização atual
                    marker = L.marker([lat, lon]).addTo(mymap)
                        .bindPopup('Você está aqui!').openPopup();

                    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
                }, error => {
                    console.error('Erro ao obter a localização:', error.message);
                    alert('Não foi possível obter sua localização. Por favor, verifique as permissões do navegador.');
                    // Em caso de erro, ainda exibe o mapa em uma posição padrão
                    mymap.setView([-23.5505, -46.6333], 13); // Posição padrão (São Paulo)
                    L.marker([-23.5505, -46.6333]).addTo(mymap)
                        .bindPopup('Localização padrão (São Paulo)').openPopup();
                }, {
                    enableHighAccuracy: true, // Tenta obter a localização mais precisa
                    timeout: 5000,           // Tempo máximo para tentar obter a localização (5 segundos)
                    maximumAge: 0            // Não usar uma localização em cache
                });
            } else {
                alert('Geolocalização não é suportada por este navegador.');
                // Exibe o mapa em uma posição padrão se a geolocalização não for suportada
                mymap.setView([-23.5505, -46.6333], 13); // Posição padrão (São Paulo)
                L.marker([-23.5505, -46.6333]).addTo(mymap)
                    .bindPopup('Localização padrão (São Paulo)').openPopup();
            }

        } else {
            // Se o mapa estiver visível, oculte-o
            mapDiv.style.display = 'none';
            showLocationButton.textContent = 'Mostrar Minha Posição no Mapa';
        }
    });
});
