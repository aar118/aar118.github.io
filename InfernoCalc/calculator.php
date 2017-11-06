<!DOCTYPE HTML>
<html>
<head>
  <title>Calculator</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <script src="index.calculate.js"></script>
  <script src="index.input.js"></script>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <link href="test.css" rel="stylesheet">
</head>
<body>

<?php session_start();?>

<h1 style="text-align: center;">Inferno Calculator</h1>
<div class="line-separator"></div>
<br> 

<div class="container-fluid" align="center">
  <div class="row">
  	<div class="col-sm-4">Name: <span class="label label-default" id="name"></span></div>
  	<div class="col-sm-4">Best Tier: <span class="label label-default" id="besttier"></span></div>
  	<div class="col-sm-4">Highest Tier: <span class="label label-default" id="highesttier"></span></div>
  </div>
  <div class="row">
  	<div class="col-sm-4">Level: <span class="label label-default" id="header-level"></span></div>
  	<div class="col-sm-4">Best Xp/Hour: <span class="label label-default" id="bestxp"></span></div>
  	<div class="col-sm-4">Highest Xp/Hour: <span class="label label-default" id="highestxp"></span></div>
  </div>
    <div class="row">
  	<div class="col-sm-4">DPS: <span class="label label-default" id="dps"></span></div>
  	<div class="col-sm-4">Best Gold/Hour: <span class="label label-default" id="bestgold"></span></div>
  	<div class="col-sm-4">Highest Gold/Hour: <span class="label label-default" id="highestgold"></span></div>
  </div>
</div>

<br>

<div class="line-separator"></div>

