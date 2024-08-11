//function for fetching the data from the api link
async function extractor() {
    let a = [];
    let b = await fetch("https://dummyjson.com/users")
    let c = await b.json();
    let user = c.users;
    for (const ele of user) {
        let temp = [];
        let name = ele.firstName + ' ' + ele.lastName;
        let usrn = ele.username;
        let mail = ele.email;
        temp.push(name)
        temp.push(usrn)
        temp.push(mail)
        a.push(temp)
    }
    return a
}


async function main() {
    let data = await extractor();
    //done this is to get the info whether it is mobile view or desktop view
    const checker = getComputedStyle(document.documentElement);
    const a = checker.getPropertyValue('--a');//a=1 for desktop;  a=0 for mobile

    let sidebar = document.querySelector(".sidebar")
    if (a == 1) {
        document.querySelector('.sidebar').classList.toggle('open')
        document.querySelector(".rightmain").style.position = "absolute"
    }

    //creating cancel button 
    let cancel = document.createElement("div")
    cancel.innerHTML = `<div class="cancel">
        <img src="${close}" alt="">
    </div>`




    //home button click brings the sidebar
    document.querySelector(".home").addEventListener("click", () => {
        document.querySelector('.sidebar').classList.toggle('open')
        if (a == 0) {
            sidebar.style.width = "75vw"
        }
        if (a == 1) {
            document.querySelector(".rightmain").style.position = "absolute"
        }

    })


    //adding the cancel button functionality
    sidebar.insertBefore(cancel, sidebar.children[0]);
    document.querySelector(".cancel").addEventListener("click", () => {
        document.querySelector(".rightmain").style.position = "inherit"
        document.querySelector('.sidebar').classList.toggle('open');

        //modifying the cancel functionality according to viewtype

        if (a == 1) {
            document.querySelector(".rightmain").style.position = "static"
        }

    })




    //adding data from api into the table
    for (const temp of data) {

        var name = temp[0];
        var usern = temp[1];
        var mailid = temp[2];
        let row = document.createElement("tr")
        row.innerHTML = `
        {% load static %}
        <td>${name}</td>
        <td>${usern}</td>
        <td>${mailid}</td>
        <td class="modify">
            <button  class="edit">
                <img src="${editIconUrl}" alt="">
                <span class="text">edit</span>
            </button>
            <button  class="del">
                <img src="${deleteIconUrl}" alt="">
                <span class="text">Delete</span>
            </button>
        </td>`
        document.querySelector("table").appendChild(row);

 
    }


    //creating a new row
    let create = document.querySelector(".addbox");
    create.addEventListener("click", () => {
        let newcell = document.createElement("tr")
        newcell.innerHTML = `

        <td>Enter something</td>
        <td>Enter something</td>
        <td>Enter something </td>
        <td class="modify">
            <button  class="edit">
                <img src="{% static 'edit.svg'%}" alt="">
                <span class="text">edit</span>
            </button>
            <button  class="del">
                <img src="{% static 'delete.svg'%}" alt="">
                <span class="text">Delete</span>
            </button>
        </td>`
        document.querySelector(".table").appendChild(newcell)

        var flag = 0;
        document.querySelectorAll(".edit").forEach((item) => {
            item.addEventListener("click", () => {
                let items = item.parentElement.parentElement.children;
                if (flag == 0) {


                    for (let i = 0; i < 3; i++) {
                        var cellcontent = items[i].innerHTML;

                        items[i].innerHTML = `<input type='text' value="${cellcontent}">`;
                    }
                    item.innerHTML = ` <img src="edit.svg" alt="">
                    <span class="text">Save</span>`
                    flag++;
                }
                else {

                    for (var i = 0; i < items.length - 1; i++) {
                        var cell = items[i];
                        var input = cell.getElementsByTagName('input')[0];
                        cell.innerHTML = input.value;
                        flag = 0;
                        item.innerHTML = ` <img src="edit.svg" alt="">
                    <span class="text">edit</span>`
                    }
                }


            })
        })


        //delete functionality for the table
        document.querySelectorAll(".del").forEach((item) => {
            item.addEventListener("click", () => {
                alert("are you sure you want to delete?")
                var tr = item.parentElement.parentElement
                tr.remove()
            })
        })

    })

    //edit functionality for the table
    var flag = 0;
    document.querySelectorAll(".edit").forEach((item) => {
        item.addEventListener("click", () => {
            let items = item.parentElement.parentElement.children;
            if (flag == 0) {


                for (let i = 0; i < 3; i++) {
                    var cellcontent = items[i].innerHTML;

                    items[i].innerHTML = `<input type='text' value="${cellcontent}">`;
                }
                item.innerHTML = ` <img src="edit.svg" alt="">
                <span class="text">Save</span>`
                flag++;
            }
            else {

                for (var i = 0; i < items.length - 1; i++) {
                    var cell = items[i];
                    var input = cell.getElementsByTagName('input')[0];
                    cell.innerHTML = input.value;
                    flag = 0;
                    item.innerHTML = ` <img src="edit.svg" alt="">
                <span class="text">edit</span>`
                }
            }


        })
    })


    //delete functionality for the table
    document.querySelectorAll(".del").forEach((item) => {
        item.addEventListener("click", () => {
            alert("are you sure you want to delete?")
            var tr = item.parentElement.parentElement
            tr.remove()
        })
    })




}
main()