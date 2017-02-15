import React from 'react';

export default function loadDataHOC({ needToReloadData, loadData }) {
    return Component => {
        return class ComponentWrapper extends React.Component {
            componentDidMount() {
                loadData(this.props);
            }

            componentWillReceiveProps(nextProps) {
                if (needToReloadData(this.props, nextProps)) {
                    loadData(nextProps);
                }
            }

            render() {
                return (
                    <Component {...this.props} />
                );
            }
        };
    };
}
