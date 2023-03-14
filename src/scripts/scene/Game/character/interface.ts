export enum SKIN {
    COW = 'cow',
    CHICKEN = 'chicken',
    WHEAT = 'wheat',
}

// Единый тип данных для игровых сущностей.
// Различный функционал описывается при помощи опциональных полей.
// Это не очень удобно для расширения, поскольку:
//     * При добавлении новых видов функционала класс будет все больше и больше расти
//     * Опциональные поля никак не гарантируют, что будут заданы все необходимые поля для конкретного функционала.
//       Например, мы можем задать need, но не задать need_source.
//       Конечно, можно по дефолту считать в таком случае, что нужна пшеница, но впоследствии,
//       при расширении логики, подобные ситуации будут встречаться.
//
// С другой стороны, это общий формат данных может быть удобен для загрузки/сохранения/хранения данных:
//     * Не нужна кастомная сериализация (см. проблему сериализации и полиморфизма)
//     * Данные можно хранить в табличном виде, до определенного момента это удобно (пока полей не слишком много)
//
// Такую общую структуру данных можно использовать как промежуточное звено для загрузки / сохранения данных,
// а для игровой логики группировать данные по функционалу.
export interface DataCharacter {
    value_name: string;
    value_sum: number;
    speed: number;

    // Не используется
    need_source?: string;
    time_source?: number;

    need?: number;
    price?: number;
}
