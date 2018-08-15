import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Search extends Component {
    render() {
        const { value, onChange, children } = this.props;
        return (
            <div className={this.props.classNames || ''}>
                { children }
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
}

Search.propTypes = {
    classNames: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Search;