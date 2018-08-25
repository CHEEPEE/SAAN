ReactDOM.render(
  <React.Fragment>
    <div className="row w-100 mt-3">
      <div className="form-group w-100 pl-3 pr-3">
        <label for="exampleInputEmail1" className="text-info">
          Teacher Name
        </label>

        <input
          onChange={getTeachers.bind(this)}
          type="email"
          class="form-control"
          id="inputTeacherName"
          aria-describedby="emailHelp"
          placeholder="Enter Teacher"
        />
      </div>
    </div>
    <div className="row pl-3">
      <h3 className="text-primary">Teachers List</h3>
    </div>
    <div className="row w-100">
      <div class="list-group w-100 p-3" id="teacherList">
        {/* teachers list  */}
      </div>
    </div>
  </React.Fragment>,
  document.getElementById("sideNavRoot")
);

function getTeachers() {
  let teacherName = $("#inputTeacherName").val();
  $.ajax({
    type: "post",
    url: "sidenav/function.php",
    data: {
      requestType: "getTeachers",
      teacher_name: teacherName
    },
    success: function(data) {
      console.log(data);
      var listItem = JSON.parse(data).map(object => (
        <TeacherItem
          id={object.teacher_id}
          key={object.teacher_id}
          department_name={object.department_name}
          teacher_name={object.teacher_name}
        />
      ));
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.getElementById("teacherList")
      );
    }
  });
}

class TeacherItem extends React.Component {
  teacherClicked() {
    ReactDOM.render(
      <MainRoot
        key={this.props.id}
        id={this.props.id}
        teacher_name={this.props.teacher_name}
      />,
      document.getElementById("mainContainerRoot")
    );
  }
  render() {
    return (
      <li
        className="list-group-item list-group-item-action list-group-item-light border-0 m-1"
        onClick={this.teacherClicked.bind(this)}
      >
        <div className="row text-info font-weight-bold pl-2">
          {this.props.teacher_name}
        </div>
        <div className="row  pl-2">
          <small>{this.props.department_name}</small>
        </div>
      </li>
    );
  }
}

// -----------------------------------------------Main Root----------------------------------------------

