function playRandomSong() {
    fetch('songlist.json')
        .then(response => response.json())
        .then(data => {
            const songs = data.songs;
            const randomIndex = Math.floor(Math.random() * songs.length);
            const randomSong = songs[randomIndex];
            const audio = new Audio(randomSong.location);
            audio.play();
            const guessedName = prompt('What is the name of the song?');
            if (guessedName === randomSong.name) {
                alert('Correct!');
            } else if (guessedName === null) {
                alert(`The correct name is ${randomSong.name}.`);
            } else {
                alert(`The correct name is ${randomSong.name}, you entered ${guessedName}.`);
            }
        })
        .catch(error => console.error('Error fetching song list:', error));
}
