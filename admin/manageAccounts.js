function manageAccoutRoot() {
  ReactDOM.unmountComponentAtNode(root);
  ReactDOM.render(<ManageAccout />, root);
}


function getSecretaryAccounts() {
  $.ajax({
    type: "Post",
    url: "accounts/fetchSecAccount.php",
    success: function(data) {
      var listItem = JSON.parse(data).map(object => (
        <SecretaryAccoutsItem
          key={object.userid}
          objectData={object}
          account_name={object.account_name}
          department_name={object.department_name}
        />
      ));
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.getElementById("secretaryAccountContainer")
      );
    }
  });
}
class ManageAccout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extend: "d-none",
      addAccountContainer: "d-none"
    };
  }

  chooseDepartment() {
    $.ajax({
      type: "Post",
      url: "department/fetchDepartment.php",
      success: function(data) {
        var listItem = JSON.parse(data).map(object => (
          <DepartmentOptions
            key={object.department_id}
            department_id={object.department_id}
            departmentname={object.department_name}
          />
        ));
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.getElementById("department")
        );
      }
    });
  }

  getSecretaryAccounts() {
    getSecretaryAccounts();
  }

  componentDidMount() {
    this.chooseDepartment();
    // this.getSecretaryAccounts();
  }

  chageStateAddAccountLayout() {
    this.setState({
      addAccountContainer:
        this.state.addAccountContainer == "d-none" ? "visible" : "d-none"
    });
  }
  createAccount() {
    const sup = this;
    let username = $("#username").val();
    let password = $("#password").val();
    let accountName = $("#accountname").val();
    let department_id = $("#department").val();

    $.ajax({
      url: "accounts/addAccount.php",
      method: "POST",
      data: {
        username: username,
        password: password,
        department_id: department_id,
        account_name: accountName
      },
      success: function(data) {
        console.log(data);
        $("#accountname").val("");
        $("#password").val("");
        $("#username").val("");
        sup.chageStateAddAccountLayout();
        sup.getSecretaryAccounts();
      }
    });
  }
  render() {
    return (
      <div className="row">
        {/* first column */}
        <div className="col">
          <div className="row">
            {/* <button
              type="button"
              onClick={this.chageStateAddAccountLayout.bind(this)}
              className="btn btn-outline-primary"
            >
              Add Secretary Account
            </button> */}
          </div>
          <div
            className={
              "row mt-3 border-0 rounded bg-white shadow-sm pl-3 pr-3 pt-5 pb-5 " +
              this.state.addAccountContainer
            }
          >
            <h5 className="col-sm-12">Add Account</h5>
            <div className="col-sm-12">
              <div className="form-group w-100">
                <input
                  id="accountname"
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="input-group mb-3">
                <select class="custom-select" id="department">
                  {/* choose department container */}
                </select>
                <div class="input-group-append">
                  <label class="input-group-text" for="inputGroupSelect02">
                    Choose Department
                  </label>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group w-100">
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Login Username"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group w-100">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={this.createAccount.bind(this)}
              className="w-100 ml-3 mr-3 btn btn-primary"
            >
              Creat Account
            </button>
          </div>

          {/* <div className="row mt-3">
            <h3>Secretary Accounts</h3>
          </div> */}
          <div id="secretaryAccountContainer" className="row" />

          <div className="row mt-3">
            <h3>My Account</h3>
          </div>
          <div id="myAccountContainer" className="row shadow-sm bg-white p-3">
            <MyAccount />
          </div>
        </div>
        {/* second column */}
        <div className="col p-3" id="detailsContainer">
          nothing to show yet
        </div>
      </div>
    );
  }
}


class DepartmentOptions extends React.Component {
  render() {
    return (
      <option value={this.props.department_id}>
        {this.props.departmentname}
      </option>
    );
  }
}

class SecretaryAccoutsItem extends React.Component {
  updateAccount() {
    let detailsContainer = document.querySelector("#detailsContainer");
    ReactDOM.render(
      <UpdateSecretaryAccount
        key={this.props.objectData.userid}
        objectData={this.props.objectData}
      />,
      detailsContainer
    );
  }

