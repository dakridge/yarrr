// dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { push, replace as replaceRoute } from '../..Router';

// utils
import objectToParams from '../utils/objectToParams';

// styles
import css from './Link.styl';

/**
 * Provides a simple way to trigger a navigation event. This is basically
 * copied from the react-router Link component:
 * https://reacttraining.com/react-router/web/api/Link
 */
export class Link extends PureComponent {
    static propTypes = {
        replace      : PropTypes.bool,
        className    : PropTypes.string,
        methodPush   : PropTypes.func.isRequired,
        methodReplace: PropTypes.func.isRequired,
        children     : PropTypes.node.isRequired,
        to           : PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    }

    static defaultProps = {
        className: '',
        replace  : false,
    }

    handleClick = () => {
        const { to, replace, methodReplace, methodPush } = this.props;

        const method = replace ? methodReplace : methodPush;

        if (typeof to === 'string') {
            method(to);
        }
        else if (typeof to === 'object') {
            const { pathname, search } = to;
            const url = pathname + objectToParams(search);
            method(url);
        }
    }

    render() {
        const { className, children } = this.props;

        return (
            <div onClick={this.handleClick} className={`${className}`} style={{ display: 'inline', cursor: 'pointer' }}>{children}</div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    methodPush   : page => dispatch(push(page)),
    methodReplace: page => dispatch(replaceRoute(page)),
});

export default connect(
    () => ({}),
    mapDispatchToProps,
)(Link);
