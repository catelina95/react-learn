export type TodoItem = {
    id: number;
    text: string;
    done: boolean;
}

export type Func<T> = (params: T) => void;