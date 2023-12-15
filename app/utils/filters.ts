export const countStatus = (arr: any, status?: string) => {
    const filteredArr = arr.filter((obj: any) => {
        console.log(obj)
        obj.status === status})

    return filteredArr;
}