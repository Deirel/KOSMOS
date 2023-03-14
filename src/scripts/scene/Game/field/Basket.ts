import { COLORS, state } from 'scripts/util/global';

const style: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'fantasy',
    fontSize: '50px',
};

export class Basket extends Phaser.GameObjects.Container {
    // Лишний референс
    public scene: Phaser.Scene;
    private title: Phaser.GameObjects.Text;
    private subtitle: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        const rectangle = scene.add.rectangle(0, 0, 300, 200, COLORS.BLACK, 0.5);

        this.title = scene.add.text(0, 0, '', style).setOrigin(0.5).setY(-50);

        this.subtitle = scene.add.text(0, 0, '', style).setOrigin(0.5).setY(+50);

        this.add([rectangle, this.title, this.subtitle]);

        scene.add.existing(this);
    }

    protected setTitle(text: string) {
        this.title.setText(text);
    }

    // Может быть protected
    public setText(text: number) {
        this.subtitle.setText(`${text}`);
    }
}

export class BasketSell extends Basket {
    private btn: Phaser.GameObjects.Rectangle;
    private text_btn: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        const btn = scene.add.rectangle(-150, 0, 200, 100, COLORS.SALAD, 1);

        const btn_text = scene.add.text(0, 0, 'sell', style);
        btn_text.copyPosition(btn).setOrigin(0.5);
        btn.setInteractive().on('pointerdown', this.message, this);

        // Чтобы не писать много this?)
        this.btn = btn;
        this.text_btn = btn_text;

        this.add([btn, btn_text]);
    }

    // animateButton? -- нет, т.к. поведение переопределяется в потомках
    // onPointerDown?
    // processSellClick?
    // sell?
    protected message(): void {
        this.scene.tweens.add({
            targets: [this.btn, this.text_btn],
            duration: 200,
            scale: { from: 1, to: 1.3 },
            yoyo: true,
        });
    }
}
