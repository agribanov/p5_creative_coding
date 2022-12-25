const VOLUME_CHANGE_VALUE = 0.05;
const VOLUME_FULL_VALUE = 1;

const player = document.querySelector('video');

// document.addEventListener('keydown', (e) => {
//     switch (e.code) {
//         case 'Space':
//             return togglePlay();
//         case 'ArrowUp':
//             return changeVolume(
//                 e.ctrlKey || e.metaKey ? VOLUME_FULL_VALUE : VOLUME_CHANGE_VALUE
//             );
//         case 'ArrowDown':
//             return changeVolume(
//                 e.ctrlKey || e.metaKey
//                     ? -VOLUME_FULL_VALUE
//                     : -VOLUME_CHANGE_VALUE
//             );
//     }
// });

function togglePlay() {
    if (!player.paused) {
        player.pause();
    } else {
        player.play();
    }
}

function changeVolume(value: number) {
    setVolume(player.volume + value);
}

function setVolume(newVolume: number) {
    if (newVolume > 1) newVolume = 1;
    if (newVolume < 0) newVolume = 0;

    player.volume = newVolume;
}

export default {
    togglePlay,
    changeVolume,
    setVolume,
    el: player,
};
