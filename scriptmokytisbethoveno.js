const messageDiv = document.getElementById('message');
const playBtn = document.getElementById('playBtn');
const audioPlayer = document.getElementById('audioPlayer');

let songList;

// Fetch the song list
fetch('songlist.json')
    .then(response => response.json())
    .then(data => {
        songList = data.songs;
    })
    .catch(error => {
        console.error('Error fetching song list:', error);
        showMessage('Error fetching song list. Please try again later.', 'error');
    });

// Function to display messages
function showMessage(message, type = 'info') {
    messageDiv.textContent = message;
    messageDiv.className = type;
}

// Function to play a random song
function playRandomSong() {
    if (!songList || songList.length === 0) {
        showMessage('No songs available.', 'error');
        return;
    }

    const randomIndex = Math.floor(Math.random() * songList.length);
    const randomSong = songList[randomIndex];

    audioPlayer.src = randomSong.location;

    // Play or pause the audio based on its current state
    if (audioPlayer.paused) {
        audioPlayer.play();
        showMessage(`Playing: ${randomSong.name}`);
    } else {
        audioPlayer.pause();
        showMessage(`Paused: ${randomSong.name}`);
    }
}

// Event listener for the play button
playBtn.addEventListener('click', () => {
    playRandomSong();
});

// Event listener for when the audio finishes playing
audioPlayer.addEventListener('ended', () => {
    playRandomSong();
});
