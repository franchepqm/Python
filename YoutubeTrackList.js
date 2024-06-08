async function fetchPlaylist() {
    const urlInput = document.getElementById('playlist-url').value;
    const playlistId = getPlaylistIdFromUrl(urlInput);
    const apiKey = 'TU_CLAVE_API';

    if (!playlistId) {
        alert('Please enter a valid YouTube playlist URL.');
        return;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`);
        const data = await response.json();
        displayPlaylistData(data);
    } catch (error) {
        console.error('Error fetching playlist:', error);
        alert('Error fetching playlist data. Please try again later.');
    }
}

function getPlaylistIdFromUrl(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('list');
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

function displayPlaylistData(data) {
    const textarea = document.getElementById('playlist-data');
    textarea.value = '';

    if (data.items) {
        data.items.forEach(item => {
            textarea.value += item.snippet.title + '\n';
        });
    } else {
        textarea.value = 'No videos found in this playlist.';
    }
}