class MainRoot extends React.Component {
  componentDidMount() {
    this.getSubjects();
  }
  getSubjects() {
    let teacher_name = this.props.teacher_name;
    let teacher_id = this.props.id;
    $.ajax({
      type: "post",
      url: "sidenav/function.php",
      data: {
        requestType: "getTeacherCourse",
        teacher_id: teacher_id
      },
      success: function(data) {
        console.log(data);
        var listItem = JSON.parse(data).map(object => (
          <SubjectItem
            id={object.subject_id}
            key={object.subject_id}
            subject_code={object.subject_code}
            subject_des={object.subject_des}
            class_des={object.class_des}
            teacher_id={teacher_id}
            teacher_name={teacher_name}
          />
        ));
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.getElementById("secondRow")
        );
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="row bg-info rounded shadow-sm m-1 mt-3 p-3">
          <h2 className="text-white" id="teacherName">
            {this.props.teacher_name}
          </h2>
        </div>
        <div
          className="row shadow list-group bg-white m-1 mt-3 p-3 rounded"
          id="secondRow"
        />
      </React.Fragment>
    );
  }
}

class SubjectItem extends React.Component {
  manageSubjectAbsents() {
    ReactDOM.render(
      <ManageSubjectAbsents
        subject_code={this.props.subject_code}
        teacher_id={this.props.teacher_id}
        teacher_name={this.props.teacher_name}
        subject_des={this.props.subject_des}
        class_des={this.props.class_des}
      />,
      document.getElementById("secondRow")
    );
  }
  render() {
    return (
      <React.Fragment>
        <div className="list-group-item list-group-item-action list-group-item-light p-3 mt-2 border-0">
          <div className="row">
            <div className="col text-info font-weight-bold">
              <small className="text-muted">Course Code</small>
              <br />
              {this.props.subject_code}
            </div>
            <div className="col text-info font-weight-bold">
              <small className="text-muted">Course Description</small>
              <br />
              {this.props.subject_des}
            </div>
          </div>
          <div className="row mt-1">
            <div className="col text-info font-weight-bold">
              <small className="text-muted">Class Schedule</small>
              <br />
              {this.props.class_des}
            </div>
            <div className="col">
              <button
                type="button"
                onClick={this.manageSubjectAbsents.bind(this)}
                class="btn m-3 btn-info text-white"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
function getTeacherDetails(id, teacher_name) {
  ReactDOM.render(
    <MainRoot key={id} id={id} teacher_name={teacher_name} />,
    document.getElementById("mainContainerRoot")
  );
}

function getSubjects(teacher_id, teacher_name) {
  $.ajax({
    type: "post",
    url: "sidenav/function.php",
    data: {
      requestType: "getTeacherCourse",
      teacher_id: teacher_id
    },
    success: function(data) {
      console.log(data);
      var listItem = JSON.parse(data).map(object => (
        <SubjectItem
          id={object.subject_id}
          key={object.subject_id}
          subject_code={object.subject_code}
          subject_des={object.subject_des}
          class_des={object.class_des}
          teacher_id={teacher_id}
          teacher_name={teacher_name}
        />
      ));
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.getElementById("secondRow")
      );
    }
  });
}
class ManageSubjectAbsents extends React.Component {
  getTeacherDetails() {
    getSubjects(this.props.teacher_id, this.props.teacher_name);
  }

  getStudentS() {
    let student_id = $("#student_id").val();
    let teacher_id = this.props.teacher_id;
    $.ajax({
      type: "post",
      url: "sidenav/function.php",
      data: {
        requestType: "getStudents",
        student_id: student_id,
        teacher_id: teacher_id
      },
      success: function(data) {
        console.log(data);
        var listItem = JSON.parse(data).map(object => (
          <StudentItem
            id={object.student_id}
            key={object.student_id}
            student_fname = {object.f_name}
            student_mname = {object.m_name}
            student_lname = {object.l_name}

          />
        ));
        ReactDOM.render(
          <div className="shadow w-100 list-group bg-white m-1 mt-3 p-3 rounded">{listItem}</div>,
          document.getElementById("resultsRow")
        );
      
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <button
            type="button"
            onClick={this.getTeacherDetails.bind(this)}
            class="btn m-3 btn-info text-white"
          >
            back
          </button>
        </div>
        <div className="row" id="Subject Details">
          <div className="col-sm-12">
            <div className="row">
              <div className="col text-info font-weight-bold">
                <small className="text-muted">Course Code</small>
                <br />
                {this.props.subject_code}
              </div>
              <div className="col text-info font-weight-bold">
                <small className="text-muted">Course Description</small>
                <br />
                {this.props.subject_des}
              </div>
            </div>
            <div className="row mt-1">
              <div className="col text-info font-weight-bold">
                <small className="text-muted">Class Schedule</small>
                <br />
                {this.props.class_des}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <input
                type="number"
                onChange={this.getStudentS.bind(this)}
                className="form-control"
                id="student_id"
                aria-describedby="emailHelp"
                placeholder="Enter Student ID"
              />
              <small id="emailHelp" className="form-text text-info">
                Search Student ID
              </small>
            </div>
          </div>
        </div>
        <div className="row" id="resultsRow">

        </div>
      </React.Fragment>
    );
  }
}

class StudentItem extends React.Component {
  state = {};
  render() {
    return (
      <div className="list-group-item list-group-item-action list-group-item-light p-3 mt-2 border-0">
        <div className="row">
        <div className="col text-info font-weight-bold">
            <small className="text-muted">Last Name</small>
            <br />
            {this.props.student_lname}
          </div>
          <div className="col text-info font-weight-bold">
            <small className="text-muted">First Name</small>
            <br />
            {this.props.student_fname}
          </div>
          <div className="col text-info font-weight-bold">
            <small className="text-muted">Middle Name</small>
            <br />
            {this.props.student_mname}
          </div>
        
        
          {/* <div className="col text-info font-weight-bold">
            <small className="text-muted">Course Description</small>
            <br />
            {this.props.subject_des}
          </div>
        </div>
        <div className="row mt-1">
          <div className="col text-info font-weight-bold">
            <small className="text-muted">Class Schedule</small>
            <br />
            {this.props.class_des}
          </div>
          <div className="col">
            <button
              type="button"
              onClick={this.manageSubjectAbsents.bind(this)}
              class="btn m-3 btn-info text-white"
            >
              Manage
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
