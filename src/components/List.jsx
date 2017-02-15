import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class List extends Component {
    static propTypes = {
        loadingLabel: PropTypes.string.isRequired,
        pageCount: PropTypes.number,
        renderItem: PropTypes.func.isRequired,
        items: ImmutablePropTypes.list.isRequired,
        isFetching: PropTypes.bool.isRequired,
        onLoadMoreClick: PropTypes.func.isRequired,
        nextPageUrl: PropTypes.string,
    }

    static defaultProps = {
        isFetching: true,
        loadingLabel: 'Загрузка...',
    }

    renderLoadMore() {
        const { isFetching, onLoadMoreClick } = this.props;

        return (
            <button
                onClick={onLoadMoreClick}
                disabled={isFetching}
            >
                {isFetching ? 'Загрузка...' : 'Загрузить еще'}
            </button>
        );
    }

    render() {
        const {
            isFetching,
            nextPageUrl,
            pageCount,
            items,
            renderItem,
            loadingLabel,
        } = this.props;

        const isEmpty = items.isEmpty();

        if (isEmpty && isFetching) {
            return <h2><i>{loadingLabel}</i></h2>;
        }

        const isLastPage = !nextPageUrl;

        if (isEmpty && isLastPage) {
            return <h1><i>Ничего не найдено!</i></h1>;
        }

        return (
            <div>
                {items.map(renderItem)}
                {pageCount > 0 && !isLastPage && this.renderLoadMore()}
            </div>
        );
    }
}
