import { Pane } from 'tweakpane';
import sketch from './sketch';

const pane = new Pane({
    title: 'Config',
});

pane.addInput(sketch, 'msg', {
    label: 'Text',
});

//====
const actionsFolder = pane.addFolder({
    title: 'Actions',
});

actionsFolder
    .addButton({
        title: 'Toggle Fullscreen',
    })
    .on('click', () => {
        const fs = sketch.fullscreen();
        sketch.fullscreen(!fs);
    });

actionsFolder
    .addButton({
        title: 'Save PNG',
    })
    .on('click', () => {
        sketch.saveCanvas('preview', 'png');
    });

actionsFolder
    .addButton({
        title: 'Restart Sketch',
    })
    .on('click', () => {
        sketch.init();
        pane.refresh();
    });

actionsFolder
    .addButton({
        title: 'Refresh Panel',
    })
    .on('click', () => {
        pane.refresh();
    });

setTimeout(() => pane.refresh(), 100);
