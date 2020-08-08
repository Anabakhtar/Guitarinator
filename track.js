const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");


let isVideo = false;
let model = null;
const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.89 // confidence threshold for predictions.
};

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = ""
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = ""
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = ""
        startVideo();
        video.style.display = "none";
    } else {
        updateNote.innerText = ""
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = ""
    }
}


var audio = new Audio('g-chord.mp3');
var audio2 = new Audio('emi.mp3');
var audio3 = new Audio('c-chord.mp3');
var audio4 = new Audio('d-chord.mp3');

function runDetection() {
    model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
            let hand1 = predictions[0].bbox;
            let x = hand1[0];
            let y = hand1[1];
            console.log(x)
            console.log(y)
            if (x<50){
                 audio.play();
            }
            else if(x>400){
                audio2.play();
            }
            else if(y<50){
                audio3.play();
            }
            else if(y>300){
                audio4.play();
            }



           
        }
    });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    updateNote.innerText = "ready"
    trackButton.disabled = false
});
