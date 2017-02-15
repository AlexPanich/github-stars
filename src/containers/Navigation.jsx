/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack, goForward } from 'react-router-redux';

@connect(null, { onGoBack: goBack, onGoForward: goForward })
export default class Navigation extends Component {
    render() {
        const { onGoForward, onGoBack } = this.props;

        return (
            <div>
                <button onClick={onGoBack}>Назад</button>
                <button onClick={onGoForward}>Вперед</button>
            </div>
        );
    }
}
