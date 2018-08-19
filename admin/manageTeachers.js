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
  fetchTeacher(){
    let sup = this;
    $.ajax({
      type: "Post",
      url: "teachers/fetchTeachers.php",
      success: function(data) {
        console.log(data);
        var listItem = JSON.parse(data).map(function(object, index) {
          return (
            <TeacherItem
              key={object.teacher_id}
              id = {object.teacher_id}
              teacher_name={object.teacher_name}
              department_name={object.department_name}
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
  
  saveTeacher(){
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
        console.log(data);
        $("#teacher_name").val("");
      }
    });
  }
  componentDidMount(){
      this.chooseDepartment();
      this.fetchTeacher();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <button
            type="button"
            onClick={this.insertTeacherState.bind(this)}
            className="btn btn-info"
          >
            Add Teacher
          </button>
        </div>
        <div
          className={
            "row mt-3 shadow bg-white rounded pl-3 pr-3 pt-3 pb-3 " +
            this.state.insertTeacherState
          }
        >
          <div className="col-sm-12">
            <h3>Teachers Information</h3>
          </div>
          <div className="col-sm-4">
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
          <div className="col-sm-4">
            <div className="input-group mb-3">
              <select
                class="custom-select"
                id="department"
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
          <div className="col-sm-2">
            <button type="button"
            onClick = {this.saveTeacher.bind(this)} 
            className="w-100 ml-3 mr-3 btn btn-info">
              Save Teachers Information
            </button>
          </div>
        </div>
        <div
          className={"row mt-5 shadow bg-white rounded pl-3 pr-3 pt-3 pb-3 "}
        >
          <div className="col-sm-12">
            <h3>Teachers List </h3>
          </div>
          <div className="col-sm-12">
            <div className="mt-3" id="teacherListContainer" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class TeacherItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        extend: "d-none",
        teacherExtend: "d-none"
      };
    }
    teacherExtend(){
        this.setState({
            teacherExtend: this.state.teacherExtend == "d-none" ? "visible" : "d-none"
          });
    }
    extendState() {
      this.setState({
        extend: this.state.extend == "d-none" ? "visible" : "d-none"
      });
    }
    fetchSubjects(){
      let sup = this;
      $.ajax({
        type: "Post",
        url: "teachers/fetchSubject.php",
        data:{teacher_id:sup.props.id},
        success: function(data) {
          console.log(data);
          var listItem = JSON.parse(data).map(function(object, index) {
            return (
              <SubjectItem
                key={object.subject_id}
                id = {object.subject_id}
                subject_code={object.subject_code}
                subject_des={object.subject_des}
              />
            );
          });
          ReactDOM.render(
            <React.Fragment>{listItem}</React.Fragment>,
            document.getElementById("subjectsContainer"+sup.props.id)
          );
          
        }
      });
    }
    addSubject(){
      let sup = this;
      let subject_code = $("#subject_code"+this.props.id).val();
      let subject_des = $("#sub_des"+this.props.id).val();
      let teacher_id = this.props.id;
      $.ajax({
        url: "teachers/addSubject.php",
        method: "POST",
        data: {
          subject_code: subject_code,
          subject_des: subject_des,
          teacher_id:teacher_id
        },
        success: function(data) {
          console.log(data);
          $("#sub_des"+sup.props.id).val("");
          $("#subject_code"+sup.props.id).val("");
          sup.fetchSubjects();
        }
      });

    }
    componentDidMount(){
      this.fetchSubjects();
    }
    render() {
      return (
        <React.Fragment>
          <div
          onClick = {this.teacherExtend.bind(this)}
            className="mt-2 list-group-item list-group-item-action border-0 bg-light"
          >
            <div className="row p-3">
             <div className = "col text-capitalize font-weight-bold">
              {this.props.teacher_name}
             </div>
            </div>
          </div>
          {/* start add course form */}
          <div className = {"row p-3 "+this.state.teacherExtend}>
          <div className = "col-sm-2">
            <div className="form-group w-100">
                    <input
                      type="text"
                      id = {"subject_code"+this.props.id}
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Course Code"
                    />
                  </div>
            </div>
          <div className = "col-sm-6">
            <div className="form-group w-100">
                    <input
                      type="text"
                      id = {"sub_des"+this.props.id}
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Course Desciption"
                    />
                  </div>
            </div>
            <div className = "col-sm-2">

            <button
                type="button"
                className="btn btn-info"
                onClick = {this.addSubject.bind(this)}
              >
                Save Subject
              </button>
            </div>
           
            <div className = "col-sm-12">
              <div className = "row" id = {"subjectsContainer"+this.props.id}>
              
              </div>
            </div>
          </div>
         {/* end add course form
          ------ start course list -------
          */}

        

        </React.Fragment>
      );
    }
  }

  class SubjectItem extends React.Component {
    state = {  }
    render() { 
      return ( 
     <div className = "col-sm-12 mt-2 m-1 list-group-item bg-light list-group-item-action border-0">
      <div  className="row">
        <div className = "col">
        <small className = "text-info">Subject Code : </small>
        {this.props.subject_code}
        </div>
        <div className = "col">
        <small className = "text-info">Subject Des : </small>
        {this.props.subject_des}
        </div>
        <div className = "col d-flex flex-row-reverse">
        Update Delete
        </div>
      </div>
     </div>
      );
    }
  }
   

