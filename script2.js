const messageDiv = document.getElementById('message');
const playBtn = document.getElementById('playBtn');
const audioPlayer = document.getElementById('audioPlayer');
const nameInput = document.getElementById('nameInput');
const submitBtn = document.getElementById('submitBtn');

let songList;
let currentSong;

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
    currentSong = songList[randomIndex];

    audioPlayer.src = currentSong.location;
    audioPlayer.play();

    nameInput.value = ''; // Clear the input field
}

// Function to check the answer
function checkAnswer() {
    const guessedName = nameInput.value.trim();

    if (!guessedName) {
        showMessage(''); // Hide the message if the input is empty
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
