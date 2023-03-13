// Get all video elements with the "no-controls-video" class
const no_control_videos = document.querySelectorAll('.no-controls-video');

// Loop through each video element and add event listeners
no_control_videos.forEach(function (video) {
  // Wait for the video to load
  video.addEventListener('loadedmetadata', function () {
    // Hide the video controls
    video.controls = false;
  });
});

// Define an object that maps button combinations to video file names
var videoMap = {
  "grasp_top": "grasp_top",
  "grasp_side": "grasp_side",
  "grasp_back": "grasp_back",
  "place_top": "place_top",
  "place_side": "place_side",
  "place_back": "place_back",
  "close_top": "close_top",
  "close_side": "close_side",
  "close_back": "close_back"
};

function setRadioClass(button) {
  // Get all the radio buttons with the same name
  const buttons = document.getElementsByName(button.name);

  // Remove the 'button-primary' class from all buttons
  buttons.forEach(btn => {
    btn.parentElement.classList.remove('button-primary');
  });

  // Add the 'button-primary' class to the selected button
  if (button.checked) {
    button.parentElement.classList.add('button-primary');
  }
}

var video1 = document.getElementById("task-video");
var video2 = document.getElementById("cam-video");

function changeVideoTask() {
  var taskValue = document.querySelector('input[type="radio"][name="task"]:checked').value;
  var camValue = document.querySelector('input[type="radio"][name="camview"]:checked').value;
  var video_folder = "assets/videos/tasks/";
  var video2Value = videoMap[taskValue + "_" + camValue];
  var playPauseButton = document.getElementById('play-pause');
  
  var new_video1 = video_folder + taskValue + "_fpv_view.mp4"
  if (!video1.src.includes(new_video1)) {
    video1.src = new_video1;
    video1.currentTime = 0;
    video2.currentTime = 0;
    video1.addEventListener("loadedmetadata", () => {
      taskslider.value = video1.currentTime;
    });
  }
  var new_video2 = video_folder + video2Value + "_view.mp4"
  if (!video2.src.includes(new_video2)) {
    video2.src = new_video2;
    video2.currentTime = video1.currentTime;
  }
  // Play video
  if (playPauseButton.innerHTML == '||') {
    video1.play();
    video2.play();
  }
}

function updateVideos(value) {
  // Get the video elements
  const video1 = document.getElementById('task-video');
  const video2 = document.getElementById('cam-video');

  // Calculate the new playback time based on the slider value
  const newTime = (value / 100) * video1.duration;

  // Set the playback time of both videos
  video1.currentTime = newTime;
  video2.currentTime = newTime;
}

const taskslider = document.querySelector('input[type="range"][name="taskslider"]');
taskslider.value = 0;

function updateTaskSlider(video) {
  // Calculate the current progress of the video
  const progress = (video.currentTime / video.duration) * 100;

  // Update the value of the range input element
  taskslider.value = progress;
}

function toggleTaskPlayPause() {
  // Get the video elements
  const task_video = document.getElementById('task-video');
  const cam_video = document.getElementById('cam-video');

  // Get the play/pause button element
  const playPauseButton = document.getElementById('play-pause');

  // Toggle the play/pause state of the videos
  if (task_video.paused && cam_video.paused) {
    task_video.play();
    cam_video.play();
    playPauseButton.innerHTML = '||';
  } else {
    task_video.pause();
    cam_video.pause();
    playPauseButton.innerHTML = '►';
  }
}

// get all elements with the "play-on-hover" class
const videos = document.querySelectorAll(".play-on-hover");

// add event listeners to each video element
videos.forEach(video => {
  // get the video container and overlay elements
  const container = video.closest(".video-container");
  const overlay = container.querySelector(".overlay");

  // add event listeners to the container element
  container.addEventListener("mouseover", function () {
    video.play();
    overlay.style.opacity = "0";
  });

  container.addEventListener("mouseout", function () {
    video.pause();
    if (video.paused) {
      overlay.style.opacity = "1";
    }
  });
});


// Supernatural vs Desired videos
const supernatural = document.getElementById("supernatural");
const desired = document.getElementById("desired");

supernatural.addEventListener("ended", () => {
  supernatural.pause();
  desired.play();
});

desired.addEventListener("ended", () => {
  desired.pause();
  supernatural.play();
});

