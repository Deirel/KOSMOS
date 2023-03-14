import { CENTER_X, CENTER_Y, COLORS } from 'scripts/util/global';

const text = 'loading';

interface Loading {
    scene: Phaser.Scene;
    progressBar: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
    background: Phaser.GameObjects.Rectangle;

    update: () => void;
    init: () => void;
    create: () => void;
    updateProgress: (progress: number) => void;
    changeVisible: (visible: boolean) => void;
}

export default class LoadingProgress extends Phaser.GameObjects.Container implements Loading {
    public scene: Phaser.Scene;
    public progressBar: Phaser.GameObjects.Rectangle;
    public background: Phaser.GameObjects.Rectangle;
    public text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.scene = scene;
        this.init();

        scene.add.existing(this);
    }
    public init() {
        this.background = this.scene.add.rectangle(CENTER_X, CENTER_Y, 5000, 5000, COLORS.BLACK, 1);

        this.progressBar = this.scene.add.rectangle(CENTER_X * 0.7, CENTER_Y, 0, 80, 0xfff);

        this.text = this.scene.add.text(CENTER_X * 0.75, CENTER_Y * 0.95, text, {
            fontFamily: 'fantasy',
            fontSize: '44px',
        });

        this.add([this.background, this.progressBar, this.text]);
    }

    public create() {}

    public updateProgress(progress: number) {
        this.progressBar.width += 100 * progress;
    }

    public changeVisible(visible: boolean) {
        this.setVisible(visible);
    }
}

export class LoaderCreator {
    public container: Phaser.GameObjects.Container;

    constructor() {}

    public getContainer() {
        return this.container;
    }
}
