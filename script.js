if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      console.log('Service Worker registrado!', reg);

      // Verifica atualizações do Service Worker
      reg.onupdatefound = () => {
        const novoSW = reg.installing;
        novoSW.onstatechange = () => {
          if (novoSW.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Uma nova versão está disponível
              const atualizar = confirm('Uma nova versão do aplicativo está disponível. Deseja atualizar agora?');
              if (atualizar) {
                window.location.reload();
              }
            } else {
              console.log('Conteúdo armazenado para uso offline.');
            }
          }
        };
      };
    })
    .catch(err => console.error('Erro ao registrar o Service Worker:', err));
}
