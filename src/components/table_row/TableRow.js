import React from 'react';
import style from './tableRow.module.scss'

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
        this.changeItem = this.changeItem.bind(this);
    }

    handleClick(e) {
        let el = e.target;
        let value = el.innerHTML;
        el.innerHTML = '<input />';
        let input = el.querySelector('input');
        if( el.getAttribute('type') === 'procent' ) {
            input.setAttribute('type', 'number');
            input.setAttribute('min', '0');
            input.setAttribute('max', '100');
            input.value = value;
            if(input) {
                input.addEventListener('change', ()=>{
                    if(input.value > 100) {
                        input.value = 100;
                    }
                })
            }
        }
        else if(el.getAttribute('type') === 'number') {
            input.setAttribute('type', 'number');
            input.setAttribute('min', '0');
            input.value = value;
            input.addEventListener('change', ()=>{
                if(input.value === '') {
                    input.value = 0;
                }
            })
        }
        else {
           input.setAttribute('type', 'text')
            input.addEventListener('change', ()=>{
                if(input.value === '') {
                    input.value = 'name';
                }
            })
        }
        input.addEventListener('focus', ()=>{
            if(input.value === "0") {
                input.value = "";
            }
            else {
                input.value = value;
            }
        })
        input.focus();
        input.addEventListener('blur', ()=>{
            if(input.value === "")  {
                input.value = "0"
            }
            el.innerHTML = input.value;
            this.changeItem()
        })
    }

    changeItem() {
        let list = document.querySelectorAll('tbody tr');
        let item = list[this.props.id];
        let obj = {
            name: item.querySelector('[data-info="name"]').innerHTML,
            rate: item.querySelector('[data-info="rate"]').innerHTML,
            loan: item.querySelector('[data-info="loan"]').innerHTML,
            min: item.querySelector('[data-info="min"]').innerHTML,
            max: item.querySelector('[data-info="max"]').innerHTML
        };
        this.props.changeRow(obj, this.props.id);
    }

    render() {
        let item = this.props.item;

        return (
            <React.Fragment>
                <tr className={ style.row }>
                    <td>{ this.props.id + 1 }</td>
                    <td data-info="name" type="text" onDoubleClick={this.handleClick}>{item.name}</td>
                    <td data-info="rate" type="procent" onDoubleClick={this.handleClick}>{item.rate}</td>
                    <td data-info="loan" type="number" onDoubleClick={this.handleClick}>{item.loan}</td>
                    <td data-info="min" type="number" onDoubleClick={this.handleClick}>{item.min}</td>
                    <td data-info="max" type="number" onDoubleClick={this.handleClick}>{item.max}</td>
                    <td className={style.remove} onClick={() => { this.props.remove(this.props.id) }}> 	&#10060; </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default Row;
