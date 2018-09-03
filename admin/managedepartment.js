const root = document.getElementById("mainRoot");

function getDepartments(){
  var deparmentsContainer = document.getElementById("deparmentsContainer");
  $.ajax({
    type: "Post",
    url: "department/fetchDepartment.php",
    success: function(data) {
      var listItem = JSON.parse(data).map(object => (
        <DepartmentItem
          key={object.department_id}
          department_id={object.department_id}
          departmentname={object.department_name}
        />
      ));
      ReactDOM.render(
        <ul className="list-group w-100">{listItem}</ul>,
        deparmentsContainer
      );
    }
  });
}
class ManageDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addDepartmentState: "d-none",
      AddDepartmentbuttonLabel: "Add Department",
      departments: []
    };
  }
  componentDidMount() {
  
    this.getDepartments();
  }
  getDepartments() {
   
  getDepartments();
  }
  changeAddDepartmentState() {
    this.setState({
      addDepartmentState:
        this.state.addDepartmentState == "d-none" ? "visible" : "d-none",
      AddDepartmentbuttonLabel:
        this.state.AddDepartmentbuttonLabel == "Add Department"
          ? "Close Form"
          : "Add Department"
    });
  }
  addDepartment() {
    const sup = this;
    let department_name = $("#department_name").val();
    $.ajax({
      url: "department/addDepartment.php",
      method: "POST",
      data: {
        department_name: department_name
      },
      success: function(data) {
        $("#department_name").val("");
        sup.changeAddDepartmentState();
        getDepartments();
      }
    });
  }
  render() {
    return (
      <div className = "container">
        <div className="row">
          <div className="col-sm-2">
            <button
              type="button"
              onClick={this.changeAddDepartmentState.bind(this)}
              className="btn btn-primary"
            >
              {this.state.AddDepartmentbuttonLabel}
            </button>
          </div>
          <div className="col-sm-9">
            <div className={"row " + this.state.addDepartmentState}>
              <div className="col-sm-9">
                <div className="form-group w-100">
                  <input
                    type="text"
                    className="form-control"
                    id="department_name"
                    aria-describedby="emailHelp"
                    placeholder="Enter Department Name"
                  />
                </div>
              </div>
              <div className="col">
                <button
                  type="button"
                  onClick={this.addDepartment.bind(this)}
                  className="btn btn-outline-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 row p-3">
          <h3>Departments</h3>
        </div>
        <div id="deparmentsContainer" className="row p-3 w-100">
          {/* Department Container */}
        </div>
      </div>
    );
  }
}

function manageDepartmentRoot() {
  ReactDOM.render(<ManageDepartment />, root);
}
manageDepartmentRoot();

class DepartmentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extend: "d-none",
      addCourseInputLayout: "d-none"
    };
  }
  extend() {
    this.setState({
      extend: this.state.extend == "d-none" ? "visible" : "d-none"
    });
  }
  chageStateAddCourseInputLayout() {
    this.setState({
      addCourseInputLayout:
        this.state.addCourseInputLayout == "d-none" ? "visible" : "d-none"
    });
  }
  addCourse() {
    const course = $("#course" + this.props.department_id).val();
    const sup = this;
    $.ajax({
      url: "department/addCourse.php",
      method: "POST",
      data: {
        course_name: course,
        department_id: sup.props.department_id
      },
      success: function(data) {
        console.log(data);
        $("#course" + sup.props.department_id).val("");
        sup.getCourse();
      }
    });
  }
  updateDepartment() {
    let sup = this;
    let update_department = $(
      "#update_department_name" + this.props.department_id
    ).val();
    $.ajax({
      type: "Post",
      url: "department/updateDepartment.php",
      data: {
        department_name: update_department,
        department_id: sup.props.department_id
      },
      success: function(data) {
        if (data == "success") {
         getDepartments();
        } else {
          console.log(data);
          getDepartments();
        }
      }
    });
    $("#updateDepartmentModal" + sup.props.department_id).modal("hide");
  }
  componentDidMount() {
    this.getCourse();
  }
  getCourse() {
    const sup = this;
    var courseContainer = document.getElementById(
      "courseContainer" + this.props.department_id
    );
    setInterval(function() {
      $.ajax({
        type: "Post",
        url: "department/fetchCourse.php",
        data: { department_id: sup.props.department_id },
        success: function(data) {
          var listItem = JSON.parse(data).map(object => (
            <CourseItem
              key={object.course_id}
              course_id={object.course_id}
              department_id={object.department_id}
              coursename={object.course_name}
            />
          ));
          ReactDOM.render(
            <ul className="list-group w-100">{listItem}</ul>,
            courseContainer
          );
        }
      });
    }, 1000); //time in milliseconds
  }
  deleteDepartment() {
    let sup = this;
    $.ajax({
      type: "Post",
      url: "department/removeDepartment.php",
      data: {
        department_id: sup.props.department_id
      },
      success: function(data) {
        if (data == "success") {
          $(
            "#removeDepartmentModal" + sup.props.department_id
          ).modal("hide");
          getDepartments();
        } else {
          console.log(data);
        }
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="mt-3 font-weight-bold list-group-item shadow-sm p-3 list-group-item-action rounded border-0 bg-white text-info">
          <div className="d-flex justify-content-between">
            <div className = "align-self-center" onClick={this.extend.bind(this)}>
              <h5>{this.props.departmentname}</h5>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-outline-info mr-3"
                data-toggle="modal"
                data-target={
                  "#updateDepartmentModal" + this.props.department_id
                }
              >
               {/* update department button */}
                Update
              </button>
              <button type="button" class="btn btn-outline-danger"
              data-toggle="modal"
              data-target={
                "#removeDepartmentModal" + this.props.department_id
              }
              >
              {/* remove department button */}
                Remove
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            "w-100 border shadow border-white bg-white p-3 mt-2 rounded " +
            this.state.extend
          }
        >
          <div className="row">
            <div className="col-sm-2 mr-1">
              <button
                onClick={this.chageStateAddCourseInputLayout.bind(this)}
                type="button"
                className="btn btn-outline-secondary"
              >
                Add Program
              </button>
            </div>
            <div className={"col-sm-9 " + this.state.addCourseInputLayout}>
              <div className="row">
                <div className="col-sm-10">
                  <div className="form-group w-100">
                    <input
                      type="text"
                      className="form-control"
                      id={"course" + this.props.department_id}
                      aria-describedby="emailHelp"
                      placeholder="Enter Program Name"
                    />
                  </div>
                </div>
                <div className="col-sm-2">
                  <button
                    type="button"
                    onClick={this.addCourse.bind(this)}
                    className="btn btn-outline-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <h5>Programs</h5>
          </div>
          <div
            id={"courseContainer" + this.props.department_id}
            className="row p-3"
          />
        </div>
        {/* update department modal */}
        <div
          className="modal fade"
          id={"updateDepartmentModal" + this.props.department_id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Department
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group w-100">
                  <input
                    type="text"
                    defaultValue={this.props.departmentname}
                    className="form-control"
                    id={"update_department_name" + this.props.department_id}
                    aria-describedby="emailHelp"
                    placeholder="Enter Department Name"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.updateDepartment.bind(this)}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* remove department  modal*/}

         <div
          className="modal fade"
          id={"removeDepartmentModal" + this.props.department_id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Department
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
               Remove {this.props.departmentname}?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.deleteDepartment.bind(this)}
                  className="btn btn-primary"
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

class CourseItem extends React.Component {
  state = {};
  updateCourse() {
    let sup = this;
    let updateCourse = $(
      "#update_course_name" + this.props.course_id + this.props.department_id
    ).val();
    $.ajax({
      type: "Post",
      url: "department/updateCourse.php",
      data: {
        course_name: updateCourse,
        course_id: sup.props.course_id
      },
      success: function(data) {
        if (data == "success") {
          $(
            "#updateCourseModal" + sup.props.course_id + sup.props.department_id
          ).modal("hide");
        } else {
          console.log(data);
        }
      }
    });
  }
  deleteCourse() {
    let sup = this;
    $.ajax({
      type: "Post",
      url: "department/removeCourse.php",
      data: {
        course_id: sup.props.course_id
      },
      success: function(data) {
        if (data == "success") {
          $(
            "#deleteCourseModal" +
            sup.props.course_id +
            sup.props.department_id
          ).modal("hide");
        } else {
          console.log(data);
        }
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="mt-2 list-group-item p-3 list-group-item-action border-0 bg-light">
          <div className="row">
            <div className="col">{this.props.coursename}</div>
            <div className="col d-flex flex-row-reverse bd-highlight">
              <div>
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
        {/* update course modal */}
        <div
          className="modal fade"
          id={
            "updateCourseModal" +
            this.props.course_id +
            this.props.department_id
          }
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Program
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group w-100">
                  <input
                    type="text"
                    defaultValue={this.props.coursename}
                    className="form-control"
                    id={
                      "update_course_name" +
                      this.props.course_id +
                      this.props.department_id
                    }
                    aria-describedby="emailHelp"
                    placeholder="Enter Course Name"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.updateCourse.bind(this)}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* delete course modal */}
        <div
          className="modal fade"
          id={
            "deleteCourseModal" +
            this.props.course_id +
            this.props.department_id
          }
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete Program
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              Delete {this.props.coursename}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.deleteCourse.bind(this)}
                  className="btn btn-primary"
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
