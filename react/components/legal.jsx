var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="result">
                    <h1>PRIVACY POLICY</h1>
                    <p>We are committed to maintaining your confidence and trust, and recognizes your right to keep personal information private. We maintain the following privacy policy to protect personal information you provide online.</p>
                    <h2>Basic Privacy Policy</h2>
                    <p>The application collects no personal information about you at anytime. If you choose to provide personal information, such as a username, live ID or email address we will consider and keep that information private and confidential.</p>
                    <p className="box">We will use this information only to store your application settings and progress across multiple platforms or installations</p>
                    <h2>Information Collected from Application Usage</h2>
                    <p>The only information collected is application usage (points, in-app currency, provided username and/or settings) and it will only be used by the application to track leaderboard status, in-app progress or save settings and unlockable items.</p><p className="box">Any information stored remotely will be used solely for the purpose of determining the most popular features and determining what to develop next.</p>
                    <h2>No Release of Information to Third Parties</h2>
                    <p>Personal information and application usage statistics will not be released to third parties except as necessary to further the purpose for which you provide the information and where it is legally required, such as in the investigation of a criminal offence, and in compliance with a search warrant or subpoena.</p>
                </div>
            );
    }
});


