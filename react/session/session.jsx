import React from 'react';

export default class Session extends React.Component {
    render() {
        return <div>
            <ul>
                <li>
                    <a href="/auth/google">google</a>
                </li>
                    <li>
                        <a href="/auth/github">github</a>
                    </li>
            </ul>
            </div>;
    }
};
