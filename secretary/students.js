function getStudents() {
  let detailsContainer = document.querySelector("#mainContainerRoot");
  ReactDOM.render(<StudentsContainer />, detailsContainer);
}

class CallStudentsButton extends React.Component {
  state = {};
  getStudents() {
    getStudents();
  }
  render() {
    return (
      <button
        type="button"
        onClick={this.getStudents.bind(this)}
        className="btn btn-info"
      >
        Students -->
      </button>
    );
  }
}

ReactDOM.render(<CallStudentsButton />, document.querySelector("#forButtons"));
class StudentsContainer extends React.Component {
  state = {};

  getStudents() {
    let student = $("#searchStudent").val();
    fetchStudents(global_deptId, "na", "na", student);
  }
  componentDidMount(){
    this.getStudents();
  }
  render() {
    return (
      <div className="container bg-white p-5 shadow">
        <div className="row">
          <h3>Student List</h3>
        </div>
        <div className="row">
          <div class="form-group w-100">
            <label for="exampleInputEmail1">Search Student</label>
            <input
              onChange={this.getStudents.bind(this)}
              type="text"
              class="form-control"
              id="searchStudent"
              aria-describedby="emailHelp"
              placeholder="Seach Student"
            />
          </div>
        </div>
        <div className="row">
          <div className="list-group w-100" id="studentListContainer" />
        </div>
      </div>
    );
  }
}
function fetchStudents(department_id, yearLevel, courseId, searchStudent) {
  department_id = isNaN(department_id) ? "NaN" : department_id;
  yearLevel = isNaN(yearLevel) ? "NaN" : yearLevel;
  courseId = isNaN(courseId) ? "NaN" : courseId;
  searchStudent = searchStudent == null ? "" : searchStudent;

  $.ajax({
    type: "Post",
    url: "students/fetchStudent.php",
    data: {
      department_id: department_id,
      year_level: yearLevel,
      course_id: courseId,
      search: searchStudent
    },
    success: function(data) {
      console.log(data);
      var listItem = JSON.parse(data).map(function(object, index) {
        return (
          <StudentItemRecords
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
            suffix={object.suffix}
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

class StudentItemRecords extends React.Component {
  state = {};

  getStudentRecords() {
    let student_id = this.props.student_id;

    let teacherName = $("#inputTeacherName").val();
    $.ajax({
      type: "post",
      url: "students/function.php",
      data: {
        requestType: "getSubjectsWithWarning",
        student_id: student_id
      },
      success: function(data) {
        console.log(data);
        var listItem = JSON.parse(data).map(object => (
          <StudentWarningBySubject
            id={object.warning_id}
            key={object.warning_id}
            subject_id={object.subject_id}
            student_id={object.student_id}
            warning_level={object.warning_level}
            subject_des={object.subject_des}
            teacherName={object.teacherName}
          />
        ));
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.querySelector("#studentRecord" + student_id)
        );
      }
    });
  }
  printDetails(){
    var win = window.open('printreport.php?student_id='+this.props.student_id,"_blank");
    win.focus();
  }


  componentDidMount() {
    this.getStudentRecords();
  }
  render() {
    return (
      <React.Fragment>
        <div className="list-group-item w-100">
          <div className="row w-100">
            <div className="col">{this.props.student_id}</div>
            <div className="col">
              {this.props.l_name +
                ", " +
                this.props.f_name +
                " " +
                this.props.m_name +
                " " +
                this.props.suffix}
            </div>
            <div className="col">{this.props.course}</div>
            <div className="col-1">{this.props.year_level}</div>
            <div className="col-2">
              <button
                type="button"
                data-toggle="modal"
                data-target={"#viewRecordsModal" + this.props.student_id}
                class="btn btn-info"
              >
                View Records
              </button>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id={"viewRecordsModal" + this.props.student_id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Student Record
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
              <div className="modal-body">
                <div className="row p-3">
                  <div className="col-4">
                    <div className="row">
                      <small>Student Id</small>
                    </div>
                    <div className="row font-weight-bold">
                      {this.props.student_id}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <small>Student Name</small>
                    </div>
                    <div className="row font-weight-bold">
                      {this.props.l_name + ", " + this.props.f_name}
                    </div>
                  </div>
                  <div className="col-sm-6 mt-3">
                    <div className="row">
                      <small>Department</small>
                    </div>
                    <div className="row font-weight-bold">
                      {this.props.department_name}
                    </div>
                  </div>

                  <div className="col-sm-5 mt-3">
                    <div className="row">
                      <small>Program</small>
                    </div>
                    <div className="row font-weight-bold">
                      {this.props.course}
                    </div>
                  </div>
                  <div className="col-sm-1 pl-6 mt-3">
                    <div className="row">
                      <small>Year Level</small>
                    </div>
                    <div className="row font-weight-bold">
                      {this.props.year_level}
                    </div>
                  </div>
                </div>
                <div className={"row m-1 "}>
                  <div className="col-sm-12">
                    <div className="row">
                      <small>Parents Information</small>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <small className="text-info">Name</small>
                        <br />
                        <div className=" font-weight-bold">
                          {this.props.parent_name}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <small className="text-info">Contact Number</small>
                        <br />
                        <div className=" font-weight-bold">
                          {this.props.parent_number}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <small className="text-info">Email</small>
                        <br />
                        <div className=" font-weight-bold">
                          {this.props.parent_email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-sm-12">
                    <small>Student Absences</small>
                  </div>
                  <div className="col-sm-12">
                    <div
                      className="list-group"
                      id={"studentRecord" + this.props.student_id}
                    />
                  </div>
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
                <button type="button" onClick = {this.printDetails.bind(this)} className="btn btn-primary">
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class StudentWarningBySubject extends React.Component {
  state = {
    warningLevel:this.props.warning_level,
    absent_value:0
  };

  getAbsentHours(){
    let sup = this;
    let student_id = this.props.student_id;
    
    $.ajax({
      type: "post",
      url: "students/function.php",
      data: {
        requestType: "getStudentAbsentHoursBySubject",
        student_id: student_id,
        subject_id:sup.props.subject_id
      },
      success: function(data) {
        console.log(data);
        var absent_value = 0;
        var listItem = JSON.parse(data).map(
          function(object,index){
            absent_value += parseFloat(object.absent_value);
          }
        );
       sup.setState({
        absent_value:absent_value
       });
       console.log(sup.state.absent_value);
      }
    });
  }
  
  componentDidMount(){
    this.getAbsentHours();
  }

  render() {
    return (
      <div className="list-group-item">
        <div className="row">
          <div className="col">
            <div className="row">
              <small>Warning Level</small>
            </div>
            <div className="row text-info">{this.state.warningLevel}</div>
          </div>
          <div className="col">
            <div className="row">
              <small>Absents</small>
            </div>
            <div className="row text-info">{this.state.absent_value/1.5}</div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col">
            <div className="row">
              <small>Teacher Name</small>
            </div>
            <div className="row text-info">{this.props.teacherName}</div>
          </div>
          <div className="col">
            <div className="row">
              <small>Subject Name</small>
            </div>
            <div className="row text-info">{this.props.subject_des}</div>
          </div>
        </div>
      </div>
    );
  }
}
