const pane = new Tweakpane.Pane({
    title: 'Config',
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
