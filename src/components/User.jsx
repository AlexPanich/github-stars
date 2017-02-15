import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import styles from './User.less';

const User = props => {
    const { user } = props;

    return (
        <div className={styles.root}>
            <img
                className={styles.avatar}
                alt={user.get('login')}
                src={user.get('avatarUrl')}
            />
            <Link to={`/${user.get('login')}`} className={styles.name}>
                {user.get('login')}
            </Link>
        </div>
    );
};

User.propsTypes = {
    user: ImmutablePropTypes.map.isRequired,
};

export default User;
