<?php
include('login.php'); // Includes Login Script
if(isset($_SESSION['login_user'])){
header("location: profile.php"); // Redirecting To Profile Page
}
?>


<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>ReCharge</title>



      <link rel="stylesheet" href="css/style.css">


</head>

<body>
  <div class="wrapper">
       <div id="title">
            <h2>ReCharge</h2>
       </div>
	<div class="container">
		<h1>Welcome</h1>


<form action="" method="post">
   <input id="name" name="username" placeholder="username" type="text">
   <input id="password" name="password" placeholder="**********" type="password">
   <span><?php echo $error; ?></span>
   <br><br>
   <input name="submit" type="submit" value=" Login ">
   <a href="register.html">Register</a>
   <br />
   <a href="about.html">About</a>
  </form>

	<ul class="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>



    <script  src="js/index.js"></script>




</body>

</html>
