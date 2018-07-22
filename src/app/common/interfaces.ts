export interface ITimeEntry {
    key?: string;
    startDate?: number;
    endDate?: number;
}

export interface ITask {
    key?: string;
    name?: string;
    logged?: number;
}

export interface ITick {
    timestamp: number;
    value: number;
}
