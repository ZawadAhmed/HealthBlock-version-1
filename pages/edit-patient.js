import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select} from 'semantic-ui-react';
import Layout from '../component/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const options = [
    { key: 'm', text: 'Male', value: 'Male' },
    { key: 'f', text: 'Female', value: 'Female' },
    { key: 'o', text: 'Other', value: 'Other' },
]

const allergyOptions = [
    { key: 'f', text: 'Food', value: 'Food' },
    { key: 'm', text: 'Medical', value: 'Medical' },
    { key: 'e', text: 'Environmental', value: 'Environmental' },
    { key: 'o', text: 'Others', value: 'Others' },
]

class EditPatient extends Component {
    state = {
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        bloodgroup: '',
        allergies: '',
        medication: '',
        loading: false,
        errorMessage: ''
    };

    handleGender = (e, { value }) => this.setState({ gender: value })

    handleAllergies = (e, { value }) => this.setState({ allergies: value })

    onSubmit = async event => {
        event.preventDefault();

        const { ic, name, phone, gender, dob, height, weight, bloodgroup, allergies, medication } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
              });
            await record.methods.editDetails(
                ic, name, phone, gender, dob, height, weight, bloodgroup, allergies, medication 
            ).send({ from: accounts[0] });

            alert("Account created successfully!");
            Router.pushRoute('/list');
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("Account Failed");
        }

        this.setState({ loading: false, ic: '', name: '', phone: '', gender: '', dob: '', height: '', weight: '', bloodgroup: '', allergies: '', medication: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Edit Record</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>General Information</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>IC</label>
                            <Input
                                placeholder = 'Eg. 001234010234'                
                                value= {this.state.ic}
                                onChange= {event => 
                                    this.setState({ ic: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Full Name</label>
                            <Input
                                placeholder = 'Eg. John Smith'                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Phone</label>
                            <Input
                                placeholder = 'Eg. 0123456789'
                                value= {this.state.phone}
                                onChange= {event => 
                                    this.setState({ phone: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>              
                    <Form.Group widths='equal'>
                        <Form.Field 
                                label='Gender' 
                                control={Select} 
                                options={options} 
                                onChange={this.handleGender}
                        />

                        <Form.Field>
                            <label>Date of Birth</label>
                            <Input 
                                placeholder = 'Eg. 01/01/1997'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Height</label>
                            <Input 
                                placeholder = 'Eg. 183'
                                label={{ basic: true, content: 'cm' }}
                                labelPosition='right'
                                value= {this.state.height}
                                onChange= {event => 
                                    this.setState({ height: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Weight</label>
                            <Input 
                                placeholder = 'Eg. 65'
                                label={{ basic: true, content: 'kg' }}
                                labelPosition='right'
                                value= {this.state.weight}
                                onChange= {event => 
                                    this.setState({ weight: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                   
                    <br/>
                 

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Medical History</h2>
                    <Divider clearing />                    
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Blood Group</label>
                            <Input 
                                placeholder = 'Eg. A-'
                                value= {this.state.bloodgroup}
                                onChange= {event => 
                                    this.setState({ bloodgroup: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field 
                                label='Allergies' 
                                control={Select} 
                                options={allergyOptions} 
                                onChange={this.handleAllergies}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='Current Medications'
                                placeholder = 'Eg. Antidepressants'
                                value= {this.state.medication}
                                onChange= {event => 
                                    this.setState({ medication: event.target.value })}  
                        />
                    </Form.Group>

                    <br/>
              
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Edit</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default EditPatient;