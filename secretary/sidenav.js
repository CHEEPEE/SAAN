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
         id = {object.teacher_id}
          key={object.teacher_id}
          department_name = {object.department_name}
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
          <MainRoot key = {this.props.id} id = {this.props.id} teacher_name = {this.props.teacher_name} />,document.getElementById("mainContainerRoot")
      )
  }
  render() {
    return (
      <li className="list-group-item list-group-item-action list-group-item-light border-0 m-1" onClick ={this.teacherClicked.bind(this)}>
        <div className = "row  pl-2">
        {this.props.teacher_name}
        </div>
        <div className = "row  pl-2">
            <small>{this.props.department_name}</small>
        </div>
      </li>
    );
  }
}


// -----------------------------------------------Main Root----------------------------------------------

class MainRoot extends React.Component {
    componentDidMount(){
        this.getSubjects();
    }
    getSubjects(){
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
                 id = {object.subject_id}
                  key={object.subject_id}
                  subject_code = {object.subject_code}
                  subject_des={object.subject_des}
                />
              ));
              ReactDOM.render(
                <React.Fragment>{listItem}</React.Fragment>,
                document.getElementById("subjectLists")
              );
            }
          });
    }
    render() { 
        return (
        <React.Fragment>
           <div className = "row mt-3 pl-3">
                <h2 className = "text-info" id = "teacherName">{this.props.teacher_name}</h2>
            </div>
            <div className = "row" id = "subjectLists">
            
            </div>
        </React.Fragment> 
    );
    }
}

class SubjectItem extends React.Component {
    
    render() { 
        return (
            <React.Fragment>
                <div className = "col-sm-12">
                {this.props.subject_des}
                </div>
            </React.Fragment>
         );
    }
}