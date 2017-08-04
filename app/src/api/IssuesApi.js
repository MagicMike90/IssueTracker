class IssuesApi {

  static requestHeaders() {
    // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    return {};
  }

  static getAllIssues(search) {
    const headers = this.requestHeaders();
    const request = new Request(`/api/Issues?${search}`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request);
  }
  static createIssue(newIssue) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/issues`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(newIssue)
    });

    return fetch(request);
  }

  static updateIssue(issue) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/issues/${Issue.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        Issue: Issue
      })
    });

    return fetch(request);
  }


  static deleteIssue(Issue) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/issues/${Issue._id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request);
  }

  static deleteBulkIssue(issueIds) {

    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`/api/issues`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({ 
        issueIds:issueIds
      })
    });

    return fetch(request);
  }
}

export default IssuesApi;
