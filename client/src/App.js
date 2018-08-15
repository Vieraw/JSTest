import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min'
import './App.css';
import {connect} from 'react-redux';
import {saveRecords, setRecords, addRecord, recordChange, deleteRecord} from "./actions/recordActions";


import Table from './components/Table';
import Search from './components/Search';

class App extends Component {

    state = {
        searchTerm: '',
        error: '',
        submitDisabled: true,
    };

    onFileChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.addEventListener('loadend', event => {
            let message = '';
            try {
                this.props.setRecords(JSON.parse(event.target.result));
                this.setState({
                    submitDisabled: false
                });
            }
            catch (e) {
                message = 'Invalid file.';
            }

            this.setState({
                error: message
            });
        });

        reader.readAsText(file);
    };

    onSearchChange = e => {
        this.setState({searchTerm: e.target.value});
    };

    onRecordAdd = e => {
        e.preventDefault();
        this.props.records.message = false;
        this.props.addRecord();
        this.setState({
            submitDisabled: false
        });
    };

    onRecordDelete = id => {
        this.props.records.message = false;
        this.props.deleteRecord(id);
    };

    onRecordChange = (id, target) => {
        this.props.records.message = false;
        if (!target.classList.contains('input-disabled')) {
            this.props.recordChange(id, target);
        }
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.records.message = false;
        if (e.target.checkValidity()) {
            this.props.saveRecords(this.props.records);
        }
    };

    onExport = e => {
        this.props.records.message = false;

        const json = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.props.records.records.map(value => {
            delete value.readOnly;
            return value;
        })));



        e.target.target = '_blank';
        e.target.href = json;
        e.target.download = 'export.json';
    };


    render() {
        const {searchTerm} = this.state;
        const {records, message} = this.props.records;

        return (
            <form className={"application"} onSubmit={e => this.onSubmit(e)}>
                <div className={"top-buttons"}>
                    <label className={"btn btn-info upload-button"}>
                        Upload
                        <input type="file" onChange={e => this.onFileChange(e)} hidden/>
                    </label>
                    <button className={"btn btn-info"} onClick={e => this.onRecordAdd(e)}>Add</button>
                </div>
                <Search
                    classNames={"search-input"}
                    value={searchTerm}
                    onChange={this.onSearchChange}
                >
                    Search:
                </Search>
                <Table records={records} pattern={searchTerm} onDelete={this.onRecordDelete}
                       onRecordChange={this.onRecordChange}/>
                <div className={"error"}>
                    {this.state.error}
                </div>
                <div className={"message"}>
                    {message}
                </div>
                <div className={"bottom-buttons"}>
                    <button className={"btn btn-primary"} type={"submit"} disabled={this.state.submitDisabled}>Submit</button>
                    <a className={"btn btn-primary"} href={"/"} onClick={e => this.onExport(e)}>Export</a>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    ...state,
});

export default connect(mapStateToProps, {saveRecords, setRecords, addRecord, recordChange, deleteRecord})(App);