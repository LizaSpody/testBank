import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Table from "./components/table/Table";
import Calculator from "./components/calculator/Calculator";

class App extends React.Component {
    constructor() {
        super();
        this.state= {
            list: this.reciveData(),
        }
        this.saveInfo = this.saveInfo.bind(this);
        this.reciveData = this.reciveData.bind(this)
    }


    reciveData() {
        let list;
        console.log(list)
        if (JSON.parse(localStorage.getItem('items'))) {
            list = JSON.parse(localStorage.getItem('items'))
        } else {
            list = []
        }
        return list
    }

    saveInfo(items) {
        // console.log(items)
        localStorage.setItem('items', JSON.stringify(items));
        // console.log(localStorage.getItem('items'))
        this.setState( () => ({
            list: items
        }));
    }

    render() {
        return (
            <main>
                <div className="container">
                    <Router>
                        <div className="menu">
                            <ul>
                                <li>
                                    <Link to="/">List</Link>
                                </li>
                                <li>
                                    <Link to="/calculator">Сalculator</Link>
                                </li>
                            </ul>
                            <Routes>
                                <Route exact path="/" element={<Table changeInfo={this.saveInfo} list={this.state.list}/>} />
                                <Route path="/calculator" element={<Calculator  list={this.state.list}/>} />
                            </Routes>
                        </div>
                    </Router>
                </div>
            </main>
        );
    }
}

export default App;
