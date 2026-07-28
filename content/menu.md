# La Meridiana - content/menu.md
# Transcribed from the client's current menu files:
#   - updated_menu.pdf              -> A la carte (Antipasti, Primi, Secondi, Bambini, Contorni)
#   - La_Meridiana_Menu_V3.pdf      -> La Cantina (Bianchi, Champagne/Prosecco, Rosato, Rossi, Pregiati)
#   - Sicilian_brunch_Meridiana.pdf -> Sicilian Brunch (every day, 10am to 4pm)
#   - NewDessertMenuOct2024.pdf     -> I Dolci (+ after-dinner)
#   - AUGUSTMeridianaTakeawayMenu.pdf -> Takeaway
# Wine uses three columns: g175 / g250 / bottle (blank = not offered by that measure).
# Champagne is served by 125ml (shown in the first glass column) and bottle.
# Each file drives its own tab, built by scripts/build-menu.py.

# MENU: À la carte

## SECTION: Antipasti
note: starters

- name: Arancini
  desc: Two fried rice balls filled with mozzarella cheese & minced beef on a bed of tomato sauce
  price: 9.95

- name: Burrata
  desc: Creamy burrata served with heirloom tomatoes, rocket & balsamic glaze
  price: 14.00

- name: Bruschetta con Bocconcini
  tags: V
  desc: Homemade bread topped with marinated fresh tomato, red onions, basil, garlic and mozzarella
  price: 8.50

- name: Avocado e Granchio
  desc: Smashed avocado topped with crab meat, citrus dressing & micro greens
  price: 13.95

- name: Melanzana alla Parmigiana
  tags: V
  desc: Baked eggplant with San Marzano tomato sauce, basil & smoked mozzarella
  price: 9.50

- name: Fritto Misto
  desc: Fresh crispy fried squid, prawns, little octopus, courgettes and carrots served with aioli
  price: 16.50

- name: Gamberoni Aglio e Peperoncino
  desc: Pan-fried shell-off king prawns cooked with garlic, butter, fresh chilli, white wine sauce & served with homemade focaccia
  price: 15.50

- name: Carpaccio di Manzo
  desc: Thin slices of raw beef fillet with rocket, Parmesan shavings, drizzled with lemon juice
  price: 15.50

- name: San Daniele Parma Ham with Fresh Melon
  desc: Delicate slices of premium Parma ham served with sweet, juicy fresh melon
  price: 14.50

- name: Platter di Salumi e Formaggi
  desc: A generous sharing platter of selected Italian cured meats and four varieties of cheese, with garnishes for picking and sharing, for two or four
  price: 23.95 / 39.95

## SECTION: Primi
note: pasta & risotto

- name: Gnocchi al Filetto
  desc: Homemade gnocchi with fillet steak strips, garlic, cherry tomatoes, mushrooms, parmesan & truffle oil
  price: 22.95

- name: Tagliatelle Aragosta e Polpa di Granchio
  desc: Tagliatelle pasta with lobster and crab meat, cherry tomatoes, garlic and chilli
  price: 32.50

- name: Risotto al Tartufo
  tags: V
  desc: Arborio rice with mushrooms & truffle sauce
  price: 19.50

- name: Risotto Barbabietola e Burrata
  tags: V
  desc: Beetroot creamy risotto with garlic and topped with burrata cheese
  price: 21.50

- name: Tagliatelle Ragù di Pesce
  desc: Fresh tagliatelle pasta with sea bass, salmon, prawns and mussels in a rich tomato sauce
  price: 24.50

- name: Spaghetti Bolognese
  desc: Classic beef ragù with spaghetti
  price: 16.00

- name: Spaghetti Carbonara
  desc: Traditional Roman recipe with egg yolks, guanciale & Pecorino Romano cheese
  price: 16.00

- name: Lasagna e Cannelloni
  desc: Lasagne or Cannelloni filled with ricotta, beef, mozzarella and served in a pine nut sauce
  price: 16.50

- name: Paccheri Gamberoni
  desc: Paccheri pasta with king prawns, garlic, cherry tomatoes, white wine, olive oil and chilli
  price: 21.50

- name: Paccheri alla Norma
  tags: V
  desc: Paccheri pasta with tomato sauce, fried eggplant & salted ricotta
  price: 17.50

- name: Penne Arrabbiata
  tags: V
  desc: Penne pasta tossed in a rich tomato sauce with garlic and chilli
  price: 16.00

## SECTION: Secondi
note: meat & fish

