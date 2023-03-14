import Cell from '../field/Cell';

type Status = 'wait' | 'process' | 'complete';

type Pointer = Phaser.Input.Pointer;
export type ConfigAnimate = {
    speed: number;
    prefix: string;
    frames: number;
    idle: string;
};

export default class Character extends Phaser.GameObjects.Sprite {
    private config: ConfigAnimate;
    private _status: Status;
    private parent: Cell;

    constructor(scene: Phaser.Scene, parent: Cell, configAnim: ConfigAnimate) {
        super(scene, 0, 0, 'game');

        // Параметры анимации объекта при перетаскивании можно также вынести в конфиг
        this.setScale(0.35);

        this.config = configAnim;
        this.parent = parent;

        // Character изменяет стейт клетки - DIP
        // Если владельцем клеток является Field, все изменения стейта клеток стоит производить через него.
        // Есть несколько доводов к такой логике:
        //
        // 1. Иногда может быть важно знать обо всех клетках при изменении одной. Например, надо реализовать механику:
        // при перетаскивании одного объекта на другой, второй объект должен съехать на соседнюю свободную клетку.
        // Так как отдельная клетка ничего не знает про другие клетки, для этой задачи нужен класс, который знает про все клетки -
        // - это Field (или какой-то соответствующий контроллер).
        //
        // 2. Передача объекта Cell напрямую в другие классы может быть не безопасной, так как дает им слишком большой доступ.
        // Другой класс может залезть внутрь Cell и поменять там что угодно, что потенциално ведет к проблемам.
        // 
        // Одно из решений - метод `Field.addCharacter(cellX, cellY, character)`, который проведет все
        // нужные проверки, и добавит персонажа в правильное место в иерархии.
        //
        // Другой способ решения проблемы излишнего доступа - принцип ISP. Клетка реализует интерфейс, например:
        // interface ICellFillable {
        //     addCharacter(character:Character): void;
        // }
        //
        // И передается сюда в виде этого интерфейса. Тогда с ней нельзя будет сделать ничего, кроме то, что разрешает интерфейс.
        parent.filled = true;

        // Здесь примерно те же замечания, что в Field.ts, а так же ниже в `dragStart` и `dragEnd`
        parent.add(this);

        this.init();
        this.setEvents();
        this.status = 'wait';
    }

    private init() {
        const { prefix, speed, frames } = this.config;

        this.anims.create({
            key: 'start',
            frames: this.anims.generateFrameNames('game', {
                prefix,
                start: 0,
                end: frames - 1,
            }),
            repeat: 0,
            duration: speed * 1000,
        });

        this.on('animationcomplete', this.completeAnimation, this);
    }

    protected completeAnimation() {
        this.setFrame(`${this.config.prefix}${this.config.frames}`);

        this.status = 'complete';
    }

    private setEvents() {
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.scene.input.dragTimeThreshold = 100;

        this.on('pointerdown', this.message, this);
        this.on('dragstart', this.dragStart, this);
        this.on('drag', this.drag, this);
        this.on('dragend', this.dragEnd, this);
    }

    private dragStart(pointer: Pointer, t: any, q: any, y: any) {
        // Похоже, здесь решается проблема перекрытия character'а другими клетками.
        // Character вмешивается в иерархию поля и клеток, что может потенциально привести к проблемам,
        // если в тот же момент иерархия важна для чего-то другого. (так же, как в LoadingProgress.ts)
        //
        // Более безопасный способ решения проблемы - вынос перетаскиваемого объекта в отдельный слой, который 
        // поверх всего и ни с чем не пересекается.
        // 
        // P.S. Похоже, далее примерно это и происходит, что ставит под сомнение необходимость этой строчки.
        this.parent.parentContainer.bringToTop(this);

        this.setScale(this.scale * 1.2);

        // В конечном итоге character открепляется от клетки.
        // Похоже, что в этом случае bringToTop не нужен, т.к. character попадает в иерархию
        // над другими объектами сцены - так ли это?
        this.parent.remove(this.setPosition(pointer.x, pointer.y), false);
        this.parent.filled = false;
    }

    private dragEnd(pointer: Pointer) {
        this.setScale(0.35);

        // Подобный код делает Character сильно зависимым от иерархии поля и клеток.
        // При изменении этой иерархии высока вероятносто, что здесь что-то сломается.
        //
        // Любую логику, зависимую от внутреннего устройства клеток и поля, стоит реализовывать
        // в классе, который знает про это внутреннее устройство. Тогда при изменении устройства иерархии,
        // не придется менять эту логику в других классах, что соответствует принципу SRP.
        const cells = this.parent.parentContainer.getAll() as Cell[];
        let newParent: undefined | Cell = undefined;

        cells.forEach((container) => {
            const position = container.getBounds();
            const value = position.contains(pointer.x, pointer.y);

            if (value && container instanceof Cell) newParent = container;
        });

        this.x = 0;
        this.y = 0;

        const instance = newParent instanceof Cell;

        if (!instance || newParent.filled) {
            this.parent.add(this);
            this.parent.filled = true;
            return;
        }

        this.parent = newParent;

        newParent.filled = true;
        newParent.add(this);
    }

    private drag(pointer: Pointer) {
        this.y = pointer.y;
        this.x = pointer.x;
    }

    // Цель этих свойств?
    get status() {
        return this._status;
    }

    set status(status: Status) {
        this._status = status;
    }
    // ------------------

    public start() {
        this.scene.anims.play('start', this);
        const { scale } = this;
        const { speed } = this.config;

        const repeat = (speed * 1000) / 800;

        this.scene.tweens.add({
            targets: this,
            scale: { from: scale, to: scale * 0.9 },
            yoyo: true,
            duration: 400,
            repeat,
        });
    }

    protected setIdle() {
        this.setFrame(this.config.idle);
    }

    // Срабатывает при перетаскивании, что приводит к сбору продукции
    // при попытке переместить объект
    protected message() {
        // Эта логика ничего не делает, так как реакция объекта на тап полностью реализована в наследниках,
        // включая проверку на `status`.
        //
        // Можно сделать метод `message` приватным
        // и вызывать соответствующий protected метод, если позволяет проверка стейта
        if (this.status === 'process') return;
        return;
    }

    // Имя метода `tween` несколько общее, немного не хватает конкретики - какую цель он выполняет
    protected tween() {
        const { width } = this.scene.scale;

        // Вот, где коровы летают!
        this.scene.tweens.add({
            targets: this,
            x: { from: this.x, to: width },
            duration: 500,
            scale: { from: this.scale, to: 0 },
            yoyo: true,
        });
    }
}
