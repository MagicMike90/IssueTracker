import React from 'react';
import PropTypes from 'prop-types'
// import {
// 	FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
// 	Panel, Form, Col, Alert
// } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';


import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';


import EditIssueForm from './forms/EditIssueForm.jsx';



const styleSheet = createStyleSheet(theme => ({
	appBar: {
		position: 'relative',
	},
	formSession: {
		justifyContent: 'center',
		padding: theme.spacing.unit * 2,
	},
	flex: {
		flex: 1,
	}
}));

class IssueEdit extends React.Component {
	static dataFetcher({ params, urlBase }) {
		return fetch(`${urlBase || ''}/api/issues/${params.id}`).then(response => {
			if (!response.ok) return response.json().then(error => Promise.reject(error));
			return response.json().then(data => ({ IssueEdit: data }));
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			issue: {
				_id: '', title: '', status: '', owner: '', effort: null,
				completionDate: null, created: null,
			},
			invalidFields: {},
			showingValidation: false,
			toastMessage: '',
			toastType: 'success',
			open: true,
			isFetching: false
		};
		this.onChange = this.onChange.bind(this);
		this.onValidityChange = this.onValidityChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.dismissValidation = this.dismissValidation.bind(this);
		this.showValidation = this.showValidation.bind(this);

		this.hideModal = this.hideModal.bind(this);
	}
	componentDidMount() {
		this.loadData();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.loadData();
		}
	}
	onValidityChange(event, valid) {
		// Properties in the target object will be overwritten by properties in the sources if they have the same key.  
		const invalidFields = Object.assign({}, this.state.invalidFields);
		if (!valid) {
			invalidFields[event.target.name] = true;
		} else {
			delete invalidFields[event.target.name];
		}
		this.setState({ invalidFields });
	}
	onChange(event, convertedValue) {
		const issue = Object.assign({}, this.state.issue);

		const value = (convertedValue !== undefined) ? convertedValue : event.target.value;
		issue[event.target.name] = value;
		this.setState({ issue });
	}
	showValidation() {
		this.setState({ showingValidation: true });
	}
	dismissValidation() {
		this.setState({ showingValidation: false });
	}

