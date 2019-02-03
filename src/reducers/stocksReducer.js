import { FILTER_AVAILABLE_STOCKS, SORT_AVAILABLE_STOCKS, SORT_PORTFOLIO_STOCKS, UPDATE_PORTFOLIO } from './../constants/stockActions';
const initialState = {
      "stocks": [],
      "filteredStocks":[],
      "lastAvaiableSortedBy":""
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
                sortAvailableBy = [...filteredStocks.sort((a,b)=> {return a[action.filterBy]-b[action.filterBy]})]
              }else{
                sortAvailableBy = [...filteredStocks.sort((a,b)=> {return b[action.filterBy]-a[action.filterBy]})]
              }
              return {
                ...state,
                filteredStocks:sortAvailableBy,
                lastAvaiableSortedBy:lastAvaiableSortedBy
              }
            case UPDATE_PORTFOLIO:
              let newStocks = action.stocks.myStocks
              console.log(newStocks)
            return {
              ...state,
              stocks:newStocks
            }

    }

    return state;
};

export default reducer;