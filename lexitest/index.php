<!DOCTYPE html>
<html>
    <head>
		<title></title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<style>
			form {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				font-size: 200%;
			}
		</style>
	</head>
	<body>
        <form id="form">
            <div>What is your favorite color?</div>
            <select id="colors"><option value=""></option></select> <br><br>
			<div>What is your favorite princess?</div>
			<select id="princesses"><option value=""></option></select> <br><br>
			<div>What is your favorite flower?</div>
			<select id="flowers"><option value=""></option></select> <br><br>
			<div>What is your favorite food?</div>
			<select id="foods"><option value=""></option></select> <br><br>
			<div>What is your favorite animal?</div>
			<select id="animals"><option value=""></option></select> <br><br>
            <input type="button" onclick="doStuff();" value="Submit"></input>
        </form>

		<script>
			var color = {
				name: ["Green", "Blue", "White", "All", "Purple", "Red", "Orange", "Black", "Yellow", "None"],
				value: ["green", "blue", "white", "all", "purple", "red", "orange", "black", "yellow", "none"],
				percent: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
			};
			var princess = {
				name: ["Repunzel", "Ariel", "Jasmine", "Belle", "Mulan", "Pocahontas", "Sleeping Beauty", "Cinderalla", "Snow White", "Tiana", "Merida"],
				value: ["repunzel", "ariel", "jasmine", "belle", "mulan", "pocahontas", "sleeping", "cinderalla", "snow", "tiana", "merida"],
				percent: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05]
			}
			var flower = {
				name: ["Lily", "Sunflower", "Daffodil", "Rose", "Carnation", "Marigold", "Tulip", "Orchid"],
				value: ["lily", "sunflower", "daffodil", "rose", "carnation", "marigold", "tulip", "orchid"],
				percent: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3]
			}
			var food = {
				name: ["Potato", "Taco", "Chicken", "Pizza", "Hamburger", "Hotdog", "Lobster"],
				value: ["potato", "taco", "chicken", "pizza", "hamburger", "hotdog", "lobster"],
				percent: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4]
			};
			var animal = {
				name: ["Panda", "Hedgehog", "Pupper", "Kitteh", "Duckie", "Bunny", "Goose"],
				value: ["panda", "hedgehog", "pupper", "kitteh", "duckie", "bunny", "goose"],
				percent: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4]
			};

			var $colors = $('#colors');
			var $princesses = $('#princesses');
			var $flowers = $('#flowers');
			var $foods = $('#foods');
			var $animals = $('#animals');

			for(var i = 0; i < color.name.length; i++) {
				var option = document.createElement("option");
				option.text = color.name[i];
				option.value = color.value[i];
				colors.appendChild(option);
			}
			for(var i = 0; i < princess.name.length; i++) {
				var option = document.createElement("option");
				option.text = princess.name[i];
				option.value = princess.value[i];
				princesses.appendChild(option);
			}
			for(var i = 0; i < flower.name.length; i++) {
				var option = document.createElement("option");
				option.text = flower.name[i];
				option.value = flower.value[i];
				flowers.appendChild(option);
			}
			for(var i = 0; i < food.name.length; i++) {
				var option = document.createElement("option");
				option.text = food.name[i];
				option.value = food.value[i];
				foods.appendChild(option);
			}
			for(var i = 0; i < animal.name.length; i++) {
				var option = document.createElement("option");
				option.text = animal.name[i];
				option.value = animal.value[i];
				animals.appendChild(option);
			}

			function doStuff() {
				var colorPercent = color.percent[color.value.indexOf(colors.value)];
				var princessPercent = princess.percent[princess.value.indexOf(princesses.value)];
				var flowerPercent = flower.percent[flower.value.indexOf(flowers.value)];
				var foodPercent = food.percent[food.value.indexOf(foods.value)];
				var animalPercent = animal.percent[animal.value.indexOf(animals.value)];

				var averagePercent = (colorPercent + princessPercent + flowerPercent + foodPercent + animalPercent) / 5;

				if(averagePercent) {
					var url = 'doStuff.php';
					var form = $('<form action="' + url + '" method="post">' +
					'<input type="hidden" name="averagePercent" value="' + averagePercent + '" />' +
					'</form>');
					$('body').append(form);
					form.submit();
				} else {
					alert("Fill in values bruh!");
				}

			}
		</script>
	</body>
</html>