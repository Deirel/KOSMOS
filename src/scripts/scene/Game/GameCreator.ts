import { ELEMENTS } from 'scripts/util/global';
import FactoryCharacter, { TCharacter } from './character/FactoryCharacter';
import { SKIN } from './character/interface';
import Cell from './field/Cell';
export default class GameCreator {
    public scene: Phaser.Scene;
    private characters: TCharacter[] = [];
    private cells: Cell[];

    constructor(scene: Phaser.Scene, cells: Cell[]) {
        this.scene = scene;
        this.cells = cells;

        this.init();
    }

    // Лишний метод (+ нейминг для свойств, см. комментарий в Field.ts)
    get getCharacters() {
        return this.characters;
    }

    private init() {
        const factory = new FactoryCharacter(this.scene);

        // При добавлении новых видов сущностей придется менять алгоритм,
        // чтобы не писать вручную повторяющийся код для каждой сущности.
        //
        // Оффтоп: интересно, почему `.forEach`, а не `for ... of`?
        ELEMENTS.cow.forEach((id) => {
            // Разнесенный на две строки код, смотрится чисто ^^
            const cow = factory.create(SKIN.COW, this.cells[id]);
            this.characters.push(cow);
        });

        ELEMENTS.chicken.forEach((id) => {
            const chicken = factory.create(SKIN.CHICKEN, this.cells[id]);
            this.characters.push(chicken);
        });

        ELEMENTS.wheat.forEach((id) => {
            const wheat = factory.create(SKIN.WHEAT, this.cells[id]);
            this.characters.push(wheat);
        });
    }
}
