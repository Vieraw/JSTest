import React, {Component} from 'react';

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

export default Search;