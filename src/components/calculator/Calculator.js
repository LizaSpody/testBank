import React from 'react';
import style from "./calculator.module.scss";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.list,
            listBank: [],
            item: [],
            loan: 0,
            payment: 0,
            formula: 0,
        }
        this.changeInput = this.changeInput.bind(this);
        this.formula = this.formula.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    formula(item) {
        debugger
        let bank = item[0];
        let borrewed = this.state.loan - this.state.payment;
        let rate = bank.rate / 100;
        let month = bank.max * 12;
        let monthly = ((borrewed * (rate / 12)) * Math.pow((1 + (rate / 12)), month)) / ((Math.pow((1 + (rate / 12)), month)) - 1)
        this.setState(()=>({
            formula: monthly.toFixed(2)
        }))
    }

    selectItem(e) {
        let item = this.state.listBank.filter((item)=>{
            return item.name === e.target.value;
        })
        this.formula(item)
    }

    changeInput() {
        let payment = document.querySelector('[data-item="payment"]');
        let loan = document.querySelector('[data-item="loan"]');
        let paymentValue;
        let loanValue;
        if(payment === null || loan === null ) {
            payment = 0;
            loan = 0;
        }
        else {
            paymentValue = payment.value;
            loanValue = loan.value;
        }
        payment.value = payment.value.replace(/[^\d]/g,'');
        loan.value = loan.value.replace(/[^\d]/g,'');
        let listOpion = this.state.info.filter((item)=>{
            return (Number(loanValue) > 0) && (Number(item.min) <= Number(paymentValue)) && (Number(item.loan) >= Number(loanValue)) && (Number(item.loan) > Number(item.min))
        });
        this.setState(()=>({
            listBank: listOpion,
            payment: paymentValue,
            loan: loanValue
        }))
    }

    render() {
        return (
            <React.Fragment>
                <h1 className={style.title}>Сalculator</h1>
                <div className={style.calculator}>
                    <label>
                        Initial loan
                        <input onChange={this.changeInput} data-item="loan" type="text" placeholder="Initial loan"/>
                    </label>
                    <label>
                        Down payment
                        <input onChange={this.changeInput} data-item="payment" type="text" placeholder="Down payment"/>
                    </label>
                    <label>
                        Select bank
                        <select  defaultValue={'DEFAULT'} name="" id="">
                            <option value="DEFAULT" disabled>Choose a bank</option>
                            {this.state.listBank.map((item, id)=>{
                                return <option onClick={this.selectItem} key={id}>{item.name}</option>
                            })}
                        </select>
                    </label>

                </div>
                <h3>Monthly payment: <span>{this.state.formula}</span></h3>
            </React.Fragment>
        );
    }
}

export default Calculator;
