import { Pane } from 'tweakpane';
import sketch from './sketch';

const pane = new Pane({
    title: 'Config',
});

//====
const actionsFolder = pane.addFolder({
    title: 'Actions',
});

// actionsFolder
//     .addButton({
//         title: 'Toggle Fullscreen',
//     })
//     .on('click', () => {
//         const fs = sketch.fullscreen();
//         sketch.fullscreen(!fs);
//     });

// actionsFolder
//     .addButton({
//         title: 'Save PNG',
//     })
//     .on('click', () => {
//         sketch.saveCanvas('preview', 'png');
//     });

// actionsFolder
//     .addButton({
//         title: 'Restart',
//     })
//     .on('click', () => {
//         sketch.init();
//     });
