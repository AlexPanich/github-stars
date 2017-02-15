import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loadTopRepos, ANY } from '../actions';

import { getTopReposByLanguage, getTopReposPagination } from '../selectors/repos';
import { getSelectedLanguage, getPathname, getQuery } from '../selectors/routing';

import Repo from '../components/Repo.jsx';
import Heading from '../components/Heading.jsx';
import List from '../components/List.jsx';
import Picker from '../components/Picker.jsx';

const LANGUAGES = [
    'javascript',
    'java',
    'python',
    'css',
    'php',
    'c++',
    'c#',
    'c',
    'shell',
    'objective-c',
    'go',
    'perl'
];

LANGUAGES.unshift(ANY);

function mapStateToProps(state) {
    return {
        repos: getTopReposByLanguage(state, getSelectedLanguage(state)),
        pagination: getTopReposPagination(state, getSelectedLanguage(state)),
        selectedLanguage: getSelectedLanguage(state),
        pathname: getPathname(state),
        query: getQuery(state).toJS()
    };
}

@connect(mapStateToProps, { loadTopRepos, push })
export default class UserPage extends Component {
    static propsTypes = {
        repos: PropTypes.func.isRequired,
        loadTopRepos: ImmutablePropTypes.list.isRequired,
    }

    componentWillMount() {
        this.props.loadTopRepos();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedLanguage !== this.props.selectedLanguage) {
            this.props.loadTopRepos();
        }
    }

    loadMoreRepos = () => {
        this.props.loadTopRepos(true);
    }

    renderItem = (repo) => {
        return <Repo key={repo.get('fullName')} repo={repo} />;
    }

    handleLanguegeChange = language => {
        const { query, pathname, push } = this.props;

        if (language === ANY) {
            delete query.language;

            this.props.push({
                pathname: this.props.pathname,
                query
            });
        } else {
            this.props.push({
                pathname: this.props.pathname,
                query: { ...query, language }
            });
        }
    }

    render() {
        const { repos, pagination, selectedLanguage } = this.props;

        return (
            <div>
                <Heading>Топ репозитории</Heading>
                <Picker
                    value={selectedLanguage}
                    options={LANGUAGES}
                    onChange={this.handleLanguegeChange}
                />
                <List
                    isFetching={pagination.get('isFetching')}
                    nextPageUrl={pagination.get('nextPageUrl')}
                    pageCount={pagination.get('pageCount')}
                    items={repos}
                    renderItem={this.renderItem}
                    onLoadMoreClick={this.loadMoreRepos}
                />
            </div>
        );
    }
}
