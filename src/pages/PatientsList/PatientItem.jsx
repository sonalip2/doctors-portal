import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import expandTo from '../../assets/images/expandTo.png';
import edit from '../../assets/images/edit.png';
import deleteData from '../../assets/images/delete.png';
import s from "./PatientList.module.scss";
import * as patientActions from "../../actions/patientActions";

class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }

    togglePanel = () => {
        const { toggle } = this.state;
        this.setState({
            toggle: !toggle
        })
    }

    handleUpdateClick = (patient) => {
        const { updatedPatients, setUpdatedPatients } = this.props;
        const newUpdatePatients = {}
        newUpdatePatients[patient.id] = patient;
        setUpdatedPatients({ ...updatedPatients, ...newUpdatePatients });
    }

    render() {
        const { patient, index } = this.props;
        const { toggle } = this.state;

        return (
            <>
                <tr key={index} className={toggle ? null : s.toggleBlock}>
                    <td>{patient.name}</td>
                    <td>{patient.username}</td>
                    <td>{patient.email}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.company}</td>
                    <td onClick={this.togglePanel}>
                        <img alt='Expand' src={expandTo} className={s.toggleImage} />
                    </td>
                    <td>
                        <Link to={`/patients/${patient.id}`} onClick={() => this.handleUpdateClick(patient)} >
                            <img alt='Edit' src={edit} className={s.toggleImage} />
                        </Link>
                    </td>
                    <td onClick={this.deletePanel}><img alt='Delete' src={deleteData} className={s.toggleImage} /></td>
                </tr>
                <tr key={index} className={toggle ? s.toggleBlock : null}>
                    {toggle ? (<><td>website: {patient.website}</td> <br /> <td>address: {patient.address}</td></>) : null}
                </tr>
            </>
        )
    }
}

export default connect(
    state => ({
        updatedPatients: state.patients.updatedPatients
    }),
    dispatch => ({
        setUpdatedPatients: patients => {
            dispatch(patientActions.setUpdatedPatients(patients))
        },
    }))(Patient);