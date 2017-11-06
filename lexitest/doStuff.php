<!DOCTYPE html>
<html>
    <head>
		<title></title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <style>
			div {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
                font-size: 400%;
			}
		</style>
	</head>
	<body>
        <div id="result"></div>

        <script>
            var result = document.getElementById("result");
            result.innerHTML = "You are " + Math.round(`<?php
                if(isset($_POST['averagePercent'])) {
                    $averagePercent = $_POST['averagePercent'];
                    if(is_numeric($averagePercent)) {
                        echo $averagePercent;
                    } else {
                        echo false;
                    }
                }
            ?>` * 100) + "% Lexi!";
        </script>
	</body>
</html>
