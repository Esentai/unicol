<?php
//$conn = new mysqli("srv-pleskdb39.ps.kz:3306", "ilove_database", "Database123", "ilovetri_database");
$conn = new mysqli("guidevue", "root", "", "guideVue");
//$conn = new mysqli("localhost", "id8614924_esentai", "Esentai123", "id8614924_ironman");
//$conn = new mysqli("srv-pleskdb34.ps.kz:3306", "qazse_unicol", "unicol123", "qazsert1_unicol");
if ($conn->connect_error){
  die("Cloud not connect to database!");
}
$data = json_decode(file_get_contents("php://input"));
$res = array('error' => false);
$action = 'read';
if (isset($_GET['action'])){
  $action = $_GET['action'];
}
if ($action == 'read'){
  $result = $conn->query("SELECT * FROM `cities`");
  $competition = array();
  while($row = $result->fetch_assoc()){
    array_push($competition, $row);
  }
  $res['cities'] = $competition;
}
if ($action == 'read'){
  $result = $conn->query("SELECT * FROM `specialty`");
  $competition = array();
  while($row = $result->fetch_assoc()){
    array_push($competition, $row);
  }
  $res['specialty'] = $competition;
}



if ($action == 'newCity'){
  $name_kaz = $_POST['name_kaz'];
  $name_rus = $_POST['name_rus'];
  $name_eng = $_POST['name_eng'];
  $result = $conn->query("INSERT INTO `cities` (`ID`, `name_kaz`, `name_rus`, `name_eng`) VALUES (NULL, '$name_kaz', '$name_rus', '$name_eng')");
  if ($result) {
    $res['message'] = "User added successfully";
  } else{
    $res['error'] = true;
    $res['message'] = 'Could not insert user';
  }
  $res['user'] = $user;
}



if ($action == 'newSpecialty'){
  $name_kaz = $_POST['name_kaz'];
  $name_rus = $_POST['name_rus'];
  $name_eng = $_POST['name_eng'];
  $specialty_kaz = $_POST['specialty_kaz'];
  $specialty_rus = $_POST['specialty_rus'];
  $specialty_eng = $_POST['specialty_eng'];
  $specialty_code = $_POST['specialty_code'];

  $result = $conn->query("INSERT INTO `specialty` (`ID`, `name_kaz`, `name_rus`, `name_eng`, `specialty_kaz`, `specialty_rus`, `specialty_eng`, `specialty_code`) VALUES (NULL, '$name_kaz', '$name_rus', '$name_eng', '$specialty_kaz', '$specialty_rus', '$specialty_eng', '$specialty_code')");
  if ($result) {
    $res['message'] = "User added successfully";
  } else{
    $res['error'] = true;
    $res['message'] = 'Could not insert user';
  }
  $res['user'] = $user;
}

if ($action == 'createUser'){
  $name = $_POST['name'];
  $competition = $_POST['competition'];
  $date = $_POST['date'];
  $distance = $_POST['data'];
  $stage = $_POST['stage'];
  $goal = $_POST['goal'];
  $achievement = $_POST['achievement'];
  $сomment = $_POST['comments'];
  $phoneNumber = $_POST['phoneNumber'];
  $email = $_POST['email'];
  $vk = $_POST['vk'];
  $facebook  = $_POST['facebook'];
  
  $result = $conn->query("INSERT INTO `user` (`UserId`, `name`, `competition`, `date`, `distance`, `stage`, `goal`, `achievement`, `сomment`, `phoneNumber`, `email`, `vk`, `facebook`) VALUES (NULL, '$name', '$competition', '$date', '$distance', '$stage', '$goal', '$achievement', '$сomment', '$phoneNumber', '$email', '$vk', '$facebook')");
  
  if ($result) {
    $res['message'] = "User added successfully";
  } else{
    $res['error'] = true;
    $res['message'] = 'Could not insert user';
  }
  $res['user'] = $user;
}
if ($action == 'createTeam'){
  $teamName = $_POST['teamName'];
  $searchName = $_POST['searchName'];
  $searchDistance = $_POST['searchDistance'];
  $name = $_POST['name'];
  $competition = $_POST['competition'];
  $date = $_POST['date'];
  $distance = $_POST['distance'];
  $stage = $_POST['stage'];
  $goal = $_POST['goal'];
  $achievement = $_POST['achievement'];
  $сomment = $_POST['comments'];
  $phoneNumber = $_POST['phoneNumber'];
  $email = $_POST['email'];
  $vk = $_POST['vk'];
  $facebook  = $_POST['facebook'];
  
  // $result = $conn->query("INSERT INTO `user` ('name', 'competition', 'date', 'distance', 'stage', 'goal', 'achievement', 'сomment', 'phoneNumber', 'email', 'vk', 'facebook') VALUES ('$name', '$competition', '$date', '$distance', '$stage', '$goal', '$achievement', '$сomment', '$phoneNumber', '$email', '$vk', '$facebook') ");
  $result = $conn->query("INSERT INTO `team` (`UserId`, `teamName`, `name`, `searchName`, `searchDistance`, `competition`, `date`, `distance`, `stage`, `goal`, `achievement`, `сomment`, `phoneNumber`, `email`, `vk`, `facebook`) VALUES (NULL, '$teamName', '$name', '$searchName', '$searchDistance', '$competition', '$date', '$distance', '$stage', '$goal', '$achievement', '$сomment', '$phoneNumber', '$email', '$vk', '$facebook')");
  if ($result) {
    $res['message'] = "User added successfully";
  } else{
    $res['error'] = true;
    $res['message'] = 'Could not insert user';
  }
  $res['team'] = $team;
}
if($action == 'deleteTeam'){
  $id = $data->id;
  $result =  $conn->query("DELETE FROM team WHERE UserId =".$id);
  if ($result){
    echo "Delete successfully";
  }else{
    echo "Error $id";
  }
  exit;
}
if($action == 'deleteSpecialty'){
  $id = $data->id;
  $result =  $conn->query("DELETE FROM specialty WHERE ID =".$id);
  if ($result){
    echo "Delete successfully";
  }else{
    echo "Error";
  }
  exit;
}


if($action == 'deleteCity'){
  $id = $data->id;
  $result =  $conn->query("DELETE FROM cities WHERE Id =".$id);
  if ($result){
    echo "Delete successfully";
  }else{
    echo "Error";
  }
  exit;
}



$conn->close();
header("Content-type: application/json");
echo json_encode($res);
die();