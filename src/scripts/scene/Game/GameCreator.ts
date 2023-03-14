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

    get getCharacters() {
        return this.characters;
    }

    private init() {
        const factory = new FactoryCharacter(this.scene);

        ELEMENTS.cow.forEach((id) => {
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
