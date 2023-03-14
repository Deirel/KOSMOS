import { CENTER_X, CENTER_Y, COLORS } from 'scripts/util/global';

// Вынесенная конфигурация экрана загрузки - это хорошая идея
const text = 'loading';

// В этом интерфейсе нет необходимости:
//     * Он не используется для ограничения доступа к LoadingProgress
//     * LoadingProgress не полиморфен, он существует только один
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
    // Лишний референс, сцена уже доступна из класса Container
    public scene: Phaser.Scene;
    public progressBar: Phaser.GameObjects.Rectangle;
    public background: Phaser.GameObjects.Rectangle;
    public text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.scene = scene;
        this.init();

        // Добавление себя к сцене - нарушение DIP?
        //
        // Этот код влияет на иерархию объектов в сцене, а сама сцена об этом не знает.
        // Если эта иерархия важна для чего-то еще, здесь может возникнуть ошибка.
        // В таком случае было бы лучше, если сама сцена бы добавляла к себе лоадер, гарантируя, что при этом ничего не пойдет не так.
        //
        // Также, с точки зрения DIP, модули низкого уровня не должны зависеть от модулей вернего уровня.
        // LoadingProgress контролируется сценой и является модулем более низкого уровня, чем она.
        // Поэтому чем меньше он знает о сцене, тем лучше (и тем более универсальным становится этот класс).
        // Например, если делегировать этот код внешнему модулю, будет несложно при необходимости добавить лоадер
        // не к самой сцене, а к какому-то вложенному контейнеру - если впоследствии сцена будет более сложно устроена
        // (в нее добавятся другие компоненты, не относящиеся к лоадеру - например, кнопка обращения в саппорт).
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

    // Необходимость метода?
    public create() {}

    public updateProgress(progress: number) {
        // Неочевидность инкрементального увеличения прогресса
        // `addProgress`?
        this.progressBar.width += 100 * progress;
    }

    public changeVisible(visible: boolean) {
        this.setVisible(visible);
    }
}

// Остался лишний класс
export class LoaderCreator {
    public container: Phaser.GameObjects.Container;

    constructor() {}

    public getContainer() {
        return this.container;
    }
}
