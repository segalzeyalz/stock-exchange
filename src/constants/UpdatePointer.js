const UpdatePointer = (pointerStock, pointerData)=>{
    pointerStock.name=pointerData.name;
    pointerStock.currentPrice=pointerData.currentPrice;
    pointerStock.startOfCommerce=pointerData.startOfCommerce
    //Calculate profit and add it as property
    pointerStock.profit =  parseFloat(parseFloat(pointerData.currentPrice) - parseFloat(pointerStock.purchasePrice)).toFixed(3);
}

export default UpdatePointer;