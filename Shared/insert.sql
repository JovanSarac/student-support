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

-- Umetanje događaja
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
    "IsArchived",
    "Price"
) VALUES
(
    -1,
    -2, -- UserId
    'Žurka svih fakulteta', -- Name
    'Pridružite se najvećoj žurci godine u Novom Sadu! **"Žurka svih fakulteta"** okuplja studente sa svih univerziteta u gradu i obećava nezaboravan provod. Ovaj jedinstveni događaj održaće se **11. avgusta 2024. godine** sa početkom u **21:00 čas**, na popularnoj lokaciji **Sutjeska 2**. Pripremite se za noć ispunjenu muzikom, plesom i neverovatnom atmosferom koja će vas držati na nogama do zore. 🎶💃🕺

Svi fakulteti će imati svoje predstavnike i tematske sekcije, stvarajući raznovrsno i živopisno okruženje. Bez obzira na to koji fakultet pohađate, ovo je prilika da se povežete sa kolegama, upoznate nove prijatelje i proslavite studentski život na najbolji mogući način. Lokacija događaja, **SPENS (Sportsko-poslovni centar Vojvodina)**, pruža savršenu infrastrukturu za ovakav spektakl, sa svim potrebnim sadržajima za vaš komfor i sigurnost. 🏫👩‍🎓👨‍🎓

Ne propustite da zabeležite ovaj datum u svom kalendaru i pridružite nam se na **"Žurci svih fakulteta"**. Ulaznice će biti dostupne u prodaji od **29. jula 2024. godine**. Posetite našu web stranicu za više informacija i osigurajte svoje mesto na najvažnijoj studentskoj žurci ove godine. Vidimo se na žurci! 🎟️🎊', -- Description
    '2024-08-11 21:00:00', -- DateEvent
    'Novi Sad, Sutjeska 2', -- Address
    45.24708428320105, -- Latitude
    19.845306397487615, -- Longitude
    6, -- EventType
    '2024-07-29 08:00:00', -- DatePublication
    'https://wallpapergod.com/images/hd/party-1920X1080-wallpaper-el1y1iwqocrfqpxt.jpeg', -- Image
    false, -- IsArchived
    NULL
),
(
    -2,
    -2, -- UserId
    'Kafa za poneti - svi zajedno za Danijelu', -- Name
    'Pridružite nam se na posebnom humanitarnom događaju **"Kafa za poneti - svi zajedno za Danijelu"** i pokažimo solidarnost i podršku. Ovaj događaj će se održati **22. avgusta 2024. godine** sa početkom u **18:30 časova** na adresi **Dr Zorana Đinđića 1, Novi Sad**. Svrha ovog okupljanja je da se zajedno okupimo i prikupimo sredstva za našu sugrađanku Danijelu, kojoj je potrebna pomoć. 🤝

Tokom događaja, moći ćete da uživate u ukusnoj kafi, zanimljivim razgovorima i toploj atmosferi, sve u cilju prikupljanja sredstava za Danijelino lečenje. Kafa za poneti biće dostupna za sve posetioce, a svi prilozi i donacije biće usmereni ka pomoći Danijeli. Pokažimo koliko zajednica može biti jaka kada se ujedinimo za dobar cilj. 💞

Ne propustite priliku da budete deo ovog plemenitog događaja. Vaše prisustvo i podrška znače mnogo, a svaki doprinos, bez obzira na veličinu, pravi razliku. Vidimo se **22. avgusta** da zajedno podignemo svest i podržimo Danijelu u njenoj borbi. Hvala vam unapred na vašem prisustvu i podršci! 🌟', -- Description
    '2024-08-22 18:30:00', -- DateEvent
    'Novi Sad, Dr Zorana Đinđića 1', -- Address
    45.24736, -- Latitude
    19.85415, -- Longitude
    4, -- EventType
    '2024-07-30 09:00:00', -- DatePublication
    'https://www.budihuman.rs/services/beneficiary-photo/1678/banner-2.png', -- Image
    false, -- IsArchived
    200
),
(
    -3,
    -2, -- UserId
    'Jubilarni 100. FTN-ov turnir u sahu', -- Name
    'Pozivamo vas na proslavu jednog veka tradicije i strategije na jubilarnom **100. FTN-ovom turniru u šahu**! Ovaj prestižni događaj održaće se **3. oktobra 2024. godine**, sa početkom u **09:00 časova**, na adresi **Sutjeska 2, Novi Sad**. Turnir okuplja šahiste svih nivoa, od amatera do profesionalaca, pružajući jedinstvenu priliku za testiranje vaših veština i taktika. 🏆

Tokom godina, FTN-ov šahovski turnir postao je simbol intelektualne izuzetnosti i sportske strasti. Na ovom jubilarnom turniru očekuju vas uzbudljive partije, izazovni protivnici i prilika da se upišete u istoriju šahovske zajednice. Lokacija događaja, **SPENS**, nudi sve potrebne uslove za komforno i fer takmičenje, sa modernim sadržajima i prijatnim ambijentom. 👑

Pridružite nam se u proslavi stogodišnjice i postanite deo ove nezaboravne manifestacije. Ulaznice i informacije o prijavi dostupne su od **31. jula 2024. godine**. Ne propustite priliku da budete deo ovog istorijskog događaja i da se borite za prestižni naslov šahovskog šampiona. Vidimo se na turniru! ♔♚', -- Description
    '2024-10-03 09:00:00', -- DateEvent
    'Novi Sad, Sutjeska 2', -- Address
    45.24708428320105, -- Latitude
    19.845306397487615, -- Longitude
    7, -- EventType
    '2024-07-31 10:00:00', -- DatePublication
    'https://i.pinimg.com/originals/86/14/08/86140851db16b958dfeb08d09e8d978d.jpg', -- Image
    false, -- IsArchived
    NULL
),
(
    -4,
    -2, -- UserId
    'Art&Science izlozba na otvorenom', -- Name
    'Dođite i uživajte u jedinstvenom spoju umetnosti i nauke na **"Art&Science" izložbi na otvorenom**! Ovaj inspirativni događaj će se održati **15. septembra 2024. godine**, sa početkom u **17:00 časova**, na prelepoj lokaciji **Beogradski kej bb, Novi Sad**. Pripremite se za nezaboravno iskustvo koje će vas provesti kroz čarobni svet kreativnosti i inovacija, predstavljajući radove umetnika i naučnika iz različitih oblasti. 🖼️🔭

Izložba će predstaviti impresivne instalacije, interaktivne eksponate i fascinantne prezentacije koje istražuju granice između umetnosti i nauke. Posetioci će imati priliku da se upoznaju sa najnovijim dostignućima u tehnologiji, dok istovremeno uživaju u vizuelno zapanjujućim umetničkim delima. Ovo je savršena prilika da provedete dan na otvorenom, upijajući znanje i inspiraciju iz oba sveta. 🌿🌟

Ne propustite ovaj jedinstveni događaj koji spaja znanje i kreativnost na jedinstven način. Ulaz na izložbu je besplatan, a događaj je arhiviran kao deo bogate kulturne ponude Novog Sada. Pridružite nam se na **Beogradskom keju** i postanite deo ove inspirativne priče koja slavi umetnost i nauku. Vidimo se na izložbi! 🧬✨', -- Description
    '2024-09-15 17:00:00', -- DateEvent
    'Novi Sad, Beogradski kej bb', -- Address
    45.23611174252278, -- Latitude
    19.84788801746328, -- Longitude
    5, -- EventType
    '2024-08-01 11:00:00', -- DatePublication
    'https://c4.wallpaperflare.com/wallpaper/556/382/458/fantasy-art-artwork-fan-art-science-fiction-wallpaper-preview.jpg', -- Image
    false, -- IsArchived
    NULL
),
(
    -5,
    -2, -- UserId
    'Apsolventska ekskurzija - Krstarenje 2025', -- Name
    'Pozivamo sve apsolvente da se pridruže **"Apsolventskoj ekskurziji - Krstarenje 2025"** i uživaju u nezaboravnom krstarenju! Ovaj događaj će se održati **10. maja 2025. godine**, sa početkom u **14:00 časova**, na polazištu **Bulevar Jaše Tomića 5, Novi Sad**. Krstarenje će vas odvesti kroz prelepe pejzaže i pružiti priliku za opuštanje i stvaranje uspomena sa vašim prijateljima i kolegama iz fakulteta. 🚢

Ekskurzija uključuje sve potrebne sadržaje za udobno putovanje, sa pratećim aktivnostima i sadržajem tokom krstarenja. Ovo je idealna prilika da provedete kvalitetno vreme na vodi, istražujući nove destinacije i uživajući u divnim pogledima. Takođe, biće organizovana zabava i različite aktivnosti koje će vam omogućiti da se opustite i zabavite tokom putovanja. 🌊🛳️

Ne propustite ovu jedinstvenu priliku da proslavite završetak studija i stvorite uspomene za ceo život. Ulaznice će biti dostupne od **2. avgusta 2024. godine**, a broj mesta je ograničen. Osigurajte svoje mesto na ovom ekskluzivnom krstarenju i pridružite nam se na nezaboravnom putovanju. Vidimo se na krstarenju! 🌅🎉', -- Description
    '2025-05-10 14:00:00', -- DateEvent
    'Novi Sad, Bulevar Jaše Tomića 5', -- Address
    45.266084520284444, -- Latitude
    19.829445206325744, -- Longitude
    8, -- EventType
    '2024-08-02 12:00:00', -- DatePublication
    'https://i.ytimg.com/vi/Rhm0fO2uqOs/maxresdefault.jpg', -- Image
    false, -- IsArchived
    45000
),
(
    -6,
    -2, -- UserId
    'Seminar o integraciji AI tehnologije u svakodnevni zivot', -- Name
    'Pridružite nam se na **seminaru o integraciji AI tehnologije u svakodnevni život** i saznajte kako veštačka inteligencija može unaprediti vaše svakodnevne aktivnosti i radne procese. Ovaj događaj će se održati **16. oktobra 2024. godine**, sa početkom u **13:00 časova**, na adresi **Dr Zorana Đinđića 1, Novi Sad**. Seminar će obuhvatiti najnovije tehnologije i primene AI, kao i pružiti uvid u budućnost ove oblasti. 🤖

Tokom seminara, vodiči i predavači će vam predstaviti različite aspekte AI tehnologije i kako se ona može integrisati u svakodnevni život. Ovaj događaj je prilika da se upoznate sa stručnjacima iz oblasti AI i da naučite kako koristiti ove tehnologije za poboljšanje svog ličnog i profesionalnog života. Ne propustite priliku da saznate više o ovom uzbudljivom polju i kako vam može koristiti. 📊🚀

Ulaz na seminar je besplatan, ali je obavezna prethodna prijava. Prijave i više informacija možete pronaći na našoj web stranici. Vidimo se na seminaru i spremni smo da istražimo budućnost zajedno! 💡🌐', -- Description
    '2024-10-16 13:00:00', -- DateEvent
    'Novi Sad, Dr Zorana Đinđića 1', -- Address
    45.24736, -- Latitude
    19.85415, -- Longitude
    0, -- EventType
    '2024-08-03 13:00:00', -- DatePublication
    'https://wallpapercave.com/wp/wp7544513.jpg', -- Image
    false, -- IsArchived
    NULL
),
(
    -7,
    -2, -- UserId
    'Startup radionica - pronadji poslovnog partnera', -- Name
    'Pozivamo sve preduzetnike na **"Startup radionicu - pronađi poslovnog partnera"** i iskoristite priliku za umrežavanje i pronalaženje partnera za vaše poslovne ideje. Ovaj događaj će se održati **7. novembra 2024. godine**, sa početkom u **19:00 časova**, na adresi **Fruskogorska 1, Novi Sad**. Radionica je dizajnirana da pomogne preduzetnicima u pronalaženju pravih kontakata i partnera koji mogu doprineti razvoju njihovih projekata. 🌟

Ovaj događaj pruža priliku za direktnu interakciju sa potencijalnim partnerima, investitorima i mentorima. Tokom radionice, biće organizovani različiti segmenti umrežavanja, uključujući kratke prezentacije, razmene iskustava i izlaganje poslovnih ideja. Ovo je odlična prilika da povežete svoju ideju sa pravim ljudima i otvorite vrata za nove poslovne mogućnosti. 🚀🤝

Ne propustite priliku da unapredite svoje poslovne kontakte i pronađete idealnog partnera za vaš startup. Ulaznice i prijave za radionicu dostupne su od **4. avgusta 2024. godine**. Pridružite nam se i napravite prvi korak ka uspehu. Vidimo se na radionici! 🎯📈', -- Description
    '2024-11-07 19:00:00', -- DateEvent
    'Novi Sad, Fruskogorska 1', -- Address
    45.24504807793493, -- Latitude
    19.847756787134188, -- Longitude
    1, -- EventType
    '2024-08-04 14:00:00', -- DatePublication
    'https://radiotivat.com/wp-content/uploads/2024/07/envifHR5-1920x1080.jpeg', -- Image
    false, -- IsArchived
    1000
);


