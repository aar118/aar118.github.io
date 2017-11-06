<?php
include "MySQL.class.php";

$dbh = new MySQL();

$charactername = $_POST['charactername'];
$level = $_POST['level'];
$sl = $_POST['sl'];
$ep = $_POST['ep'];
$ga = $_POST['ga'];
$gee = $_POST['gee'];
$gge = $_POST['gge'];
$sxr = $_POST['sxr'];
$sgr = $_POST['sgr'];
$ae = $_POST['ae'];
$ag = $_POST['ag'];
$apb = $_POST['apb'];
$axb = $_POST['axb'];
$agb = $_POST['agb'];
$ChallengeBoosts = $_POST['challengeboosts'];
$ChallengeSeries = $_POST['challengeseries'];
$ChallengeMilestone = $_POST['challengemilestone'];
$GuildDamage = $_POST['guilddamage'];
$CardDamage = $_POST['carddamage'];
$SoulAutoDamage = $_POST['soulautodamage'];
$SoulCritDamage = $_POST['soulcritdamage'];
$AutoSpeed = $_POST['autospeed'];
$AutoBaseDamage = $_POST['autobasedamage'];
$AutoCritChance = $_POST['autocritchance'];
$AutoCritMultiplier = $_POST['autocritmultiplier'];
$AutoDoubleAttack = $_POST['autodoubleattack'];
$AscensionAutoDamage = $_POST['ascensionautodamage'];
$AscensionAutoSpeed = $_POST['ascensionautospeed'];
$AscensionAutoCrit = $_POST['ascensionautocrit'];
$pets1 = $_POST['pets1'];
$pets2 = $_POST['pets2'];
$petlevel1 = $_POST['petlevel1'];
$petlevel2 = $_POST['petlevel2'];
$guildpetdamage = $_POST['guildpetdamage'];
$guildstablelevel = $_POST['guildstablelevel'];
$petdamage1 = $_POST['petdamage1'];
$petdamage2 = $_POST['petdamage2'];
$ascensionpetdamage = $_POST['ascensionpetdamage'];
$ascensionpetspeed = $_POST['ascensionpetspeed'];
$petorb = $_POST['petorb'];
$pet1critchance = $_POST['pet1critchance'];
$pet2critchance = $_POST['pet2critchance'];
$pet1critdamage = $_POST['pet1critdamage'];
$pet2critdamage = $_POST['pet2critdamage'];
$pet1doublechance = $_POST['pet1doublechance'];
$pet2doublechance = $_POST['pet2doublechance'];
$dps = $_POST['dps'];

$query = "INSERT INTO employee (name, level, sl, ep, ga, gee, gge, sxr, sgr, ae, ag, apb, axb, agb, ChallengeBoosts, ChallengeSeries, ChallengeMilestone, GuildDamage, CardDamage, SoulAutoDamage, SoulCritDamage, AutoSpeed, AutoBaseDamage, AutoCritChance, AutoCritMultiplier, AutoDoubleAttack, AscensionAutoDamage, AscensionAutoSpeed, AscensionAutoCrit, pets1, pets2, petlevel1, petlevel2, guildpetdamage, guildstablelevel, petdamage1, petdamage2, ascensionpetdamage, ascensionpetspeed, petorb, pet1critchance, pet2critchance, pet1critdamage, pet2critdamage, pet1doublechance, pet2doublechance, dps) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$params = array($charactername, $level, $sl, $ep, $ga, $gee, $gge, $sxr, $sgr, $ae, $ag, $apb, $axb, $agb, $ChallengeBoosts, $ChallengeSeries, $ChallengeMilestone, $GuildDamage, $CardDamage, $SoulAutoDamage, $SoulCritDamage, $AutoSpeed, $AutoBaseDamage, $AutoCritChance, $AutoCritMultiplier, $AutoDoubleAttack, $AscensionAutoDamage, $AscensionAutoSpeed, $AscensionAutoCrit, $pets1, $pets2, $petlevel1, $petlevel2, $guildpetdamage, $guildstablelevel, $petdamage1, $petdamage2, $ascensionpetdamage, $ascensionpetspeed, $petorb, $pet1critchance, $pet2critchance, $pet1critdamage, $pet2critdamage, $pet1doublechance, $pet2doublechance, $dps);

if($dbh->insert($query, $params)){
	echo "Good";
}else{
	$query = "UPDATE employee SET level = ?, sl = ?, ep = ?, ga = ?, gee = ?, gge = ?, sxr = ?, sgr = ?, ae = ?, ag = ?, apb = ?, axb = ?, agb = ?, ChallengeBoosts = ?, ChallengeSeries = ?, ChallengeMilestone = ?, GuildDamage = ?, CardDamage = ?, SoulAutoDamage = ?, SoulCritDamage = ?, AutoSpeed = ?, AutoBaseDamage = ?, AutoCritChance = ?, AutoCritMultiplier = ?, AutoDoubleAttack = ?, AscensionAutoDamage = ?, AscensionAutoSpeed = ?, AscensionAutoCrit = ?, pets1 = ?, pets2 = ?, petlevel1 = ?, petlevel2 = ?, guildpetdamage = ?, guildstablelevel = ?, petdamage1 = ?, petdamage2 = ?, ascensionpetdamage = ?, ascensionpetspeed = ?, petorb = ?, pet1critchance = ?, pet2critchance = ?, pet1critdamage = ?, pet2critdamage = ?, pet1doublechance = ?, pet2doublechance = ?, dps = ? WHERE name = ?";
	$params = array($level, $sl, $ep, $ga, $gee, $gge, $sxr, $sgr, $ae, $ag, $apb, $axb, $agb, $ChallengeBoosts, $ChallengeSeries, $ChallengeMilestone, $GuildDamage, $CardDamage, $SoulAutoDamage, $SoulCritDamage, $AutoSpeed, $AutoBaseDamage, $AutoCritChance, $AutoCritMultiplier, $AutoDoubleAttack, $AscensionAutoDamage, $AscensionAutoSpeed, $AscensionAutoCrit, $pets1, $pets2, $petlevel1, $petlevel2, $guildpetdamage, $guildstablelevel, $petdamage1, $petdamage2, $ascensionpetdamage, $ascensionpetspeed, $petorb, $pet1critchance, $pet2critchance, $pet1critdamage, $pet2critdamage, $pet1doublechance, $pet2doublechance, $dps, $charactername);
	$result = $dbh->update($query, $params);
}

?>