- name: Saltimbocca alla Romana
  desc: Veal Scaloppine layered with prosciutto and fresh sage, pan-seared in butter & served with roasted potatoes
  price: 24.00

- name: Vitello alla Marsala
  desc: Veal cooked with mixed mushrooms, Marsala wine & a touch of cream, served with roast potatoes
  price: 25.00

- name: Pollo Tricolore
  desc: Grilled chicken breast topped with mozzarella cheese & tomato sauce, served with green beans & roast potatoes
  price: 18.00

- name: Pollo Principessa
  desc: Chicken breast with mushrooms, asparagus & cream sauce, served with roasted potatoes
  price: 21.00

- name: Medaglione al Pepe Nero
  desc: Grilled fillet medallion with black pepper sauce and roast vegetables
  price: 29.00

- name: Salmone al Mascarpone
  desc: Grilled salmon with creamy mashed potatoes, green beans & mascarpone-orange sauce
  price: 24.00

- name: Fegato alla Veneziana
  desc: Venetian-style calf liver with onions & red wine sauce, served with mashed potatoes
  price: 24.00

- name: Filetto al Dolcelatte
  desc: Grilled fillet steak topped with melted Gorgonzola cheese, served with chips (recommended with peppercorn or red wine sauce)
  price: 35.00

## SECTION: Bambini
note: kids

- name: Pasta
  desc: Spaghetti or penne pasta with a choice of sauce: tomato, carbonara or Bolognese
  price: 8.00

- name: Chicken Goujon
  desc: Crispy breaded chicken breast strips with chips
  price: 8.00

- name: 8" Pizza Margherita
  tags: V
  desc: Classic tomato sauce & mozzarella
  price: 8.00

## SECTION: Contorni
note: sides

- name: Rocket & Parmesan Cheese
  price: 5.50
- name: Spinach, Garlic & Chilli
  price: 5.50
- name: Tomato & Red Onion Salad
  price: 4.50
- name: Sautéed Mushrooms
  price: 4.50
- name: French Beans
  price: 5.00
- name: Asparagus
  price: 9.00
- name: Green Salad
  price: 4.50
- name: Patatine Fritte (Chips)
  price: 3.50
- name: Broccoli
  price: 4.50
- name: Bowl of Mixed Olives
  price: 4.50

# MENU: La Cantina

## SECTION: Vini Bianchi
note: white wines · 175ml / 250ml / bottle

- name: House Wine, Trebbiano
  from: Sicily · dry & fruity with a delicate bouquet
  g175: 7.50
  g250: 9.50
  bottle: 27.00
- name: Pinot Grigio Abbazia di Novacella
  from: Italy · refreshing ripe tropical fruit flavours of melon & mango
  g175: 8.50
  g250: 11.00
  bottle: 33.00
- name: Sauvignon Blanc Seriade
  from: Italy · notes of lime & lemon with floral nuances, honey & brioche
  g175: 9.00
  g250: 12.00
  bottle: 34.00
- name: Bolla Soave Classico
  from: Italy · herbs, spice, grapefruit, passion fruit, white florals & almonds
  g175: 7.50
  g250: 9.50
  bottle: 29.00
- name: Inzolia Le Rovole
  from: Italy · soft citrus, white peach and gentle floral notes
  g175: 8.00
  g250: 10.00
  bottle: 30.00
- name: Grillo Villa Carumè Organic
  from: Italy · fresh, sun-lit Sicilian white with vibrant citrus, ripe pear & subtle tropical notes
  bottle: 30.00
- name: Gavi di Gavi Marchesi di Barolo
  from: Italy · delicate, fresh & dry on the palate
  g175: 13.00
  g250: 16.00
  bottle: 45.00
- name: Chardonnay Colle Corviano
  from: Sicily · mineral nose, yellow apples, ripe exotic fruits, lemony notes & ginger
  g175: 7.50
  g250: 9.50
  bottle: 33.00
- name: Sauvignon Blanc Mirror Lake Marlborough
  from: New Zealand · very crisp & aromatic, grapefruit, tropical fruit & cut grass
  bottle: 35.00
- name: Vermentino di Sardegna 'Laragosta'
  from: Italy · tropical fruits with hints of sage & tomato leaf
  bottle: 35.00

## SECTION: Champagne & Prosecco
note: 125ml / bottle

- name: Villa Sandi Prosecco Rosé
  from: Italy
  bottle: 35.00
- name: House Champagne
  g175: 12.00
  bottle: 59.00
