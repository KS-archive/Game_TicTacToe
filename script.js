/*************************************************************
	OBIEKT PLAYER
**************************************************************/
function Player(id, points, sum, active){
	this.id = id;
	this.points = points;
	this.sum = sum;
	this.active = active;
}

var player1 = new Player(1, 0, 1, true);
var player2 = new Player(2, 0, 1, false);


/*************************************************************
	FUNKCJE
**************************************************************/


/*******
	Wypełnia planszę dziewięcioma polami.
*******/
function prepareFields() {
	var fields = '';																			// Utworzenie pustej zmiennej na pola.

	for (var i=0; i<9; i++) {
		fields += '<div class="container__field" id="' + i + '"></div>';		// Dodanie do zmiennej kolejnych div o tej samej klasie i rosnącym id.
	}
	document.querySelector('.container__board').innerHTML = fields;			// Wstawienie zawartości zmiennej do kontenera.
	addClickEvents();																			// Wywołanie kolejnej funkcji w celu dodania obserwatorów.
}


/*******
	Dodaje obserwatory zdarzeń do pól gry.
*******/
function addClickEvents() {
	var fields = document.querySelectorAll('.container__field');	// Zebranie wszystkich pól i wpisanie ich do tablicy fields.

	for (var i = 0; i < fields.length; i++) {
		fields[i].addEventListener('click', check, false);				// Dodanie obserwatora do każdego pola.
	}
}


/*******
	Usuwa obserwatory zdarzeń z pól gry.
*******/
function removeClickEvents() {
	var fields = document.querySelectorAll('.container__field');	// Zebranie wszystkich pól i wpisanie ich do tablicy fields.

	for (var i = 0; i < fields.length; i++) {
		fields[i].removeEventListener('click', check, false);			// Usunięcie obserwatora z każdego pola.
	}
}


/*******
	Kontroluje stan gry po kliknięciu na pole.
*******/
function check() {
	if (player1.active && this.className == 'container__field') {	// Kod aktywowany gdy to gracz 1 kliknął na dane pole.
		this.setAttribute('class', 'container__field o');		// Wstawienie O w dane pole za pomocą odpowiedniej klasy.
		player1.sum *= givePrimary(this.id);						// Pomnożenie sumy gracza razy liczbę pierwszą przypisaną do klikniętego pola.
		globalSum++;												// Zwiększenie liczby zaznaczonych pól o 1.
		if ((globalSum > 4) && checkWinner(player1.sum)) {								// Przesłanie sumy gracza do funkcji, która zwróci true, jeśli gracz wygrał.
			player1.points++;												// Przyznanie 1 punktu graczowi.
			removeClickEvents();											// Usunięcie obserwatora w celu uniemożliwienia klikania w pola przed rozpoczęciem nowej gry.
			window.setTimeout(resetBoard, 2000);					// Pokazywanie obecnego stanu planszy przez 2 sekundy i przejście do jej resetowania.
		};
		document.querySelector('.player1__header').setAttribute('class', 'player__header player1__header');				// Zmiana nagłówka
		document.querySelector('.player2__header').setAttribute('class', 'player__header player2__header active');		// aktywnego gracza.
		player1.active = false;																														// Zmiana atrybutu obiektu, który
		player2.active = true;																														// wskazuje aktywnego gracza.
	}

	else if (player2.active && this.className == 'container__field') {		//Kod analogiczny do powyższego, ale aktywowany przy kliknięciu gracza 2.
		this.setAttribute('class', 'container__field x');
		player2.sum *= givePrimary(this.id);
		globalSum++;
		if ((globalSum > 4) && checkWinner(player2.sum)) {
			player2.points++;
			removeClickEvents();
			window.setTimeout(resetBoard, 2000);
		};
		document.querySelector('.player2__header').setAttribute('class', 'player__header player2__header');
		document.querySelector('.player1__header').setAttribute('class', 'player__header player1__header active');
		player2.active = false;
		player1.active = true;
	}

	if (globalSum == 9) {							// Aktywuje się gdy wszystkie pola zostały wypełnione, ale nikt nie wygrał.
		window.setTimeout(resetBoard, 2000);	// Pokazywanie obecnego stanu planszy przez 2 sekundy i przejście do jej resetowania.
	}
}

/*******
	Zwraca kolejne liczby pierwsze w zależności od id klikniętego pola.
*******/
function givePrimary(id) {
	if (id == '0') return 2;
	if (id == '1') return 3;
	if (id == '2') return 5;
	if (id == '3') return 7;
	if (id == '4') return 11;
	if (id == '5') return 13;
	if (id == '6') return 17;
	if (id == '7') return 19;
	if (id == '8') return 23;
}

/*******
	Sprawdza czy gracz o podanej sumie nie wygrał gry. Wykorzystuje liczby pierwsze przypisane do pól poprzez funkcję givePrimary.
*******/
function checkWinner(sum) {
	if (sum%2 == 0) {
		if (sum%3 == 0 && sum%5 == 0) return true;
		else if (sum%11 == 0 && sum%23 == 0) return true;
		else if (sum%7 == 0 && sum%17 == 0) return true;
	} else if (sum%11 == 0) {
		if (sum%3 == 0 && sum%19 == 0) return true;
		else if (sum%7 == 0 && sum%13 == 0) return true;
		else if (sum%5 == 0 && sum%17 == 0) return true;
	} else if (sum%23 == 0) {
		if (sum%17 == 0 && sum%19 == 0) return true;
		else if (sum%13 == 0 && sum%5 == 0) return true;
	} else {return false;}
}

/*******
	Przekazuje zdobyte punkty na liczniki i resetuje planszę umożliwiając rozpoczęcie kolejnej rozgrywki.
*******/
function resetBoard() {
	document.querySelector('.player1__points').textContent = player1.points;
	document.querySelector('.player2__points').textContent = player2.points;
	player1.sum = 1;
	player2.sum = 1;
	globalSum = 0;
	prepareFields();
}

/*************************************************************
	KOD GLOWNY
**************************************************************/


var globalSum = 9;		// Inicjalizacja licznika zaznaczonych pól.
prepareFields();			// Przygotowanie planszy do gry.
