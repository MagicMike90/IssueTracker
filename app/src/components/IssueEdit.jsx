import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { addNotification } from '../actions/notificationActions'

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
		console.log('props', props);
		this.onChange = this.onChange.bind(this);
		this.onValidityChange = this.onValidityChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.submitForm = this.submitForm.bind(this);

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

	onSubmit(values) {
		const issue = Object.assign({}, values);
		if (values.completionDate) {
			const completionDate = new Date(values.completionDate);
			issue.completionDate = completionDate;
		}

		fetch(`/api/issues/${this.props.match.params.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(issue),
		}).then(response => {
			if (response.ok) {
				response.json().then(updatedIssue => {
					// convert to MongoDB Date object type
					updatedIssue.created = new Date(updatedIssue.created);
					if (updatedIssue.completionDate) {
						updatedIssue.completionDate = this.formatDate(updatedIssue.completionDate);
					}
					this.setState({ issue: updatedIssue });
					// this.props.showSuccess('Updated issue successfully.');
					this.props.dispatch(addNotification('Updated issue successfully', 'success'));
				});
			} else {
				response.json().then(error => {
					// this.props.showError(`Failed to update issue: ${error.message}`);
					this.props.dispatch(addNotification(`Failed to update issue: ${error.message}`, 'error'));
				});
			}
		}).catch(err => {
			this.props.showError(`Error in sending data to server: ${err.message}`);
		});
	}
	formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}
	loadData() {
		this.setState({ isFetching: true });
		IssueEdit.dataFetcher({ params: this.props.match.params })
			.then(data => {
				const issue = data.IssueEdit;
				issue.created = new Date(issue.created);
				issue.completionDate = issue.completionDate != null ? this.formatDate(issue.completionDate) : null;
				console.log('issue.completionDate', issue.completionDate);


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
	submitForm() {
		this.props.dispatch(submit('EditIssueForm'));
	}
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

		const { classes } = this.props;
		return (
			<div>
				<Dialog
					fullScreen
					open={this.state.open}
					onRequestClose={this.hideModal}
					transition={<Slide direction="up" />}>

					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton color="contrast" onClick={this.hideModal} aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography type="title" color="inherit" className={classes.flex}>
								Edit Issue
							</Typography>
							<Button color="contrast" onClick={this.submitForm}>
								save
              				</Button>
						</Toolbar>
					</AppBar>
					<div className={classes.formSession}>
						<EditIssueForm issue={issue} initialValues={issue} onSubmit={this.onSubmit} />
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
export default connect()(componentWithStyles);
