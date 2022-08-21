export function processErrorFields(arr: Array<string> | undefined, el: string) {
    if(arr){
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === el) {
                return true;
            }
        }
    }
    
    return false;
}