
const Treeview = require('./Treeview');
const Search = require('./Search');

const Layout= ({map, root,main,pluginOptions})=>{
 
 
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="${root}vendor/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="${root}css/style.css">
  <title>Responsive Page with Bootstrap 5</title>
</head>
<body>

<nav id="topbar" class="navbar fixed-top  navbar-expand-lg navbar-dark bg-dark">
  <div  class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle sidebar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand me-auto" href="#">Your Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
        ${Search()}
         
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Sidebar -->
<nav id="sidebar" class="col-xs-12 col-sm-12 col-md-4 d-md-block col-lg-3 col-xl-3  bg-white sidebar collapse">

  ${Treeview(map,root,{expanded:true,locked:true})} 
 
</nav>
<!-- Container -->
<div id="container" class="container-fluid">
  <div class="row">
    
   

    <!-- Main Content -->
    <main id="main" class="col-xs-12 col-sm-12  col-md-8  col-lg-9 col-xl-9 ms-sm-auto">
    ${main}
     
    </main>
  </div>
</div>

<script src="${root}vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="${root}vendor/aid/js/aid.bundle.min.js"></script>
<script src="${root}/doc/map.js"></script>
<script src="${root}js/main.js"></script>

</body>
</html>

  `;
}

module.exports = Layout