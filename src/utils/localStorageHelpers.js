const LS_KEY="evalData";
export function getRestaurants(){
    const data=localStorage.getItem(LS_KEY);
    return data?JSON.parse(data):[];
}
export function saveRestaurants(list){
    localStorage.setItem(LS_KEY,JSON.stringify(list));
}