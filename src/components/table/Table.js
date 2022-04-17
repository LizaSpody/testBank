import React from 'react';
import style from './table.module.scss';
import Row from "../table_row/TableRow";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.list
        }
        this.addRow = this.addRow.bind(this)
        this.removeRow = this.removeRow.bind(this)
        this.changeRow = this.changeRow.bind(this)
        this.changeArr = this.changeArr.bind(this)
    }

    changeArr(newList) {
        this.props.changeInfo(newList);
        this.setState(() => ({
            items: newList
        }));
    }

    changeRow(row, id) {
        let newList = this.state.items.map((item, index) => {
            if(index === id) {
                return row
            }
            return item
        });
        this.changeArr(newList)
    }

    addRow() {
        let newList = [...this.state.items, {name: 'name', rate: '0', loan: '0', min:'0', max: '0'}]
        this.changeArr(newList)
    }

    removeRow(id) {
        let newList = this.state.items.filter((el, index) => {
            return index !== id
        });
        this.changeArr(newList)
    }

    render() {
        const { items } = this.state;

        return (
            <React.Fragment>
                <h1 className={style.title}>List of banks</h1>
                <div className={style.table}>
                    <table className={style.table} cellSpacing="0" cellPadding="0">
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th className={style.name} >Name</th>
                            <th>Interest rate, (%)</th>
                            <th>Maximum loan</th>
                            <th>Minimum down <br/> payment</th>
                            <th>Loan term</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            { items.map((item, index) =>  <Row changeRow={this.changeRow} remove={this.removeRow} key={index} item={ item } id={ index } /> )}
                        </tbody>
                    </table>
                    <button onClick={this.addRow} className={style.plus}>+</button>
                </div>
            </React.Fragment>

        );
    }
}

export default Table;
