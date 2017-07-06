import React from 'react';
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

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
                {/*<Route path="*" component={NoMatch} />*/}
            </div>
        </Router>
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
