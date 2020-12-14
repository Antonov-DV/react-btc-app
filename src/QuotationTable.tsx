import React from 'react';
import {TickerValue} from "./types/ticker-value";
import QuotationString from './QuotationString';
import {CurrencyItem} from "./types/currency-item";
import {SortState} from "./types/sort-state";

class QuotationTable extends React.Component {

    private socketConnection: WebSocket = null;
    private currenciesList: CurrencyItem[] = [];
    private currenciesListToDisplay: CurrencyItem[] = [];
    private timerID: any;

    private currentSort: SortState;
    private colorState: string = null;

    private sliceCurrenciesByLastNumber: number = null;

    constructor(props: any) {
        super(props);
        this.state = null;
        this.currentSort = new SortState();
    }

    async componentDidMount() {

        await this.initSocketConnection();

        this.currenciesList = await this.getCurrenciesList();

        this.currenciesList.forEach((currencyItem: CurrencyItem) => {
            this.sendSubscribeRequest({
                    "method": "subscribeTicker",
                    "params": {
                        "symbol": currencyItem.symbolData.id
                    },
                    "id": 123
                }, (data: any) => {

                    let messageData = JSON.parse(data.data).params as TickerValue;

                    if (messageData !== undefined) {

                        this.currenciesList.forEach(currencyItem => {
                            if (currencyItem.symbolData.id === messageData.symbol) {
                                currencyItem.currentValue = messageData;
                            }
                        });
                    }
                }
            );
        });

        this.timerID = setInterval(
            () => this.tick(),
            200
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    async getCurrenciesList() {
        let currenciesResponse = await this.sendDataRequest({
            "method": "getSymbols",
            "params": {
                "symbol": "ETHBTC"
            },
            "id": 123
        });

        let currenciesList = (currenciesResponse as any).result;

        return currenciesList.map((currencyObject: any) => {
            const item = new CurrencyItem();
            item.symbolData = currencyObject;
            item.currentValue = new TickerValue();
            item.currentValue.symbol = currencyObject.id;
            return item;
        });
    }

    async initSocketConnection() {

        return new Promise((resolve, reject) => {
            this.socketConnection = new WebSocket('wss://api.exchange.bitcoin.com/api/2/ws');

            this.socketConnection.addEventListener('error', (event) => {
                console.error(event);
            });

            this.socketConnection.onopen = () => {
                resolve(this.socketConnection)
            };
            this.socketConnection.onclose = (error) => {
                reject(error)
            };
        });
    }

    async sendDataRequest(requestObject: any) {
        return new Promise((resolve, reject) => {
            this.socketConnection.onmessage = (message) => {
                resolve(JSON.parse(message.data))
            };
            this.socketConnection.onerror = (error) => {
                reject(error)
            };

            this.socketConnection.send(JSON.stringify(requestObject));
        });
    }

    sendSubscribeRequest(requestObject: any, handlerFn: any) {
        this.socketConnection.onmessage = (data) => {
            handlerFn(data)
        };
        this.socketConnection.send(JSON.stringify(requestObject));
    }

    tick() {

        if (this.sliceCurrenciesByLastNumber > 0) {
            this.currenciesListToDisplay = this.sliceCurrenciesListByLast(this.sliceCurrenciesByLastNumber);
        } else {
            this.currenciesListToDisplay = this.currenciesList;
        }

        this.sortCurrenciesListByCurrentSort();

        this.setState(this.currenciesList);
    }

    sliceCurrenciesListByLast(size: number) {
        this.currenciesList.sort((a, b) => {
            if (parseFloat(a.currentValue.last) > parseFloat(b.currentValue.last)) {
                return -1;
            } else {
                return 1;
            }
        });

        return this.currenciesList.slice(0, size);
    }

    sortCurrenciesListByCurrentSort() {

        this.currenciesListToDisplay.sort((a, b) => {
            if (this.currentSort.sortColumn === 'ticker') {
                if (a.currentValue.symbol > b.currentValue.symbol) {
                    return this.currentSort.sortDirectionUp ? 1 : -1;
                } else {
                    return this.currentSort.sortDirectionUp ? -1 : 1;
                }
            }

            if (this.currentSort.sortColumn === 'bid') {
                if (parseFloat(a.currentValue.bid) > parseFloat(b.currentValue.bid)) {
                    return this.currentSort.sortDirectionUp ? 1 : -1;
                } else {
                    return this.currentSort.sortDirectionUp ? -1 : 1;
                }
            }

            if (this.currentSort.sortColumn === 'ask') {
                if (parseFloat(a.currentValue.ask) > parseFloat(b.currentValue.ask)) {
                    return this.currentSort.sortDirectionUp ? 1 : -1;
                } else {
                    return this.currentSort.sortDirectionUp ? -1 : 1;
                }
            }

            if (this.currentSort.sortColumn === 'high') {
                if (parseFloat(a.currentValue.high) > parseFloat(b.currentValue.high)) {
                    return this.currentSort.sortDirectionUp ? 1 : -1;
                } else {
                    return this.currentSort.sortDirectionUp ? -1 : 1;
                }
            }

            if (this.currentSort.sortColumn === 'low') {
                if (parseFloat(a.currentValue.low) > parseFloat(b.currentValue.low)) {
                    return this.currentSort.sortDirectionUp ? 1 : -1;
                } else {
                    return this.currentSort.sortDirectionUp ? -1 : 1;
                }
            }

            if (this.currentSort.sortColumn === 'last') {
                if (parseFloat(a.currentValue.last) > parseFloat(b.currentValue.last)) {
                    return this.currentSort.sortDirectionUp ? 1 : -1;
                } else {
                    return this.currentSort.sortDirectionUp ? -1 : 1;
                }
            }

            return 0;
        });
    }

    setSortBy(colName: string) {

        if (this.currentSort.sortColumn === colName) {
            this.currentSort.sortDirectionUp = !this.currentSort.sortDirectionUp;
        }

        this.currentSort.sortColumn = colName;
    }

    getColumnSortArrow(colName: string) {
        if (colName === this.currentSort.sortColumn) {

            if (this.currentSort.sortDirectionUp) {
                return '▲';
            }

            return '▼';
        }

        return '';
    }

    getTableClass() {
        if (this.colorState === "light") {
            return "";
        }

        return "wrap-colors";
    }

    wrapColors() {
        if (this.colorState === "light") {
            this.colorState = "dark";
        } else {
            this.colorState = "light";
        }
    }

    setShowAll() {
        this.sliceCurrenciesByLastNumber = null;
    }

    setShowTop50ByLast() {
        this.sliceCurrenciesByLastNumber = 50;
    }

    render() {
        return (
            <div>
                <button onClick={()=>this.wrapColors()}>Wrap colors</button>
                <button onClick={()=>this.setShowAll()}>Show all</button>
                <button onClick={()=>this.setShowTop50ByLast()}>Show top 50 by Last</button>
                <table className={this.getTableClass()}>
                    <thead>
                    <tr>
                        <th onClick={() => this.setSortBy('ticker')}>Ticker {this.getColumnSortArrow('ticker')}</th>
                        <th onClick={() => this.setSortBy('bid')}>Bid {this.getColumnSortArrow('bid')}</th>
                        <th onClick={() => this.setSortBy('ask')}>Ask {this.getColumnSortArrow('ask')}</th>
                        <th onClick={() => this.setSortBy('high')}>High {this.getColumnSortArrow('high')}</th>
                        <th onClick={() => this.setSortBy('low')}>Low {this.getColumnSortArrow('low')}</th>
                        <th onClick={() => this.setSortBy('last')}>Last {this.getColumnSortArrow('last')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.currenciesListToDisplay.map(currencyItem => {
                        return (<QuotationString key={currencyItem.symbolData.id}
                                                 symbolData={currencyItem.symbolData}
                                                 currentValue={currencyItem.currentValue}></QuotationString>)
                    })}
                    </tbody>
                </table>
            </div>);
    }
}

export default QuotationTable;