- name: Bollinger Special Cuvée NV (France 12%)
  from: France · vibrant and inviting, refreshing with notes of apple & brioche
  bottle: 75.00
- name: Bollinger Special Cuvée Rosé NV
  from: France · only Pinot Noir from grand cru villages, delicious raspberry & redcurrant flavours
  bottle: 140.00
- name: Champagne Dom Pérignon Vintage 2012 (France 12.5%)
  from: France · full and varied, flowers mingling with fruit, the vegetal with the mineral
  bottle: 350.00
- name: Villa Sandi Prosecco DOC Treviso Brut
  from: Italy
  g175: 7.50
  bottle: 34.00

## SECTION: Vini Rosato
note: rosé wines · 175ml / 250ml / bottle

- name: Pinot Grigio Blush Nao Nis
  from: Italy · delicate & fruity, fresh redcurrants, dry & good consistency
  g175: 9.50
  g250: 11.50
  bottle: 33.00
- name: Scaia Rosato Veneto
  from: Italy · soft rose scent, intense flavour of cedar, grapefruit & raspberry
  bottle: 35.00

## SECTION: Vini Rossi
note: red wines · 175ml / 250ml / bottle

- name: House Wine, Sangiovese
  from: Italy · slightly ruby, musky earthy cherries with hints of wood & spice
  g175: 7.50
  g250: 9.50
  bottle: 27.00
- name: Montepulciano d'Abruzzo Colle Corviano (VE)
  from: Italy · aromas of oregano, pepper, tobacco & black fruits
  g175: 9.50
  g250: 11.50
  bottle: 33.00
- name: Merlot Seriade
  from: Italy · bright, lively ruby red, vinous bouquet with fruity notes
  g175: 8.50
  g250: 10.00
  bottle: 34.00
- name: Nero d'Avola Organic
  from: Italy · lightly oaked, packed with spice & liquorice, dense & chewy
  g175: 8.00
  g250: 10.00
  bottle: 30.00
- name: Valpolicella Ripasso Monte Garbi
  from: Italy · ruby red, red fruit & cherry, soft, fresh & savoury with a spicy finish
  g175: 9.50
  g250: 12.50
  bottle: 39.00
- name: Chianti Classico Riserva Fanatico DOCG
  from: Italy · intense ruby, wild berries & cherries with floral notes of violet
  bottle: 49.00
- name: Malbec
  from: Argentina · ripe red fruits, black pepper & violets, with vanilla & spices
  bottle: 45.00
- name: Primitivo di Manduria
  from: Italy · rich and opulent, ripe cherries & plums with cocoa & vanilla
  bottle: 39.00
- name: Negroamaro San Patrime
  from: Italy · red and black berry fruits, dark spices & woody notes
  bottle: 35.00
- name: Marchesi di Barolo DOCG
  from: Italy · spices & flowers on the nose, full bodied, velvety with sweet tannins
  bottle: 75.00
- name: Amarone della Valpolicella Tenuta Sant'Antonio DOCG
  from: Italy · well balanced, fat tannins, soft, warm, savoury, elegant & fresh
  bottle: 89.00

## SECTION: Vini Pregiati
note: fine wines · bottle only

- name: Cervaro della Sala 2022
  from: Italy · Chardonnay with hints of oak, vanilla & citrus minerals
  bottle: 140.00
- name: Tenuta degli Dei Roberto Cavalli 2009
  from: Italy · rich & balanced, berry, chocolate & vanilla, full body with a juicy finish
  bottle: 260.00
- name: Beaune 1er Cru Domaine 'Les Toussaints' René Monnier 2011
  from: France · cherry red, earthy & red fruit aromas, round with elegant tannins
  bottle: 150.00
- name: Barbaresco Cascina Morassino 2018 DOCG
  from: Italy · red fruits, floral notes & spices, medium to full bodied with silky tannins
  bottle: 85.00
- name: Brunello di Montalcino Gianni Brunelli 2015 DOCG
  from: Italy · herbs, aromatic spices & cherries, soft & harmonic, full bodied & velvety
  bottle: 190.00
- name: Tignanello IGT Antinori 2015
  from: Italy · violets, bramble & rosemary, very dense with deep tannins & great depth
  bottle: 350.00
- name: Barolo Cerequio Michele Chiarlo 2006 DOCG
  from: Italy · ripe fruit, mint, gentian roots & spices, rich body with delicate tannins
  bottle: 160.00
