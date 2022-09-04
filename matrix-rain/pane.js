const pane = new Tweakpane.Pane({
    title: 'Config',
});

pane.addInput(PARAMS, 'TEXT_SIZE', {
    step: 1,
    min: 8,
    max: 24,
}).on('change', () => init());

const lineDelaysFolder = pane.addFolder({
    title: 'Line Delays',
});

lineDelaysFolder.addInput(MatrixLine.DELAY, 'RESTART');
lineDelaysFolder.addInput(MatrixLine.DELAY, 'NEW_SYMBOL_DELAY_MIN');
lineDelaysFolder.addInput(MatrixLine.DELAY, 'NEW_SYMBOL_DELAY_MAX');

// const colorsFolder = pane.addFolder({
//     title: 'Colors',
// });

// colorsFolder.addInput(MatrixSymbol.COLORS, 'GREEN', {
//     color: { type: 'float' },
// });
// colorsFolder.addInput(MatrixSymbol.COLORS, 'LIGHT_GREEN', {
//     color: { type: 'float' },
// });

//====
const actionsFolder = pane.addFolder({
    title: 'Actions',
});
actionsFolder
    .addButton({
        title: 'Toggle Fullscreen',
    })
    .on('click', () => {
        const fs = fullscreen();
        fullscreen(!fs);
    });

actionsFolder
    .addButton({
        title: 'Save PNG',
    })
    .on('click', () => {
        saveCanvas('preview', 'png');
    });

actionsFolder
    .addButton({
        title: 'Restart',
    })
    .on('click', () => {
        init();
    });
