export enum SKIN {
    COW = 'cow',
    CHICKEN = 'chicken',
    WHEAT = 'wheat',
}
export interface DataCharacter {
    value_name: string;
    value_sum: number;
    speed: number;
    need_source?: string;
    time_source?: number;
    need?: number;
    price?: number;
}
