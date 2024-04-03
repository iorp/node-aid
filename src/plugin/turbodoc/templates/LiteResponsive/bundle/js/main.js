  


// Treeview initialization
 (function(){ 
    const $treeviews= document.querySelectorAll('.tbd-treeview');
    $treeviews.forEach($treeview => {
        const $treeviewItems = $treeview.querySelectorAll('.list-group-item'); 
        document.addEventListener('DOMContentLoaded', function() {
            // treeview items : set initial active item from url 
        
            //const items = treeview.querySelectorAll('.list-group-item');
                    // expand all 
            for (var i = 0; i < $treeviewItems.length; i++) {
                var target = $treeviewItems[i];
                let href = target.getAttribute('href');
                if(href){
    
                if(  window.location.href.endsWith(href.replace(/^(\.\.\/)*/, '')) ){
                    target.classList.add('active') 
                    console.log(window.location.href)
                }
                } 
                
                
            }
            //treeview items : mark active on click 
          
            $treeviewItems.forEach(item => {
                item.addEventListener('click', function (event) {
            if(event.target.getAttribute('href')){
            const activeItems = $treeview.querySelectorAll('.list-group-item.active');
            if(activeItems) activeItems.forEach((activeItem)=>activeItem.classList.remove('active') );
            item.classList.add('active');
             }
            });
         
            }); 
    
            //treeview chevrons: expand on click
            const chevrons = $treeview.querySelectorAll('.chevron');  
            chevrons.forEach(chevron => {
                chevron.addEventListener('click', function (event) {
                const target = event.target.closest('.list-group-item'); 
                target.classList.toggle('in'); 
                const nextSibling = target.nextElementSibling;
                if (nextSibling && nextSibling.classList.contains('list-group')) {
                    if (nextSibling.classList.contains('collapse')) {
                    
                        nextSibling.classList.toggle('show');  
                         event.preventDefault();
                    }
                }
            });
            });
    
    
    
             
       
    
        });
        $treeview.fn={
            expandAll:(expand=true)=>{
                const listGroupTree = document.querySelector('.list-group-tree');
                const listGroupItems = listGroupTree.querySelectorAll('.list-group-item');
                  // expand all 
            for (var i = 0; i < listGroupItems.length; i++) {
                var target = listGroupItems[i];
                if(expand){
                    target.classList.add('in')
                }else{
                    target.classList.remove('in')
                }
             
               
              const nextSibling = target.nextElementSibling;
        
              if (nextSibling && nextSibling.classList.contains('list-group')) {
                if(expand){
                    nextSibling.classList.add('show');
                }else{
                    nextSibling.classList.remove('show');
                }
                
              }
               
                
            }
            }
        }
    });
   
 })();

// window.$$={
//     sidebar:{
//         init:()=>{
//             // initializesidebar
//     // hide sidebar on click , on small screens 
    
    
//         var sidebar = document.getElementById('treeview');
//         var links = sidebar.getElementsByTagName('a');
        
//         for (var i = 0; i < links.length; i++) {
//            links[i].addEventListener('click', function(event) {
//               if(links[i] && links[i].getAttribute('href')) sidebar.classList.remove('show');
//            });
//         }
    
//         }
//     },
//     treeview:{
//         init:()=>{
//             // initializetreeview 
//      // continue here
//        const chevron = document.querySelector('.chevron');
//        // add on click listener
//        if (chevron) {
//            chevron.addEventListener('click', function (event) {
//                const target = event.target.closest('.list-group-item')
//                let previousActive= document.querySelector('.list-group-item.active') 
//                if(previousActive)    previousActive.classList.remove('active');  
//              target.classList.add('active');


//                if (target && target.dataset.toggle === 'collapse') { 
                  
                  

//                    target.classList.toggle('in');
//                    const nextSibling = target.nextElementSibling;
//                    if (nextSibling && nextSibling.classList.contains('list-group')) {
//                        if (nextSibling.classList.contains('collapse')) {
//                            // Toggle the collapse class
//                            nextSibling.classList.toggle('show');
                           
//                            // If you want to load contents dynamically with Ajax, do it here
     
//                            // Prevent the default behavior of the link
//                            // event.preventDefault();
//                        }
//                    }
//                }
//            });
//        }

//       $$.treeview.setInitialActive();
//        },  
// //         init:()=>{
// //         // initializetreeview 
 
// //    const listGroupTree = document.querySelector('.list-group-tree');
// //    // add on click listener
// //    if (listGroupTree) {
// //        listGroupTree.addEventListener('click', function (event) {
// //            const target = event.target;
// //            let previousActive= document.querySelector('.list-group-item.active') 
// //            if(previousActive)    previousActive.classList.remove('active');  
// //          target.classList.add('active');


// //            if (target && target.dataset.toggle === 'collapse') { 
              
             
               
         

// //                target.classList.toggle('in');
// //                const nextSibling = target.nextElementSibling;
// //                if (nextSibling && nextSibling.classList.contains('list-group')) {
// //                    if (nextSibling.classList.contains('collapse')) {
// //                        // Toggle the collapse class
// //                        nextSibling.classList.toggle('show');
                       
// //                        // If you want to load contents dynamically with Ajax, do it here
 
// //                        // Prevent the default behavior of the link
// //                        // event.preventDefault();
// //                    }
// //                }
// //            }
// //        });
// //    }

// //   $$.treeview.setInitialActive();
// //    },
//         setInitialActive:()=>{
//             const listGroupTree = document.querySelector('.list-group-tree');
//             const listGroupItems = listGroupTree.querySelectorAll('.list-group-item');
//               // expand all 
//         for (var i = 0; i < listGroupItems.length; i++) {
//             var target = listGroupItems[i];
//           let href = target.getAttribute('href');
//           if(href){

//             if(  window.location.href.endsWith(href.replace(/^(\.\.\/)*/, '')) ){
//                 target.classList.add('active') 
//                 console.log(window.location.href)
//             }
//           } 
            
            
//         }
//         },
//         expandAll:(expand=true)=>{
//             const listGroupTree = document.querySelector('.list-group-tree');
//             const listGroupItems = listGroupTree.querySelectorAll('.list-group-item');
//               // expand all 
//         for (var i = 0; i < listGroupItems.length; i++) {
//             var target = listGroupItems[i];
//             if(expand){
//                 target.classList.add('in')
//             }else{
//                 target.classList.remove('in')
//             }
         
           
//           const nextSibling = target.nextElementSibling;
    
//           if (nextSibling && nextSibling.classList.contains('list-group')) {
//             if(expand){
//                 nextSibling.classList.add('show');
//             }else{
//                 nextSibling.classList.remove('show');
//             }
            
//           }
           
            
//         }
//         }
//     } 
    
// }


// document.addEventListener('DOMContentLoaded', function() {
// $$.sidebar.init();
// $$.treeview.init();
// $$.treeview.expandAll()
// });
