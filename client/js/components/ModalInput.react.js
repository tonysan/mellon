var React = require('react'),
    bootstrap = require('react-bootstrap');

var Input = bootstrap.Input,
    Modal = bootstrap.Modal,
    Button = bootstrap.Button,
    Nav = bootstrap.Nav,
    NavItem = bootstrap.NavItem;

var ValidatedInput = React.createClass({
    getInitialState: function() {
        return {
            show: false,
            canSave: false,
            title: this.props.title,
            value: JSON.stringify(this.props.store.getAll(), null, 2)
        };
    },
    render: function() {
        return (
            <NavItem onClick={this.show}>
                {this.state.title}
                <Modal show={this.state.show} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            type='textarea'
                            value={this.state.value}
                            bsStyle={this.validateState()}
                            onChange={this.handleChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hide}>Close</Button>
                        <Button disabled={this.validateButtonState()} onClick={this.save} bsStyle='primary'>Save</Button>
                    </Modal.Footer>
                </Modal>
            </NavItem>
        );
    },
    validateState: function() {
        try {
            JSON.parse(this.state.value);
            return 'success';
        } catch (error) {
            return 'error';
        }
    },
    validateButtonState: function() {
        try {
            JSON.parse(this.state.value);
            return false;
        } catch (error) {
            return true;
        }
    },
    handleChange: function(e) {
        this.setState({
            value: e.target.value
        });
    },
    hide: function() {
        this.setState({
            show: false
        });
    },
    show: function() {
        this.setState({
            show: true
        });
    },
    save: function() {
        this.props.actionCreator.update(JSON.parse(this.state.value));
        this.hide();
    }
 });

module.exports = ValidatedInput;
