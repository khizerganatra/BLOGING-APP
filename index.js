const asideSection = document.querySelector("aside");

    const mainSection = document.querySelector("main");

    const signInBtn = document.getElementById("login-btn");

    const signUpBtn = document.getElementById("register-btn");

    signInBtn.addEventListener("click", () => {

        mainSection.classList.add("slide-right");

        asideSection.classList.add("slide-left");

    });

    signUpBtn.addEventListener("click", () => {

        mainSection.classList.remove("slide-right");

        asideSection.classList.remove("slide-left");

    });

    
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAX5wPLcRCZlRTc37MWSM3Gw44u7mcMjDo",
    authDomain: "todo-c880a.firebaseapp.com",
    databaseURL: "https://todo-c880a-default-rtdb.firebaseio.com",
    projectId: "todo-c880a",
    storageBucket: "todo-c880a.appspot.com",
    messagingSenderId: "425542469813",
    appId: "1:425542469813:web:4793ac70c96dd7c2ec96fc",
    measurementId: "G-LV56J4RE7Z"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import { getAuth,
          createUserWithEmailAndPassword,
          onAuthStateChanged, 
          signOut,
          signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import { getFirestore  ,
         collection,
          addDoc,
          getDocs,
          deleteDoc,
          doc,
          onSnapshot,
          setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";



const auth = getAuth();
const db = getFirestore(app);
const firestoredb = getFirestore();



let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let logoutBtn = document.getElementById("logoutBtn");
let publishPostBtn = document.getElementById("publishPostBtn");
let loginFromNouser = document.getElementById("loginFromNouser");
let crossSignup = document.getElementById("crossSignup");
let postContainer = document.getElementById("postContainer");



signinBtn.addEventListener("click", login)
signupBtn.addEventListener("click", signupFunction);
logoutBtn.addEventListener("click" , logout)
loginFromNouser.addEventListener("click" , loginbtnfromNouser)
crossSignup.addEventListener("click" , crosSignupFunc)
publishPostBtn.addEventListener("click", addpost);



function signupFunction(){


    let user_Firstname = document.getElementById("user_Firstname").value;
    let user_Lastname = document.getElementById("user_Lastname").value;
    let user_email_signup = document.getElementById("user_email_signup").value;
    let user_password_signup = document.getElementById("user_password_signup").value;
    let repeat_user_password_signup = document.getElementById("repeat_user_password_signup").value;


    if (user_password_signup != repeat_user_password_signup) return alert("the entered repeat password doesnt match")


    createUserWithEmailAndPassword(auth, user_email_signup, user_password_signup)
      .then((userCredential) => { 
        // Signed in 
        const user = userCredential.user;

        const userDetails = {
            user_Firstname,
            user_Lastname,
            user_email_signup,
            user_password_signup
        }

        const userRef = (db, `users/${user.uid}`)
        setDoc(userRef, userDetails)
        

      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
        const errorMessage = error.message;
        alert(errorMessage);

        // ..
      });

    }


onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
        document.getElementById("signinSignoutContainer").style.display="none";
        document.getElementById("ContainerWithNoUser").style.display="none";
        document.getElementById("loader").style.display="none";
        document.getElementById("ContainerWithUser").style.display="block";
       

        // getTodo();
        getPosts ()
      // ...
    } else {
      // User is signed out
      // ...
    //   document.getElementById("signinSignoutContainer").style.display="none";
      document.getElementById("ContainerWithUser").style.display="none";
      document.getElementById("loader").style.display="none";
      document.getElementById("ContainerWithNoUser").style.display="block";
    
    }
  });

  function loginbtnfromNouser(){
    document.getElementById("signinSignoutContainer").style.display="block";
    document.getElementById("ContainerWithUser").style.display="none";
    document.getElementById("ContainerWithNoUser").style.display="none";
    document.getElementById("loader").style.display="none";
    
}

function crosSignupFunc(){
    document.getElementById("signinSignoutContainer").style.display="none";
    document.getElementById("ContainerWithUser").style.display="none";
    document.getElementById("ContainerWithNoUser").style.display="block";
    document.getElementById("loader").style.display="none";
}

