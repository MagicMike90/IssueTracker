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

    return fetch(request).then(response => {
      if (!response.ok) return response.json().then(error => {
        const errorMsg = `Failed to fetch issues: ${error}`;
        return Promise.reject(errorMsg);
      });
      return response.json();
    }).catch(error => {
      const errorMsg = `Error in fetching data from server: ${error}`;
      return Promise.reject(errorMsg);
    });
  }
  static createIssue(newIssue) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, this.requestHeaders());
    const request = new Request(`/api/issues`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(newIssue)
    });

    return fetch(request).then(response => {
      if (!response.ok) return response.json().then(error => {
        const errorMsg = `Failed to add issue: ${error.message}`;
        return Promise.reject(errorMsg);
      });
      return response.json();
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error}`;
      return Promise.reject(errorMsg);
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
      const errorMsg = `Error in fetching data from server: ${error}`;
      Promise.reject(errorMsg);
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