	onSubmit(event) {
		event.preventDefault();
		this.showValidation();

		if (Object.keys(this.state.invalidFields).length !== 0) {
			return;
		}
		fetch(`/api/issues/${this.props.match.params.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state.issue),
		}).then(response => {
			if (response.ok) {
				response.json().then(updatedIssue => {
					// convert to MongoDB Date object type
					updatedIssue.created = new Date(updatedIssue.created);
					if (updatedIssue.completionDate) {
						updatedIssue.completionDate = new Date(updatedIssue.completionDate);
					}
					this.setState({ issue: updatedIssue });
					this.props.showSuccess('Updated issue successfully.');
				});
			} else {
				response.json().then(error => {
					this.props.showError(`Failed to update issue: ${error.message}`);
				});
			}
		}).catch(err => {
			this.props.showError(`Error in sending data to server: ${err.message}`);
		});
	}
	loadData() {
		this.setState({ isFetching: true });
		IssueEdit.dataFetcher({ params: this.props.match.params })
			.then(data => {
				const issue = data.IssueEdit;
				issue.created = new Date(issue.created);
				issue.completionDate = issue.completionDate != null ?
					new Date(issue.completionDate) : null;
				this.setState({ issue });
				this.setState({ isFetching: false });
			}).catch(err => {
				this.props.showError(`Error in fetching data from server: ${err.message}`);
			});
	}
	hideModal() {
		this.setState({ open: false });
		this.props.history.push('/issues')
	};

	render() {
		const issue = this.state.issue;
		let validationMessage = null;
		if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
			validationMessage = (
				<Alert bsStyle="danger" onDismiss={this.dismissValidation}>
					Please correct invalid fields before submitting.
				</Alert>
			);
		}
		// return (
		// 	<Panel header="Edit Issue">
		// 		<Form horizontal onSubmit={this.onSubmit}>
		// 			<FormGroup>
		// 				<Col componentClass={ControlLabel} sm={3}>ID</Col>
		// 				<Col sm={9}>
		// 					<FormControl.Static>{issue._id}</FormControl.Static>
		// 				</Col>
		// 			</FormGroup>
		// 			<FormGroup>
		// 				<Col componentClass={ControlLabel} sm={3}>Created</Col>
		// 				<Col sm={9}>
		// 					<FormControl.Static>
		// 						{issue.created ? issue.created.toDateString() : ''}
		// 					</FormControl.Static>
		// 				</Col>
		// 			</FormGroup>
		// 			<FormGroup>
		// 				<Col componentClass={ControlLabel} sm={3}>Status</Col>
		// 				<Col sm={9}>
		// 					<FormControl
		// 						componentClass="select" name="status" value={issue.status}
		// 						onChange={this.onChange}>
		// 						<option value="New">New</option>
		// 						<option value="Open">Open</option>
		// 						<option value="Assigned">Assigned</option>
		// 						<option value="Fixed">Fixed</option>
		// 						<option value="Verified">Verified</option>
		// 						<option value="Closed">Closed</option>
		// 					</FormControl>
		// 				</Col>
		// 			</FormGroup>
		// 			<FormGroup>
		// 				<Col componentClass={ControlLabel} sm={3}>Owner</Col>
		// 				<Col sm={9}>
		// 					< FormControl name="owner" value={issue.owner}
		// 						onChange={this.onChange} />
		// 				</Col>
		// 			</FormGroup>
		// 			<FormGroup>
		// 				<Col componentClass={ControlLabel} sm={3}>Effort</Col>
		// 				<Col sm={9}>
		// 					<FormControl componentClass={NumInput} name="effort"
		// 						value={issue.effort} onChange={this.onChange}
		// 					/>
		// 				</Col>
		// 			</FormGroup>
		// 			<FormGroup validationState={this.state.invalidFields.completionDate ? 'error' : null}>
		// 				<Col componentClass={ControlLabel} sm={3}>Completion Date</Col>
		// 				<Col sm={9}>
		// 					<FormControl
		// 						componentClass={DateInput} name="completionDate"
		// 						value={issue.completionDate} onChange={this.onChange}
		// 						onValidityChange={this.onValidityChange}
		// 					/>
		// 					<FormControl.Feedback />
		// 				</Col>
		// 			</FormGroup>
		// 			<FormGroup>
		// 				<Col componentClass={ControlLabel} sm={3}>Title</Col>
		// 				<Col sm={9}>
		// 					< FormControl name="title" value={issue.title}
		// 						onChange={this.onChange} />
		// 				</Col>
		// 			</FormGroup>
		// 			<FormGroup>
		// 				<Col smOffset={3} sm={6}>
		// 					<ButtonToolbar>
		// 						<Button bsStyle="primary" type="submit">Submit</Button>
		// 						<LinkContainer to="/issues">
		// 							<Button bsStyle="link">Back</Button>
		// 						</LinkContainer>
		// 					</ButtonToolbar>
		// 				</Col>
		// 			</FormGroup>
		// 			<FormGroup>
		// 				<Col smOffset={3} sm={9}>{validationMessage}</Col>
		// 			</FormGroup>
		// 		</Form>
		// 	</Panel>
		// );
		if(this.state.isFetching) {
			return (<div>Fetching.....</div>);
		}
		const { classes } = this.props;
		return (
			<div>
				<Dialog
					fullScreen
					open={this.state.open}
					onRequestClose={this.hideModal}
					transition={<Slide direction="up" />}
				>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton color="contrast" onClick={this.hideModal} aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography type="title" color="inherit" className={classes.flex}>
								Edit Issue
							</Typography>
							<Button color="contrast" onClick={this.hideModal}>
								save
              </Button>
						</Toolbar>
					</AppBar>
					<div className={classes.formSession}>
						<EditIssueForm issue={issue} />
					</div>
				</Dialog>
			</div>
		);
	}
}
IssueEdit.propTypes = {
	match: PropTypes.object.isRequired
};


const componentWithStyles = withStyles(styleSheet)(IssueEdit);
export default componentWithStyles;
