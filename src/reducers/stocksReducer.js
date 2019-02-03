import { FILTER_AVAILABLE_STOCKS } from './../constants/stockActions';

const initialState = {
    "stocks": [
        {
          "symbol": "AMZN",
          "name": "Amazon",
          "startOfCommerce": "1997-05-16T00:00Z",
          "currentPrice": 426.92953
        },
        {
          "symbol": "APPL",
          "name": "Apple Inc",
          "startOfCommerce": "1980-12-01T00:00Z",
          "currentPrice": 207.52
        },
        {
          "symbol": "BB",
          "name": "BlackBerry Ltd",
          "startOfCommerce": "1999-02-05T00:00Z",
          "currentPrice": 440.80032
        },
        {
          "symbol": "KO",
          "name": "Coca-Cola Co",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 156.80779
        },
        {
          "symbol": "DIS",
          "name": "Disney Co",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 329.03464
        },
        {
          "symbol": "FB",
          "name": "Facebook, Inc",
          "startOfCommerce": "2012-05-18T00:00Z",
          "currentPrice": 413.75888
        },
        {
          "symbol": "FRSX",
          "name": "Foresight Autonomous Holdings Ltd.",
          "startOfCommerce": "2015-05-18T00:00Z",
          "currentPrice": 229.4951
        },
        {
          "symbol": "GE",
          "name": "General Electric Company",
          "startOfCommerce": "1962-01-01T00:00Z",
          "currentPrice": 466.47034
        },
        {
          "symbol": "GOOGL",
          "name": "Google, Inc",
          "startOfCommerce": "2004-08-20T00:00Z",
          "currentPrice": 180.53412
        },
        {
          "symbol": "HD",
          "name": "Home Depot Inc",
          "startOfCommerce": "1981-09-25T00:00Z",
          "currentPrice": 254.50012
        },
        {
          "symbol": "IBM",
          "name": "IBM Common Stock",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 100.69971
        },
        {
          "symbol": "INTC",
          "name": "Intel Corporation",
          "startOfCommerce": "1980-03-01T00:00Z",
          "currentPrice": 417.39267
        },
        {
          "symbol": "JPM",
          "name": "JPMorgan Chase & Co",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 444.7436
        },
        {
          "symbol": "LL",
          "name": "Lumber Liquidators Holdings Inc",
          "startOfCommerce": "2007-11-09T00:00Z",
          "currentPrice": 226.10825
        },
        {
          "symbol": "MCD",
          "name": "McDonald's Corporation",
          "startOfCommerce": "1970-01-01T00:00Z",
          "currentPrice": 443.6451
        },
        {
          "symbol": "MSFT",
          "name": "Microsoft Corporation",
          "startOfCommerce": "1986-03-01T00:00Z",
          "currentPrice": 208.8521
        },
        {
          "symbol": "NFLX",
          "name": "Netflix, Inc.",
          "startOfCommerce": "2002-05-24T00:00Z",
          "currentPrice": 199.61578
        },
        {
          "symbol": "OXY",
          "name": "Occidental Petroleum Corporation",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 381.9681
        },
        {
          "symbol": "PYPL",
          "name": "Paypal Holdings Inc",
          "startOfCommerce": "2015-07-10T00:00Z",
          "currentPrice": 144.09904
        },
        {
          "symbol": "RDSA",
          "name": "Royal Dutch Shell",
          "startOfCommerce": "2015-07-22T00:00Z",
          "currentPrice": 409.70688
        },
        {
          "symbol": "SNY",
          "name": "Sony Corp",
          "startOfCommerce": "2000-01-07T00:00Z",
          "currentPrice": 475.84506
        },
        {
          "symbol": "TSLA",
          "name": "Tesla Inc",
          "startOfCommerce": "2010-06-01T00:00Z",
          "currentPrice": 312.1167
        },
        {
          "symbol": "VOW3",
          "name": "Volkswagen",
          "startOfCommerce": "1998-07-24T00:00Z",
          "currentPrice": 123.16246
        },
        {
          "symbol": "WMT",
          "name": "Wal-Mart Stores Inc",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 428.16293
        },
        {
          "symbol": "XRX",
          "name": "Xerox Corp",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 194.0536
        },
        {
          "symbol": "ZNGA",
          "name": "Zynga Inc",
          "startOfCommerce": "2011-12-16T00:00Z",
          "currentPrice": 385.09964
        },
        {
          "symbol": "EBAY",
          "name": "eBay Inc",
          "startOfCommerce": "1998-09-25T00:00Z",
          "currentPrice": 191.41565
        }
      ],
      "myStocks":[],
      "availableStocks": [
        {
          "symbol": "AMZN",
          "name": "Amazon",
          "startOfCommerce": "1997-05-16T00:00Z",
          "currentPrice": 426.92953
        },
        {
          "symbol": "APPL",
          "name": "Apple Inc",
          "startOfCommerce": "1980-12-01T00:00Z",
          "currentPrice": 207.52
        },
        {
          "symbol": "BB",
          "name": "BlackBerry Ltd",
          "startOfCommerce": "1999-02-05T00:00Z",
          "currentPrice": 440.80032
        },
        {
          "symbol": "KO",
          "name": "Coca-Cola Co",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 156.80779
        },
        {
          "symbol": "DIS",
          "name": "Disney Co",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 329.03464
        },
        {
          "symbol": "FB",
          "name": "Facebook, Inc",
          "startOfCommerce": "2012-05-18T00:00Z",
          "currentPrice": 413.75888
        },
        {
          "symbol": "FRSX",
          "name": "Foresight Autonomous Holdings Ltd.",
          "startOfCommerce": "2015-05-18T00:00Z",
          "currentPrice": 229.4951
        },
        {
          "symbol": "GE",
          "name": "General Electric Company",
          "startOfCommerce": "1962-01-01T00:00Z",
          "currentPrice": 466.47034
        },
        {
          "symbol": "GOOGL",
          "name": "Google, Inc",
          "startOfCommerce": "2004-08-20T00:00Z",
          "currentPrice": 180.53412
        },
        {
          "symbol": "HD",
          "name": "Home Depot Inc",
          "startOfCommerce": "1981-09-25T00:00Z",
          "currentPrice": 254.50012
        },
        {
          "symbol": "IBM",
          "name": "IBM Common Stock",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 100.69971
        },
        {
          "symbol": "INTC",
          "name": "Intel Corporation",
          "startOfCommerce": "1980-03-01T00:00Z",
          "currentPrice": 417.39267
        },
        {
          "symbol": "JPM",
          "name": "JPMorgan Chase & Co",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 444.7436
        },
        {
          "symbol": "LL",
          "name": "Lumber Liquidators Holdings Inc",
          "startOfCommerce": "2007-11-09T00:00Z",
          "currentPrice": 226.10825
        },
        {
          "symbol": "MCD",
          "name": "McDonald's Corporation",
          "startOfCommerce": "1970-01-01T00:00Z",
          "currentPrice": 443.6451
        },
        {
          "symbol": "MSFT",
          "name": "Microsoft Corporation",
          "startOfCommerce": "1986-03-01T00:00Z",
          "currentPrice": 208.8521
        },
        {
          "symbol": "NFLX",
          "name": "Netflix, Inc.",
          "startOfCommerce": "2002-05-24T00:00Z",
          "currentPrice": 199.61578
        },
        {
          "symbol": "OXY",
          "name": "Occidental Petroleum Corporation",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 381.9681
        },
        {
          "symbol": "PYPL",
          "name": "Paypal Holdings Inc",
          "startOfCommerce": "2015-07-10T00:00Z",
          "currentPrice": 144.09904
        },
        {
          "symbol": "RDSA",
          "name": "Royal Dutch Shell",
          "startOfCommerce": "2015-07-22T00:00Z",
          "currentPrice": 409.70688
        },
        {
          "symbol": "SNY",
          "name": "Sony Corp",
          "startOfCommerce": "2000-01-07T00:00Z",
          "currentPrice": 475.84506
        },
        {
          "symbol": "TSLA",
          "name": "Tesla Inc",
          "startOfCommerce": "2010-06-01T00:00Z",
          "currentPrice": 312.1167
        },
        {
          "symbol": "VOW3",
          "name": "Volkswagen",
          "startOfCommerce": "1998-07-24T00:00Z",
          "currentPrice": 123.16246
        },
        {
          "symbol": "WMT",
          "name": "Wal-Mart Stores Inc",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 428.16293
        },
        {
          "symbol": "XRX",
          "name": "Xerox Corp",
          "startOfCommerce": "1977-12-23T00:00Z",
          "currentPrice": 194.0536
        },
        {
          "symbol": "ZNGA",
          "name": "Zynga Inc",
          "startOfCommerce": "2011-12-16T00:00Z",
          "currentPrice": 385.09964
        },
        {
          "symbol": "EBAY",
          "name": "eBay Inc",
          "startOfCommerce": "1998-09-25T00:00Z",
          "currentPrice": 191.41565
        }
      ],
      "filteredStocks":[]
};

const reducer = (state = initialState, action) => {
    let { stocks, availableStocks } = state;
    switch (action.type) {
        case FILTER_AVAILABLE_STOCKS:
            //filter from stock 
            let filteredStocks = availableStocks.filter((elem)=>elem.symbol.toLocaleLowerCase().includes(action.val.toLocaleLowerCase()));
            console.log(filteredStocks)
            return {
                ...state,
                filteredStocks:filteredStocks
            }
    }
    return state;
};

export default reducer;