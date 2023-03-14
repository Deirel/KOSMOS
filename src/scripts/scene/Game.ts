import { FIELD_SIZE, SCENES } from '../util/global';
import BasketEgg from './Game/field/BasketEgg';
import BasketMilk from './Game/field/BasketMilk';
import BasketMoney from './Game/field/BasketMoney';
import BasketWheat from './Game/field/BasketWheat';
import Cell from './Game/field/Cell';
import Field, { ConfigField } from './Game/field/Field';
import GameCreator from './Game/GameCreator';

export default class Game extends Phaser.Scene {
    public field: Field;

    // Это поле, в принципе, не особо нужно
    public cells: Cell[] = [];
    
    public playSetting: GameCreator;

    constructor() {
        super(SCENES.GAME);
    }

    public init() {
        // Двойное зацепление между сценами BOOT и GAME.
        // Что, если мы добавим между BOOT и GAME дополнительные шаги, но забудем обновить эту строку?
        // Какая-то сцена может оказаться не выгружена из памяти.
        // 
        // Решением является отдельный модуль - менеджер сцен, которому передается имя следующей сцены.
        // Он запускает загрузку этой сцены, и по ее окончанию останавливает предыдущю сцену. 
        this.game.scene.stop(SCENES.BOOT);
    }

    public preload() {
        const { width, height } = this.scale;

        // Почему `option`?
        //
        // Вкину мысль по поводу порядка слов.
        // ConfigField звучит как "поле конфига", а не "конфиг поля" (чем он является).
        // Так же и optionField - "поле опции".
        //
        // В случае с конфигом - это может быть сделано для удобства, например, автодополнения.
        // При наборе "Config", подсказка выдаст все классы "Config***" в удобочитаемом порядке.
        //
        // С другой стороны, это грамматически неверно, и тем самым отрицательно влияет на читаемость кода.
        // Грамматически верно было бы имя FieldConfig.
        // У такого варианта тоже есть плюсы: например, все классы, относящиеся к полю, могут начинаться с Field:
        // например, FieldConfig, Field, FieldParams, FieldController, и так далее.
        //
        // В первом случае - группировка по типу класса (Config*** - все конфиги). Во втором случае -
        // - группировка по предметной области (Field*** - все про поле). На практике я больше встречал второй
        // вариант.
        const optionField: ConfigField = {
            x: width * 0.4,
            y: height * 0.5,
            ...FIELD_SIZE,
        };

        this.field = new Field(this, optionField);

        // Field.cells - часть внутреннего стейта Field.
        // Передача cells в GameCreator разделяет ответственность за cells между Field и GameCreator.
        // Подробнее см. комментарий Character.ts.
        // 
        // Предложение - передача Field в GameCreator через интерфейс.
        this.cells = this.field.getCells;
    }

    public create() {
        const { width } = this.scale;
        const x = width * 0.9;

        new BasketMoney(this, x, 150);
        new BasketEgg(this, x, 400);
        new BasketWheat(this, x, 650);
        new BasketMilk(this, x, 900);

        //                    this.field.getCells
        new GameCreator(this, this.cells);
    }
}
