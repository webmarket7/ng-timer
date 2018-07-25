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
