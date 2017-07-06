import React from 'react';
import ReactDOM from 'react-dom'
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


import IssueList from './IssueList.jsx'
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const RoutedApp = () => {
    return (
        <Router>
            <div>
                <Redirect from="/" to="/issues" />
                <Route path="/issues" component={IssueList} />
                <Route path="/issue/:id" component={IssueEdit} />
                <Route component={NoMatch} />
            </div>
        </Router>
        // <Switch>
        //     <Route exact path="/" component={IssueList} />
        //     <Route path="/:user" component={IssueEdit} />
        //     <Route component={NoMatch} />
        // </Switch>
    )
};
ReactDOM.render(<RoutedApp />, contentNode);

// ReactDOM.render((
//     <Router>
//         <div>
//             <Route path="/issues" component={IssueList} />
//             <Route path="/issue/:id" component={IssueEdit} />
//             <Route path="*" component={NoMatch} />
//         </div>
//     </Router>
// ),
//     document.getElementById('contents')
// );



if (module.hot) {
    module.hot.accept();
}
