import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from './Header.jsx';
// import Routes from './Routes.jsx';


// withRouter IssueList can use this.props.router to access the router object.(this.props.location)
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    {this.props.children}
                    <hr />
                    <h5><small>
                        Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">GitHub repository</a>.
            </small></h5>
                </div>
            </div>
        );
    }
}
App.propTypes = {
    children: PropTypes.object.isRequired,
};


// // exact let routes match exaclty /issues not /issues/:id
// const RoutedApp = () => (
//     <Router>
//         <App>
//             <Routes />
//         </App>
//     </Router>
// );
// const contentNode = document.getElementById('contents');
// ReactDOM.render(<RoutedApp />, contentNode);