- name: Chateau Pichon Baron 2007
  from: France · fresh red fruit & blackberry, long-lasting with dense, precise tannins
  bottle: 240.00
- name: Chateau Leoville Barton Saint Julien 2014
  from: France · Cabernet & Merlot, deep ruby with cassis & cedar
  bottle: 180.00
- name: Bolgheri Sassicaia 2017
  from: Italy · black fruit & spices, silky, medium to high tannins
  bottle: 500.00
- name: Barbaresco Gaja 2017
  from: Italy · forest fruits, plums, liquorice, mineral & coffee, dense & full bodied
  bottle: 360.00
- name: Tignanello IGT Antinori 2008
  from: Italy · chocolate, black cherry & spice in a lush, soft texture, velvety & very long
  bottle: 650.00

# MENU: I Dolci

## SECTION: Dolci
note: made here, finished at the table

- name: Panna Cotta
  tags: GF
  desc: Homemade creamy dessert with sugar, gelatine & vanilla pods, topped with a fruit coulis
  price: 7.00
- name: Profiterolo
  tags:
  desc: Soft choux pastries filled with chantilly cream, covered with chocolate cream
  price: 7.50
- name: Cannolo Siciliano
  tags:
  desc: Crispy tube-shaped shell of fried dough, filled with sweet ricotta with a hint of citrus zest & chopped pistachios
  price: 8.50
- name: Affogato
  tags:
  desc: Double espresso, amaretto liqueur & vanilla ice cream
  price: 8.50
- name: Pistachioso
  tags:
  desc: Homemade signature dessert: ladyfinger, mascarpone cheese, biscuits, liqueur & Italian pistachio cream
  price: 8.50
- name: Tiramisù della Casa
  tags:
  desc: Homemade classic tiramisu with mascarpone cream, rum, coffee & Disaronno almond liqueur
  price: 7.00
- name: Sgroppino
  tags:
  desc: Italian cocktail made with Prosecco, vodka, a scoop of lemon sorbet & mint
  price: 9.00
- name: Gelato Artigianale
  tags:
  desc: 2 or 3 scoops of homemade Italian ice cream: vanilla, chocolate, strawberry, salted caramel, pistachio
  price: 7.00 / 9.00
- name: Sorbetto
  tags: VE, GF
  desc: 2 or 3 scoops of sorbet: lemon or mango
  price: 7.00 / 9.00
- name: Dessert of the Day
  tags:
  desc: Ask your waiter for the special dessert of the day
  price: 8.50

## SECTION: After Dinner
note: cocktails

- name: Espresso Martini
  tags:
  desc: Vodka, Tia Maria, vanilla syrup & espresso
  price: 10.00
- name: Il Capitano
  tags:
  desc: Kalua, Baileys, Captain Morgan, cream & vanilla ice cream
  price: 10.00
- name: Il Siciliano
  tags:
  desc: Jack Daniels whiskey, coffee, vanilla ice cream & amaretto liqueur
  price: 10.00

# NOTE: Sweet wines (Passito di Pantelleria, Vin Santo del Chianti, Picolit Collio
# Castelcosa, Port, Vintage Port 2013) and the full coffee & tea list are on the
# dessert menu but their glass/bottle price mapping is ambiguous in the source -
# left off pending client confirmation (see TODO.md).

# MENU: Sicilian Brunch

## SECTION: Menu Offer
note: every day, 10am to 4pm · a Sicilian sharing table, served as trios

## SECTION: Cicchetti
note: small plates

- name: Tris Arancini
  desc: Meat and peas · ham and cheese · spinach and cheese
  price: 15.95
- name: Tris Bruschetta
  desc: Classic · guacamole and mozzarella · mushrooms
  price: 12.95
- name: Tricolore Salad
  desc: Avocado, mozzarella and tomato
  price: 11.95
- name: Tris Caponata, Crocchette & Spice Polpette
  price: 15.95

## SECTION: Pizza & Bread

- name: Tris Pizza 9"
  desc: Piccante · ham & cheese · vegetarian
  price: 17.95
- name: Tris Focaccia
  desc: Mozzarella · cherry tomatoes · mushrooms
  price: 11.95
- name: Tris Bread
  desc: Crusty bread · pane e olive · grissini
  price: 4.95

## SECTION: Fish & Meat
note: each trio served with vegetables and potatoes

- name: Tris di Carne
  desc: Entrecôte · veal Milanese · fillet steak
  price: 29.95
- name: Tris di Pesce
  desc: Sea bass · salmon · squid
  price: 31.95
