const dataFUncs = {
    fetchPortfolio: (api, self, func)=>{
        fetch(`${api}/portfolio`)
        .then(response => response.json())
        .then((portData) => {
            self.portData = portData
            if(func){
                func()
            }
        })
    },
    removeDuplicates: (stockArr, myStock)=>{
        let newStockArr = [...stockArr];
        for(let i=0; i<myStock.length; i++){
            newStockArr = newStockArr.filter(elem=>elem.symbol!==myStock[i].symbol)
        }
        return newStockArr;
    },
    updatePrice: (api, symbol, func )=>{
        fetch(`${api}/market?symbol=${symbol}`)
               .then(response => response.json())
               .then((price) => {func(price.stocks.length && price.stocks[0].currentPrice)})
    }
}

export default dataFUncs;