export function displayContactsWindow() {
  //function
  const MAIN = document.querySelector("main");
  const CONTACTS_WINDOW = document.createElement("div");
  CONTACTS_WINDOW.classList.add("container");

  //clear container to render contacts window
  MAIN.innerHTML = " ";

  CONTACTS_WINDOW.innerHTML = `<div class="container py-5 bg-light" role="navigation">
   <ul class="nav nav-tabs" id="contacts-tab" role="tablist">
     <li class="nav-item" role="presentation">
       <button
         class="nav-link active"
         id="contact-list-tab"
         data-bs-toggle="tab"
         data-bs-target="#contact-list"
         type="button"
         role="tab"
         aria-controls="contact-list"
         aria-selected="true"
       >
         contacts
       </button>
     </li>
     <li class="nav-item" role="presentation">
       <button
         class="nav-link"
         id="suggested-contacts-tab"
         data-bs-toggle="tab"
         data-bs-target="#suggested-contacts"
         type="button"
         role="tab"
         aria-controls="suggested-contacts"
         aria-selected="false"
       >
         suggestions
       </button>
     </li>
   </ul>
   <div class="tab-content" id="contact-tab-contents">
     <div
       class="tab-pane fade show active"
       id="contact-list"
       role="tabpanel"
       aria-labelledby="contact-list-tab"
     >
       <ul class="container bg-body border-start border-end border-bottom">
         <li class="row d-flex py-3">
           <div class="col col-md-1 col-2">
             <img
               src="../img/captura.JPG"
               class="img-fluid"
               alt="user placeholder"
             />
           </div>
           <div class="col-6">username</div>
           <div class="col-2">
             <span class="material-symbols-outlined text-secondary">
               person_remove
             </span>
           </div>
         </li>
         <li class="row d-flex py-3">
         <div class="col col-md-1 col-2">
             <img
               src="../img/captura.JPG"
               class="img-fluid"
               alt="user placeholder"
             />
           </div>
           <div class="col-6">username</div>
           <div class="col-2">
             <span class="material-symbols-outlined text-secondary">
               person_remove
             </span>
           </div>
         </li>
         <li class="row d-flex py-3">
         <div class="col col-md-1 col-2">
             <img
               src="../img/captura.JPG"
               class="img-fluid"
               alt="user placeholder"
             />
           </div>
           <div class="col-6">username</div>
           <div class="col-2">
             <span class="material-symbols-outlined text-secondary">
               person_remove
             </span>
           </div>
         </li>
       </ul>
     </div>
     <div
       class="tab-pane fade"
       id="suggested-contacts"
       role="tabpanel"
       aria-labelledby="suggested-contacts-tab"
     >
       <ul class="container bg-body border-start border-end border-bottom">
         <li class="row d-flex py-3">
         <div class="col col-md-1 col-2">
             <img
               src="../img/captura.JPG"
               class="img-fluid"
               alt="user placeholder"
             />
           </div>
           <div class="col-6">username</div>
           <div class="col-2">
             <span class="material-symbols-outlined text-secondary">
               person_add
             </span>
           </div>
         </li>
         <li class="row d-flex py-3">
         <div class="col col-md-1 col-2">
             <img
               src="../img/captura.JPG"
               class="img-fluid"
               alt="user placeholder"
             />
           </div>
           <div class="col-6">username</div>
           <div class="col-2">
             <span class="material-symbols-outlined text-secondary">
               person_add
             </span>
           </div>
         </li>
         <li class="row d-flex py-3">
         <div class="col col-md-1 col-2">
             <img
               src="../img/captura.JPG"
               class="img-fluid"
               alt="user placeholder"
             />
           </div>
           <div class="col-6">username</div>
           <div class="col-2">
             <span class="material-symbols-outlined text-secondary">
               person_add
             </span>
           </div>
         </li>
       </ul>
     </div>
   </div>
  </div>`;

  MAIN.append(CONTACTS_WINDOW);
}
