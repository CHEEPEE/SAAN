function manageStudents() {
  ReactDOM.render(<ManageStudents />, root);
}

class ManageStudents extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        addStudent: "d-none",
    };
}
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <button type="button" className="btn btn-primary">
            Add Students
          </button>
        </div>
        <div
          className={
            "row mt-3 shadow bg-white rounded pl-3 pr-3 pt-3 pb-3 "
          }
        >
          <h5 className="col-sm-12">Student Information</h5>

          <div className="col-sm-4">
            <div className="input-group mb-3">
              <select class="custom-select" id="department">
                {/* choose department container */}
              </select>
              <div class="input-group-append">
                <label class="input-group-text" for="inputGroupSelect02">
                    Department
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="input-group mb-3">
              <select class="custom-select" id="department">
                {/* choose Course container */}
              </select>
              <div class="input-group-append">
                <label class="input-group-text" for="inputGroupSelect02">
                 Course
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="input-group mb-3">
              <select class="custom-select" id="department">
                {/* choose Year Level container */}
                <option value = "1">First Year</option>
                <option value = "2">Second Year</option>
                <option value = "3">Third Year</option>
                <option value = "4">Fourth Year</option>
                <option value = "5">Fifth Year</option>
              </select>
              <div class="input-group-append">
                <label class="input-group-text" for="inputGroupSelect02">
                 Year Level
                </label>
              </div>
            </div>
          </div>
          
          <div className="col-sm-2">
            <div className="form-group w-100">
              <input
                id="accountname"
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Student ID"
              />
            </div>
          </div>
          <div className="col-sm-5">
            <div className="form-group w-100">
              <input
                id="accountname"
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Student Full Name"
              />
            </div>
          </div>
          <div className="col-sm-5">
            <div className="form-group w-100">
              <input
                id="accountname"
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Loading . . ."
              />
            </div>
          </div>

          <button
            type="button"
            className="w-100 ml-3 mr-3 btn btn-primary"
          >
            Creat Account
          </button>
        </div>
      </React.Fragment>
    );
  }
}
