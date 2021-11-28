import React from 'react';

class Settings extends React.Component {

    state = {
        settingWindowOn: false,
    }

    handleSettings = () => {
        this.setState({
            settingWindowOn: !this.state.settingWindowOn
        })
    }

    typeOfMode = () => {
        if(this.props.mode === "easy") {
            return false
        } else {
            return true
        }
    }

    render() {
        return(
            <>
                {!this.state.settingWindowOn? <button onClick={this.handleSettings} className="settingsButton button"><i className="fas fa-cog"></i></button> :
                <div className="settingWindow">
                    <button onClick={this.handleSettings} className="turnOffSettingsButton button"><i className="fas fa-times"></i></button>
                    <div className="settings" >
                        <div className="switch-holder">
                            <div className="switch-label">
                            <i className="fas fa-book-dead"></i><span>Poziom trudności</span>
                            </div>
                            <div className="mode switch-toggle">
                                <input type="checkbox" id="mode" checked={this.typeOfMode()} onClick={this.props.handleMode}/>
                                <label htmlFor="mode"></label>
                            </div>
                        </div>
                        <div className="switch-holder">
                            <div className="switch-label">
                            <i className="fas fa-eye-slash"></i><span> BlindGame</span>
                            </div>
                            <div className="switch-toggle">
                                <input type="checkbox" id="blindGame" checked={this.props.blindGame} onClick={this.props.handleBlindGame}/>
                                <label htmlFor="blindGame"></label>
                            </div>
                        </div>
                        <div className="switch-holder">
                            <div className="switch-label">
                                <i className="fas fa-bell"></i><span> Powiadomienia</span>
                            </div>
                            <div className="switch-toggle">
                                <input type="checkbox" id="notifications" checked={this.props.notification} onClick={this.props.handleNotification}/>
                                <label htmlFor="notifications"></label>
                            </div>
                        </div>
                        <button onClick={this.props.reset} className="resetButton">Reset</button>
                        {/* <label><input type="checkbox" checked={this.props.notification} onClick={this.props.handleNotification}/> Powiadomienia</label> */}
                        {/* <label><input type="checkbox" checked={this.props.blindGame} onClick={this.props.handleBlindGame}/> BlindGame</label> */}
                    </div>
                </div>}
            </>
        )
    }
}

export default Settings;