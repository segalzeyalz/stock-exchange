import { FILTER_AVAILABLE_STOCKS, SORT_AVAILABLE_STOCKS, SORT_PORTFOLIO_STOCKS, UPDATE_PORTFOLIO, UPDATE_AVAILABLE } from './../constants/stockActions';
const initialState = {
      "stocks": [],
      "filteredStocks":[],
      "lastAvaiableSortedBy":"",
      "availableStocks":[],
      "api":"http://int.v2x.foresightauto.com/stock-exchange-service"
};

const reducer = (state = initialState, action) => {
    let { stocks, availableStocks, filteredStocks } = state;
    switch (action.type) {
        case FILTER_AVAILABLE_STOCKS:
            //filter from stock 
            filteredStocks = availableStocks.filter((elem)=>elem.symbol.toLocaleLowerCase().includes(action.val.toLocaleLowerCase()));
            return {
                ...state,
                filteredStocks:filteredStocks,
                lastAvaiableSortedBy:""
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
              }else{
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
              let newStocks = action.stocks.myStocks
              return {
                ...state,
                stocks:newStocks
              }
            case UPDATE_AVAILABLE:
              return {
                ...state,
                availableStocks:action.availableStocks,
                filteredStocks:action.availableStocks
              }
    }

    return state;
};

export default reducer;