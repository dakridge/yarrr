// dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

// components
import history from './history';
import findMatchingRoute from './utils/findMatchingRoute';

// action names
import { actions } from './Reducer';

// selectors
import { getComponent } from './selectors';

class Router extends Component {
    static propTypes = {
        MatchedComponent: PropTypes.func,
        onMount         : PropTypes.func.isRequired,
        onUpdate        : PropTypes.func.isRequired,
        routes          : PropTypes.array.isRequired,
    }

    static defaultProps = {
        MatchedComponent: null,
    }

    constructor(props) {
        super(props);

        const { routes, onMount } = this.props;

        onMount({
            action      : history.action,
            hash        : history.location.hash,
            query       : history.location.search,
            location    : history.location.pathname,
            matchedRoute: findMatchingRoute(routes, history.location.pathname),
        });
    }

    componentDidMount() {
        /**
         * This listens for history actions.
         * POP - back button or forward button
         * PUSH - page change
         * REPLACE - page change but replaced the current page
         */
        this.unlisten = history.listen((location, action) => {
            const { routes, onUpdate } = this.props;

            onUpdate({
                action,
                hash        : location.hash,
                query       : location.search,
                location    : location.pathname,
                matchedRoute: findMatchingRoute(routes, location.pathname),
            });
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        const { MatchedComponent } = this.props;
        console.log(this.props);

        if (MatchedComponent) {
            return (
                <MatchedComponent />
            );
        }

        return null;
    }
}

const mapStateToProps = state => ({
    MatchedComponent: getComponent(state),
});

const mapDispatchToProps = dispatch => ({
    onMount : payload => dispatch({ type: actions.mount, payload }),
    onUpdate: payload => dispatch({ type: actions.update, payload }),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Router);
