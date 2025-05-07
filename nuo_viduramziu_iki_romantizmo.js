const messageDiv = document.getElementById('message');
const playBtn = document.getElementById('playBtn');
const audioPlayer = document.getElementById('audioPlayer');
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitBtn');
const footer = document.createElement('footer');
const version = '1.0'; // Update with your desired version

let songList;
let currentSong;

// Fetch the song list
fetch('nuo_viduramziu_iki_romantizmo.json')
    .then(response => response.json())
    .then(data => {
        // Add an initial weight to each song
        songList = data.songs.map(song => ({
            ...song,
            weight: 1 // start with equal weights
        }));
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

    // Calculate total weight
    const totalWeight = songList.reduce((sum, song) => sum + song.weight, 0);
    if (totalWeight === 0) {
        showMessage('All songs have zero weight.', 'error');
        return;
    }

    // Pick a song based on weighted randomness
    let threshold = Math.random() * totalWeight;
    let selectedIndex = 0;

    for (let i = 0; i < songList.length; i++) {
        threshold -= songList[i].weight;
        if (threshold <= 0) {
            selectedIndex = i;
            break;
        }
    }

    currentSong = songList[selectedIndex];

    // Reduce the song's weight, but don't let it fall below a minimum value
    songList[selectedIndex].weight = Math.max(songList[selectedIndex].weight * 0.5, 0.1);

    audioPlayer.src = currentSong.location;
    audioPlayer.play();

    nameInput.value = '';
    showMessage('');
}


// Function to check the answer
function checkAnswer() {
    const guessedName = nameInput.value.trim();

    if (!guessedName) {
        showMessage(`The correct name is: ${currentSong.name}`);
    } else if (guessedName.toLowerCase() === currentSong.name.toLowerCase()) {
        showMessage('Correct!', 'success');
    } else {
        showMessage(`The correct name is: ${currentSong.name}. You entered: ${guessedName}`, 'error');
    }
}

// Event listener for the play button
playBtn.addEventListener('click', () => {
    playRandomSong();
});

// Event listener for the submit button
submitBtn.addEventListener('click', () => {
    checkAnswer();
});

// Event listener for the Enter key in the input field
nameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Event listener for when the audio finishes playing
audioPlayer.addEventListener('ended', () => {
    playRandomSong();
});

// Add version to the footer
footer.textContent = `Version: ${version}`;
document.body.appendChild(footer);
