import React, { PropTypes } from 'react';

import styles from './Heading.less';

const Heading = props => (
    <h1 className={styles.root}>
        {props.children}
    </h1>
);

Heading.propsTypes = {
    children: PropTypes.node,
};

export default Heading;
