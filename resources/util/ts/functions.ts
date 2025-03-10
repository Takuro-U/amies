export const updateElement = (array: any[], index: number, element: any) => {
    const newArray = [...array];
    newArray[index] = element;
    return newArray;
};

export const checkNumber = (value: string, prev: number) => {
    if (value.trim() === "" || /^[0-9]+$/.test(value)) {
        return Number(value);
    }
    return prev;
};
