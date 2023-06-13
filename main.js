song_1 = "";
song_2 = "";

song_1_status = "";
song_2_status = "";

score_leftWristY = 0;
score_rightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music_1.mp3");
  }

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
  }

function modelLoaded() {
    console.log("gotPoses had started working");
}

function modelLoaded() {
    console.log("gotPoses has started working");
  }
   
  function gotPoses(results) {
    if (results.length > 0) {
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

      score_leftWristY = results[0].pose.keypoints[9].score;
      score_rightWrist = results[0].pose.keypoints[10].score;
    }
  }


  function draw() {
    image(video,0,0,500,500);

    song_1_status = song_1.isPlaying();
    song_2_status = song_2.isPlaying();

    fill("#39FF14");
    stroke("#0b34d6");

    if(score_leftWristY > 0.2) {
      circle(leftWristX,leftWristY, 30);
      song_2.stop();

      if(song_1_status == false) {
        song_1.play();
        document.getElementById("song").innerHTML = "Song1 will be played when left wrist is shown";
      }
    }
   
  if(score_rightWrist > 0.2) {
    circle(rightWristX, rightWristY, 30);
    song_1.stop();

    if(song_2_status == false) {
      song_2.play();
      document.getElementById("song").innerHTML = "Song1 will be played when left wrist is shown";
    }
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

