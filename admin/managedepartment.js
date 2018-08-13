const root = document.getElementById("mainRoot");

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
    var deparmentsContainer = document.getElementById("deparmentsContainer");
    this.getDepartments();
  }
  getDepartments() {
    const sup = this;
    setInterval(function() {
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
    }, 1000); //time in milliseconds
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
      }
    });
  }
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
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
  componentDidMount() {
    this.getCourse();
  }
  getCourse() {
    const sup = this;
    var courseContainer = document.getElementById(
      "courseContainer" + this.props.department_id
    );
    $.ajax({
      type: "Post",
      url: "department/fetchCourse.php",
      data: { department_id: sup.props.department_id },
      success: function(data) {
        var listItem = JSON.parse(data).map(object => (
          <CourseItem
            key={object.course_id}
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
  }
  render() {
    return (
      <React.Fragment>
        <div
          onClick={this.extend.bind(this)}
          className="mt-3 font-weight-bold list-group-item shadow-sm p-3 list-group-item-action rounded border-0 bg-primary text-white"
        >
         <div className = "d-flex justify-content-between">
          <div>
            {this.props.departmentname}
          </div>
          <div>
           <button type="button" class="btn btn-outline-light mr-3">Update</button>
           <button type="button" class="btn btn-outline-light">Remove</button>
          </div>
         </div>
        </div>
        <div className={"w-100 border shadow border-white bg-white p-3 mt-2 rounded " + this.state.extend}>
          <div className="row">
            <div className="col-sm-1 mr-1">
              <button
                onClick={this.chageStateAddCourseInputLayout.bind(this)}
                type="button"
                className="btn btn-outline-secondary"
              >
                Add Course
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
                      placeholder="Enter Course Name"
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
            <h5>Courses</h5>
          </div>
          <div
            id={"courseContainer" + this.props.department_id}
            className="row p-3"
          />
        </div>
      </React.Fragment>
    );
  }
}

class CourseItem extends React.Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="mt-2 list-group-item p-3 list-group-item-action border-0 bg-light">
          {this.props.coursename}
        </div>
      </React.Fragment>
    );
  }
}
