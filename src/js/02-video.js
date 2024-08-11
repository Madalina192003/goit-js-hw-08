import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const onTimeUpdate = throttle(function (data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
}, 1000);

player.on('timeupdate', onTimeUpdate);

const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(savedTime).catch(function (error) {
    console.error('Error setting time:', error);
  });
}
