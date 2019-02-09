import axios from 'axios';
const dataFuncs = {
    fetchPortfolio: (api, self, func)=>{
        return fetch(`${api}/portfolio`)
        .then(response => response.json())
        .then((portData) => {
            self.portData = portData
            if(func){
                func()
            }
        })
    },
    portfolioPromise: (api)=>{
        return fetch(`${api}/portfolio`)
        .then(response => response.json())
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
    },
    getParams: (array)=>{
        let params = 'market/?symbol=';
        for (let i=0;i<array.length; i++) {
           params+=array[i].symbol + ',';
        }
        return params;
    },
    updateStocks: (api, params, UpdatePointer, myStocks, stocks, getPortfolio, self)=>{
        fetch(`${api}/${params}`)
            .then(res=> res.json())
            .then((data)=>{ 
                for (let i=0;i<stocks.length; i++) {
                    UpdatePointer(myStocks[i],data.stocks[i])
             }
             getPortfolio(self.portData)
                })
    },
    buy: (api, symbol, amount)=>{
        return axios.post(`${api}/market/buy`,{
            "stockSymbol": symbol,
            "stockQuantity":amount
          })
    },
    search: (api, filter)=>{
        return axios.post(`${api}/market/search`,{
            "searchString": filter
          })
    },
    reset: (api)=>{
        return axios.delete(`${api}/management`)
        .then(axios.post(`${api}/market/search`,{
            "searchString": ""
        }))
    },
    sell: (api, symbol)=>{
        return axios.post(`${api}/market/sell`,{
            "stockSymbol": symbol,
          })
    }
}

export default dataFuncs;