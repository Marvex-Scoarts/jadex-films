    let myList = [];
    const overlay = document.getElementById('jfOverlay');
    const listDrawer = document.getElementById('listDrawer');
    const trailerModal = document.getElementById('trailerModal');
    const myListNavLink = document.querySelector('a[href="#mylist"]');
    const savedListContainer = document.getElementById('savedListContainer');

    // Open & Close Helpers
    function closeAllPopups() {
      listDrawer.classList.remove('open');
      trailerModal.classList.remove('open');
      overlay.classList.remove('open');
    }

    myListNavLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllPopups();
      listDrawer.classList.add('open');
      overlay.classList.add('open');
    });

    document.getElementById('closeListBtn').addEventListener('click', closeAllPopups);
    document.getElementById('closeTrailerBtn').addEventListener('click', closeAllPopups);
    overlay.addEventListener('click', closeAllPopups);

    // Open Trailer Preview Modal on Play Now
    const playNowBtn = document.querySelector('.play-btn');
    if (playNowBtn) {
      playNowBtn.addEventListener('click', () => {
        closeAllPopups();
        trailerModal.classList.add('open');
        overlay.classList.add('open');
      });
    }

    // Render Watchlist Drawer
    function renderWatchlist() {
      myListNavLink.textContent = `My List (${myList.length})`;
      if (myList.length === 0) {
        savedListContainer.innerHTML = '<p style="color:#B6ACC7; text-align:center; margin-top:2rem;">Your Jadex Films watchlist is empty.</p>';
        return;
      }

      savedListContainer.innerHTML = myList.map((title, index) => `
        <div class="saved-movie">
          <span class="saved-movie-title">${title}</span>
          <button class="remove-movie-btn" onclick="removeMovie(${index})">Remove</button>
        </div>
      `).join('');
    }

    window.removeMovie = function(index) {
      myList.splice(index, 1);
      renderWatchlist();
    };

    // Connect All "+ My List" Buttons
    const allListButtons = document.querySelectorAll('.list-btn, .add-list-btn, #modalAddBtn');
    allListButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const movieTitle = btn.getAttribute('data-title');
        if (!myList.includes(movieTitle)) {
          myList.push(movieTitle);
          renderWatchlist();
        }

        const originalText = btn.textContent;
        btn.textContent = 'Saved ✓';
        btn.style.background = 'linear-gradient(135deg, #E5A495 0%, #D4AF37 100%)';
        btn.style.color = '#09070E';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 1000);
      });
    });