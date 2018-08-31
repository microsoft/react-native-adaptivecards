import React from 'react';

import Header from '../Header/index'
import SampleList from '../SampleList/index'
import Editor from '../Editor/index'
import CardList from '../CardList/index'
import './App.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Header />
                <div className="main-page">
                    <SampleList />
                    <Editor />
                    <CardList />
                </div>
            </div>
        );
    }

}