function logout(){
    signOut(auth).then(() => {
    //   postContainer.innerHTML = null;
        // Sign-out successful.
      }).catch((error) => {
        alert(error);
        // An error happened.
      });
  }


function login(){

  let user_email_signin = document.getElementById("user_email_signin").value;
  let user_password_signin = document.getElementById("user_password_signin").value;
 
  signInWithEmailAndPassword(auth, user_email_signin, user_password_signin)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
      const errorMessage = error.message;
    });
  }


  async function addpost(){

    const postTitle = document.getElementById("postTitle").value;
    const postDescription = document.getElementById("postDescription").value;

    
    const postData = {
        postTitle,
        postDescription
      };

    //   const dbref = doc(firestoredb, `postApp/${auth.currentUser.uid}`)
    //   await setDoc(dbref,postData)

    //   const cityRef = doc(db, 'cities', 'BJ');
    //     setDoc(cityRef, { capital: true }, { merge: true });
    //   const dbref = doc(firestoredb, `todoApp/${auth.currentUser.uid}/todos`);
    
    //     const newdoc = await addDoc(dbref, postData);
    //    setDoc (dbref, postData, {merge : true});


      const docRef = await addDoc(collection(db, `postApp/${auth.currentUser.uid}/userBlog`), postData);
   
      console.log("new document added in the collection")

      document.getElementById("postTitle").value= "";
      document.getElementById("postDescription").value = "";
      getPosts ()
  }


 async function getPosts (){



    const querySnapshot = await getDocs(collection(db, ""));

    // postContainer.innerHTML = null;
    
    querySnapshot.forEach((doc) => {
    console.log(doc.data())
      console.log(`${doc.id} => ${doc.data().postTitle}`)
      console.log(`${doc.id} => ${doc.data().postDescription}`)


      const delid = doc.id;

      const postDataDB =`  < <div class="postCard" style="width: 80%; margin: 0 auto; background-color: rgb(252, 228, 149);padding: 10px; border-radius: 15px;"> 
      <div style="display: flex;">
        <img style="height: 65px; width: 65px; margin-right: 10px; border-radius: 10px;" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80">
      <div>
        <h3>${doc.data().postTitle}</h3>
        <p>author name - date</p>
      </div>
      </div>

      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque necessitatibus voluptatem molestiae iusto quidem inventore consequuntur officia ratione? Mollitia quos assumenda dolore in quasi voluptates! Itaque recusandae dignissimos ut temporibus.</p>

      <span style="display: flex;">
        <button style="margin: 5px ; padding: 5px; border-radius: 10px; background-color: rgb(255, 164, 164); border: 2px solid rgb(248, 107, 107);" id="${doc.id  +'-del'}" >Delete</button>
        <button style="margin: 5px ; padding: 5px; border-radius: 5px; background-color: rgb(195, 250, 174); border: 2px solid rgb(151, 255, 90);" id="${doc.id + '-edit'}">Edit</button>
      </span>
      
    </div> `

        // const dbDataOfTodo = `<div class="dbDataOfTodo"> 
        // <label id="" class="todoItem"> ${doc.data().postTitle} </label> 
        // <button id="${doc.id  +
        //   '-del'}" class="delBtn"> delete</button>
        // <button id="${doc.id + '-edit'}" class="updateBtn" >update</button>
        // <button>completed</button>
        // </div>`

        postContainer.innerHTML += postDataDB

        setTimeout(() => {

          let DelBtn = document.getElementById(delid + '-del');
          let UpdateBtn = document.getElementById(delid +'-edit') ;
  
            // console.log(DelBtn);
            DelBtn.addEventListener("click", delTodo);
            
            UpdateBtn.addEventListener("click", updateTodo);
        
          
         
        }, 2000);

      });

     

      
     
  } 

async function delTodo(){
  console.log("delte running");
  console.log(this.id.slice(0, this.id.length - 4))

  await deleteDoc(doc(db, `todoApp/${auth.currentUser.uid}/userTodoList`, `${this.id.slice(0, this.id.length - 4)}`));

  console.log("delted");
  getPosts ()
}

// async function updateTodo(){
//   console.log("update running");
//   console.log( this.id.slice(0, this.id.length - 5))

  
// }





