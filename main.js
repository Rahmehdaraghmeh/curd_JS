 let coursePrice = document.getElementById("coursePrice");
 let courseCategory = document.getElementById("courseCategory");
 let courseName = document.getElementById("courseName");
 let courseDescription = document.getElementById("courseDescription");
 let search = document.getElementById("search");
 let error=document.getElementsByClassName("error")
 // using before to enable to take the value of input field to do what need 
 let inputs = document.getElementsByClassName("inputs"); // acess element by class name 
 let courses = []; // name of array 
 let data = document.getElementById("data"); // id body table to add through contain array to html.
 if (localStorage.getItem("alldata" != null)) { // this local storage not null 
     // get array of object from local storage contain data at  last using app.
     courses = JSON.parse(localStorage.getItem("alldata"));
     // call here because the  courses contain data from local storage .

     displayCourse();
 } else {
     courses = []; // this if local storage eual null. 
 }


 function createCourse() {
    if ( validateCourseName()) {
        //object to store the different value for thing . 
        let course = {
             cName: courseName.value,
             cCategory: courseCategory.value,
             cPrice: coursePrice.value,
             cDescription: courseDescription.value,
         }
         // Add to array  using push .
     courses.push(course);
     // add data from arrays to local storage
     localStorage.setItem("alldata", JSON.stringify(courses));
     // call here to appear  addition data to courses
     displayCourse();
     clearInput(); 
     Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    }
     else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
    
          });
     }
    
 }
 // print array 
 function displayCourse() {
  
  
      let result = '';
     for (let i = 0; i < courses.length; i++) {
         result += `  <tr>
         <td>${i}</td>
         <td>${courses[i].cName}</td>
         <td>${courses[i].cCategory}</td>
         <td>${courses[i].cPrice}</td>
         <td> ${courses[i].cDescription}</td>
         <td><button onclick="updateCoures(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
         <td>
             <button class="delete"  onclick="deleteCoures(${i})"
             ><i class="fa-solid fa-trash"></i></button></td></tr>`
     }
     //  add contain of array to table html 
     data.innerHTML = result;  
   
 }

 function clearInput() { // the clear input after add or when need using button clear 

     // this method call refactor : 
     for (let i = 0; i < inputs.length; i++) {
         inputs[i].value = "";

     }
     //  courseName.value = "";
     //  courseCategory.value = "";
     //  coursePrice.value = "";
     //  courseDescription.value = "";
 }

 function deleteCoures(id) { // delete index from array delete using splice determine where start and how many delete.
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) { 
            courses.splice(id, 1);
     // detele also from local storage 
     localStorage.setItem("alldata", JSON.stringify(courses));
     displayCourse();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
        else{
            Swal.fire({
                title: "Waring ",
                text: "Your file not deleted.",
                icon: "warning"
              });
        }
      });
   
 }

 function updateCoures(id) {

     courses[id].cName = courseName.value;
     courses[id].cCategory = courseCategory.value;
     courses[id].cPrice = coursePrice.value;
     courses[id].cDescription = courseDescription.value;
     //update data in localstorage to become the same in array .
     localStorage.setItem("alldata", JSON.stringify(courses));
     displayCourse();
     clearInput();
 }
 //M Search depend the course name after convert it to lower case if match in table dispaly just equals or match 
 function searchCourse() {
     let searchvalue = search.value;
     let result = '';

     for (let i = 0; i < courses.length; i++) {
         if (courses[i].cName.toLowerCase().includes(searchvalue.toLowerCase()))
             result += `  <tr>
         <td>${i}</td>
         <td>${courses[i].cName}</td>
         <td>${courses[i].cCategory}</td>
         <td>${courses[i].cPrice}</td>
         <td> ${courses[i].cDescription}</td>
         <td><button onclick="updateCoures(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
         <td>
             <button class="delete"  onclick="deleteCoures(${i})"
             ><i class="fa-solid fa-trash"></i></button></td></tr>`
     }
     //  add contain of array to table html 
     data.innerHTML = result;

 }
 function validateCourseName(){
    let cnameRegex=/^[A-Z][a-z0-9]{3,15}$/;
    if(!cnameRegex.test(courseName.value))
    {
        error[0].style.display='block';
        return false;
    }else{
        error[0].style.display='none';
        return true;
    }


 }
 courseName.addEventListener('blur',validateCourseName);