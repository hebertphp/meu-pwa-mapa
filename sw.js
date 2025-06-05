// Nome do cache e versão. Altere a versão para forçar uma atualização do cache
const CACHE_NAME = 'my-pwa-map-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    // Adicione outras URLs de assets que você deseja cachear, como imagens, etc.
];

// Evento 'install': Disparado quando o Service Worker é instalado.
// Abre o cache e armazena os assets estáticos.
self.addEventListener('install', event => {
    console.log('Service Worker: Evento "install" acionado.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache aberto e adicionando URLs.');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento 'fetch': Intercepta requisições de rede.
// Tenta servir os recursos do cache primeiro, depois da rede.
self.addEventListener('fetch', event => {
    // console.log('Service Worker: Interceptando requisição para:', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se o recurso estiver no cache, retorna-o
                if (response) {
                    // console.log('Service Worker: Servindo do cache:', event.request.url);
                    return response;
                }
                // Se não estiver no cache, busca na rede
                return fetch(event.request).then(
                    function(response) {
                        // Verifica se recebemos uma resposta válida
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clona a resposta. É uma stream e só pode ser consumida uma vez.
                        // Precisamos de uma cópia para o cache e outra para o navegador.
                        var responseToCache = response.clone();

                        // Cacheia o recurso para futuras requisições
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Evento 'activate': Disparado quando o Service Worker é ativado.
// Limpa caches antigos.
self.addEventListener('activate', event => {
    console.log('Service Worker: Evento "activate" acionado.');
    const cacheWhitelist = [CACHE_NAME]; // Apenas o cache atual deve ser mantido

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Se o cache não estiver na lista branca, ele é um cache antigo e deve ser deletado
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Deletando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
