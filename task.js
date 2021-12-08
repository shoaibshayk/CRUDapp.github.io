

function getAndupdate(){
    console.log("Updating List...");
      tit = document.getElementById('title').value;
      desc = document.getElementById('description').value;
      expDate = document.getElementById('date').value;
      if (localStorage.getItem('itemsJson')==null){
           itemJsonArray = [];
           itemJsonArray.push([tit, desc, expDate]);
           localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
      }
      else{
          itemJsonArrayStr = localStorage.getItem('itemsJson');
          itemJsonArray = JSON.parse(itemJsonArrayStr);
          itemJsonArray.push([tit, desc, expDate]);
          localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

      }
      update();
    }

  function update(){
    if (localStorage.getItem('itemsJson')==null){
           itemJsonArray = [];
           localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
      }
      else{
          itemJsonArrayStr = localStorage.getItem('itemsJson');
          itemJsonArray = JSON.parse(itemJsonArrayStr);
         

      }
      

    //   Populate the Table
    let tablebody = document.getElementById("tablebody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>  
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td><button class="btn bt-sm btn-primary" onclick="deleted(${index})">Delete</td>
        <td><button id="edit-button" class="btn-edit bt-sm btn-primary" onclick="edited(${index})">Edit</td>
        <td><button id="status" class="btn-status bt-sm btn-primary" onclick="status()">Incomplete</td>
        </tr>
        `   
    });
    tablebody.innerHTML = str;
  }
  add = document.getElementById('add');
  add.addEventListener("click", getAndupdate);
  update(); 
  
  function deleted(itemIndex){
      console.log("Delete", itemIndex);
      itemJsonArrayStr = localStorage.getItem('itemsJson');
      itemJsonArray = JSON.parse(itemJsonArrayStr);

      itemJsonArray.splice(itemIndex, 1);
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
      update();
  }


  function edited(itemIndex){
      console.log("Edit", itemIndex);
      itemJsonArrayStr = localStorage.getItem('itemsJson');
      itemJsonArray = JSON.parse(itemJsonArrayStr);

      itemJsonArray.splice(itemIndex, 1);
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
      update();
  }

  function clearStorage() {
      if (confirm("Do you really want to clear")){
      console.log('Clearing the Storage');
      localStorage.clear();
      update();
      }
  }

  
  $(document).ready(function () {
    $('#myTable').DataTable();

  });

  edits = document.getElementsByClassName('edit');
    Array.from(edits).forEach((element) => {
      element.addEventListener("click", (e) => {
        console.log("edit ");
        tr = e.target.parentNode.parentNode;
        title = tr.getElementsByTagName("td")[0].innerText;
        description = tr.getElementsByTagName("td")[1].innerText;
        console.log(title, description);
        titleEdit.value = title;
        descriptionEdit.value = description;
        snoEdit.value = e.target.id;
        console.log(e.target.id)
        $('#editModal').modal('toggle');
      })
    })

    deletes = document.getElementsByClassName('delete');
    Array.from(deletes).forEach((element) => {
      element.addEventListener("click", (e) => {
        console.log("edit ");
        sno = e.target.id.substr(1);

        if (confirm("Are you sure you want to delete this note!")) {
          console.log("yes");
          window.location = `/crud/index.php?delete=${sno}`;
          // TODO: Create a form and use post request to submit a form
        }
        else {
          console.log("no");
        }
      })
    })