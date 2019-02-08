import { FILTER_AVAILABLE_STOCKS, SORT_AVAILABLE_STOCKS, SORT_PORTFOLIO_STOCKS, UPDATE_PORTFOLIO, UPDATE_AVAILABLE, RESET,
  REMOVE_AVAILABLE } from './../constants/stockActions';
const initialState = {
      "stocks": [],
      "filteredStocks":[],
      "lastAvaiableSortedBy":"",
      "lastPortfolioSortedBy":"",
      "availableStocks":[],
      "api":"http://int.v2x.foresightauto.com/stock-exchange-service",
      "filterVal":"",
      "funds":0
};

const reducer = (state = initialState, action) => {
    let { availableStocks, filteredStocks } = state;
    switch (action.type) {
        case FILTER_AVAILABLE_STOCKS:
            //filter from stock 
            filteredStocks = availableStocks.filter((elem)=>elem.symbol.toLocaleLowerCase().includes(action.val.toLocaleLowerCase()));
            for(let i=0; i<state.stocks.length; i++){
              filteredStocks = filteredStocks.filter(elem=>elem.symbol!==state.stocks[i].symbol)
          }
            return {
                ...state,
                filteredStocks:[...filteredStocks],
                lastAvaiableSortedBy:"",
                filterVal:action.val
            }
          case SORT_AVAILABLE_STOCKS:
              let {lastAvaiableSortedBy} = state;
              //Ascending and descending sort - when click twice on same val - it opposes
              if(lastAvaiableSortedBy && lastAvaiableSortedBy.filter===action.filterBy){
                lastAvaiableSortedBy.direction=!lastAvaiableSortedBy.direction
              }else{
                lastAvaiableSortedBy = {
                  filter:action.filterBy,
                  direction:true
                }
              }
              let sortAvailableBy;
              if(lastAvaiableSortedBy.direction){
                sortAvailableBy = [...filteredStocks.sort((a,b)=> {
                  if(a[action.filterBy]>b[action.filterBy]){
                      return 1;}
                    else if(a[action.filterBy]<b[action.filterBy]){
                      return -1;} else{
                        return 0
                      }
                  })
                ]
              } else{
                sortAvailableBy = [...filteredStocks.sort((a,b)=> {
                  if(a[action.filterBy]<b[action.filterBy]){
                      return 1;}
                    else if(a[action.filterBy]>b[action.filterBy]){
                      return -1;} else{
                        return 0
                      }
                  })]
              }
              return {
                ...state,
                filteredStocks:sortAvailableBy,
                lastAvaiableSortedBy:lastAvaiableSortedBy
              }
            case UPDATE_PORTFOLIO:
              let newStocks = action.stocks.myStocks;
              return {
                ...state,
                stocks:[...newStocks],
                funds:action.stocks.funds
              }
            case UPDATE_AVAILABLE:
              return {
                ...state,
                availableStocks:action.availableStocks,
                filteredStocks:action.availableStocks,
                funds: action.funds? action.funds:state.funds
              }
            case RESET:
              return {...state,
                filteredStocks:action.availableStocks,
                availableStocks:action.availableStocks,
                stocks:[]
              }
            case SORT_PORTFOLIO_STOCKS:
            let SortPortfolioStocks = state.stocks;
            let { lastPortfolioSortedBy } = state;
            //Ascending and descending sort - when click twice on same val - it opposes
            if(lastPortfolioSortedBy && lastPortfolioSortedBy.filter===action.filterBy){
              lastPortfolioSortedBy.direction=!lastPortfolioSortedBy.direction
            }else{
              lastPortfolioSortedBy = {
                filter:action.filterBy,
                direction:true
              }
            }
            let sortPortfolioBy;
            if(lastPortfolioSortedBy.direction){
              sortPortfolioBy = [...SortPortfolioStocks.sort((a,b)=> {
                if(a[action.filterBy]>b[action.filterBy]){
                    return 1;}
                  else if(a[action.filterBy]<b[action.filterBy]){
                    return -1;} else{
                      return 0
                    }
                })
              ]
            }else{
              sortPortfolioBy = [...SortPortfolioStocks.sort((a,b)=> {
                if(a[action.filterBy]<b[action.filterBy]){
                    return 1;}
                  else if(a[action.filterBy]>b[action.filterBy]){
                    return -1;} else{
                      return 0
                    }
                })]
            }
              return {
                ...state,
                stocks:sortPortfolioBy,
                lastPortfolioSortedBy:lastPortfolioSortedBy
              }
            case REMOVE_AVAILABLE:
                filteredStocks = availableStocks.filter((elem)=>elem.symbol.toLocaleLowerCase().includes(state.filterVal.toLocaleLowerCase()));
                let removedAvailable = filteredStocks;
                removedAvailable = removedAvailable.filter((elem)=>elem.symbol!==action.symbol)
                return {...state,
                  availableStocks:[...removedAvailable]
                }

             default:
              return {...state}
    }

};

export default reducer;