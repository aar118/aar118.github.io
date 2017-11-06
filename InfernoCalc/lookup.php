<?php
session_start();

include "MySQL.class.php";

$dbh = new MySQL();

$sql = "SELECT id, name, level, sl, ep, ga, gee, gge, sxr, sgr, ae, ag, apb, axb, agb, ChallengeBoosts, ChallengeSeries, ChallengeMilestone, GuildDamage, CardDamage, SoulAutoDamage, SoulCritDamage, AutoSpeed, AutoBaseDamage, AutoCritChance, AutoCritMultiplier, AutoDoubleAttack, AscensionAutoDamage, AscensionAutoSpeed, AscensionAutoCrit, pets1, pets2, petlevel1, petlevel2, guildpetdamage, guildstablelevel, petdamage1, petdamage2, ascensionpetdamage, ascensionpetspeed, petorb, pet1critchance, pet2critchance, pet1critdamage, pet2critdamage, pet1doublechance, pet2doublechance FROM employee WHERE name = ? LIMIT 1";
$result = $dbh->select($sql, $_SESSION['data']);

echo json_encode($result[0]);
?>



