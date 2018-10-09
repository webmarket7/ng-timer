export interface ITimeEntry {
    key?: string;
    startDate?: number;
    endDate?: number;
    taskKey?: string;
}

export interface ITask {
    key?: string;
    name?: string;
    logged?: number;
}

export interface ITimeStamp {
    timestamp: number;
    value: string;
}

export interface IFormValidators {
    required: true;
    minLength: number;
}

export interface IFormControl {
    key: string;
    label: string;
    value: string;
    type: string;
    validation: IFormValidators;
}
