var React = require('react'),
    CharacterStore = require('../stores/CharacterStore.react')

function getStateFromStores() {
    return {
        character: CharacterStore.getCharacter()
    };
}

var CharacterInfo = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        CharacterStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        CharacterStore.removeListener(this.onChange);
    },
    render: function() {
        var character = this.state.character;
        return (
            <div className='characterInfo'>
                <ul className='character'>
                    <li>Playing: {character.name}</li>
                    <li>Level: {character.level}</li>
                </ul>
                <ul className='xp'>
                    <li>XP Needed (Total): {character.xp.needed} ({character.xp.total})</li>
                    <li>XP Last Kill (This Session): {character.xp.lastKill} ({character.xp.session})</li>
                </ul>
                <ul className='tp'>
                    <li>TP Needed (Total): {character.tp.needed} ({character.tp.total})</li>
                    <li>TP This Session: {character.tp.session}</li>
                </ul>
            </div>
        );
    },
    onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = CharacterInfo;