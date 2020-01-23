//need to retrieve data from API
let videos = document.getElementById('results');
console.log("videos", videos)
const search = document.getElementById('search');
console.log("search", search)

let search_term = ' ';

const fetchVideos = async() => {
    gapi.client.setApiKey("AIzaSyCDdyLv75rdn0yq9VDYS1Lu9lEWbjnto_M");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function(res) { console.log("GAPI client loaded for API", res); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

const showVideos = async() => {
    videos.innerHTML = '';
    await fetchVideos();
    const list = document.createElement('ul');
    list.classList.add('videos');

    videos
        .filter(video => video.name.toLowerCase().includes(search_term.toLowerCase()))
        .forEach(video => {
        const li = document.createElement('li');
        li.classList.add('video-snip');

        const name = document.createElement('h3');
        name.innerText = video.name;
        name.classList.add('video-name')

        const description = document.createElement('div');
        description.classList.add('description');

        li.appendChild(name);
        li.appendChild(description);

        list.appendChild(li);
    });
    videos.appendChild(list)
};

showVideos();

search.addEventListener('input', e => {
    search_term = e.target.value;

    showVideos();
});

