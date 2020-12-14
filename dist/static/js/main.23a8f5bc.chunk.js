(this["webpackJsonpbtc-app-ts"]=this["webpackJsonpbtc-app-ts"]||[]).push([[0],{15:function(t,e,r){},17:function(t,e,r){},18:function(t,e,r){"use strict";r.r(e);var n=r(0),s=r(3),i=r.n(s),o=r(9),a=r.n(o),c=(r(15),r(2)),u=r.n(c),l=r(4),h=r(1),p=r(5),d=r(7),b=r(6),C=function t(){Object(h.a)(this,t),this.ask="-",this.bid="-",this.last="-",this.open="-",this.low="-",this.high="-",this.volume="-",this.volumeQuote="-",this.timestamp="-",this.symbol=void 0},f=(r(17),function t(){Object(h.a)(this,t),this.bidChangedUp=!1,this.askChangedUp=!1,this.highChangedUp=!1,this.lowChangedUp=!1,this.lastChangedUp=!1,this.bidChangedDown=!1,this.askChangedDown=!1,this.highChangedDown=!1,this.lowChangedDown=!1,this.lastChangedDown=!1}),g=function(t){Object(d.a)(r,t);var e=Object(b.a)(r);function r(t){var n;return Object(h.a)(this,r),(n=e.call(this,t)).label=void 0,n.prevValue=null,n.resetState(),n.label=n.props.symbolData.baseCurrency+"/"+n.props.symbolData.quoteCurrency,n}return Object(p.a)(r,[{key:"componentDidUpdate",value:function(t){var e=this;JSON.stringify(this.props)!==JSON.stringify(t)&&(this.detectChanges(this.props,t),setTimeout((function(){e.resetState(),e.setState(e.state)}),200))}},{key:"resetState",value:function(){this.state=new f}},{key:"detectChanges",value:function(t,e){this.setState({bidChangedUp:parseFloat(t.currentValue.bid)>parseFloat(e.currentValue.bid),askChangedUp:parseFloat(t.currentValue.ask)>parseFloat(e.currentValue.ask),highChangedUp:parseFloat(t.currentValue.high)>parseFloat(e.currentValue.high),lowChangedUp:parseFloat(t.currentValue.low)>parseFloat(e.currentValue.low),lastChangedUp:parseFloat(t.currentValue.last)>parseFloat(e.currentValue.last),bidChangedDown:parseFloat(t.currentValue.bid)<parseFloat(e.currentValue.bid),askChangedDown:parseFloat(t.currentValue.ask)<parseFloat(e.currentValue.ask),highChangedDown:parseFloat(t.currentValue.high)<parseFloat(e.currentValue.high),lowChangedDown:parseFloat(t.currentValue.low)<parseFloat(e.currentValue.low),lastChangedDown:parseFloat(t.currentValue.last)<parseFloat(e.currentValue.last)})}},{key:"checkIfComponentChanged",value:function(){return JSON.stringify(this.props.currentValue)!==JSON.stringify(this.prevValue)}},{key:"getPropClassName",value:function(t){if("bid"===t){if(this.state.bidChangedUp)return"changed-up";if(this.state.bidChangedDown)return"changed-down"}if("ask"===t){if(this.state.askChangedUp)return"changed-up";if(this.state.askChangedDown)return"changed-down"}if("high"===t){if(this.state.highChangedUp)return"changed-up";if(this.state.highChangedDown)return"changed-down"}if("low"===t){if(this.state.lowChangedUp)return"changed-up";if(this.state.lowChangedDown)return"changed-down"}if("last"===t){if(this.state.lastChangedUp)return"changed-up";if(this.state.lastChangedDown)return"changed-down"}return""}},{key:"render",value:function(){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:this.label}),Object(n.jsx)("td",{className:this.getPropClassName("bid"),children:this.props.currentValue.bid?this.props.currentValue.bid:"-"}),Object(n.jsx)("td",{className:this.getPropClassName("ask"),children:this.props.currentValue.ask?this.props.currentValue.ask:"-"}),Object(n.jsx)("td",{className:this.getPropClassName("high"),children:this.props.currentValue.high?this.props.currentValue.high:"-"}),Object(n.jsx)("td",{className:this.getPropClassName("low"),children:this.props.currentValue.low?this.props.currentValue.low:"-"}),Object(n.jsx)("td",{className:this.getPropClassName("last"),children:this.props.currentValue.last?this.props.currentValue.last:"-"})]})}}]),r}(i.a.Component),m=function t(){Object(h.a)(this,t),this.symbolData=void 0,this.currentValue=void 0},k=function t(){Object(h.a)(this,t),this.sortColumn=null,this.sortDirectionUp=!0},y=function(t){Object(d.a)(r,t);var e=Object(b.a)(r);function r(t){var n;return Object(h.a)(this,r),(n=e.call(this,t)).socketConnection=null,n.currenciesList=[],n.currenciesListToDisplay=[],n.timerID=void 0,n.currentSort=void 0,n.colorState=null,n.sliceCurrenciesByLastNumber=null,n.state=null,n.currentSort=new k,n}return Object(p.a)(r,[{key:"componentDidMount",value:function(){var t=Object(l.a)(u.a.mark((function t(){var e=this;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.initSocketConnection();case 2:return t.next=4,this.getCurrenciesList();case 4:this.currenciesList=t.sent,this.currenciesList.forEach((function(t){e.sendSubscribeRequest({method:"subscribeTicker",params:{symbol:t.symbolData.id},id:123},(function(t){var r=JSON.parse(t.data).params;void 0!==r&&e.currenciesList.forEach((function(t){t.symbolData.id===r.symbol&&(t.currentValue=r)}))}))})),this.timerID=setInterval((function(){return e.tick()}),200);case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"getCurrenciesList",value:function(){var t=Object(l.a)(u.a.mark((function t(){var e,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.sendDataRequest({method:"getSymbols",params:{symbol:"ETHBTC"},id:123});case 2:return e=t.sent,r=e.result,t.abrupt("return",r.map((function(t){var e=new m;return e.symbolData=t,e.currentValue=new C,e.currentValue.symbol=t.id,e})));case 5:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"initSocketConnection",value:function(){var t=Object(l.a)(u.a.mark((function t(){var e=this;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,r){e.socketConnection=new WebSocket("wss://api.exchange.bitcoin.com/api/2/ws"),e.socketConnection.addEventListener("error",(function(t){console.error(t)})),e.socketConnection.onopen=function(){t(e.socketConnection)},e.socketConnection.onclose=function(t){r(t)}})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"sendDataRequest",value:function(){var t=Object(l.a)(u.a.mark((function t(e){var r=this;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,n){r.socketConnection.onmessage=function(e){t(JSON.parse(e.data))},r.socketConnection.onerror=function(t){n(t)},r.socketConnection.send(JSON.stringify(e))})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"sendSubscribeRequest",value:function(t,e){this.socketConnection.onmessage=function(t){e(t)},this.socketConnection.send(JSON.stringify(t))}},{key:"tick",value:function(){this.sliceCurrenciesByLastNumber>0?this.currenciesListToDisplay=this.sliceCurrenciesListByLast(this.sliceCurrenciesByLastNumber):this.currenciesListToDisplay=this.currenciesList,this.sortCurrenciesListByCurrentSort(),this.setState(this.currenciesList)}},{key:"sliceCurrenciesListByLast",value:function(t){return this.currenciesList.sort((function(t,e){return parseFloat(t.currentValue.last)>parseFloat(e.currentValue.last)?-1:1})),this.currenciesList.slice(0,t)}},{key:"sortCurrenciesListByCurrentSort",value:function(){var t=this;this.currenciesListToDisplay.sort((function(e,r){return"ticker"===t.currentSort.sortColumn?e.currentValue.symbol>r.currentValue.symbol?t.currentSort.sortDirectionUp?1:-1:t.currentSort.sortDirectionUp?-1:1:"bid"===t.currentSort.sortColumn?parseFloat(e.currentValue.bid)>parseFloat(r.currentValue.bid)?t.currentSort.sortDirectionUp?1:-1:t.currentSort.sortDirectionUp?-1:1:"ask"===t.currentSort.sortColumn?parseFloat(e.currentValue.ask)>parseFloat(r.currentValue.ask)?t.currentSort.sortDirectionUp?1:-1:t.currentSort.sortDirectionUp?-1:1:"high"===t.currentSort.sortColumn?parseFloat(e.currentValue.high)>parseFloat(r.currentValue.high)?t.currentSort.sortDirectionUp?1:-1:t.currentSort.sortDirectionUp?-1:1:"low"===t.currentSort.sortColumn?parseFloat(e.currentValue.low)>parseFloat(r.currentValue.low)?t.currentSort.sortDirectionUp?1:-1:t.currentSort.sortDirectionUp?-1:1:"last"===t.currentSort.sortColumn?parseFloat(e.currentValue.last)>parseFloat(r.currentValue.last)?t.currentSort.sortDirectionUp?1:-1:t.currentSort.sortDirectionUp?-1:1:0}))}},{key:"setSortBy",value:function(t){this.currentSort.sortColumn===t&&(this.currentSort.sortDirectionUp=!this.currentSort.sortDirectionUp),this.currentSort.sortColumn=t}},{key:"getColumnSortArrow",value:function(t){return t===this.currentSort.sortColumn?this.currentSort.sortDirectionUp?"\u25b2":"\u25bc":""}},{key:"getTableClass",value:function(){return"light"===this.colorState?"":"wrap-colors"}},{key:"wrapColors",value:function(){"light"===this.colorState?this.colorState="dark":this.colorState="light"}},{key:"setShowAll",value:function(){this.sliceCurrenciesByLastNumber=null}},{key:"setShowTop50ByLast",value:function(){this.sliceCurrenciesByLastNumber=50}},{key:"render",value:function(){var t=this;return Object(n.jsxs)("div",{children:[Object(n.jsx)("button",{onClick:function(){return t.wrapColors()},children:"Wrap colors"}),Object(n.jsx)("button",{onClick:function(){return t.setShowAll()},children:"Show all"}),Object(n.jsx)("button",{onClick:function(){return t.setShowTop50ByLast()},children:"Show top 50 by Last"}),Object(n.jsxs)("table",{className:this.getTableClass(),children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsxs)("th",{onClick:function(){return t.setSortBy("ticker")},children:["Ticker ",this.getColumnSortArrow("ticker")]}),Object(n.jsxs)("th",{onClick:function(){return t.setSortBy("bid")},children:["Bid ",this.getColumnSortArrow("bid")]}),Object(n.jsxs)("th",{onClick:function(){return t.setSortBy("ask")},children:["Ask ",this.getColumnSortArrow("ask")]}),Object(n.jsxs)("th",{onClick:function(){return t.setSortBy("high")},children:["High ",this.getColumnSortArrow("high")]}),Object(n.jsxs)("th",{onClick:function(){return t.setSortBy("low")},children:["Low ",this.getColumnSortArrow("low")]}),Object(n.jsxs)("th",{onClick:function(){return t.setSortBy("last")},children:["Last ",this.getColumnSortArrow("last")]})]})}),Object(n.jsx)("tbody",{children:this.currenciesListToDisplay.map((function(t){return Object(n.jsx)(g,{symbolData:t.symbolData,currentValue:t.currentValue},t.symbolData.id)}))})]})]})}}]),r}(i.a.Component),w=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,19)).then((function(e){var r=e.getCLS,n=e.getFID,s=e.getFCP,i=e.getLCP,o=e.getTTFB;r(t),n(t),s(t),i(t),o(t)}))};a.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(y,{})}),document.getElementById("root")),w()}},[[18,1,2]]]);
//# sourceMappingURL=main.23a8f5bc.chunk.js.map