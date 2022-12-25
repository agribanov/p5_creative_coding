import { Pane } from 'tweakpane';
import player from './player';
import sketch from './sketch';

const pane = new Pane({
    title: 'Config',
});
//===
const playerControlsFolder = pane.addFolder({
    title: 'Audio Controls',
});
playerControlsFolder
    .addInput({ channel: '/kissfm/KissFM_Deep' }, 'channel', {
        label: 'Channel',
        options: {
            KissFM: '/kissfm/KissFM',
            'KissFM Deep': '/kissfm/KissFM_Deep',
            'KissFM Digital': '/kissfm/KissFM_Digital',
            'KissFM Ukraine': '/kissfm/KissFM_Ukr',
        },
    })
    .on('change', (e) => {
        player.el.src = e.value;
    });

playerControlsFolder
    .addButton({
        title: 'Play / Pause',
    })
    .on('click', () => {
        player.togglePlay();
        sketch.isLooping() ? sketch.noLoop() : sketch.loop();
    });

playerControlsFolder
    .addInput({ volume: 1 }, 'volume', {
        label: 'Volume',
        min: 0,
        step: 0.1,
        max: 1,
    })
    .on('change', (e) => {
        player.setVolume(e.value);
    });

//===
const EQControlsFolder = pane.addFolder({
    title: 'EQ Controls',
});

EQControlsFolder.addInput(sketch, 'spectreLength', {
    label: 'Spectre',
    min: 0.1,
    step: 0.05,
    max: 1,
});
EQControlsFolder.addInput(sketch, 'fftSmoothing', {
    label: 'FFT Smooth',
    min: 0,
    step: 0.05,
    max: 1,
}).on('change', () => {
    sketch.init();
});
EQControlsFolder.addInput(sketch, 'fftBins', {
    label: 'FFT bins',
    options: {
        16: 16,
        32: 32,
        64: 64,
        128: 128,
        256: 256,
        512: 512,
        1024: 1024,
    },
}).on('change', () => {
    sketch.init();
});

EQControlsFolder.addInput(sketch, 'EQType', {
    label: 'EQ Style',
    options: {
        'Classic Bars': 'CLASSIC',
        'Gradient Bars': 'GRADIENT',
        '2 Lines': '2LINES',
        'Spectre Center': 'SPECTRE_CENTER',
        'Spectre Bottom': 'SPECTRE_BOTTOM',
    },
});
EQControlsFolder.addInput(sketch, 'EQColorScheme', {
    label: 'EQ Color',
    options: {
        Ambient: 'AMBIENT',
        'Gradient by index': 'INDEX_GRADIENT',
        'Gradient by value': 'VALUE_GRADIENT',
    },
});
//====

const monitoringFolder = pane.addFolder({
    title: 'Monitoring',
});

monitoringFolder.addMonitor(sketch, 'fps');

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
