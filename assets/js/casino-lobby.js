// Aguarda o documento carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todas as abas de categoria
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    // Adiciona evento de clique para cada aba
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove a classe active de todas as abas
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Adiciona a classe active na aba clicada
            this.classList.add('active');
            
            // Aqui você pode adicionar lógica para carregar os jogos da categoria selecionada
            const category = this.textContent.trim();
            loadGames(category);
        });
    });
    
    // Função para carregar os jogos de uma categoria específica
    function loadGames(category) {
        const gameGrid = document.querySelector('.game-grid');
        gameGrid.innerHTML = ''; // Limpa os jogos atuais
        
        // Simula o carregamento de jogos (você deve substituir isso com seus dados reais)
        const games = getGamesByCategory(category);
        
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <div class="game-title">${game.title}</div>
            `;
            
            // Adiciona evento de clique no jogo
            gameCard.addEventListener('click', () => {
                console.log(`Iniciando ${game.title}`);
                // Aqui você pode adicionar a lógica para iniciar o jogo
            });
            
            gameGrid.appendChild(gameCard);
        });
    }
    
    // Função que retorna os jogos de cada categoria (substitua com seus dados reais)
    function getGamesByCategory(category) {
        const gamesByCategory = {
            'BINGO': [
                { title: 'Magic Dragon', image: '../assets/img/game-magic-dragon.jpg' },
                { title: 'Triple Bonus HD', image: '../assets/img/game-triple-bonus.jpg' },
                { title: 'Multi Bingo', image: '../assets/img/game-multi-bingo.jpg' },
                { title: 'Champion Bingo', image: '../assets/img/game-champion-bingo.jpg' }
            ],
            'SLOT': [
                { title: 'Fruit Spinner', image: '../assets/img/game-fruit-spinner.jpg' },
                { title: 'Lucky 7', image: '../assets/img/game-lucky7.jpg' },
                { title: 'Golden Dragon', image: '../assets/img/game-golden-dragon.jpg' }
            ],
            'LIVE': [
                { title: 'Live Roulette', image: '../assets/img/game-live-roulette.jpg' },
                { title: 'Live Blackjack', image: '../assets/img/game-live-blackjack.jpg' }
            ],
            'CRASH': [
                { title: 'Aviator', image: '../assets/img/game-aviator.jpg' },
                { title: 'Space Crash', image: '../assets/img/game-space-crash.jpg' }
            ]
        };
        
        return gamesByCategory[category] || [];
    }
});
