var urlParams = new URLSearchParams(window.location.search);
//console.log(urlParams.get('eventid'));

const global_student_id = urlParams.get("student_id");
$.ajax({
    type: "Post",
    url: "students/getstudentById.php",
    data: {
      student_id: global_student_id
    },
    success: function(data) {
      console.log(data);
      var listItem = JSON.parse(data).map(object => (
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
      ));
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.querySelector("#app")
      );
    }
  });
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
        student_id: global_student_id
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

  print(){
      window.print();
  }
  componentDidMount() {
    this.getStudentRecords();
  }
  render() {
    return (
      <React.Fragment>
        <div className = "row">
        <div className = "col">
        <h1>Student Record</h1>
        </div>
        <div className = "col">
        <button type="button" onClick = {this.print.bind(this)} class="btn btn-info d-print-none">Print</button>
        </div>
        </div>
         <div className="row p-3">
                  <div className="col-2">
                    <div className="row">
                      <small>Student Id</small>
                    </div>
                    <div className="row font-weight-bold">
                      <h3>{this.props.student_id}</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <small>Student Name</small>
                    </div>
                    <div className="row font-weight-bold">
                     <h3> {this.props.l_name + ", " + this.props.f_name}</h3>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="row">
                      <small>Department</small>
                    </div>
                    <div className="row font-weight-bold">
                     <h5> {this.props.department_name}</h5>
                    </div>
                  </div>

                  <div className="col-sm-5 mt-3">
                    <div className="row">
                      <small>Program</small>
                    </div>
                    <div className="row font-weight-bold">
                      <h5>{this.props.course}</h5>
                    </div>
                  </div>
                  <div className="col-sm-1 pl-6 mt-3">
                    <div className="row">
                      <small>Year Level</small>
                    </div>
                    <div className="row font-weight-bold">
                      <h5>{this.props.year_level}</h5>
                    </div>
                  </div>
                </div>
                <div className={"row "}>
                  <div className="col-sm-12">
                    <div className="row pl-3">
                      <small>Parents Information</small>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <small className="text-info">Name</small>
                        <br />
                        <div className=" font-weight-bold">
                         <h5> {this.props.parent_name}</h5>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <small className="text-info">Contact Number</small>
                        <br />
                        <div className=" font-weight-bold">
                          <h5>{this.props.parent_number}</h5>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <small className="text-info">Email</small>
                        <br />
                        <div className=" font-weight-bold">
                          <h5>{this.props.parent_email}</h5>
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
      </React.Fragment>
    );
  }
}

class StudentWarningBySubject extends React.Component {
  state = {
    warningLevel: this.props.warning_level,
    absent_value: 0
  };

  getAbsentHours() {
    let sup = this;
    let student_id = this.props.student_id;

    $.ajax({
      type: "post",
      url: "students/function.php",
      data: {
        requestType: "getStudentAbsentHoursBySubject",
        student_id: student_id,
        subject_id: sup.props.subject_id
      },
      success: function(data) {
        console.log(data);
        var absent_value = 0;
        var listItem = JSON.parse(data).map(function(object, index) {
          absent_value += parseFloat(object.absent_value);
        });
        sup.setState({
          absent_value: absent_value
        });
        console.log(sup.state.absent_value);
      }
    });
  }

  componentDidMount() {
    this.getAbsentHours();
  }

  render() {
    return (
      <div className="list-group-item list-group-item-action mt-3 border-0">
        <div className="row p-2 border-bottom">
          <div className="col">
            <div className="row">
              <small>Warning Level</small>
            </div>
            <div className="row font-weight-bold text-info">{this.state.warningLevel}</div>
          </div>
          <div className="col">
            <div className="row">
              <small>Absents</small>
            </div>
            <div className="row font-weight-bold text-info">{this.state.absent_value / 1.5}</div>
          </div>
          <div className="col">
            <div className="row">
              <small>Teacher Name</small>
            </div>
            <div className="row font-weight-bold text-info">{this.props.teacherName}</div>
          </div>
          <div className="col">
            <div className="row">
              <small>Subject Name</small>
            </div>
            <div className="row font-weight-bold text-info">{this.props.subject_des}</div>
          </div>
        </div>
      </div>
    );
  }
}


getStudentRecords();
