const UpdatePointer = (pointerStock, array)=>{
    let pointerData
    if(pointerStock){
        pointerData = array.find((elem)=>elem.symbol===pointerStock.symbol)}
    if(pointerData && pointerStock.symbol===pointerData.symbol){
        pointerStock.name=pointerData.name;
        pointerStock.currentPrice=parseFloat(pointerData.currentPrice).toFixed(3);
        pointerStock.startOfCommerce=pointerData.startOfCommerce
        //Calculate profit and add it as property
        pointerStock.profit =  parseFloat(parseFloat(pointerData.currentPrice).toFixed(3) - parseFloat(pointerStock.purchasePrice).toFixed(3)).toFixed(3);
    }
}

export default UpdatePointer;