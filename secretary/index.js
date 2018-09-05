ReactDOM.render(
  <React.Fragment>
    <div className="row w-100 mt-3">
      <div className = "col-sm-12" id = "forButtons">
      </div>
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
        subject_id = {this.props.id}
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
    let subject_id = this.props.subject_id;
    $.ajax({
      type: "post",
      url: "sidenav/function.php",
      data: {
        requestType: "getStudents",
        student_id: student_id,
        teacher_id: teacher_id
      },
      success: function(data) {
      
        var listItem = JSON.parse(data).map(object => (
          <StudentItem
            id={object.student_id}
            key={object.student_id}
            student_fname = {object.f_name}
            student_mname = {object.m_name}
            student_lname = {object.l_name}
            teacher_id = {teacher_id}
            subject_id = {subject_id}
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
                type="text"
                onChange={this.getStudentS.bind(this)}
                className="form-control"
                id="student_id"
                aria-describedby="emailHelp"
                placeholder="Enter Student ID"
              />
              <small id="emailHelp" className="form-text text-info">
                Search Student ID or Last name
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
  getStudent(){
    ReactDOM.render(
      <StudentSetAbsent props ={this.props} teacher_id = {this.props.teacher_id} subject_id = {this.props.subject_id}/>,  document.getElementById("resultsRow")
    )
  }
  render() {
    return (
      <div className="list-group-item list-group-item-action list-group-item-light p-3 mt-2 border-0" onClick = {this.getStudent.bind(this)}>
        <div className="row">
         <div className="col text-info font-weight-bold">
            <small className="text-muted">Student ID</small>
            <br />
            {this.props.id}
          </div>
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
        </div>
      </div>
    );
  }
}

class StudentSetAbsent extends React.Component {
  state = { 
    absentValue:0,
    warningLevel: "No Warnings",
    absentNumber:0
   }
  
  saveAbsent() {
   
    let absent_date = $("#absentDate").val();
    let absentValue = $("#absentValue").val();
    let student_id = this.props.props.id;
    let subject_id = this.props.subject_id;
    let teacher_id = this.props.teacher_id;
    let time_stamp ="testtimestamp";
    let sup = this;
    $.ajax({
      url: "sidenav/function.php",
      method: "POST",
      data: {
        requestType:"addAbsent",
        student_id: student_id,
        teacher_id: teacher_id,
        subject_id:subject_id,
        absent_date:absent_date,
        time_stamp:time_stamp,
        absentValue:absentValue
      },
      success: function(data) {
      console.log(data);
      sup.fetchAbsents();
     
      }
    });
  }

  checkWarning(){
    var sup = this;
    let absent_value = this.state.absentValue;
    let student_id = this.props.props.id;
    let subject_id = this.props.subject_id;
    
      $.ajax({
        url: "sidenav/function.php",
        method: "POST",
        data: {
          requestType:"checkWarnings",
          student_id: student_id,
          subject_id:subject_id,
          absent_value:absent_value
        },
        success: function(data) {
          console.log("check Warning "+ data);
        }
      });
    }
  


  getWarningLevel(){
    let sup = this;
    let absentHours = this.state.absentValue;
    sup.setState({
      absentNumber:parseInt(this.state.absentValue/1.5)
    })
    if (absentHours >= 4.5  && absentHours < 7.5){
      sup.setState({
        warningLevel:"First Warning"
      })
    }
    else if (absentHours >= 7.5 && absentHours < 10.5){
      sup.setState({
        warningLevel:"Second Warning"
      })
    }
    else if (absentHours >= 10.5 && absentHours <15 ){
      sup.setState({
        warningLevel:"Third Warning"
      })
    }else if (absentHours >= 15){
      sup.setState({
        warningLevel:"Droped"
      })
    }
  }



  fetchAbsents(){
    let student_id = this.props.props.id;
    let subject_id = this.props.subject_id;
    let teacher_id = this.props.teacher_id;
    const sup = this;
    $.ajax({
      url: "sidenav/function.php",
      method: "POST",
      data: {
        requestType:"getAbsents",
        student_id: student_id,
        teacher_id: teacher_id,
        subject_id:subject_id,

      },
      success: function(data) {
        
        let totalHourseAbset = 0;
        var listItem = JSON.parse(data).map(function(object){
          totalHourseAbset += parseFloat(object.absent_value);
          return <AbsentsItem
          key  = {object.absent_id}
          date = {object.absent_date}
          value = {object.absent_value}
        />
        }
        );
        sup.setState({
          absentValue:totalHourseAbset
        })
        sup.checkWarning();
        sup.getWarningLevel();
        ReactDOM.render(
          <div className="shadow w-100 list-group bg-white m-1 mt-3 p-3 rounded">{listItem}</div>,
          document.getElementById("summaryList")
        );
       
      }
    });

  }
  componentDidMount(){
    this.fetchAbsents();
  }
  render() { 
    return ( 
      <div className="container-fluid p-3 mt-2 border-0">
      <div className="row">
       <div className="col text-info font-weight-bold">
          <small className="text-muted">Student ID</small>
          <br />
          {this.props.props.id}
        </div>
        <div className="col text-info font-weight-bold">
          <small className="text-muted">Last Name</small>
          <br />
          {this.props.props.student_lname}
        </div>
        <div className="col text-info font-weight-bold">
          <small className="text-muted">First Name</small>
          <br />
          {this.props.props.student_fname}
        </div>
        <div className="col text-info font-weight-bold">
          <small className="text-muted">Middle Name</small>
          <br />
          {this.props.props.student_mname}
        </div>
      </div>
      <div className = "row mt-2">
      <div className = "col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Set Absent Date</span>
         
        </div>
        <input type="date" class="form-control" id ="absentDate"/>
      </div>
      </div>
      <div className = "col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Type</label>
          </div>
          <select class="custom-select" id="absentValue">
            <option selected>Choose</option>
            <option value="1.5">Absent</option>
            <option value="0.5">Late</option>
          </select>
        </div>
      </div>
      <div className = "col">
      <button type="button" onClick = {this.saveAbsent.bind(this)} class="btn btn-info">Confirm</button>
      </div>
      </div>
      <div className = "row">
        <div className = "col-sm-12">
          <small className= "text-muted">Summary</small>
        </div>
        <div className = "col-sm-12">
        <div className = "row mb-1 ml-2 rounded p-2 mr-2 text-white">
            <div className = "col-4 m-2 p-3 shadow text-dark">
            <div className = "row  pl-3">
             Warnings
            </div>
            <div className = "row pl-3 text-success">
            <h3> {this.state.warningLevel}</h3>
            </div>
            </div>
            <div className = "col-4 m-2 p-3 shadow text-dark">
            <div className = "row pl-3">
            Total Absent
            </div>
            <div className = "row text-danger  pl-3">
            <h3>{this.state.absentNumber} absents ({this.state.absentValue} Hours)</h3>
            </div>
            </div>
        </div>
        </div>
        <div className = "col-sm-12">
        <div className = "row ml-2 rounded p-2 mr-2 bg-info text-white">
            <div className = "col ">
            Date
            </div>
            
            <div className = "col">
            Value
            </div>
          </div>
        </div>
        <div className = "col-sm-12" id = "summaryList">
          <div className = "list-group">

          </div>
        </div>
      </div>
    </div>
     );
  }
}

class AbsentsItem extends React.Component {
  state = {  }
  render() { 
    return ( <div class="list-group-item border-0 rounded m-1 bg-light">
              <div className = "row">
                <div className = "col">
                {this.props.date}
                </div>
                <div className = "col">
                {this.props.value} hrs
                </div>
              </div>
             </div>
  );
  }
}



class UpdateSecretaryAccount extends React.Component {
  state = {
    showPassword:"password"
  };

  updateAccountDetails(){
    let account_name = $("#account_name").val();
    let username = $("#update_username").val();
    let password = $("#update_password").val();
   
    $.ajax({
      url: "functions/updateAccount.php",
      method: "POST",
      data: {
        requestType:"updateAccount",
        account_id:global_userId,
        account_name: account_name,
        password: password,
        username: username,
      },
      success: function(data) {
        console.log(data);
    let detailsContainer = document.querySelector("#mainContainerRoot");
    ReactDOM.render(
      <React.Fragment>
        Account Updated Succesfully
      </React.Fragment>,
    detailsContainer);
        getSecretaryAccounts();
      }
    });
  }

  showPassword(){
    this.setState({
      showPassword:this.state.showPassword == "password"?"text":"password"
    })
  }

  render() {
    return (
      <div className="container w-75 m-5 rounded bg-white shadow p-5">
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
                defaultValue = {this.props.objectData.account_name}
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
                defaultValue = {this.props.objectData.username}
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
                defaultValue = {this.props.objectData.password}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Login Username"
              />
           
            </div>
            <div className="form-group form-check">
              <input onChange = {this.showPassword.bind(this)} type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" for="exampleCheck1">Show Password</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <button onClick = {this.updateAccountDetails.bind(this)} type="button" class="btn w-100 btn-info">Save Changes</button>
          </div>
        </div>
      </div>
    );
  }
}
 

function getSecretaryAccount(){
  $.ajax({
    type: "Post",
    url: "functions/getSecreteryAccount.php",
    data:{userId:global_userId},
    success: function(data) {
      console.log(data);
      var listItem = JSON.parse(data).map(object => (
        <UpdateSecretaryAccount
          key={object.userid}
          objectData = {object}
          account_name={object.account_name}
          department_name={object.department_name}
        />
      ));
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.getElementById("mainContainerRoot")
      );
    }
  });
}