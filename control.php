<?php
session_start();

if (isset($_POST["login"])) {
    $email = $_POST["email"];
    $password = $_POST["password"];
    
    if(isset($_SESSION[$email]) && $password == $_SESSION[$email]["password"]){ 
                    
        header('Location: homepage.php');
        
    } else {
        echo "Invalid Credentials.";
        // print_r ($_POST);
        header('Location: index.php?error=1');
    }    
}

               
if(isset($_POST['register'])) {
    
            $email     = trim($_POST["email"]);
            $password  = trim($_POST["password"]);
            $firstname = trim($_POST["firstname"]);
            $lastname  = trim($_POST["lastname"]);
            $username  = trim($_POST["username"]);
    
    if($email != "" && $password != "" && $firstname != "" && $lastname != "" && $username !="") {                
            
                
            if(isset($_SESSION[$email])) {
                echo "credentials have been taken already go back to login page";
                return;
            } else {
            
            
            $user[$email]["firstname"] = $firstname;
            $user[$email]["lastname"] = $lastname;
            $user[$email]["username"] = $username;
            $user[$email]["password"] = $password;                      
            
            $_SESSION += $user;                       
                                                       
           // echo "welcome to programers brain <br/>";
            header('Location: index.php');
        }
    }
}