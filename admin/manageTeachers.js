function manageTeachers() {
  ReactDOM.render(<ManageTeachers />, root);
}

class ManageTeachers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insertTeacherState: "d-none"
    };
  }
  insertTeacherState() {
    this.setState({
      insertTeacherState:
        this.state.insertTeacherState == "d-none" ? "visible" : "d-none"
    });
  }
  fetchTeacher() {
    let sup = this;
   fetchTeacher();
  }
  chooseDepartment() {
    let sup = this;
    $.ajax({
      type: "Post",
      url: "department/fetchDepartment.php",
      success: function(data) {
        console.log(data);
        var listItem = JSON.parse(data).map(function(object, index) {
          return (
            <OptionItem
              key={object.department_id}
              optionValue={object.department_id}
              optionName={object.department_name}
            />
          );
        });
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.getElementById("department")
        );
      }
    });
  }

  saveTeacher() {
    let department_id = $("#department").val();
    let teacher_name = $("#teacher_name").val();
    const sup = this;
    $.ajax({
      url: "teachers/addTeacher.php",
      method: "POST",
      data: {
        teacher_name: teacher_name,
        department_id: department_id
      },
      success: function(data) {
        $("#teacher_name").val("");
      }
    });
    this.fetchTeacher();
  }
  componentDidMount() {
    this.chooseDepartment();
    this.fetchTeacher();
  }

  render() {
    return (
      <div className="row">
        {/* first column */}
        <div className="col">
          <div className="row">
            <button
              type="button"
              onClick={this.insertTeacherState.bind(this)}
              className="ml-3 btn btn-info"
            >
              Add Teacher
            </button>
          </div>
          <div
            className={
              "row shadow-sm bg-white rounded mt-3 ml-1 mr-1 pt-3 pl-3 pr-3 pb-3 " +
              this.state.insertTeacherState
            }
          >
            <div className="col-sm-12">
              <h3>Teachers Information</h3>
            </div>
            <div className="col-sm-12">
              <div className="form-group w-100">
                <input
                  id="teacher_name"
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Teachers Name"
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
                    Department
                  </label>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <button
                type="button"
                onClick={this.saveTeacher.bind(this)}
                className="w-100 btn btn-info"
              >
                Save Teachers Information
              </button>
            </div>
          </div>
          <div className={"row mt-1 rounded pr-3 pt-3 pb-3 "}>
            <div className="col-sm-12">
              <h3>Teachers List </h3>
            </div>
            <div className="col-sm-12">
              <div className="mt-3" id="teacherListContainer" />
            </div>
          </div>
        </div>
        {/* second column */}
        <div className="col mt-5" id="mainSecondColumn" />
      </div>
    );
  }
}
function fetchSubjects(teacher_id, teacher_name) {
  $.ajax({
    type: "Post",
    url: "teachers/fetchSubject.php",
    data: { teacher_id: teacher_id },
    success: function(data) {
      console.log(data);
      var listItem = JSON.parse(data).map(function(object, index) {
        return (
          <SubjectItem
            key={object.subject_id}
            subject_id={object.subject_id}
            subject_code={object.subject_code}
            subject_des={object.subject_des}
            teacher_id={teacher_id}
            teacher_name={teacher_name}
          />
        );
      });
      ReactDOM.render(
        <React.Fragment>
          <div className="row">
            <h3 className="text-info">{teacher_name}</h3>
          </div>
          <div className="row">{listItem}</div>
        </React.Fragment>,
        document.getElementById("mainSecondColumn")
      );
    }
  });
}



class TeacherItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extend: "d-none",
      teacherExtend: "d-none",
      updateTeacherExtend: "d-none",
      teacherItem: "visible",
      selectedDepartmentOption: ""
      ,
      removeTeacherExtend:"d-none"
    };
  }
  teacherExtend() {
    this.setState({
      teacherExtend: this.state.teacherExtend == "d-none" ? "visible" : "d-none"
    });
  }
  extendState() {
    this.setState({
      extend: this.state.extend == "d-none" ? "visible" : "d-none"
    });
  }
  removeTeacherExtend(){
    this.setState({
      removeTeacherExtend: this.state.removeTeacherExtend == "d-none" ? "visible" : "d-none"
    });
  }
  fetchSubjects() {
    fetchSubjects(this.props.id, this.props.teacher_name);
  }
  addSubject() {
    let sup = this;
    let subject_code = $("#subject_code" + this.props.id).val();
    let subject_des = $("#sub_des" + this.props.id).val();
    let teacher_id = this.props.id;
    $.ajax({
      url: "teachers/addSubject.php",
      method: "POST",
      data: {
        subject_code: subject_code,
        subject_des: subject_des,
        teacher_id: teacher_id
      },
      success: function(data) {
        $("#sub_des" + sup.props.id).val("");
        $("#subject_code" + sup.props.id).val("");
        sup.fetchSubjects();
      }
    });
  }

  removeTeacher() {
    let teacher_id = this.props.id;
    $.ajax({
      url: "teachers/functions.php",
      method: "POST",
      data: {
        requestType:"deleteTeacher",
        teacher_id: teacher_id
      },
      success: function(data) {
        console.log(data);
      }
    });
    fetchTeacher();
  }

  componentDidMount() {}
  updateTeacherExtend() {
    ReactDOM.render(
      <UpdateTeacher
        teacher_id={this.props.id}
        teacherName={this.props.teacher_name}
      />,
      document.getElementById("mainSecondColumn")
    );
  }

  fetchDepartmentOptions() {
    let sup = this;
    $.ajax({
      url: "teachers/functions.php",
      method: "POST",
      data: {
        department_id: sup.props.department_id,
        requestType: "fetchDepartmentOptions"
      },
      success: function(data) {
        console.log(data);
        var listItem = JSON.parse(data).map(function(object, index) {
          if (sup.props.department_id == object.department_id) {
            sup.setState({
              selectedDepartmentOption: object.department_id
            });
          }
          return (
            <OptionItem
              key={object.department_id}
              optionValue={object.department_id}
              optionName={object.department_name}
            />
          );
        });
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.getElementById("department" + sup.props.id)
        );
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div
          className={
            "mt-2 shadow-sm list-group-item list-group-item-action rounded text-dark border-0 bg-white " +
            this.state.teacherItem
          }
        >
          <div className="row p-1">
            <div
              className="col text-capitalize text-info font-weight-bold"
              onClick={this.fetchSubjects.bind(this)}
            >
              <h5>{this.props.teacher_name}</h5>
              <small>{this.props.department_name}</small>
            </div>
            <div className="col d-flex flex-row-reverse">
              <div className="d-flex align-items-center">
                <button
                  onClick={this.teacherExtend.bind(this)}
                  type="button"
                  class="btn btn-warning text-white mr-3"
                >
                  Add Subject
                </button>
                <button
                  onClick={this.updateTeacherExtend.bind(this)}
                  type="button"
                  class="btn btn-info mr-3"
                >
                  Update
                </button>
                <button type="button" onClick = {this.removeTeacherExtend.bind(this)} class="btn btn-danger">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* update Teacher Infomation Form */}
        <div className={"row p-3 " + this.state.updateTeacherExtend}>
          <div className="col-sm-12">
            <h5>Teachers Information</h5>
          </div>
          <div className="col-sm-4">
            <div className="form-group w-100">
              <input
                id="teacher_name"
                type="text"
                defaultValue={this.props.teacher_name}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Teachers Name"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="input-group mb-3">
              <select
                class="custom-select"
                id={"department" + this.props.id}
                defaultValue={this.state.selectedDepartmentOption}
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
          <div className="col-sm-4 d-flex flex-row-reverse">
            <button
              type="button"
              onClick={this.updateTeacherExtend.bind(this)}
              class="btn btn-danger"
            >
              Cancel
            </button>
            <button type="button" className="ml-3 mr-3 btn btn-info">
              Save Teachers Information
            </button>
          </div>
        </div>
        {/* end update Teacher Infomation Form */}

        {/* start add course form */}
        <div className={"row pt-3 " + this.state.teacherExtend}>
          <div className="col-sm-4">
            <div className="form-group w-100">
              <input
                type="text"
                id={"subject_code" + this.props.id}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Course Code"
              />
            </div>
          </div>
          <div className="col-sm-5">
            <div className="form-group w-100">
              <input
                type="text"
                id={"sub_des" + this.props.id}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Course Desciption"
              />
            </div>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-info"
              onClick={this.addSubject.bind(this)}
            >
              Save Subject
            </button>
          </div>
          {/* end add course form*/}

        </div>
        <div className = {"row m-2 "+this.state.removeTeacherExtend}>
           <div className = "col-sm-12 p-3 bg-danger rounded shadow-sm font-weight-bold text-white ">
              Remove {this.props.teacher_name} ?  
              <button
              type="button"
              className="btn ml-5 btn-outline-light"
              onClick = {this.removeTeacher.bind(this)}
              
            >
              Remove Teacher
            </button>
           </div>
        </div>

      </React.Fragment>
    );
  }
}

class UpdateTeacher extends React.Component {