supernatural.play();

// Occlusions
var occlusions_fpv = document.getElementById("occlusion-fpv-video");
var occlusions_side = document.getElementById("occlusion-side-video");
function changeOcclusionTask() {
  var taskValue = document.querySelector('input[type="radio"][name="occlusion"]:checked').value;
  var video_folder = "assets/videos/occlusions/";
  const playPauseButton = document.getElementById('play-pause-occlusion');

  occlusions_fpv.src = video_folder + taskValue + "_fpv.mp4"
  occlusions_side.src = video_folder + taskValue + "_side.mp4"
  occlusions_fpv.currentTime = 0;
  occlusions_side.currentTime = 0;

  // Reset slide
  occlusions_fpv.addEventListener("loadedmetadata", () => {
    occlusionslider.value = occlusions_fpv.currentTime;
  });
  if (playPauseButton.innerHTML == '||') {
    occlusions_fpv.play();
    occlusions_side.play();
  }
}

function toggleOcclusionPlayPause() {
  // Get the play/pause button element
  const playPauseButton = document.getElementById('play-pause-occlusion');

  // Toggle the play/pause state of the videos
  if (occlusions_fpv.paused && occlusions_side.paused) {
    occlusions_fpv.play();
    occlusions_side.play();
    playPauseButton.innerHTML = '||';
  } else {
    occlusions_fpv.pause();
    occlusions_side.pause();
    playPauseButton.innerHTML = '►';
  }
}

const occlusionslider = document.querySelector('input[type="range"][name="occlusionslider"]');

function updateOcclusionSlider(video) {
  // Calculate the current progress of the video
  const progress = (video.currentTime / video.duration) * 100;

  // Update the value of the range input element
  occlusionslider.value = progress;
}

function updateOcclusionVideos(value) {
  // Calculate the new playback time based on the slider value
  const newTime = (value / 100) * occlusions_fpv.duration;

  // Set the playback time of both videos
  occlusions_fpv.currentTime = newTime;
  occlusions_side.currentTime = newTime;
}

// Set the 'button-primary' class on the initially checked button
window.onload = function () {
  const checkedTaskButton = document.querySelector('input[type="radio"][name="task"]:checked');
  setRadioClass(checkedTaskButton);
  const checkedCamViewButton = document.querySelector('input[type="radio"][name="camview"]:checked');
  setRadioClass(checkedCamViewButton);
  const checkedOcclusionButton = document.querySelector('input[type="radio"][name="occlusion"]:checked');
  setRadioClass(checkedOcclusionButton);
};

tippy('.point', {
  interactive: true,
  theme: 'light',
  allowHTML: true,
  placement: 'top',
  trigger: 'mouseenter',
  arrow: true,
  onShow(instance) {
    const content = document.querySelector(instance.reference.getAttribute('data-tippy-content'));
    instance.setContent(content.innerHTML);
  },
  appendTo: () => document.getElementById('tippy-instance')
});

MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  }
};

const preloadVideoFiles = [
  "occlusions/occlusion1_fpv.mp4",
  "occlusions/occlusion1_side.mp4",
  "occlusions/occlusion2_fpv.mp4",
  "occlusions/occlusion2_side.mp4",
  "occlusions/occlusion3_fpv.mp4",
  "occlusions/occlusion3_side.mp4",
  "occlusions/occlusion4_fpv.mp4",
  "occlusions/occlusion4_side.mp4",
  "tasks/close_back_view.mp4",
  "tasks/close_fpv_view.mp4",
  "tasks/close_side_view.mp4",
  "tasks/close_top_view.mp4",
  "tasks/grasp_back_view.mp4",
  "tasks/grasp_fpv_view.mp4",
  "tasks/grasp_side_view.mp4",
  "tasks/grasp_top_view.mp4",
  "tasks/close_back_view.mp4",
  "tasks/close_fpv_view.mp4",
  "tasks/close_side_view.mp4",
  "tasks/close_top_view.mp4",
]; // array of video filenames

const cachedVideoElements = []; // array to hold the video elements
// create video elements for each video file and start preloading
preloadVideoFiles.forEach((filename) => {
  const videoElement = document.createElement("video");
  videoElement.src = `assets/videos/${filename}`;
  videoElement.load();
  cachedVideoElements.push(videoElement);
});