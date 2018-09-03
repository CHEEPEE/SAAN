function manageStudents() {
  ReactDOM.render(<ManageStudents />, root);
}

function fetchStudents() {
  $.ajax({
    type: "Post",
    url: "students/fetchStudents.php",
    success: function(data) {
      var listItem = JSON.parse(data).map(function(object, index) {
        return (
          <StudentItem
            key={object.student_id}
            f_name={object.f_name}
            m_name={object.m_name}
            l_name={object.l_name}
            student_id={object.student_id}
            department_name={object.department_name}
            course={object.course_name}
            year_level={object.year_level}
            parent_number={object.parent_number}
            parent_email={object.parent_email}
            parent_name={object.parent_name}
            department_id={object.department_id}
            course_id={object.course_id}
          />
        );
      });

      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.getElementById("studentListContainer")
      );
    }
  });
}

class ManageStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addStudent: "d-none"
    };
  }
  // fetch departments
  chooseDepartment() {
    let sup = this;
    $.ajax({
      type: "Post",
      url: "department/fetchDepartment.php",
      success: function(data) {
        console.log("choose department " + data);
        var listItem = JSON.parse(data).map(object => (
          <OptionItem
            key={object.department_id}
            optionValue={object.department_id}
            optionName={object.department_name}
          />
        ));
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.getElementById("dropdownDepartment")
        );
        sup.chooseCourse();
      }
    });
  }
  // trigger this function when the department change (based on department id)
  chooseCourse() {
    let department_id = $("#dropdownDepartment").val();
    $.ajax({
      type: "Post",
      url: "department/fetchCourse.php",
      data: { department_id: department_id },
      success: function(data) {
        var listItem = JSON.parse(data).map(object => (
          <OptionItem
            key={object.course_id}
            optionValue={object.course_id}
            optionName={object.course_name}
          />
        ));
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.getElementById("courseContainer")
        );
      }
    });
  }

  insertStudent() {
    let sup = this;
    let department_id = $("#dropdownDepartment").val();
    let course_id = $("#courseContainer").val();
    let year_level = $("#yearLevelContainer").val();
    let student_id = $("#student_id").val();
    let f_name = $("#f_name").val();
    let m_name = $("#m_name").val();
    let l_name = $("#l_name").val();
    let suffix = $("#suffix").val();

    let parent_name = $("#parent_name").val();
    let parent_number = $("#parent_number").val();
    let parent_email = $("#parent_email").val();

    $.ajax({
      url: "students/addStudentInformation.php",
      method: "POST",
      data: {
        department_id: department_id,
        course_id: course_id,
        year_level: year_level,
        student_id: student_id,
        f_name: f_name,
        m_name: m_name,
        l_name: l_name,
        suffix: suffix,
        parent_name: parent_name,
        parent_number: parent_number,
        parent_email: parent_email
      },
      success: function(data) {
        console.log(data);
        $("#student_id").val("");
        $("#f_name").val("");
        $("#m_name").val("");
        $("#l_name").val("");
        $("#parent_name").val("");
        $("#parent_number").val("");
        $("#parent_email").val("");
        sup.fetchStudents();
      }
    });
  }

  fetchStudents() {
    let sup = this;
    fetchStudents();
  }

  changeInserStudentState() {
    this.setState({
      addStudent: this.state.addStudent == "d-none" ? "visible" : "d-none"
    });
  }

  componentDidMount() {
    this.chooseDepartment();
    this.fetchStudents();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <button
            type="button"
            onClick={this.changeInserStudentState.bind(this)}
            className="btn btn-info"
          >
            Add Students
          </button>
        </div>

        {/* Add student form */}
        <div
          className={
            "row mt-3 shadow bg-white rounded pl-3 pr-3 pt-3 pb-3 " +
            this.state.addStudent
          }
        >
          <h5 className="col-sm-12">Student Information</h5>

          <div className="col-sm-4">
            <div className="input-group mb-3">
              <select
                class="custom-select"
                onChange={this.chooseCourse.bind(this)}
                id="dropdownDepartment"
              >
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
              <select class="custom-select" id="courseContainer">
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
              <select class="custom-select" id="yearLevelContainer">
                {/* choose Year Level container */}
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
                <option value="5">Fifth Year</option>
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
                id="student_id"
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Student ID"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group w-100">
              <input
                id="f_name"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group w-100">
              <input
                id="m_name"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Middle Name"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group w-100">
              <input
                id="l_name"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="col-sm-1">
            <div className="form-group w-100">
              <input
                id="suffix"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Suffix"
              />
            </div>
          </div>

          <h5 className="col-sm-12">Parent Information</h5>

          <div className="col-sm-6">
            <div className="form-group w-100">
              <input
                id="parent_name"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Parent Full Name"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group w-100">
              <input
                id="parent_number"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Parent's Phone Number"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group w-100">
              <input
                id="parent_email"
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Parent's Email"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-100 ml-3 mr-3 btn btn-info"
            onClick={this.insertStudent.bind(this)}
          >
            Insert Student Information
          </button>
        </div>

        {/* End Add student form */}
        <div
          className={"row mt-5 shadow bg-white rounded pl-3 pr-3 pt-3 pb-3 "}
        >
          {/* student filter */}
          <div className="col-sm-12">
            <h3>Student List </h3>
          </div>
          <div className="col-2">
            <select class="form-control form-control-sm" id="selectDepartment">
              <option>Departments</option>
            </select>
          </div>
          <div className="col-2">
            <select class="form-control form-control-sm" id="selectCourses">
              <option>Courses</option>
            </select>
          </div>
          <div className="col-2">
            <select class="form-control form-control-sm" id="selectYearLevel">
              <option>Year Level</option>
            </select>
          </div>
          {/* end student filter */}
          <div className="col-sm-12">
            <div className="row mt-3">
              <div className="mt-3 mr-3 ml-3 list-group-item text-white font-weight-bold list-group-item-action border-0 bg-info">
                <div className="row">
                  <div className="col-sm-2 plo-3">Student ID</div>
                  <div className="col-sm-3 pl-3">Student Name</div>
                  <div className="col-sm-3">Department</div>
                  <div className="col-sm-3">Course</div>
                  <div className="col-sm-1">Year Level</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="mt-3" id="studentListContainer" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class OptionItem extends React.Component {
  render() {
    return (
      <option value={this.props.optionValue}>{this.props.optionName}</option>
    );
  }
}
class StudentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extend: "d-none",
      removeStudentNotice: "d-none",
      student_id: this.props.student_id
    };
  }
  extendState() {
    this.setState({
      extend: this.state.extend == "d-none" ? "visible" : "d-none"
    });
  }
  removeNotice() {
    this.setState({
      removeStudentNotice:
        this.state.removeStudentNotice == "d-none" ? "visible" : "d-none"
    });
  }
  componentDidMount() {
    this.getCourse();
    this.getDepartment();
   this.getYearLevel();
  }
  getDepartment() {
    let sup = this;
    $.ajax({
      type: "Post",
      url: "department/fetchDepartment.php",
      success: function(data) {

        var selected = JSON.parse(data).map(function(object, index) {
          if (object.department_id == sup.props.department_id) {
            return (
              <OptionItem
              key={object.department_id}
              optionValue={object.department_id}
              optionName={object.department_name}
              />
            );
          }
        });
        var notSelected = JSON.parse(data).map(function(object, index) {
          if (object.department_id != sup.props.department_id) {
            return (
              <OptionItem
                key={object.department_id}
                optionValue={object.department_id}
                optionName={object.department_name}
              />
            );
          }
        });
        ReactDOM.render(
          <React.Fragment>
            {selected}
            {notSelected}
          </React.Fragment>,
          document.getElementById(
            "updateDepartment" + sup.props.student_id
          )
        );
      }
    });
  }
  getCourse() {
    let department_id = this.props.department_id;
    let sup = this;
    $.ajax({
      type: "Post",
      url: "department/fetchCourse.php",
      data: { department_id: department_id },
      success: function(data) {
        var selected = JSON.parse(data).map(function(object, index) {
          if (object.course_id == sup.props.course_id) {
            return (
              <OptionItem
                key={object.course_id}
                optionValue={object.course_id}
                optionName={object.course_name}
              />
            );
          }
        });
        var notSelected = JSON.parse(data).map(function(object, index) {
          if (object.course_id != sup.props.course_id) {
            return (
              <OptionItem
                key={object.course_id}
                optionValue={object.course_id}
                optionName={object.course_name}
              />
            );
          }
        });
        ReactDOM.render(
          <React.Fragment>
            {selected}
            {notSelected}
          </React.Fragment>,
          document.getElementById(
            "updateCourseContainer" + sup.props.student_id
          )
        );
      }
    });
  }
  getYearLevel() {
    let department_id = this.props.department_id;
    let sup = this;
    let data = [
    {"yearValue":"First Year","yearLevelId":1},
    {"yearValue":"Second Year","yearLevelId":2},
    {"yearValue":"Third Year","yearLevelId":3},
    {"yearValue":"Fourth Year","yearLevelId":4},
    {"yearValue":"Fifht Year","yearLevelId":5}];



        var selected = data.map(function(object, index) {
          if (object.yearLevelId == sup.props.year_level) {
            return (
              <OptionItem
                key={object.yearLevelId}
                optionValue={object.yearLevelId}
                optionName={object.yearValue}
              />
            );
          }
        });
        var notSelected = data.map(function(object, index) {
          if (object.yearLevelId != sup.props.year_level) {
            return (
              <OptionItem
              key={object.yearLevelId}
              optionValue={object.yearLevelId}
              optionName={object.yearValue}
            />
            );
          }
        });
        ReactDOM.render(
          <React.Fragment>
            {selected}
            {notSelected}
          </React.Fragment>,
          document.getElementById(
            "updateYearLevel" + sup.props.student_id
          )
        );
      }
  removeStudent() {
    let sup = this;
    $.ajax({
      type: "post",
      url: "students/function.php",
      data: {
        student_id: sup.props.student_id,
        requestType: "removeStudent"
      },
      success: function(data) {
        console.log(data);
        fetchStudents();
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div
          onClick={this.extendState.bind(this)}
          className="mt-2 list-group-item list-group-item-action border-0 bg-light"
        >
          <div className="row">
            <div className="col-sm-2">{this.props.student_id}</div>
            <div className="col-sm-3">
              {this.props.l_name + ", " + this.props.f_name}
            </div>
            <div className="col-sm-3">{this.props.department_name}</div>
            <div className="col-sm-3">{this.props.course}</div>
            <div className="col-sm-1 pl-5">{this.props.year_level}</div>
          </div>
        </div>
        <div
          className={
            "row p-3 pr-3 m-1 border border-light rounded " + this.state.extend
          }
        >
          <div className="col-sm-12">
            <div className="row">
              <h3>Parent's Information</h3>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <small className="text-info">Name</small>
                <br />
                <div className=" font-weight-bold">
                  {this.props.parent_name}
                </div>
              </div>
              <div className="col-sm-3">
                <small className="text-info">Contact Number</small>
                <br />
                <div className=" font-weight-bold">
                  {this.props.parent_number}
                </div>
              </div>
              <div className="col-sm-3">
                <small className="text-info">Email</small>
                <br />
                <div className=" font-weight-bold">
                  {this.props.parent_email}
                </div>
              </div>
            </div>
            <div className="row border-top mt-3 p-3 d-flex flex-row-reverse">
              <div>
                <button
                  type="button"
                  data-toggle="modal"
                  data-target={"#updateStudentModal" + this.props.student_id}
                  className="btn btn-info mr-3"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={this.removeNotice.bind(this)}
                  class="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className={"row d-flex "}>
              <div
                class={
                  "alert alert-danger w-100 " + this.state.removeStudentNotice
                }
                role="alert"
              >
                <div className="row">
                  <div className="col-sm-10">Are you sure to remove this?</div>
                  <div className="col">
                    <div className="row">
                      <div
                        className="col text-success"
                        onClick={this.removeStudent.bind(this)}
                      >
                        Yes
                      </div>
                      <div
                        className="col text-danger"
                        onClick={this.removeNotice.bind(this)}
                      >
                        Cancel
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* update student Modal */}

        <div
          className="modal fade"
          id={"updateStudentModal" + this.props.student_id}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Student Information
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {/* modal body */}
              <div className="modal-body m-3">
                <div className="row ">
                  <h3 className="text-info">Student Information</h3>
                </div>
                {/* Studen info form start */}
                <div className="row">
                  <div className="col-3">
                    <div class="form-group">
                      <small className="text-muted">Student Last name</small>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        defaultValue={this.props.l_name}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div class="form-group">
                      <small className="text-muted">Student First name</small>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        defaultValue={this.props.f_name}
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-group">
                      <small className="text-muted">Student Middle name</small>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        defaultValue={this.props.m_name}
                      />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <small className="text-muted">Suffix</small>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        defaultValue={this.props.suffix}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className = "col-sm-12">
                  <div className="input-group mb-3">
                    <select
                      id={"updateDepartment" + this.state.student_id}
                      className="custom-select"
                    >
                      {/* choose department container */}
                    </select>
                    <div className="input-group-append">
                      <label
                        className="input-group-text"
                        for="inputGroupSelect02"
                      >
                        Department
                      </label>
                    </div>
                  </div>
                  </div>
                  <div className = "col-6">
                  <div className="input-group mb-3">
                    <select
                      id={"updateCourseContainer" + this.state.student_id}
                      className="custom-select"
                    >
                      {/* choose Course container */}
                    </select>
                    <div className="input-group-append">
                      <label
                        className="input-group-text"
                        for="inputGroupSelect02"
                      >
                        Course
                      </label>
                    </div>
                  </div>
                  </div>
                  <div className = "col-6">
                  <div className="input-group mb-3">
                    <select
                      id={"updateYearLevel" + this.state.student_id}
                      className="custom-select"
                    >
                      {/* choose year level container */}
                    </select>
                    <div className="input-group-append">
                      <label
                        className="input-group-text"
                        for="inputGroupSelect02"
                      >
                        Year Level
                      </label>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="row">
                <h3 className="text-info">Parent's Information</h3>
                </div>
                <div className = "row">
                <div className="col-12">
                    <div class="form-group">
                      <small className="text-muted">Parents name</small>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        defaultValue={this.props.parent_name}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="form-group">
                      <small className="text-muted">Parents Contact Number</small>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        defaultValue={this.props.parent_number}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="form-group">
                      <small className="text-muted">Parents Email</small>
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        defaultValue={this.props.parent_email}
                      />
                    </div>
                  </div>
                </div>
                {/* end modal body */}
              </div>
              
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* edn update student Modal */}
      </React.Fragment>
    );
  }
}