  updateTeacher(){
    let teacher_id =this.props.teacher_id;
    let updatedTeacherName = $("#update_teacher_name").val();

    $.ajax({
      method:"post",
      url:"teachers/functions.php",
      data:{
        requestType: "updateTeacher",
        teacher_id:teacher_id,
        teacher_name :updatedTeacherName
      },
      success:function(data){
          console.log(data);
      }
    })
    fetchTeacher();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h3 className="text-info">{this.props.teacherName}</h3>
        </div>
        <div className="row">
          <div className="form-group w-100">
            <input
              id="update_teacher_name"
              type="text"
              defaultValue={this.props.teacherName}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Teachers Name"
            />
          </div>
          <div className="form-group w-100">
          <button
                  onClick = {
                    this.updateTeacher.bind(this)
                  }
                  type="button"
                  class="btn btn-info"
                >
                  Update Name
                </button>
          </div>


        </div>
      </React.Fragment>
    );
  }
}

class SubjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateExtend: "d-none",
      itemVis: "visible",
      removeApproval: "d-none"
    };
  }
  updateExtend() {
    this.setState({
      updateExtend: this.state.updateExtend == "d-none" ? "visible" : "d-none",
      itemVis: this.state.itemVis == "d-none" ? "visible" : "d-none"
    });
  }
  removeApproval() {
    this.setState({
      removeApproval:
        this.state.removeApproval == "d-none" ? "visible" : "d-none"
    });
  }
  saveChanges() {
    let sup = this;
    let subject_code = $("#update_subject_code" + this.props.subject_id).val();
    let subjectc_des = $("#update_subject_des" + this.props.subject_id).val();
    $.ajax({
      url: "teachers/functions.php",
      method: "POST",
      data: {
        subject_id: sup.props.subject_id,
        subject_code: subject_code,
        subject_des: subjectc_des,
        requestType: "updateSubject"
      },
      success: function(data) {
        fetchSubjects(sup.props.teacher_id, sup.props.teacher_name);
      }
    });
    this.updateExtend();
  }
  remove_subject() {
    let sup = this;
    $.ajax({
      url: "teachers/functions.php",
      method: "POST",
      data: {
        subject_id: sup.props.subject_id,
        requestType: "removeSubject"
      },
      success: function(data) {
        fetchSubjects(sup.props.teacher_id, sup.props.teacher_name);
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <div
          className={
            "col-sm-12 mt-2 m-1 list-group-item bg-white shadow-sm list-group-item-action border-0 " +
            this.state.itemVis
          }
        >
          <div className="row">
            <div className="col">
              <div className="row m-2">
                <small className="text-info">Subject Code</small>
              </div>
              <div className="row m-2">
                <h5>{this.props.subject_code}</h5>
              </div>
            </div>
            <div className="col">
              <div className="row m-2">
                <small className="text-info">Subject Desciption</small>
              </div>
              <div className="row m-2">
                <h5>{this.props.subject_des}</h5>
              </div>
            </div>
            <div className="col d-flex flex-row-reverse">
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  class="btn btn-info mr-3"
                  onClick={this.updateExtend.bind(this)}
                >
                  Update
                </button>
                <button
                  onClick={this.removeApproval.bind(this)}
                  type="button"
                  class="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class={
            "w-100 ml-1 alert alert-danger row " + this.state.removeApproval
          }
          role="alert"
        >
          <div className="col">Are you sure to remove this subject? </div>
          <a
            onClick={this.remove_subject.bind(this)}
            className="text-success col"
          >
            YES
          </a>
        </div>
        {/* update form */}
        <div className={"col-sm-12 " + this.state.updateExtend}>
          <div className="row mt-1 p-2 border rounded">
            <div className="col p-2">
              <div className="row m-2">
                <small className="text-info">Subject Code </small>
              </div>
              <div className="row m-2">
                <div className="form-group w-100">
                  <input
                    type="text"
                    defaultValue={this.props.subject_code}
                    className="form-control"
                    id={"update_subject_code" + this.props.subject_id}
                    aria-describedby="emailHelp"
                    placeholder="Subject Code"
                  />
                </div>
              </div>
            </div>
            <div className="col p-2">
              <div className="row m-2">
                <small className="text-info">Subject Desciption </small>
              </div>
              <div className="row m-2">
                <div className="form-group w-100">
                  <input
                    type="text"
                    defaultValue={this.props.subject_des}
                    className="form-control"
                    id={"update_subject_des" + this.props.subject_id}
                    aria-describedby="emailHelp"
                    placeholder="subject_des"
                  />
                </div>
              </div>
            </div>
            <div className="col d-flex flex-row-reverse">
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  onClick={this.saveChanges.bind(this)}
                  class="btn btn-info mr-3"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
function fetchTeacher() {
  let sup = this;
  $.ajax({
    type: "Post",
    url: "teachers/fetchTeachers.php",
    success: function(data) {
      var listItem = JSON.parse(data).map(function(object, index) {
        return (
          <TeacherItem
            key={object.teacher_id}
            id={object.teacher_id}
            teacher_name={object.teacher_name}
            department_name={object.department_name}
            department_id={object.department_id}
          />
        );
      });
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.getElementById("teacherListContainer")
      );
    }
  });
}