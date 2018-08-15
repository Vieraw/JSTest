import React, {Component} from 'react';
import $ from 'jquery';
import Modal from "./Modal";

const isSearched = searchTerm => (item) => {
    let result;
    let pattern = searchTerm.toLowerCase();
    for (let el in item) {
        if (item.hasOwnProperty(el) && item[el].toString().toLowerCase().includes(pattern)) {
            return true;
        }
        result = false;
    }
    return result;
};

class Table extends Component {

    state = {
        idOnDelete: false
    };

    sort(event) {
        const target = event.target;
        const getCellValue = (row, index) => $(row).children('td').eq(index).text() || $(row).children('td').eq(index).children('input').val();
        const compare = index => (a, b) => {
            let valA = getCellValue(a, index);
            let valB = getCellValue(b, index);
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        };

        let table = $(target).parents('table').eq(0);
        let rows = table.find('tr:gt(0)').toArray().sort(compare($(target).index()));
        console.log($(''));
        [].forEach.call(document.querySelectorAll('.arrows.asc'), n => n.classList.remove('asc'));
        [].forEach.call(document.querySelectorAll('.arrows.desc'), n => n.classList.remove('desc'));
        target.asc = !target.asc;
        if (!target.asc) {
            rows = rows.reverse();
            target.classList.add('desc');
        }
        else{
            target.classList.add('asc');
        }
        for (let i = 0; i < rows.length; i++) {
            table.append(rows[i])
        }
    }

    onEdit = e => {
        e.preventDefault();
        [].forEach.call(e.target.parentNode.parentNode.querySelectorAll('input'), n => {
            n.classList.toggle('input-disabled');
        });
    };

    onSetIdDelete = (e, id) => {
        e.preventDefault();
        this.setState({
            idOnDelete: id
        });
    };

    render() {
        const {records, pattern, onDelete, onRecordChange} = this.props;
        return (
            <div>
                <table className={"table table-bordered table-responsive-sm"}>
                    <thead>
                    <tr>
                        <th className={'arrows asc'} onClick={e => this.sort(e)}> № </th>
                        <th className={"table-age arrows"} onClick={e => this.sort(e)}>Age </th>
                        <th className={'arrows'} onClick={e => this.sort(e)}>Name</th>
                        <th className={"table-gender arrows"} onClick={e => this.sort(e)}>Gender </th>
                        <th className={'arrows'} onClick={e => this.sort(e)}>Company</th>
                        <th className={'arrows'} onClick={e => this.sort(e)}>Email </th>
                        <th className={'arrows'} onClick={e => this.sort(e)}>Phone </th>
                        <th className={'arrows'} onClick={e => this.sort(e)}>Address </th>
                        <th className={"JSTestTable__actions"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.filter(isSearched(pattern)).map(({id, age, name, gender, company, email, phone, address, readOnly = true}, index) => {
                            return (<tr key={id}>
                                <td>{++index}</td>
                                <td className={"table-age"}>
                                    <input required className={readOnly ? "input-disabled" : ''} name={"age"}
                                           onChange={(e) => onRecordChange(id, e.target)}
                                           type="text" value={age}/></td>
                                <td>
                                    <input required className={readOnly ? "input-disabled" : ''} name={"name"}
                                           onChange={(e) => onRecordChange(id, e.target)} type="text" value={name}/></td>
                                <td className={"table-gender"}>
                                    <input required className={readOnly ? "input-disabled" : ''} name={"gender"}
                                           onChange={(e) => onRecordChange(id, e.target)}
                                           type="text" value={gender}/>
                                </td>
                                <td>
                                    <input required className={readOnly ? "input-disabled" : ''} name={"company"}
                                           onChange={(e) => onRecordChange(id, e.target)} type="text" value={company}/>
                                </td>
                                <td>
                                    <input required className={readOnly ? "input-disabled" : ''} name={"email"}
                                           onChange={(e) => onRecordChange(id, e.target)} type="text" value={email}/>
                                </td>
                                <td>
                                    <input required className={readOnly ? "input-disabled" : ''} name={"phone"}
                                           onChange={(e) => onRecordChange(id, e.target)} type="text" value={phone}/>
                                </td>
                                <td>
                                    <input required className={readOnly ? "input-disabled" : ''} name={"address"}
                                           onChange={(e) => onRecordChange(id, e.target)} type="text" value={address}/>
                                </td>
                                <td className={"table__actions"}>
                                    <button className={"btn btn-primary"} onClick={(e) => this.onEdit(e)}>Edit</button>
                                    <button className={"btn btn-danger"} data-toggle="modal" data-target="#deleteModal"
                                            onClick={(e) => this.onSetIdDelete(e, id)}>Delete
                                    </button>
                                </td>
                            </tr>)
                        }
                    )}
                    </tbody>
                </table>
                <Modal onClick={onDelete} id={"deleteModal"} title={"Delete"} idOnDelete={this.state.idOnDelete}>
                    Are you sure you want to delete this entry?
                </Modal>
            </div>
        );
    }
}


export default Table;