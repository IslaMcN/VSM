//Option
const CLIENT_ID = '611366885200-j84vif4m9qq6b8v36n8ad6eiebf6u6ok.apps.googleusercontent.com'

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

const SCOPES = 'https://www.googleapis.com/auth/youtube.readyonly';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');

const content = document.getElementById('content');
const channelForm = document.getElementById('channel-form');

const channelInput = document.getElementById('channel-input');

const videoContainer = document.getElementById('video-container');

const handleCLientLoad=()=>{
    gapi.load('client:auth2', initClient);
}
function initClient(){
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(() => {
        //Listening for sign in state change
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        //handle initial sign in
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}
//update ui sign in state
function updateSigninStatus(isSignedIn){
    if(isSignedIn){
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        content.style.display = 'block';
        videoContainer.style.display = 'block';
        search()
    }else{
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        content.style.display = 'none';
        videoContainer.style.display = 'none';
    }
}

function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
}

//Get data from api
function search(data){
    gapi.client.youtube.list({
        part: 'snippet,contentDetails,statistics',
        keyword: data
    })
    .then(res => {
        console.log(res);
        
    })
    .catch(err => alert('No results'))
}