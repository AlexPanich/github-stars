import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { loadUser, loadStarredRepos } from '../actions';
import { getStarredReposByUser } from '../selectors/repos';

import Heading from '../components/Heading.jsx';
import Repo from '../components/Repo.jsx';

const mapStateToProps = (state, ownProps) => {
    const { login } = ownProps.params;

    return {
        login,
        starredRepos: getStarredReposByUser(state, login),
    };
};

@connect(mapStateToProps, { loadUser, loadStarredRepos })
export default class UserPage extends Component {
    static propTypes = {
        login: PropTypes.string.isRequired,
        starredRepos: ImmutablePropTypes.list.isRequired,
        loadUser: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.loadData();
    }

    cpmponentDidUpdate(prevProps) {
        if (prevProps.login !== this.props.login) {
            this.loadData();
        }
    }

    loadData() {
        const { login } = this.props;

        this.props.loadUser(login);
        this.props.loadStarredRepos(login);
    }

    render() {
        const { login, starredRepos } = this.props;

        return (
            <div>
                <Heading>Репозитории, которым {login} поставил звезду</Heading>
                {
                    starredRepos.map(repo =>
                        <Repo key={repo.get('fullName')} repo={repo} />
                    )
                }
            </div>
        );
    }
}
