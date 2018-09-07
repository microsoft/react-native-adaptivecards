import React from 'react'
import { connect } from 'react-redux'
import MonacoEditor from 'react-monaco-editor';
import PropTypes from 'prop-types'

import adaptiveCardSchema from '../../static/adaptive-card'
import { modifyCard, modifyConfig } from '../../actions/cardActions'
import './Editor.css'

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.editorWillMount = this.editorWillMount.bind(this);
        this.editorDidMount = this.editorDidMount.bind(this);
        this.onChange = this.onChange.bind((this));
    }

    editorWillMount(monaco) {
        let config = {
            validate: false,
            schemas: [{
                uri: "http://adaptivecards.io/schemas/adaptive-card.json",
                fileMatch: ["*"],
                schema: adaptiveCardSchema
            }],
            allowComments: true
        };
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions(config);
    }

    editorDidMount(editor) {
        editor.focus();
    }

    onChange(newValue) {
        if (this.props.mode === 'card') {
            this.props.modifyCard(this.props.cardId, newValue);
        }
        else {
            this.props.modifyConfig(newValue);
        }
    }

    render() {
        const code = this.props.mode === 'card' ?
                        (this.props.cardId ? this.props.cards.find(x => x.id === this.props.cardId).card : '')
                        : this.props.config;
        const options = {
            lineNumber: 'on',
            selectOnLineNumbers: true,
            minimap: {enabled: false},
            automaticLayout: true,
            fontSize: 13.5,
        };

        // monaco.editor.defineTheme('myTheme', {
        //     base: 'vs',
        //     inherit: true,
        //     rules: [{ background: 'F9F7F7' }],
        //     colors: {
        //         'editor.foreground': '#000000',
        //         'editor.background': '#F9F7F7',
        //     }
        // });
        // monaco.editor.setTheme('myTheme');


        return (
            <div className="editor" ref={(editor) => {this.editor = editor;}}>
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language="json"
                    theme="vs"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorWillMount={this.editorWillMount}
                    editorDidMount={this.editorDidMount}
                />
            </div>
        );
    }

}


Editor.propTypes = {
    mode: PropTypes.string.required,
    cardId: PropTypes.string.required,
    cards: PropTypes.array.required,
    config: PropTypes.string.required,
    modifyCard: PropTypes.func,
    modifyConfig: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        cardId: state.card.cardId,
        config: state.card.config,
        mode: state.card.mode,
        cards: state.card.cards
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modifyCard: (id, card) => dispatch(modifyCard(id, card)),
        modifyConfig: (config) => dispatch(modifyConfig(config))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Editor)