<div class="bs-example">
    <ul class="nav nav-tabs">
    	<li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle dropdown-test" href="#">Game <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a data-toggle="tab" href="#challenge">Challenges</a></li>
                <li><a data-toggle="tab" href="#orb">Orbs</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle dropdown-test" href="#">Upgrades <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a data-toggle="tab" href="#auto">Auto</a></li>
                <li><a data-toggle="tab" href="#ascension">Ascension</a></li>
                <li><a data-toggle="tab" href="#account">Account</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle dropdown-test" href="#">Character <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a data-toggle="tab" href="#character">Character</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle dropdown-test" href="#">Guild <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a data-toggle="tab" href="#guild">Guild</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle dropdown-test" href="#">Pets <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a data-toggle="tab" href="#pets">Pets</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle dropdown-test" href="#">Party <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a data-toggle="tab" href="#party">Party</a></li>
            </ul>
        </li>
        <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle dropdown-test" href="#">ChangeLog <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a data-toggle="tab" href="#changelog1">Version 0.1a</a></li>
            </ul>
        </li>
    </ul>

    <div class="tab-content">
        <div id="challenge" class="tab-pane fade">
            <h3>Challenges</h3>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
					<label for="challengeseries" class="col-sm-2 control-label">Challenge Series:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="challengeseries" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="challengemilestone" class="col-sm-2 control-label">Challenge Milestone:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="challengemilestone" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
            </form>
        </div>

        <div id="orb" class="tab-pane fade">
            <h3>Orbs</h3>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
					<label for="soulautodamage" class="col-sm-2 control-label">Auto Damage:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="soulautodamage" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="sxr" class="col-sm-2 control-label">Xp Rate:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="sxr" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="soulcritdamage" class="col-sm-2 control-label">Crit Damage:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="soulcritdamage" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="sgr" class="col-sm-2 control-label">Gold Rate:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="sgr" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="petorb" class="col-sm-2 control-label">Pet Damage:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petorb" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
            </form>
        </div>

        <div id="auto" class="tab-pane fade">
            <h3>Auto</h3>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
					<label for="autospeed" class="col-sm-2 control-label">Auto Speed:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="autospeed">
				    </div>
				</div>
				<div class="form-group">
					<label for="autodamage" class="col-sm-2 control-label">Auto Base Damage:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="autodamage">
				    </div>
				</div>
				<div class="form-group">
					<label for="autocritchance" class="col-sm-2 control-label">Auto Crit Chance:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="autocritchance">
				    </div>
				</div>
				<div class="form-group">
					<label for="autocritmult" class="col-sm-2 control-label">Auto Crit Multiplier:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="autocritmult">
				    </div>
				</div>
				<div class="form-group">
					<label for="autodouble" class="col-sm-2 control-label">Auto Double Attack:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="autodouble">
				    </div>
				</div>
            </form>
        </div>

        <div id="ascension" class="tab-pane fade">
            <h3>Ascension</h3>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
					<label for="ascensionautodamage" class="col-sm-2 control-label">Auto Damage:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ascensionautodamage">
				    </div>
				</div>
				<div class="form-group">
					<label for="ascensionautospeed" class="col-sm-2 control-label">Auto Speed:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ascensionautospeed">
				    </div>
				</div>
				<div class="form-group">
					<label for="ascensionautocrit" class="col-sm-2 control-label">Auto Crit:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ascensionautocrit">
				    </div>
				</div>
				<div class="form-group">
					<label for="axb" class="col-sm-2 control-label">Xp Boost:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="axb">
				    </div>
				</div>
				<div class="form-group">
					<label for="agb" class="col-sm-2 control-label">Gold Boost:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="agb">
				    </div>
				</div>
				<div class="form-group">
					<label for="apb" class="col-sm-2 control-label">Party Boost:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="apb">
				    </div>
				</div>
				<div class="form-group">
					<label for="ascensionpetdamage" class="col-sm-2 control-label">Pet Damage:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ascensionpetdamage">
				    </div>
				</div>
				<div class="form-group">
					<label for="ascensionpetspeed" class="col-sm-2 control-label">Pet Speed:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ascensionpetspeed">
				    </div>
				</div>
            </form>
        </div>

        <div id="account" class="tab-pane fade">
            <h3>Account</h3>
            <form class="form-horizontal" role="form">
				<div class="form-group">
					<label for="ag" class="col-sm-2 control-label">Gold Boost:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ag">
				    </div>
				</div>
				<div class="form-group">
					<label for="ae" class="col-sm-2 control-label">Exp Boost:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ae">
				    </div>
				</div>
 			</form>
        </div>

        <div id="character" class="tab-pane fade">
            <h3>Character</h3>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
					<label for="level" class="col-sm-2 control-label">Character Level:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="level">
				    </div>
				</div>
            	<div class="form-group">
					<label for="sl" class="col-sm-2 control-label">Support Level:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="sl">
				    </div>
				</div>
				<div class="form-group">
					<label for="ep" class="col-sm-2 control-label">Event Points:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ep">
				    </div>
				</div>
				<div class="form-group">
					<label for="carddamage" class="col-sm-2 control-label">Card Damage:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="carddamage">
				    </div>
				</div>
				<div class="form-group">
					<label for="challengeboost" class="col-sm-2 control-label">Challenge Boost:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="challengeboost">
				    </div>
				</div>
            </form>
        </div>

        <div id="guild" class="tab-pane fade">
            <h3>Guild</h3>
            <form class="form-horizontal" role="form">
           		<div class="form-group">
					<label for="ga" class="col-sm-2 control-label">Altar Level:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="ga">
				    </div>
				</div>
				<div class="form-group">
					<label for="guildstablelevel" class="col-sm-2 control-label">Guild Stable Level:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="guildstablelevel">
				    </div>
				</div>
				<div class="form-group">
					<label for="guildbasedamage" class="col-sm-2 control-label">Base Damage Level:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="guildbasedamage">
				    </div>
				</div>
				<div class="form-group">
					<label for="guildpetdamage" class="col-sm-2 control-label">Pet Damage Level:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="guildpetdamage">
				    </div>
				</div>
				<div class="form-group">
					<label for="gee" class="col-sm-2 control-label">Xp Enhance Level:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="gee">
				    </div>
				</div>
				<div class="form-group">
					<label for="gge" class="col-sm-2 control-label">Gold Enhance Level:</label>
				    <div class="col-sm-2">
				    	<input type="text" class="form-control" id="gge">
				    </div>
				</div>
			
            </form>
        </div>

        <div id="pets" class="tab-pane fade">
            <h3>Pets</h3>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
            		<label for="pets1" class="col-sm-2 control-label"> Pet 1:</label>
            		<div class="col-sm-2">
            			<select class="form-control" id="pets1">
            				<option value="1">Snake</option>
            				<option value="2">Bat</option>
            				<option value="3">Bad Wabbit</option>
            				<option value="4">Virus</option>
            				<option value="5">Rhino</option>
            				<option value="6">Robobee</option>
            				<option value="7">Brainfester</option>
            				<option value="8">Clockworks</option>
            				<option value="9">Rex</option>
            				<option value="10">Eternal Wyrm</option>
            			</select>
            		</div>
            	</div>
            	<div class="form-group">
            		<label for="petlevel1" class="col-sm-2 control-label"> Level:</label>
            		<div class="col-sm-2">
            			<select class="form-control" id="petlevel1">
            				<option value="1">1</option>
            				<option value="2">2</option>
            				<option value="3">3</option>
            				<option value="4">4</option>
            				<option value="5">5</option>
            				<option value="6">6</option>
            				<option value="7">7</option>
            				<option value="8">8</option>
            				<option value="9">9</option>
            				<option value="10">10</option>
            			</select>
            		</div>
            	</div>
            	<div class="form-group">
					<label for="petdamage1" class="col-sm-2 control-label">Pet Damage:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petdamage1" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="petcritchance1" class="col-sm-2 control-label">Crit Chance:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petcritchance1" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="petcritdamage1" class="col-sm-2 control-label">Crit Damage:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petcritdamage1" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="petdoublechance1" class="col-sm-2 control-label">Double Chance:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petdoublechance1" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
            </form>
            <form class="form-horizontal" role="form">
            	<div class="form-group">
            		<label for="pets2" class="col-sm-2 control-label"> Pet 2:</label>
            		<div class="col-sm-2">
            			<select class="form-control" id="pets2">
            				<option value="1">Snake</option>
            				<option value="2">Bat</option>
            				<option value="3">Bad Wabbit</option>
            				<option value="4">Virus</option>
            				<option value="5">Rhino</option>
            				<option value="6">Robobee</option>
            				<option value="7">Brainfester</option>
            				<option value="8">Clockworks</option>
            				<option value="9">Rex</option>
            				<option value="10">Eternal Wyrm</option>
            			</select>
            		</div>
            	</div>
            	<div class="form-group">
            		<label for="petlevel2" class="col-sm-2 control-label"> Level:</label>
            		<div class="col-sm-2">
            			<select class="form-control" id="petlevel2">
            				<option value="1">1</option>
            				<option value="2">2</option>
            				<option value="3">3</option>
            				<option value="4">4</option>
            				<option value="5">5</option>
            				<option value="6">6</option>
            				<option value="7">7</option>
            				<option value="8">8</option>
            				<option value="9">9</option>
            				<option value="10">10</option>
            			</select>
            		</div>
            	</div>
            	<div class="form-group">
					<label for="petdamage2" class="col-sm-2 control-label">Pet Damage:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petdamage2" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="petcritchance2" class="col-sm-2 control-label">Crit Chance:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petcritchance2" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="petcritdamage2" class="col-sm-2 control-label">Crit Damage:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petcritdamage2" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
				<div class="form-group">
					<label for="petdoublechance2" class="col-sm-2 control-label">Double Chance:</label>
				    <div class="col-sm-2 input-group">
				    	<input type="text" class="form-control" id="petdoublechance2" aria-describedby="basic-addon2">
				    	<span class="input-group-addon" id="basic-addon2">%</span>
				    </div>
				</div>
            </form>
        </div>

        <div id="party" class="tab-pane fade">
            <h3>Party</h3>
            <form class="form-horizontal" role="form">
				<div class="form-group">
	            	<div class="row">
						<label for="member2" class="col-sm-2 control-label">Member 2:</label>
					    <div class="col-sm-2">
					    	<select class="form-control" id="member2"></select>
					    </div>
					</div>
					<div class="row">
						<label for="dps2" class="col-sm-2 control-label">DPS:</label>
					    <div class="col-sm-2">
					    	<div class="form-control" id="dps2"></div>
					    </div>
					</div>
				</div>
				<div class="form-group">
	            	<div class="row">
						<label for="member3" class="col-sm-2 control-label">Member 3:</label>
					    <div class="col-sm-2">
					    	<select class="form-control" id="member3"></select>
					    </div>
					</div>
					<div class="row">
						<label for="dps3" class="col-sm-2 control-label">DPS:</label>
					    <div class="col-sm-2">
					    	<div class="form-control" id="dps3"></div>
					    </div>
					</div>
				</div>
				<div class="form-group">
	            	<div class="row">
						<label for="member4" class="col-sm-2 control-label">Member 4:</label>
					    <div class="col-sm-2">
					    	<select class="form-control" id="member4"></select>
					    </div>
					</div>
					<div class="row">
						<label for="dps4" class="col-sm-2 control-label">DPS:</label>
					    <div class="col-sm-2">
					    	<div class="form-control" id="dps4"></div>
					    </div>
					</div>
				</div>
			</form>
			<form class="form-horizontal" role="form">
				<div class="form-group">
					<label for="partydps2" class="col-sm-2 control-label">Manual Party DPS:</label>
					<div class="col-sm-2">
						<input class="text" class="form-control" id="partydps2">
					</div> 
				</div>
				<div class="form-group">
					<label for="partymembers" class="col-sm-2 control-label">Manual Party Members:</label>
					<div class="col-sm-2">
						<input class="text" class="form-control" id="partymembers">
					</div> 
				</div>
			</form>
        </div>

        <div id="changelog1" class="tab-pane fade">
			<h3>Version 0.01a</h1> 
			<ul class="container">
				<li>Added</li>
				<ul>
					<li>Stuff</li>
				</ul>
				<br>
				<li>Changed</li>
				<ul>
					<li>Stuff</li>
				</ul>
				<br>
				<li>Fixed</li>
				<ul>
					<li>Stuff</li>
				</ul>
				<br>
				<li>Removed</li>
				<ul>
					<li>Stuff</li>
				</ul>
				<br>
			</ul>
        </div>

    </div>

