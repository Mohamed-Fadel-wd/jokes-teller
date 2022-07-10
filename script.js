const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

const toggleButton = () => {
  button.disabled = !button.disabled;
};
// passing a joke to speach

const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "1dbeda2857d840bd8772aed9cacb5708",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get Jokes from API

const getJokes = async () => {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.setup
      ? (joke = `${data.setup} ... ${data.delivery}`)
      : (joke = data.joke);
    tellMe(joke);
    toggleButton();
  } catch (err) {
    console.log("async error", err);
  }
};

getJokes();

button.addEventListener("click", getJokes);

audioElement.addEventListener("ended", toggleButton);
