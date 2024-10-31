var d = document;

window.onload = (function() {   
   
    var linkData = [
        { text: 'Home', href: '/' },
        { text: 'Modern', href: '/pages/modern.html' },
        { text: 'Klassiek', href: '/pages/klassiek.html' }
    ];

    imageMapResize();
    initHeaderNav(linkData);
    initFooterNav(linkData); 
    initWonderen();  
});

console.log(imageMapResize());

// standaard melding vewijderen.
var jsDis = document.querySelector(".js-disabled");
if (jsDis) {
    jsDis.remove();
    console.log("Het geselecteerde element is verwijderd:", jsDis);
} else {
    console.log("Geen overeenkomstend element gevonden met de klasse 'js-disabled'.");
}

/* ===================== header ======================*/

function initHeaderNav(linkData) {

    // return false; // WEGHALEN BIJ HET BEGIN VAN DE OPDRACHT!
/* 	======================================================================	
		Browser & Object sniffing
	=========================================================================== */
    
    var header = d.querySelector("header");
    if (!header) {
        console.log("Het <header> element is niet gevonden.");
    } else {
        console.log("Het <header> element is gevonden:", header);
    }

    // Maak het <nav> element aan
    var nav = d.createElement('nav');

    // Maak de <nav>-<ul> elementen aan
    var navUl = document.createElement('ul');

    // Voeg de <ul> toe aan het <nav> element
    nav.appendChild(navUl)

    // Voeg het <nav> element toe aan het <header> element
    header.appendChild(nav);   

    // Maak nieuwe <li> en <a> elementen voor elke link en voeg deze toe aan de <ul>
    for (var i = 0; i < linkData.length; i++) {
        var linkItem = linkData[i];

        // Maak een nieuw <li> element aan voor elke link
        var li = document.createElement('li');

        // Maak een nieuw <a> element aan voor elke link
        var link = document.createElement('a');

        // Stel de tekst en href van de link in op basis van linkData
        link.textContent = linkItem.text;
        link.href = linkItem.href;

        // Voeg het <a> element toe aan het <li> element
        li.appendChild(link);

        // Voeg het <li> element toe aan het <ul> element
        navUl.appendChild(li);

        // Voeg de class "active" toe aan het <li> element op basis van de paginatitel
        if ((linkItem.text === 'Home' && document.title === 'Wereld wonderen') ||
            (linkItem.text === 'Modern' && document.title === 'Moderne wereld wonderen') ||
            (linkItem.text === 'Klassiek' && document.title === 'Klassieke wereld wonderen')) {
            li.classList.add('active'); 
        }
    }
}

/* ===================== pop-up ======================*/

