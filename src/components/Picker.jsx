import React, { Component } from 'react';

import styles from './Picker.less';

export default class Picker extends Component {
    render() {
        const { value, options, onChange } = this.props;

        return (
            <div className={styles.root}>
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                >
                    {
                        options.map(option =>
                            <option value={option} key={option}>
                                {option}
                            </option>
                        )
                    }
                </select>
            </div>
        );
    }
}
