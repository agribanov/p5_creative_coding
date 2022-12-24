import { Pane } from 'tweakpane';
import sketch from './sketch';

const pane = new Pane({
    title: 'Config',
});

pane.addInput(sketch, 'maxLevelsCount', {
    label: 'Levels',
    min: 1,
    step: 1,
    max: 20,
});
pane.addInput(sketch, 'childBranchesAngle', {
    label: 'Branches Angle',
    min: 0,
    step: 1,
    max: 180,
});
pane.addInput(sketch, 'growingSpeed', {
    label: 'Speed, %/s',
    min: 50,
    step: 10,
    max: 2000,
});
pane.addInput(sketch, 'branchColor', {
    label: 'Branch Color',
    picker: 'inline',
});
pane.addInput(sketch, 'leafColor', {
    label: 'Leaf Color',
    picker: 'inline',
});

//====
const loopFolder = pane.addFolder({
    title: 'Loop',
});

loopFolder
    .addButton({
        title: 'Draw',
    })
    .on('click', () => {
        sketch.draw();
    });

loopFolder
    .addButton({
        title: 'Start Loop',
    })
    .on('click', () => {
        sketch.loop();
    });

loopFolder
    .addButton({
        title: 'Stop Loop',
    })
    .on('click', () => {
        sketch.noLoop();
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