function initWonderen() {

    var popupContent = d.getElementById("popupContent");
    var popupLinks = d.getElementsByClassName("popupLink");
    var overlay = d.getElementById('overlay');
    console.log(overlay);

    if(!d.getElementById("popupContent")) return false;
    console.log(popupContent);

	// maaak pop-up inhoud

    // Maak het <div> element aan en geef een id
	var dynamicText = d.createElement("div");
	dynamicText.setAttribute('id', 'dynamicText');

    // Maak het <h2> element aan en geef een id
	var wonderNaam = d.createElement("h2");
	wonderNaam.setAttribute('id', 'wonderNaam');

    // Maak het <h3> element aan en geef een id
	var wonderCategorie = d.createElement("h3");
	wonderCategorie.setAttribute('id', 'categorie');
	
    // Maak het <h4> element aan en geef een id
	var wonderLand = d.createElement('h4');
	wonderLand.setAttribute('id', 'land');

    // Maak het <div> element aan en geef een class en een id
	var dynamicPlaatje = d.createElement('div');
	dynamicPlaatje.setAttribute('class', 'dynamicPlaatje');
	dynamicPlaatje.setAttribute('id', 'wonderPlaatje');

    // Maak het <div> element aan en geef een class en een id
	var dynamicP = d.createElement('div');
	dynamicP.setAttribute('id', 'dynamicP');


	// Maak het <img> element aan en geef een width aan
	var dynamicPlaatjeImg = d.createElement('img');
	dynamicPlaatjeImg.setAttribute('width', '100%');
	
	// Maak het <p> element aan en geef een id aan
	var wonderOmschrijving = d.createElement('p');
	wonderOmschrijving.setAttribute('id', 'omschrijving');

	// sluitknop
	var btn = d.createElement('button');
	btn.id = 'close;'
	btn.textContent = 'Sluit';
	//console.log(btn);
		
	
	// appending
	popupContent.appendChild(dynamicText);
	dynamicText.appendChild(wonderNaam);
	dynamicText.appendChild(wonderCategorie);
	dynamicText.appendChild(wonderLand);

	popupContent.appendChild(dynamicPlaatje);
	dynamicPlaatje.appendChild(dynamicPlaatjeImg);

	popupContent.appendChild(dynamicP);
	dynamicP.appendChild(wonderOmschrijving);

	popupContent.appendChild(btn);
    

    /**
    * update de popup met alle info van het wereld wonder
    * 
    * @param {integer} wonderNr
    * 
    * @return {void}
    */
    function updateWonder(wonderNr) {
        var wonder = wonderen[wonderNr]; 
        console.log(wonder);
		wonderNaam.textContent = wonder.naam;
		wonderCategorie.textContent = wonder.categorie;
		wonderLand.textContent = wonder.land;
		wonderOmschrijving.innerHTML = wonder.omschrijving;
		dynamicPlaatjeImg.src = '../img/' + wonder.image;
		dynamicPlaatjeImg.alt = wonder.naam;		
    }

	var popupLinks = document.getElementsByClassName("popupLink");
		for (var i = 0; i < popupLinks.length; i++) {
    	    popupLinks[i].addEventListener("click", function(e) {
            e.preventDefault(); // Voorkom standaardgedrag van de link
            var popupNaam = this.getAttribute("data-popup"); // Haal de naam van de popup op
            openPopup(popupNaam); // Open de popup
    	    });
	    }
    
        
	// Functie om de popup te openen en de juiste inhoud te laden
    
	function openPopup(popupNaam) {
		if (!popupContent) return; // Stop als de popup niet bestaat
		popupContent.classList.add("show"); // Voeg een klasse toe om de popup te tonen
        overlay.classList.add('show');
		console.log(popupNaam);
		console.log(popupNaam.substring(5));
        updateWonder(popupNaam.substring(5));
	}

	btn.addEventListener('click', function() {
		// Verwijder de class .show van het pop-up en de overlay
		popupContent.classList.remove('show');
        overlay.classList.remove('show'); 
	});	

    overlay.addEventListener('click',function() {
        // Verwijder de class .show van het pop-up en de overlay
        overlay.classList.remove('show');
        popupContent.classList.remove('show');
    })
}

/* ===================== footer ======================*/

function initFooterNav(linkData) {
    var footer = d.querySelector('footer'); // Selecteer het footer-element
    if (!footer) {
        console.error("Footer niet gevonden");
        return;
    }

    // Code om navigatie aan de footer toe te voegen
    var nav = d.createElement('nav');
    var navUl = d.createElement('ul');
    nav.appendChild(navUl);

    // Voeg nav toe als het eerste kind van de footer
    var firstChild = footer.firstChild;
    footer.insertBefore(nav, firstChild);
    
    for (var i = 0; i < linkData.length; i++) {
        var linkItem = linkData[i];
        var li = d.createElement('li');
        var link = d.createElement('a');
        link.textContent = linkItem.text;
        link.href = linkItem.href;
        li.appendChild(link);
        navUl.appendChild(li);

        // Voeg de class "active" toe aan het <li> element op basis van de paginatitel
        if ((linkItem.text === 'Home' && document.title === 'Wereld wonderen') ||
            (linkItem.text === 'Modern' && document.title === 'Moderne wereld wonderen') ||
            (linkItem.text === 'Klassiek' && document.title === 'Klassieke wereld wonderen')) {
            li.classList.add('active');
        }
    }
}

/* 	==================== GSAP ==================== */
const redPins = d.querySelector('.pin_red');
const bluePins = d.querySelector('.pin_blue');
const mainSpan = d.querySelector('main span');
// dropping pins
if (redPins || bluePins) {
    gsap.from (['.pin_red', '.pin_blue'],{
        opacity: 0,
        duration: 0.5,
        y:-350, ease:'back.out(1)',
        stagger: 0.2
    });
}

// growing & flashing message
if (mainSpan) {
    gsap.from (' main span', {
        scale: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 1
    });
    gsap.fromTo ('main span', {
        opacity: 1},{
            opacity: 0.2,
            duration: 0.7,
            ease: 'power2.out',
            yoyo: true,
            repeat: -1,
            delay: 2.4
        }
    )
}
    