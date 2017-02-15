import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import styles from './Repo.less';

const Repo = props => {
    const { repo } = props;

    return (
        <div className={styles.root}>
            <Link to={`/${repo.get('fullName')}`} className={styles.name}>
                {repo.get('fullName')}
            </Link>
        </div>
    );
};

Repo.propsTypes = {
    repo: ImmutablePropTypes.map.isRequired,
};

export default Repo;
