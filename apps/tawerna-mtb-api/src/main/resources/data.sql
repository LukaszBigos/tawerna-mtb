-- Clean up existing data to prevent primary key collisions on restart
TRUNCATE TABLE trails CASCADE;
TRUNCATE TABLE bike_parks CASCADE;

-- ==========================================
-- 1. INSERT BIKE PARKS (ID: 1-10)
-- ==========================================
INSERT INTO bike_parks (id, name, description, latitude, longitude, type, youtube_video_url, image_url, website_url)
VALUES 
(1, 'Bike Park Kasina', 'Najwiekszy park rowerowy w Malopolsce, zlokalizowany w Kasinie Wielkiej. Swietne trasy flow i sekcje zjazdowe.', 49.7145, 20.1660, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://bikeparkkasina.pl'),
(2, 'Szczyrk Enduro Trails by TREK', 'Kompleks jednokierunkowych sciezek w Szczyrku. Swietnie wyprofilowane trasy z ulatwieniami w postaci wyciagow.', 49.6961, 18.9907, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://szczyrkowski.pl'),
(3, 'Bike Park Kolo007', 'Kameralny park rowerowy na Dolnym Slasku z technologicznymi liniami jump i dh.', 50.8412, 15.5234, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://example.com'),
(4, 'Czarna Gora Bike Park', 'Ekstremalny park rowerowy na zboczach Czarnej Gory. Legendarny i bardzo wymagajacy pucharowy downhill.', 50.2561, 16.8124, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://czarnagora.pl'),
(5, 'Srebrna Gora Bike Park', 'Jeden z najlepszych kompleksow sciezek w Polsce pod opieka ekipy PM Bike Experts. Trasy enduro i kultowe OSy.', 50.5731, 16.6345, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://bikeparksrebrna.pl'),
(6, 'Bike Park Palenica', 'Park zlokalizowany w Szczawnicy, oferujacy strome, naturalne trasy techniczne oraz szybkie sekcje polne.', 49.4231, 20.4854, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://pkl.pl'),
(7, 'Bike Park Mosorny Gron', 'Zaszyty w Zawoi park rowerowy z widokiem na Babia Gore. Trasy strome, gliniaste i naszpikowane korzeniami.', 49.6241, 19.5632, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://pkl.pl'),
(8, 'Bike Park Kluszkowce', 'Zlokalizowany na Gorze Wdzar, znany z festiwali rowerowych i podloza pochodzenia wulkanicznego.', 49.4524, 20.2741, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://czorsztyn-ski.com.pl'),
(9, 'Bike Park Slotwiny Arena', 'Przyjazny park rowerowy w Krynicy-Zdroju, idealny do nauki skakania oraz szlifowania techniki flow.', 49.4312, 20.9324, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://slotwinyarena.pl'),
(10, 'Gora Zar Bike Park', 'Kolebka polskiego downhillu w Miedzybrodziu Zywieckim. Trasy szybkie, kamieniste z pieknym widokiem na jezioro.', 49.7821, 19.2234, 'BIKE_PARK', 'https://youtube.com', 'https://unsplash.com', 'https://pkl.pl');

-- ==========================================
-- 2. INSERT TRAIL CENTERS (ID: 11-20)
-- ==========================================
INSERT INTO bike_parks (id, name, description, latitude, longitude, type, youtube_video_url, image_url, website_url)
VALUES 
(11, 'Singletrack Glacensis', 'Najwieksza siec sciezke typu singletrack w Europie, łącząca kilkanascie petli na ziemi klodzkiej.', 50.4341, 16.8312, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://singletrackglacensis.eu'),
(12, 'Enduro Trails Bielsko-Biala', 'Mityczne sciezki na Koziej Gorze i Szyndzielni. Swietna infrastruktura i trasy o kazdym poziomie trudnosci.', 49.7824, 19.0215, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://endurotrails.pl'),
(13, 'Pasmo Rowerowe Olbrzymy', 'Sciezki w Karkonoszach u podnoza Chojnika. Bardzo techniczne, pelne wielkich kamieni i granitowych skal.', 50.8321, 15.6541, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://roweroweolbrzymy.pl'),
(14, 'Babia Gora Trails', 'Centrum sciezkowe w Zawoi. Swietnie przygotowane podjazdy oraz dynamiczne, bezpieczne single zjazdowe.', 49.6421, 19.5214, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://babiagoratrails.pl'),
(15, 'Single TrackK Szklarska Poreba', 'Izerskie sciezki naturalne idealne na rodzinne wycieczki oraz maratony MTB.', 50.8245, 15.5124, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://szklarskaporeba.pl'),
(16, 'Pasmo Chełmiec MTB', 'Trasy zlokalizowane w Walbrzychu wokol gory Chelmiec. Wyjatkowo strome podjazdy i kamieniste zjazdy.', 50.7812, 16.2145, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://walbrzych.pl'),
(17, 'Singletrack Dukla', 'Sciezki w Beskidzie Niskim. Dzika natura, gliniaste podloze i duzo naturalnych przeszkod terenowych.', 49.5541, 21.6812, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://dukla.pl'),
(18, 'Kaczawskie Single', 'Sciezki w Krainie Wygaslych Wulkanow na Dolnym Slasku. Bardzo plyna, dynamiczna jazda.', 51.0124, 15.9124, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://gorykaczawskie.pl'),
(19, 'Singletrack Swieradow-Zdroj', 'Polsko-czeski kompleks sciezek w Gorach Izerskich. Klasyka gatunku, gladkie single o malej dynamice spadku.', 50.9124, 15.3412, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://swieradowzdroj.pl'),
(20, 'Centrum Jeleniowska Singletracki', 'Sciezki w Górach Swietokrzyskich. Epickie, naturalne, bardzo kamieniste i wymagajace kondycyjnie.', 50.8412, 21.1214, 'TRAIL_CENTER', 'https://youtube.com', 'https://unsplash.com', 'https://jeleniowska.pl');

-- ==========================================
-- 3. INSERT MOUNTAIN TRAILS (ID: 21-30)
-- ==========================================
INSERT INTO bike_parks (id, name, description, latitude, longitude, type, youtube_video_url, image_url, website_url)
VALUES 
(21, 'Szlak na Turbacz', 'Tradycyjny, wymagajacy szlak gorski w Gorcach. Duze kamienie, bloto i spektakularne panoramy Tatr.', 49.5421, 20.1141, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://gorczanskipark.pl'),
(22, 'Masyw Snieznika Klasyk', 'Wysokogorska wyprawa na Snieznik. Trudny technicznie podjazd i wymagajacy, gruzowiskowy zjazd.', 50.2071, 16.8482, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://snieznik.pl'),
(23, 'Wokol Skrzycznego', 'Szlak grzbietowy w Beskidzie Slaskim. Duza ekspozycja, piekne widoki, podloze z luznych skal.', 49.6841, 19.0284, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://szczyrk.pl'),
(24, 'Pilsko Enduro Challenge', 'Trasa prowadzaca przez szlaki Pilska w Korbielowie. Bardzo stromo, duzo sekcji z korzeniami.', 49.5345, 19.3214, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://korbielow.pl'),
(25, 'Szlak Czerwony na Barania Gore', 'Klasyczny, beskidzki szlak enduro wzdluz zrodel Wisly. Kamienie wielkosci telewizorow.', 49.6124, 19.0112, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://wisla.pl'),
(26, 'Grzbietem Karkonoszy', 'Ograniczona strefa wyznaczona dla rowerow, zapierajaca dech w piersiach sceneria subalpejska.', 50.7812, 15.7412, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://kpnmab.pl'),
(27, 'Szlak na Mogielice', 'Wjazd na najwyzszy szczyt Beskidu Wyspowego. Duza stromizna i darmowy masaz rak na zjezdzie.', 49.6891, 20.2764, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://mszana-dolna.pl'),
(28, 'Wokol Chryszczatej', 'Bieszczadzki dziki szlak gorski. Bloto po osie, przeprawy przez potoki i kompletny brak zasiegu.', 49.3214, 22.1812, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://bieszczady.pl'),
(29, 'Gory Bialskie Wilderness', 'Jazda w najdzikszych rejonach Sudetow. Naturalne sciezki, mchy i brak cywilizacji.', 50.2541, 16.9812, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://stronie.pl'),
(30, 'Radziejowa Epic', 'Wymagajacy szlak w Beskidzie Sadeckim. Wysokie przewyzszenia i techniczna sekcja zjazdowa do Szczawnicy.', 49.4485, 20.6031, 'MOUNTAIN_TRAIL', 'https://youtube.com', 'https://unsplash.com', 'https://piwniczna.pl');

-- ==========================================

-- ==========================================
-- 4. INSERT TRAILS FOR LOCATIONS (ID: 1-30)
-- ==========================================
-- Kasina
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (1, 'Cooler', 2400, 'GREEN', 1);
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (2, 'B-Line', 2230, 'BLUE_FLOW', 1);
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (3, 'DH Cup', 1120, 'BLACK_DH', 1);
-- Szczyrk
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (4, 'Hip HopA Flow', 5600, 'BLUE_FLOW', 2);
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (5, 'Otik', 2850, 'BLUE_FLOW', 2);
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (6, 'Otesanek', 723, 'RED_TECH', 2);
-- Kolo007
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (7, 'Secret Line', 1500, 'RED_TECH', 3);
-- Czarna Gora
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (8, 'Milky Way', 3200, 'GREEN', 4);
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (9, 'Top Gun Downhill', 1800, 'BLACK_DH', 4);
-- Srebrna Gora
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (10, 'A-Line Red', 2100, 'RED_TECH', 5);
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (11, 'Red Line Flow', 3100, 'BLUE_FLOW', 5);
-- Palenica
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (12, 'Palenica DH', 1400, 'BLACK_DH', 6);
-- Mosorny
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (13, 'Mosorny Freeride', 1900, 'RED_TECH', 7);
-- Kluszkowce
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (14, 'Wzdzar Flow', 2000, 'BLUE_FLOW', 8);
-- Slotwiny
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (15, 'Sarenka', 4100, 'GREEN', 9);
-- Gora Zar
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (16, 'Easy Line', 2500, 'GREEN', 10);

-- Glacensis
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (17, 'Petla Klodzka', 12500, 'BLUE_FLOW', 11);
-- Bielsko
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (18, 'Twister', 4400, 'BLUE_FLOW', 12);
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (19, 'RocknRolla', 2200, 'RED_TECH', 12);
-- Olbrzymy
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (20, 'Doppler', 3800, 'RED_TECH', 13);
-- Babia Trails
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (21, 'Sokol', 2100, 'BLUE_FLOW', 14);
-- Szklarska
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (22, 'Izerski Klimat', 8900, 'GREEN', 15);
-- Chelmiec
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (23, 'Gwarek', 1900, 'RED_TECH', 16);
-- Dukla
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (24, 'Cergowa Trail', 4500, 'RED_TECH', 17);
-- Kaczawskie
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (25, 'Ostrzyca Single', 3200, 'BLUE_FLOW', 18);
-- Swieradow
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (26, 'Zajecznik', 6200, 'BLUE_FLOW', 19);
-- Jeleniowska
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (27, 'Dziki Poligon', 3400, 'BLACK_DH', 20);

-- Turbacz
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (28, 'Zolta Ryba', 5200, 'RED_TECH', 21);
-- Snieznik
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (29, 'Kamienny Zjazd', 4100, 'BLACK_DH', 22);
-- Skrzyczne
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (30, 'Szlak Malinowski', 6800, 'RED_TECH', 23);
-- Pilsko
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (31, 'Korzenie Korbielowa', 2900, 'BLACK_DH', 24);
-- Barania
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (32, 'Kamienisty Potok', 7400, 'BLACK_DH', 25);
-- Karkonosze
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (33, 'Granitowa Perz', 11500, 'RED_TECH', 26);
-- Mogielica
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (34, 'Stromy Grzbiet', 3800, 'RED_TECH', 27);
-- Chryszczata
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (35, 'Blotna Przeprawa', 8200, 'BLUE_FLOW', 28);
-- Bialskie
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (36, 'Gluszec Natural', 9400, 'GREEN', 29);
-- Radziejowa
INSERT INTO trails (id, name, length_in_meters, difficulty, location_id) VALUES (37, 'Wielki Rogacz Down', 6100, 'RED_TECH', 30);

-- ==========================================
-- 5. RESET DATABASE SEQUENCES
-- ==========================================
ALTER SEQUENCE bike_parks_id_seq RESTART WITH 31;
ALTER SEQUENCE trails_id_seq RESTART WITH 38;