- name: Tris di Pollo
  desc: Valdostana · tricolore · Milanese
  price: 24.95

## SECTION: Pasta & Risotto

- name: Tris Lasagna
  desc: Classic · 4 formaggi & veg · Norma
  price: 25.95
- name: Tris Gnocchi
  desc: Sorrentina · 4 formaggi · courgettes and prawns
  price: 24.95
- name: Tris Pasta
  desc: Cacio e pepe · Amatriciana · Norma
  price: 23.95
- name: Tris Risotto
  desc: Parmesan & saffron · vegetarian · crab & prawns
  price: 25.95

## SECTION: Tris Sides

- name: Tris Vegetable
  desc: Asparagus · spinach · broccoli
  price: 6.95
- name: Tris Salad
  desc: Rocket · lettuce · riccia
  price: 5.95
- name: Tris Tomato & Onion
  desc: Cherry tomatoes · big tomatoes · concassé
  price: 4.95

## SECTION: Tris Desserts

- name: Tris Cake
  desc: Tiramisù · profiteroles · panna cotta
  price: 13.95
- name: Tris Gelato
  desc: Pistachio · chocolate · nocciola
  price: 5.95

## SECTION: Tris Drinks

- name: Tris Cocktails
  desc: Your choice of any three cocktails
  price: 24.95
- name: Tris Drinks
  desc: House wine · Aperol Spritz · Limoncello Spritz
  price: 24.95

## SECTION: Special Panozzi
note: make your own, choose your fillings

- name: Make Your Own Panozzi
  desc: Mortadella, Parma ham, coppa, pancetta, speck, Salame Napoli, Salame Milano, Salame Finocchiona, broccoli, salsiccia, avocado, stracciatella, bufala mozzarella, burrata, gorgonzola, taleggio, caprino, zucchini, melanzane, pomodoro, peperoni, carciofi, basil, onion, lettuce, rocket
  price: 13.95

## SECTION: Special Sicilian Platter
note: to share, for two or four

- name: Special Sicilian Platter
  desc: Meat arancini, parmigiana, polpette, caponata melanzane & carciofi, crocchette, mixed focaccia, olives, salumi & formaggi
  price: 32.95 / 49.95

## SECTION: Fresh Home-Made Pasta
note: made fresh every day, for two · please ask your waiter

- name: Fresh Home-Made Pasta
  desc: Girasoli, torteloni, ravioli, triangoli, quadroni, pappardelle, tagliolini
  price: 28.95

# MENU: Takeaway

## SECTION: Pizze
note: made with the finest Italian ingredients · vegan or gluten-free base +£2 · extra toppings: meat £3, vegetables £2

- name: Focaccia
  tags: V
  desc: Homemade Italian yeasted flatbread
  price: 6.5

- name: Pane all'Aglio
  tags: V
  desc: Garlic pizza bread
  price: 6.5

- name: Margherita
  tags: V
  desc: Tomato sauce, mozzarella & basil
  price: 11

- name: Americana
  desc: Tomato sauce, mozzarella & spicy pepperoni sausage
  price: 13

- name: Hawaii
  desc: Tomato sauce, mozzarella, cooked ham & pineapple
  price: 15

- name: Diavola Calabrese
  desc: Tomato sauce, mozzarella, Nduja, red onions & chilli
  price: 15

- name: Caprino
  tags: V
  desc: Tomato sauce, mozzarella, courgettes, goat cheese & caramelised onions
  price: 14

- name: Ortolana
  tags: V
  desc: Tomato, mozzarella & grilled vegetables (courgettes & aubergines)
  price: 15

- name: Fiorentina
  tags: V
  desc: Tomato sauce, mozzarella, spinach, egg & parmesan
  price: 15

- name: Pollo e Pancetta
  desc: Tomato sauce, mozzarella, chicken, pancetta & mushrooms
  price: 15

- name: Popeye
  desc: Tomato sauce, mozzarella, tuna, chilli & red onions
  price: 15

- name: Quattro Stagioni
  desc: Tomato sauce, mozzarella, artichokes, ham, olives, salami & mushrooms
  price: 15

- name: Bufalina
  desc: Tomato sauce, buffalo mozzarella, rocket, Parma Ham, cherry tomatoes & parmesan shavings
  price: 17

- name: Calzone Piccante
  desc: Folded pizza: tomato sauce, mozzarella, cooked ham, mushrooms, pepperoni, oregano & red chillies
  price: 16

