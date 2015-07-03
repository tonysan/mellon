var React = require('react'),
    MessageActionCreators = require('../actions/MessageActionCreators');

var Input = React.createClass({
    getInitialState: function() {
        return {
            inputValue: ''
        };
    },
    render: function() {
        return (
            <div className='inputContainer'>
                <input
                    type='text'
                    ref='input'
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    value={this.state.inputValue}
                />
            </div>
        );
    },
    handleChange: function(e) {
        this.setState({
            inputValue: e.target.value
        });
    },
    handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            MessageActionCreators.sendMessage(e.target.value)
            this.setState({
                inputValue: ''
            });
            return;
        }
    }
});

module.exports = Input;