import React from 'react';
import {CurrencyItem} from "./types/currency-item";
import './QuotationString.css';
import {QuotationStringState} from "./types/quotation-string-state";

class QuotationString extends React.Component<CurrencyItem, QuotationStringState> {

    private label: string;

    private prevValue: any = null;

    constructor(props: CurrencyItem) {
        super(props);

        this.resetState();

        this.label = this.props.symbolData.baseCurrency + '/' + this.props.symbolData.quoteCurrency;
    }

    componentDidUpdate(prevProps: any) {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            this.detectChanges(this.props, prevProps);

            setTimeout(() => {
                this.resetState();
                this.setState(this.state);
            }, 200);
        }
    }

    resetState() {
        this.state = new QuotationStringState();
    }

    detectChanges(currentProps: CurrencyItem, prevProps: CurrencyItem) {
        this.setState({
            bidChangedUp: parseFloat(currentProps.currentValue.bid) > parseFloat(prevProps.currentValue.bid),
            askChangedUp: parseFloat(currentProps.currentValue.ask) > parseFloat(prevProps.currentValue.ask),
            highChangedUp: parseFloat(currentProps.currentValue.high) > parseFloat(prevProps.currentValue.high),
            lowChangedUp: parseFloat(currentProps.currentValue.low) > parseFloat(prevProps.currentValue.low),
            lastChangedUp: parseFloat(currentProps.currentValue.last) > parseFloat(prevProps.currentValue.last),
            bidChangedDown: parseFloat(currentProps.currentValue.bid) < parseFloat(prevProps.currentValue.bid),
            askChangedDown: parseFloat(currentProps.currentValue.ask) < parseFloat(prevProps.currentValue.ask),
            highChangedDown: parseFloat(currentProps.currentValue.high) < parseFloat(prevProps.currentValue.high),
            lowChangedDown: parseFloat(currentProps.currentValue.low) < parseFloat(prevProps.currentValue.low),
            lastChangedDown: parseFloat(currentProps.currentValue.last) < parseFloat(prevProps.currentValue.last)
        });
    }

    checkIfComponentChanged() {
        return JSON.stringify(this.props.currentValue) !== JSON.stringify(this.prevValue);
    }

    getPropClassName(propName: string)
    {
        if (propName === 'bid') {
            if (this.state.bidChangedUp) {
                return "changed-up";
            }

            if (this.state.bidChangedDown) {
                return "changed-down";
            }
        }

        if (propName === 'ask') {
            if (this.state.askChangedUp) {
                return "changed-up";
            }

            if (this.state.askChangedDown) {
                return "changed-down";
            }
        }

        if (propName === 'high') {
            if (this.state.highChangedUp) {
                return "changed-up";
            }

            if (this.state.highChangedDown) {
                return "changed-down";
            }
        }

        if (propName === 'low') {
            if (this.state.lowChangedUp) {
                return "changed-up";
            }

            if (this.state.lowChangedDown) {
                return "changed-down";
            }
        }

        if (propName === 'last') {
            if (this.state.lastChangedUp) {
                return "changed-up";
            }

            if (this.state.lastChangedDown) {
                return "changed-down";
            }
        }

        return "";
    }

    render() {
        return (<tr>
            <td>{this.label}</td>
            <td className={this.getPropClassName('bid')}>{this.props.currentValue.bid ? this.props.currentValue.bid : '-'}</td>
            <td className={this.getPropClassName('ask')}>{this.props.currentValue.ask ? this.props.currentValue.ask : '-'}</td>
            <td className={this.getPropClassName('high')}>{this.props.currentValue.high ? this.props.currentValue.high : '-'}</td>
            <td className={this.getPropClassName('low')}>{this.props.currentValue.low ? this.props.currentValue.low : '-'}</td>
            <td className={this.getPropClassName('last')}>{this.props.currentValue.last ? this.props.currentValue.last : '-'}</td>
        </tr>);
    }
}

export default QuotationString;