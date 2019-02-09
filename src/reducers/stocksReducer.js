import { SEARCH, SORT_AVAILABLE_STOCKS, SORT_PORTFOLIO_STOCKS, UPDATE_PORTFOLIO, RESET,
  REMOVE_AVAILABLE, RELOAD, UPDATE_FUNDS } from './../constants/stockActions';
  import dataFuncs from './../constants/dataFuncs';
const initialState = {
      "stocks": [],
      "filteredStocks":[],
      "lastAvaiableSortedBy":"",
      "lastPortfolioSortedBy":"",
      "api":"http://int.v2x.foresightauto.com/stock-exchange-service",
      "filterVal":"",
      "funds":10000
};

const reducer = (state = initialState, action) => {
    let { filteredStocks } = state;
    switch (action.type) {
        case SEARCH:
            //filter from stock 
            return {
                ...state,
                filterVal:action.val,
                filteredStocks:[...action.stocks]
            }
          case RELOAD:
            return {
              ...state,
              filteredStocks:action.filteredStocks,
              stocks:action.stocks,
              funds:action.funds
            }
          case SORT_AVAILABLE_STOCKS:
              let { lastAvaiableSortedBy } = state;
              //Ascending and descending sort - when click twice on same val - it opposes
              if(lastAvaiableSortedBy && lastAvaiableSortedBy.filter===action.filterBy){
                lastAvaiableSortedBy.direction=!lastAvaiableSortedBy.direction
              }else{
                lastAvaiableSortedBy = {
                  filter:action.filterBy,
                  direction:true
                }
              }
              let sortAvailableBy = dataFuncs.sort(lastAvaiableSortedBy,[...state.filteredStocks])
              return {
                ...state,
                filteredStocks:sortAvailableBy,
                lastAvaiableSortedBy:lastAvaiableSortedBy
              }
              case SORT_PORTFOLIO_STOCKS:
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
                let sortPortfolioBy = dataFuncs.sort(lastPortfolioSortedBy,[...state.stocks]);
                return {
                  ...state,
                  stocks:sortPortfolioBy,
                  lastPortfolioSortedBy:lastPortfolioSortedBy
                }
            case UPDATE_PORTFOLIO:
              let newStocks = action.stocks.myStocks;
              return {
                ...state,
                stocks:[...newStocks],
                funds:action.stocks.funds
              }
            case RESET:
              return {...state,
                filteredStocks:action.availableStocks,
                stocks:[],
                "lastAvaiableSortedBy":"",
                "lastPortfolioSortedBy":"",
                "filterVal":"",
                "funds":0
              }
            case REMOVE_AVAILABLE:
                filteredStocks = [...state.filteredStocks].filter((elem)=>elem.symbol.toLocaleLowerCase().includes(state.filterVal.toLocaleLowerCase()));
                let removedAvailable = filteredStocks;
                removedAvailable = removedAvailable.filter((elem)=>elem.symbol!==action.symbol)
                return {...state,
                  availableStocks:[...removedAvailable]
                }
              case UPDATE_FUNDS:
                return {...state,
                        funds:action.funds}

             default:
              return {...state}
    }

};

export default reducer;