## SECTION: Antipasti
note: starters · * subject to availability

- name: Arancini
  desc: Two fried rice balls filled with mozzarella & minced meat
  price: 8.95

- name: Bruschetta
  tags: V, VE
  desc: Homemade focaccia topped with marinated fresh tomato, red onions, basil, garlic & extra virgin olive oil
  price: 7.5

- name: Burrata
  tags: V
  desc: Italian creamy cheese with cherry tomatoes confit, dried black olives & balsamic glaze
  price: 12

- name: Calamari *
  desc: Deep-fried squid rings served with homemade aioli
  price: 12

- name: Carpaccio di Manzo
  desc: Thin slices of raw beef fillet with rocket, parmesan shavings, drizzled with lemon juice & extra virgin olive oil
  price: 15

- name: Gamberoni Aglio e Peperoncino *
  desc: Pan-fried shell-off king prawns cooked with garlic, butter, fresh chilli & white wine sauce, served with homemade focaccia
  price: 15

- name: Melanzana Parmigiana
  tags: V
  desc: Homemade baked aubergine with tomato sauce, Fior di latte mozzarella cheese & basil
  price: 8.5

## SECTION: Pasta & Risotto
note: * subject to availability

- name: Linguine Gamberoni
  desc: Linguine with king prawns, fresh garlic, cherry tomatoes, white wine & olive oil
  price: 21.95

- name: Gnocchi al Filetto
  desc: Traditionally homemade gnocchi with garlic, strips of fillet steak, cherry tomatoes, mushrooms, parmesan cheese & drizzled with truffle oil
  price: 21.95

- name: Gnocchi di Zucca
  tags: V
  desc: Traditionally homemade pumpkin gnocchi with dried apricot, sage & Gorgonzola sauce
  price: 18.95

- name: Tagliatelle al Salmone
  desc: Tagliatelle pasta with salmon, tomato sauce & a touch of cream
  price: 18

- name: Tagliatelle alla Aragosta *
  desc: Tagliatelle pasta with half a fresh lobster, brandy, cherry tomatoes, garlic & basil
  price: 35

- name: Italian Classic Dishes
  desc: All Italian traditional dishes such as Spaghetti Bolognese, Carbonara & Lasagne available on request
  price: 14.95

- name: Risotto Mare *
  desc: Italian Arborio rice with mixed seafood, garlic, cherry tomatoes & extra virgin olive oil
  price: 25

- name: Risotto Tartufo
  tags: V
  desc: Italian Arborio rice with mushrooms & truffle sauce
  price: 16.95

## SECTION: Carne & Pesce
note: meat & fish · * subject to availability

- name: Scaloppine alla Milanese
  desc: Veal in breadcrumbs served with spaghetti & tomato sauce
  price: 23

- name: Pollo Tricolore
  desc: Grilled chicken breast topped with mozzarella cheese & tomato sauce, served with asparagus & new potatoes
  price: 18

- name: Tagliata di Manzo e Rucola
  desc: Grilled sliced 300g ribeye steak served on a bed of fresh rocket, topped with shaved Parmesan & served with chips
  price: 29

- name: Filetto dello Chef
  desc: Grilled fillet steak with asparagus, carrots, duchess potatoes & a tomato gratin topped with Parmesan cheese
  price: 35

- name: Branzino in Guazzetto *
  desc: Grilled fillet of sea bass with prawn & bisque sauce, served on a bed of roasted potato, asparagus & carrots
  price: 25

- name: Salmone al Mascarpone
  desc: Grilled salmon served with creamy mashed potatoes, crispy asparagus & drizzled with a Mascarpone orange sauce
  price: 23

## SECTION: Contorni
note: sides

- name: Rocket & Parmesan Cheese
  price: 5.5

- name: Spinach, Garlic & Chilli
  price: 5.5

- name: Tomato & Red Onion Salad
  price: 4.5

- name: Sautéed Mushrooms
  price: 4.5

- name: Green Salad
  price: 4.5

- name: Patatine Fritte (Chips)
  price: 3.5

- name: Mixed Salad
  price: 5.5

- name: Broccoli
  price: 4.5

- name: Mixed Olives
  price: 4.5

- name: Asparagus
  price: 9

## SECTION: Bambini
note: for children · £8 each

- name: Spaghetti Pasta
  desc: A choice of sauce: Tomato, Carbonara or Bolognese
  price: 8

- name: Chicken Goujon & Chips
  price: 8

- name: 8" Pizza Margherita
  price: 8
