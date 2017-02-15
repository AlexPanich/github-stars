import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { loadRepo, loadRepoStargazers } from '../actions';
import { getStargazersByRepoName } from '../selectors/users';
import loadData from '../hoc/loadData.jsx';

import Heading from '../components/Heading.jsx';
import User from '../components/User.jsx';

const mapStateToProps = (state, ownProps) => {
    const { login, repo } = ownProps.params;
    const fullName = `${login}/${repo}`;

    return {
        login,
        repo,
        fullName,
        stargazers: getStargazersByRepoName(state, fullName),
    };
};

@connect(mapStateToProps, { loadRepo, loadRepoStargazers })
@loadData({
    loadData: props => {
        props.loadRepo(props.fullName);
        props.loadRepoStargazers(props.fullName);
    },
    needToReloadData: (props, nextProps) => {
        return props.fullName !== nextProps.fullName;
    },
})
export default class UserPage extends Component {
    static propTypes = {
        login: PropTypes.string.isRequired,
        repo: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        stargazers: ImmutablePropTypes.list.isRequired,
        loadRepo: PropTypes.func.isRequired,
    }

    render() {
        const { login, repo, stargazers } = this.props;

        return (
            <div>
                <Heading>Пользователи поставившие звезду репозиторию {login}/{repo}</Heading>
                {
                    stargazers.map(user =>
                        <User key={user.get('login')} user={user} />
                    )
                }
            </div>
        );
    }
}
