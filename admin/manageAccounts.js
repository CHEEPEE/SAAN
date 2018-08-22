function manageAccoutRoot() {
  ReactDOM.render(<ManageAccout />, root);
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
    $.ajax({
      type: "Post",
      url: "accounts/fetchSecAccount.php",
      success: function(data) {
        var listItem = JSON.parse(data).map(object => (
          <SecretaryAccoutsItem
            key={object.userid}
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

  componentDidMount() {
    this.chooseDepartment();
    this.getSecretaryAccounts();
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
            <button
              type="button"
              onClick={this.chageStateAddAccountLayout.bind(this)}
              className="btn btn-outline-primary"
            >
              Add Secretary Account
            </button>
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

          <div className="row mt-3">
            <h3>Secretary Accounts</h3>
          </div>
          <div id="secretaryAccountContainer" className="row" />

          <div className="row mt-3">
            <h3>My Account</h3>
          </div>
          <div id="myAccountContainer" className="row" />
        </div>
        {/* second column */}
        <div className="col p-3" id = "detailsContainer">
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
  render() {
    return (
      <React.Fragment>
        <div className="mt-2 list-group-item p-3 list-group-item-action shadow-sm border-0 bg-white ">
          <div className="row">
            <div className="flex-grow-1 p-3">
              <div className="row font-weight-bold pl-3 text-info">{this.props.account_name}</div>
              <div className="row pl-3">{this.props.department_name}</div>
            </div>
            <div className="p-3">
              <div className = "">
                <button
                  type="button"
                  class="btn btn-outline-info mr-3"
                  data-toggle="modal"
                  data-target={
                    "#updateCourseModal" +
                    this.props.course_id +
                    this.props.department_id
                  }
                >
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-toggle="modal"
                  data-target={
                    "#deleteCourseModal" +
                    this.props.course_id +
                    this.props.department_id
                  }
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
