let list = document.getElementById("list");
let titleinput = document.getElementById("titleinput");
let dateinput = document.getElementById("dateinput");
let textareainput = document.getElementById("textareainput");
let alert = document.getElementById("alert");
let task = document.getElementById("task");
let sub = document.getElementById("sub");
let deleteall = document.getElementById("createTask1");

list.addEventListener('submit', (e)=>{
    e.preventDefault();
    submitform();
})

let submitform = ()=>{
    if (titleinput.value === "") {
        console.log('failure');
        alert.innerHTML = "Please add a task";
    }
    else{
        console.log('success');
        alert.innerHTML = "";
        successinput();
        sub.setAttribute("data-bs-dismiss","modal");
        sub.click();
        (()=>{
            sub.setAttribute("data-bs-dismiss","");
        })()
    }
};

let data = [];

let successinput = () =>{
    data.push({
        text: titleinput.value,
        date: dateinput.value,
    description:textareainput.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    posttask();
}

let posttask = () =>{
    task.innerHTML = "";
    data.map((x,y)=>{
        return (task.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span>${x.date}</span>
            <p>${x.description}</p>
            <span class="crud">
            <i data-bs-toggle="modal" data-bs-target="#list" onClick = "updatenow(this)" class="fa-solid fa-square-pen"></i>
            <i onClick = "deletenow(this)posttask()"class="fa-solid fa-trash"></i>
        </span>
    </div>
    `);
    })
    
reset();
};

let deletenow = (d)=>{
    d.parentElement.parentElement.remove();
    data.splice(d.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
}
let updatenow = (u)=>{
    let updatetask = u.parentElement.parentElement;
    titleinput.value = updatetask.children[0].innerHTML;
    dateinput.value = updatetask.children[1].innerHTML;
    textareainput.value = updatetask.children[2].innerHTML;

    updatetask.remove();
    deletenow(u);
}
function removeAll() {
    document.getElementById("task").innerHTML = "";
}


let reset = ()=>{
    titleinput.value = "";
    dateinput.value = "";
    textareainput.value = "";
}

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    posttask();
    console.log(data);
})();