  removeAccountConfirmation() {
    if (confirm("Are you sure you want remove this Account?")) {
      // Save it!
      this.removeAccount();
    } else {
      // Do nothing!
    }
  }
  removeAccount() {
    $.ajax({
      url: "functions/functions.php",
      method: "POST",
      data: {
        requestType: "removeAccount",
        account_id: this.props.objectData.userid
      },
      success: function(data) {
        console.log(data);
        let detailsContainer = document.querySelector("#detailsContainer");
        ReactDOM.render(
          <React.Fragment>Account Removed</React.Fragment>,
          detailsContainer
        );
        getSecretaryAccounts();
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="mt-2 list-group-item p-3 list-group-item-action shadow-sm border-0 bg-white ">
          <div className="row">
            <div className="flex-grow-1 p-3">
              <div className="row font-weight-bold pl-3 text-info">
                {this.props.account_name}
              </div>
              <div className="row pl-3">{this.props.department_name}</div>
            </div>
            <div className="p-3">
              <div className="">
                <button
                  type="button"
                  class="btn btn-outline-info mr-3"
                  data-toggle="modal"
                  onClick={this.updateAccount.bind(this)}
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-toggle="modal"
                  onClick={this.removeAccountConfirmation.bind(this)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class UpdateSecretaryAccount extends React.Component {
  state = {
    showPassword: "password"
  };

  updateAccountDetails() {
    let account_name = $("#account_name").val();
    let username = $("#update_username").val();
    let password = $("#update_password").val();

    $.ajax({
      url: "functions/functions.php",
      method: "POST",
      data: {
        requestType: "updateAccount",
        account_id: this.props.objectData.userid,
        account_name: account_name,
        password: password,
        username: username
      },
      success: function(data) {
        console.log(data);
        let detailsContainer = document.querySelector("#detailsContainer");
        ReactDOM.render(
          <React.Fragment>Account Updated Succesfully</React.Fragment>,
          detailsContainer
        );
        getSecretaryAccounts();
      }
    });
  }

  showPassword() {
    this.setState({
      showPassword: this.state.showPassword == "password" ? "text" : "password"
    });
  }

  render() {
    return (
      <div className="container-fluid rounded bg-white shadow p-3">
        <div className="row mb-2">
          <div className="col">
            <h5>Update Account</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group w-100">
              <input
                id="account_name"
                type="text"
                defaultValue={this.props.objectData.account_name}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Login Username"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group w-100">
              <input
                id="update_username"
                type="text"
                defaultValue={this.props.objectData.username}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Login Username"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group w-100">
              <input
                id="update_password"
                type={this.state.showPassword}
                defaultValue={this.props.objectData.password}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Login Username"
              />
            </div>
            <div className="form-group form-check">
              <input
                onChange={this.showPassword.bind(this)}
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Show Password
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              onClick={this.updateAccountDetails.bind(this)}
              type="button"
              class="btn w-100 btn-info"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class UpdateMyAccount extends React.Component {
  state = {
    account_name: "",
    username: "",
    password: "",
    showPassword: "password"
  };
  showPassword() {
    this.setState({
      showPassword: this.state.showPassword == "password" ? "text" : "password"
    });
  }
  updateAccount() {
    let userName = $("#update_username").val();
    let recoveryEmail = $("#update_recovery_email").val();
    let account_name = $("#account_name").val();
    let update_password = $("#update_password").val();
    let account_id = this.props.adminCreds.userid;
    $.ajax({
      url: "accounts/updateAdminAccount.php",
      method: "POST",
      data: {
        account_id: account_id,
        account_name: account_name,
        password: update_password,
        username: userName,
        recoveryEmail: recoveryEmail
      },
      success: function(data) {
        console.log(data);
        ReactDOM.render(
          <React.Fragment>
            <div class="alert alert-success" role="alert">
              Account Updated
            </div>
          </React.Fragment>,
          detailsContainer
        );
      }
    });
  }
  componentDidMount() {}
  render() {
    return (
      <div className="container-fluid rounded bg-white shadow p-3">
        <div className="row mb-2">
          <div className="col">
            <h5>Update Admin Account</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group w-100">
              <input
                id="account_name"
                type="text"
                defaultValue={this.props.adminCreds.account_name}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Login Username"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group w-100">
              <input
                id="update_username"
                type="text"
                defaultValue={this.props.adminCreds.username}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Login Username"
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group w-100">
              <input
                id="update_recovery_email"
                type="email"
                defaultValue={this.props.adminCreds.recovery_email}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Recovery Email"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group w-100">
              <input
                id="update_password"
                type={this.state.showPassword}
                defaultValue={this.props.adminCreds.password}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Login Username"
              />
            </div>
            <div className="form-group form-check">
              <input
                onChange={this.showPassword.bind(this)}
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Show Password
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              onClick={this.updateAccount.bind(this)}
              type="button"
              class="btn w-100 btn-info"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class MyAccount extends React.Component {
  state = {};
  updateAccount() {
    let detailsContainer = document.querySelector("#detailsContainer");
    $.ajax({
      type: "post",
      url: "accounts/getAdminAccount.php",
      success: function(data) {
        console.log(data);
        // var listItem = JSON.parse(data).map(object => (
        //  <UpdateMyAccount adminCreds = {object}/>
        // ));
        var jsonData = JSON.parse(data);
        ReactDOM.render(
          <UpdateMyAccount adminCreds={jsonData} />,
          detailsContainer
        );
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row text-info">
          <div className="col">
            <h3>Manage My Account</h3>
          </div>
          <div className="col d-flex flex-row-reverse">
            <button
              onClick={this.updateAccount.bind(this)}
              type="button"
              class="btn btn-info"
            >
              Manage My Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

manageAccoutRoot();