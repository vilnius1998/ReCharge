<?php


include('session.php');

if(!isset($_SESSION['login_user'])){
header("location: index.php"); // Redirecting To Home Page
}
?>


<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>Charger Locator</title>

  <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Montserrat:400,700'>

      <link rel="stylesheet" href="css/map.css">


</head>

<body>
     <div id="profile">
      <b id="welcome"></b> <i><?php echo $login_session; ?></i></b>
      <b id="logout"><a href="logout.php">Log Out</a></b>
     </div>
  <form id="locator" class="col" action="">

      <label for="locator_text">Type an address</label>
      <input type="text" id="locator_text" name="locator_text" required>

      <label for="locator_radius">Within</label>
      <select id="locator_radius" name="locator_radius">
			<option value='10'>10 mi</option>
			<option value='25'>25 mi</option>
			<option value='50'>50 mi</option>
			<option value='100'>100 mi</option>
		  </select>

    <button type="submit">Search</button>
  </form>
</header>
<aside id="map"></aside>
<main id="results"></main>
  <script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
  <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDk9zZaxOrCUYSgM8trdP8NnGYb1x58E4c&libraries=geometry,places'></script>



    <script  src="js/map.js"></script>




</body>

</html>