</div>

</div>
<div class="calculate-container">
	<input class="calculate" type="button" value="Calculate/Save" onclick="calculate();">
</div>

<script>

var name = '<?php echo $_SESSION['data']; ?>';
$(function() {
	$("#name").html('Potato');
	$("#besttier").html('0');
	$("#highesttier").html('0');
	$("#header-level").html('0');
	$("#bestxp").html('0');
	$("#highestxp").html('0');
	$("#dps").html('0');
	$("#bestgold").html('0');
	$("#highestgold").html('0');
    $.getJSON('lookup.php', function (result) {
    	console.log(result);
    	$("#name").text(result.name);
    	$("#level").val(result.level);
    	$("#ae").val(result.ae);
    	$("#ag").val(result.ag);
    	$("#agb").val(result.agb);
    	$("#axb").val(result.axb);
    	$("#apb").val(result.apb);
    	$("#ep").val(result.ep);
    	$("#ga").val(result.ga);
    	$("#gee").val(result.gee);
    	$("#gge").val(result.gge);
    	$("#sgr").val(result.sgr);
    	$("#sl").val(result.sl);
    	$("#sxr").val(result.sxr);
    	$("#challengeboost").val(result.ChallengeBoosts);
		$("#challengeseries").val(result.ChallengeSeries);
		$("#challengemilestone").val(result.ChallengeMilestone);
		$("#guildbasedamage").val(result.GuildDamage);
		$("#carddamage").val(result.CardDamage);
		$("#soulautodamage").val(result.SoulAutoDamage);
		$("#soulcritdamage").val(result.SoulCritDamage);
		$("#autospeed").val(result.AutoSpeed);
		$("#autodamage").val(result.AutoBaseDamage);
		$("#autocritchance").val(result.AutoCritChance);
		$("#autocritmult").val(result.AutoCritMultiplier);
		$("#autodouble").val(result.AutoDoubleAttack);
		$("#ascensionautodamage").val(result.AscensionAutoDamage);
		$("#ascensionautospeed").val(result.AscensionAutoSpeed);
		$("#ascensionautocrit").val(result.AscensionAutoCrit);
		$('#pets1').val(result.pets1);
		$('#pets2').val(result.pets2);
		$('#petlevel1').val(result.petlevel1);
		$('#petlevel2').val(result.petlevel2);
		$('#guildpetdamage').val(result.guildpetdamage);
		$('#guildstablelevel').val(result.guildstablelevel);
		$('#petdamage1').val(result.petdamage1);
		$('#petdamage2').val(result.petdamage2);
		$('#ascensionpetdamage').val(result.ascensionpetdamage);
		$('#ascensionpetspeed').val(result.ascensionpetspeed);
		$('#petorb').val(result.petorb);
		$('#petcritchance1').val(result.pet1critchance);
		$('#petcritchance2').val(result.pet2critchance);
		$('#petcritdamage1').val(result.pet1critdamage);
		$('#petcritdamage2').val(result.pet2critdamage);
		$('#petdoublechance1').val(result.pet1doublechance);
		$('#petdoublechance2').val(result.pet2doublechance);
    });
    $.getJSON('members.php', function (result) {
    	var html = '';
    	var len = result.length;
    	for (var i = 0; i< len; i++) {
        	html += '<option value="' + i + '">' + result[i].name + '</option>';
    	}
    	$('#member2').append(html);
    	$('#member3').append(html);
    	$('#member4').append(html);

		var options = $('#member2 option');
		var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) {
		  var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase();

		  return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
		});options.each(function(i, o) {
		  o.value = arr[i].v;
		  $(o).text(arr[i].t);
		});
		var options = $('#member3 option');
		var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) {
		  var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase();

		  return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
		});options.each(function(i, o) {
		  o.value = arr[i].v;
		  $(o).text(arr[i].t);
		});
		var options = $('#member4 option');
		var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) {
		  var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase();

		  return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
		});options.each(function(i, o) {
		  o.value = arr[i].v;
		  $(o).text(arr[i].t);
		});
		$('#member2').append('<option value="100000" selected="selected">None</option>');
    	$('#member3').append('<option value="100000" selected="selected">None</option>');
    	$('#member4').append('<option value="100000" selected="selected">None</option>');

    	$('#member2').on('change', function() {
    		if(this.value == "100000"){
    			var dps2 = "";
    		}else{
  				var dps2 = result[this.value].dps;
  			}
  			$('#dps2').html(dps2);
		});
		$('#member3').on('change', function() {
	  		if(this.value == "100000"){
    			var dps3 = "";
    		}else{
  				var dps3 = result[this.value].dps;
  			}
	  		$('#dps3').html(dps3);
		});
		$('#member4').on('change', function() {
	  		if(this.value == "100000"){
    			var dps4 = "";
    		}else{
  				var dps4 = result[this.value].dps;
  			}
	  		$('#dps4').html(dps4);
		});
    });
});

</script>
</body>
</html>


