class IssuesApi {

  static requestHeaders() {
    // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    return {};
  }

  static getAllIssues(search) {
    const headers = this.requestHeaders();
    const request = new Request(`/api/Issues?${search}`, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateIssue(issue) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
    const request = new Request(`${process.env.HOST}/api/issues/${Issue.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ Issue: Issue })
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createIssue(Issue) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
    const request = new Request(`${process.env.HOST}/api/issues`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ Issue: Issue })
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteIssue(Issue) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
    const request = new Request(`${process.env.HOST}/api/issues/${Issue.id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default IssuesApi;
