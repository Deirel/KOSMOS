export class Subject {
    observers: Observer[] = [];

    add_observer = (observer: Observer) => {
        this.observers.push(observer);
    };

    remove_observer = (observer: Observer) => {
        const observer_index = this.observers.indexOf(observer);
        if (observer_index !== -1) {
            this.observers.splice(observer_index, 1);
        } else {
            console.error('No such observer exists!');
        }
    };

    notify_all = (data: any) => {
        for (const o of this.observers) {
            if (o.on_state_update) {
                o.on_state_update(data);
            }
        }
    };
}

export interface Observer {
    on_state_update?: (data: any) => void;
}

export class PrimalSubject extends Subject {
    private _value: number;

    constructor(value: number) {
        super();

        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;

        this.notify_all({
            value: this._value,
        });
    }
}
