-- Umetanje korisnika
INSERT INTO stakeholders."Users" ("Id", "Username", "Password", "Role", "IsActive", "RegisterWithEmail")
VALUES
(-1, 'jovanj01', 'a', 1, TRUE, FALSE),
(-2, 'jovans01', 'a', 2, TRUE, FALSE);

-- Umetanje osoba
INSERT INTO stakeholders."People" ("Id", "UserId", "Name", "Surname", "Email", "ProfilePic", "RegistrationDate", "Address", "PhoneNumber", "BirthDate", "Biography")
VALUES
(-1, -1, 'Jovan', 'Jokic', 'jovanjokic555@gmail.com', NULL, '2024-07-29', NULL, NULL, NULL, ''),
(-2, -2, 'Jovan', 'Sarac', 'saksa99saksa99@gmail.com', NULL, '2024-07-29', NULL, NULL, NULL, '');

INSERT INTO events."Events" (
    "Id",
	"UserId",
    "Name",
    "Description",
    "DateEvent",
    "Address",
    "Latitude",
    "Longitude",
    "EventType",
    "DatePublication",
    "Image",
    "IsArchived"
) VALUES
(
	-1,
    -2, -- UserId
    'Žurka svih fakulteta', -- Name
    'Pridružite se najvećoj žurci godine u Novom Sadu! "Žurka svih fakulteta" okuplja studente sa svih univerziteta u gradu i obećava nezaboravan provod. Ovaj jedinstveni događaj održaće se 11. avgusta 2024. godine sa početkom u 21:00 čas, na popularnoj lokaciji Sutjeska 2. Pripremite se za noć ispunjenu muzikom, plesom i neverovatnom atmosferom koja će vas držati na nogama do zore. 🎶💃🕺

	Svi fakulteti će imati svoje predstavnike i tematske sekcije, stvarajući raznovrsno i živopisno okruženje. Bez obzira na to koji fakultet pohađate, ovo je prilika da se povežete sa kolegama, upoznate nove prijatelje i proslavite studentski život na najbolji mogući način. Lokacija događaja, SPENS (Sportsko-poslovni centar Vojvodina), pruža savršenu infrastrukturu za ovakav spektakl, sa svim potrebnim sadržajima za vaš komfor i sigurnost. 🏫👩‍🎓👨‍🎓

	Ne propustite da zabeležite ovaj datum u svom kalendaru i pridružite nam se na "Žurci svih fakulteta". Ulaznice će biti dostupne u prodaji od 29. jula 2024. godine. Posetite našu web stranicu za više informacija i osigurajte svoje mesto na najvažnijoj studentskoj žurci ove godine. Vidimo se na žurci! 🎟️🎊', -- Description
    '2024-08-11 21:00:00', -- DateEvent (YYYY-MM-DD HH:MM:SS format)
    'Novi Sad, Sutjeska 2', -- Address
    45.24708428320105, -- Latitude
    19.845306397487615, -- Longitude
    6, -- EventType (assuming 1 is a valid enum value)
    '2024-07-29 08:00:00', -- DatePublication (YYYY-MM-DD HH:MM:SS format)
    'https://wallpapergod.com/images/hd/party-1920X1080-wallpaper-el1y1iwqocrfqpxt.jpeg', -- Image
    false -- IsArchived
),
(
	-2,
    -2, -- UserId
    'Kafa za poneti - svi zajedno za Danijelu', -- Name
    'Pridružite nam se na posebnom humanitarnom događaju "Kafa za poneti - svi zajedno za Danijelu" i pokažimo solidarnost i podršku. Ovaj događaj će se održati 22. avgusta 2024. godine sa početkom u 18:30 časova na adresi Dr Zorana Đinđića 1, Novi Sad. Svrha ovog okupljanja je da se zajedno okupimo i prikupimo sredstva za našu sugrađanku Danijelu, kojoj je potrebna pomoć. 🤝

	Tokom događaja, moći ćete da uživate u ukusnoj kafi, zanimljivim razgovorima i toploj atmosferi, sve u cilju prikupljanja sredstava za Danijelino lečenje. Kafa za poneti biće dostupna za sve posetioce, a svi prilozi i donacije biće usmereni ka pomoći Danijeli. Pokažimo koliko zajednica može biti jaka kada se ujedinimo za dobar cilj. 💞

	Ne propustite priliku da budete deo ovog plemenitog događaja. Vaše prisustvo i podrška znače mnogo, a svaki doprinos, bez obzira na veličinu, pravi razliku. Vidimo se 22. avgusta da zajedno podignemo svest i podržimo Danijelu u njenoj borbi. Hvala vam unapred na vašem prisustvu i podršci! 🌟', -- Description
    '2024-08-22 18:30:00', -- DateEvent
    'Novi Sad, Dr Zorana Đinđića 1', -- Address
    45.24736, -- Latitude
    19.85415, -- Longitude
    4, -- EventType
    '2024-07-30 09:00:00', -- DatePublication
    'https://www.budihuman.rs/services/beneficiary-photo/1678/banner-2.png', -- Image
    false -- IsArchived
),
(
	-3,
    -2, -- UserId
    'Jubilarni 100. FTN-ov turnir u sahu', -- Name
    'Pozivamo vas na proslavu jednog veka tradicije i strategije na jubilarnom 100. FTN-ovom turniru u šahu! Ovaj prestižni događaj održaće se 3. oktobra 2024. godine, sa početkom u 09:00 časova, na adresi Sutjeska 2, Novi Sad. Turnir okuplja šahiste svih nivoa, od amatera do profesionalaca, pružajući jedinstvenu priliku za testiranje vaših veština i taktika. 🏆

	Tokom godina, FTN-ov šahovski turnir postao je simbol intelektualne izuzetnosti i sportske strasti. Na ovom jubilarnom turniru očekuju vas uzbudljive partije, izazovni protivnici i prilika da se upišete u istoriju šahovske zajednice. Lokacija događaja, SPENS, nudi sve potrebne uslove za komforno i fer takmičenje, sa modernim sadržajima i prijatnim ambijentom. 👑

	Pridružite nam se u proslavi stogodišnjice i postanite deo ove nezaboravne manifestacije. Ulaznice i informacije o prijavi dostupne su od 31. jula 2024. godine. Ne propustite priliku da budete deo ovog istorijskog događaja i da se borite za prestižni naslov šahovskog šampiona. Vidimo se na turniru! ♔♚', -- Description
    '2024-10-03 09:00:00', -- DateEvent
    'Novi Sad, Sutjeska 2', -- Address
    45.24708428320105, -- Latitude
    19.845306397487615, -- Longitude
    7, -- EventType
    '2024-07-31 10:00:00', -- DatePublication
    'https://i.pinimg.com/originals/86/14/08/86140851db16b958dfeb08d09e8d978d.jpg', -- Image
    false -- IsArchived
),
(
	-4,
    -2, -- UserId
    'Art&Science izlozba na otvorenom', -- Name
    'Dođite i uživajte u jedinstvenom spoju umetnosti i nauke na "Art&Science" izložbi na otvorenom! Ovaj inspirativni događaj će se održati 15. septembra 2024. godine, sa početkom u 17:00 časova, na prelepoj lokaciji Beogradski kej bb, Novi Sad. Pripremite se za nezaboravno iskustvo koje će vas provesti kroz čarobni svet kreativnosti i inovacija, predstavljajući radove umetnika i naučnika iz različitih oblasti. 🖼️🔭

	Izložba će predstaviti impresivne instalacije, interaktivne eksponate i fascinantne prezentacije koje istražuju granice između umetnosti i nauke. Posetioci će imati priliku da se upoznaju sa najnovijim dostignućima u tehnologiji, dok istovremeno uživaju u vizuelno zapanjujućim umetničkim delima. Ovo je savršena prilika da provedete dan na otvorenom, upijajući znanje i inspiraciju iz oba sveta. 🌿🌟

	Ne propustite ovaj jedinstveni događaj koji spaja znanje i kreativnost na jedinstven način. Ulaz na izložbu je besplatan, a događaj je arhiviran kao deo bogate kulturne ponude Novog Sada. Pridružite nam se na Beogradskom keju i postanite deo ove inspirativne priče koja slavi umetnost i nauku. Vidimo se na izložbi! 🧬✨', -- Description
    '2024-09-15 17:00:00', -- DateEvent
    'Novi Sad, Beogradski kej bb', -- Address
    45.23611174252278, -- Latitude
    19.84788801746328, -- Longitude
    5, -- EventType
    '2024-08-01 11:00:00', -- DatePublication
    'https://c4.wallpaperflare.com/wallpaper/556/382/458/fantasy-art-artwork-fan-art-science-fiction-wallpaper-preview.jpg', -- Image
    false -- IsArchived
),
(
	-5,
    -2, -- UserId
    'Apsolventska ekskurzija - Krstarenje 2025', -- Name
    'Pozivamo sve apsolvente na nezaboravno krstarenje 2025. godine! "Apsolventska ekskurzija - Krstarenje 2025" biće održana 10. maja 2025. godine, sa početkom u 14:00 časova, sa polazišta na Bulevaru Jaše Tomića 5, Novi Sad. Pripremite se za uzbudljivo putovanje koje će vam pružiti priliku da se opustite, zabavite i uživate u prelepim pejzažima dok se krećemo prema destinacijama koje ćemo otkriti zajedno. 🌊🚤

	Ova ekskurzija je savršena prilika za stvaranje nezaboravnih uspomena sa svojim prijateljima i kolegama iz studentskih dana. Tokom krstarenja, uživaćete u bogatom programu koji uključuje zabavne aktivnosti, društvene igre, i mogućnost da se opustite na otvorenom. Bez obzira na to šta vas zanima, ovo putovanje će vam pružiti priliku da se opustite i uživate u svakom trenutku. 🌞🍹

	Ne zaboravite da rezervišete svoje mesto na vreme i pridružite nam se na ovom posebnom događaju. Ulaznice će biti dostupne od 2. avgusta 2024. godine, a više informacija možete pronaći na našoj web stranici. Pripremite se za avanturu i neka "Apsolventska ekskurzija - Krstarenje 2025" bude vrhunac vašeg studentskog života! Vidimo se na brodu! 🛳️🎉', -- Description
    '2025-05-10 14:00:00', -- DateEvent
    'Novi Sad, Bulevar Jaše Tomića 5', -- Address
    45.266084520284444, -- Latitude
    19.829445206325744, -- Longitude
    8, -- EventType
    '2024-08-02 12:00:00', -- DatePublication
    'https://i.ytimg.com/vi/Rhm0fO2uqOs/maxresdefault.jpg', -- Image
    false -- IsArchived
),
(
	-6,
    -2, -- UserId
    'Seminar o integraciji AI tehnologije u svakodnevni zivot', -- Name
    'Pozivamo vas na seminar koji će otkriti kako veštačka inteligencija može unaprediti naš svakodnevni život! "Seminar o integraciji AI tehnologije u svakodnevni život" biće održan 16. oktobra 2024. godine, sa početkom u 13:00 časova, na adresi Dr Zorana Đinđića 1, Novi Sad. Ovaj seminar pruža priliku da saznate više o najnovijim dostignućima u oblasti veštačke inteligencije i kako ih možete primeniti u svakodnevnim aktivnostima. 🧠💡

	Tokom seminara, stručnjaci iz oblasti AI tehnologije će predstaviti inovativne pristupe i rešenja koja mogu poboljšati efikasnost i kvalitet vašeg života. Biće organizovane prezentacije i interaktivne sesije koje će vam omogućiti da postavite pitanja i dobijete odgovore direktno od eksperata. Ovaj događaj je idealan za sve koji žele da se upoznaju sa najnovijim trendovima i tehnologijama u oblasti veštačke inteligencije. 📊🔍

	Ne propustite priliku da učestvujete u ovom informativnom i inspirativnom seminaru. Ulaz na događaj je besplatan, ali se preporučuje da se prijavite unapred kako biste obezbedili svoje mesto. Posetite našu web stranicu za više informacija i prijavu. Vidimo se 16. oktobra i zajedno istražimo budućnost tehnologije! 🌐✨', -- Description
    '2024-10-16 13:00:00', -- DateEvent
    'Novi Sad, Dr Zorana Đinđića 1', -- Address
    45.24736, -- Latitude
    19.85415, -- Longitude
    0, -- EventType
    '2024-08-03 13:00:00', -- DatePublication
    'https://wallpapercave.com/wp/wp7544513.jpg', -- Image
    false -- IsArchived
),
(
	-7,
    -2, -- UserId
    'Startup radionica - pronadji poslovnog partnera', -- Name
    'Pozivamo sve preduzetnike i startup entuzijaste na "Startup radionicu - pronađi poslovnog partnera"! Ovaj ključni događaj održaće se 7. novembra 2024. godine sa početkom u 19:00 časova, na adresi Bulevar vojvode Stepe 50, Novi Sad. Radionica je dizajnirana da vam pomogne da pronađete savršene poslovne partnere i proširite svoju mrežu kontakata. 🤝🌟

	Tokom radionice, imaćete priliku da učestvujete u različitim aktivnostima i vežbama koje su usmerene na povezivanje preduzetnika i traženje sinergija među različitim poslovnim idejama. Biće organizovane sesije za umrežavanje, prezentacije i grupni rad, koji će vam pomoći da identifikujete potencijalne partnere i saradnike. Ovaj događaj je savršena prilika da se povežete sa istomišljenicima i proširite svoje poslovne horizonte. 📈✨

	Ne propustite ovu priliku da unapredite svoje poslovanje i pronađete idealne partnere za vaš startup. Prijavite se na vreme i obezbedite svoje mesto na radionici. Više informacija o prijavi i događaju možete pronaći na našoj web stranici. Vidimo se 7. novembra i zajedno stvarajmo uspešne poslovne priče! 🚀💼', -- Description
    '2024-11-07 19:00:00', -- DateEvent
    'Novi Sad, Fruskogorska 1', -- Address
    45.24504807793493, -- Latitude
    19.847756787134188, -- Longitude
    1, -- EventType
    '2024-08-04 14:00:00', -- DatePublication
    'https://radiotivat.com/wp-content/uploads/2024/07/envifHR5-1920x1080.jpeg', -- Image
    false -- IsArchived
);

