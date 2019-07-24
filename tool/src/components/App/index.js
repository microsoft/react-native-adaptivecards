import React from 'react';

import Header from '../Header/index'
import SampleList from '../SampleList/index'
import Editor from '../Editor/index'
import CardList from '../CardList/index'
import './App.css'
import ErrorMessage from '../ErrorMessage/index'
import SplitPane from "react-split-pane";

export default class App extends React.Component {
    
    render() {
        return (
            <div className="app">
                <Header />
                <div className="main-page">
                    <SampleList />
                    <div style={{display: 'flex', flex: 1}}>
                        <SplitPane split="vertical" defaultSize="72%" style={{ position: 'relative' }}>
                            <Editor />
                            <SplitPane split="horizontal" defaultSize="60%">
                                <CardList />
                                <ErrorMessage />
                            </SplitPane>
                        </SplitPane>
                    </div>

                </div>
            </div>
        );
    }

}