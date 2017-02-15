import React from 'react';

import Navigation from '../containers/Navigation.jsx';

import styles from './App.less';

export default props => (
    <div className={styles.root}>
        <div className={styles.container}>
            <Navigation />
            <div>
                {props.children}
            </div>
        </div>
    </div>
);
