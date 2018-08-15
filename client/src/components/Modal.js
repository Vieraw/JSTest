import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    render() {
        const {id, title, children, idOnDelete } = this.props;
        return (
            <div>
                <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.onClick(idOnDelete)}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    idOnDelete: PropTypes.bool.isRequired
};

export default Modal;