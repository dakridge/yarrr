// dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { push, replace as replaceRoute } from '../../actions';

// utils
import objectToParams from '../../utils/objectToParams';

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
        isExternal   : PropTypes.bool,
        children     : PropTypes.node,
        className    : PropTypes.string,
        style        : PropTypes.object,
        methodPush   : PropTypes.func.isRequired,
        methodReplace: PropTypes.func.isRequired,
        href         : PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    }

    static defaultProps = {
        className : '',
        style     : {},
        children  : null,
        replace   : false,
        isExternal: false,
    }

    handleClick = (event) => {
        const { href, replace, methodReplace, methodPush, isExternal } = this.props;
        const isModifiedEvent = !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

        const method = replace ? methodReplace : methodPush;

        if (!isModifiedEvent && !isExternal) {
            event.preventDefault();

            if (typeof href === 'string') {
                method(href);
            }
            else if (typeof href === 'object') {
                const { pathname, search } = href;
                const url = pathname + objectToParams(search);
                method(url);
            }
        }
    }

    render() {
        const { className, children, isExternal, href, style } = this.props;

        const linkProps = {
            ...isExternal ? { target: '_blank' } : {},
        };

        return (
            <a className={`${css.link} ${className}`} onClick={this.handleClick} href={href} style={style} {...linkProps}>{children}</a>
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
