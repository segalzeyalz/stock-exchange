import axios from 'axios';
const dataFuncs = {
    fetchPortfolio: (api, self)=>{
        return fetch(`${api}/portfolio`)
        .then(response => response.json())
        .then((portData) => {
            self.portData = portData
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
               .then((price) => {func(price.stocks.length && parseFloat(price.stocks[0].currentPrice))})
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
                    ((elem1, array)=>UpdatePointer(elem1,array))(myStocks[i], data.stocks)
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
    },
    sort:(sortedBy, arr)=>{
        let sortAvailableBy;
        function biggerFirst(a,b){
            if(a>b){
                return 1;}
              else if(a<b){
                return -1;} else{
                  return 0
                }
            }
        if(sortedBy.direction){
          sortAvailableBy = [...arr.sort((a,b)=> {
              return biggerFirst(a[sortedBy.filter],b[sortedBy.filter])
            })]
        } else{
            sortAvailableBy = [...arr.sort((a,b)=> {
                return biggerFirst(b[sortedBy.filter], a[sortedBy.filter])
              })]
        }
        return sortAvailableBy;
    }
}

export default dataFuncs;