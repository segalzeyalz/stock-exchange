const dataFUncs = {
    fetchPortfolio: (api, self)=>{
        fetch(`${api}/portfolio`)
        .then(response => response.json())
        .then((portData) => {
            self.portData = portData
        })
    },
    removeDuplicates: (stockArr, myStock)=>{
        let newStockArr = [...stockArr];
        for(let i=0; i<myStock.length; i++){
            newStockArr = newStockArr.filter(elem=>elem.symbol!==myStock[i].symbol)
        }
        return newStockArr;
    }
}

export default dataFUncs;