import { state } from 'scripts/util/global';
import { BasketSell } from './Basket';

export default class BasketMilk extends BasketSell {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.setTitle('Milk');
        this.setText(state.value_milk.value);

        const setText = this.setText.bind(this);

        state.value_milk.add_observer({
            on_state_update({ value }) {
                setText(value);
            },
        });
    }

    protected message() {
        super.message();

        // Логика продажи дублируется в карточках продажи; также вью напрямую меняет стейт.
        //
        // Как минимум такую логику стоит обобщить, вынеся в базовый класс.
        // Как максимум, имеет смысл вынести эту логику в отдельный модуль, реализующий бизнес-логику отдельно от логики вью,
        // для большей централизации (для лучшего понимания, у каких модулей есть права на изменение стейта).
        //
        // Это проблема, т.к. если стейт меняется не централизовано (из многих классов), может быть сложно:
        //     а) решить проблемы приоритетов обращения к стейту - например, когда стейт должен меняться строго в определенном порядке
        //     б) охватить взглядом общую логику работы со стейтом
        //
        // Для решения этих проблем можно завести специальные классы-контроллеры, которые будут контролировать доступ к стейту,
        // и будут являться точками доступа для остального приложения.
        // Эти классы могут быть примерно такими:
        //     * Контроллер инвентаря - реализует хранение ресурсов, например, молока, яиц, пшеницы
        //     * Контроллер магазина - реализует логику продажи/покупки ресурсов за монеты
        
        // Второе замечание: стоимость товара привязана к объекту-производителю.
        // Это может быть проблемой для расширения функционала, когда объект сможет производить не только один вид продукта.
        // Например, корова будет производить молоко и мясо (простите).
        //
        // Поэтому лучше иметь для каждого вида ресурса отдельный конфиг, задающий параметры цены, возможности продажи и пр.
        // и хранить эти данные в словаре по id ресурса.
        
        if (state.value_milk.value === 0) return;

        const money = state.value_milk.value * state.cow.price;
        state.value_milk.value = 0;
        this.setText(state.value_milk.value);
        state.value_money.value = state.value_money.value += money;
    }
}
