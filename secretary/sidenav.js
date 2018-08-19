ReactDOM.render(
    <React.Fragment>
            <div className = "row w-100">
                <div className="form-group w-100 pl-3 pr-3">
                    <label for="exampleInputEmail1">Teacher Name</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Teacher"/>
                </div>
            </div>
            <div className = "row pl-3">
                Teachers List
            </div>
    </React.Fragment>,document.getElementById("sideNavRoot")
);

function getTeachers(teachername){

}