export const updateElement = (array: any[], index: number, element: any) => {
    const newArray = [...array];
    newArray[index] = element;
    return newArray;
};
