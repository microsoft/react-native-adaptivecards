import React from 'react';
import { connect } from 'react-redux';
import { JsonValidator } from '../../assets/AdaptiveCards//DataValidator/JsonValidator';;
import { parseJson } from '../../utils/common';
import { SchemaResult, SchemaMessage } from '../../assets/AdaptiveCards/Schemas/SchemaValidator';
import { Alert } from 'antd';
import 'antd/dist/antd.css';

class ErrorMessage extends React.Component {

    render() {
        let card = this.props.card;
        let json = parseJson(card);

        let result = new SchemaResult(true)
        if (json === '') {
            result = result.combine(new SchemaResult(false, new SchemaMessage('Error', 'Data is not in JSON format, check it carefully!')));
        }
        else {
            let component = JsonValidator.getDescendsAndSelf(json);
            component.forEach(com => {
                let temp_res = com.getSchemaCheckResult;
                if (temp_res.messages.length > 0) {
                    temp_res.messages.forEach(mes => {
                        mes.message = com.path + mes.message
                    })
                    result = result.combine(temp_res)
                }
            });
        }

        return (
            <div>
                <Alert message={`Input data is ${result.isValid ? "valid" : "invalid"}`} type={result.isValid ? "success" : "error"} />
                {
                    result.messages.map(mes => <Alert message={mes.level + ' : ' + mes.message} type={mes.level.charAt(0).toLowerCase()+mes.level.slice(1)} />)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        card: state.card.currentEditing
    };
};

export default connect(mapStateToProps)(ErrorMessage);