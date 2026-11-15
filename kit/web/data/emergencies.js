// Emergency checklists. Each opens at emergency.html?id=<id>. Ticks are remembered per browser.
// Written for Las Vegas / Henderson (heat, flash floods, quakes, wildfire smoke) and San Antonio
// (freezes, flash floods, heat). Personal details live in data/family.js.
// Phone numbers checked Nov 2026; confirm on each utility's site when online.
window.EMERGENCIES = [
{
  id: 'power', title: 'Power Out?', sub: 'Lights out: what to do, in order', icon: 'plugOff', c: ['#f5a623', '#b8740a'], topic: 'power',
  phases: [
    { name: 'First 5 minutes', items: [
      { t: 'Grab a light, not a candle', d: 'Flashlights, headlamps, lanterns. Candles are a leading cause of house fires during outages.' },
      { t: 'Just us or the whole street?', d: 'Look out the window. If only your home is dark, check the breaker panel and reset a tripped breaker once. If it trips again, leave it off.' },
      { t: 'Report it and get the news', d: 'NV Energy (Southern NV): 702-402-2900. CPS Energy (San Antonio): 210-353-4357. NOAA weather radio on the Baofeng/BTECH (WX channels, 162.400–162.550 MHz). Car radio: KNPR 88.9 FM (Las Vegas), WOAI 1200 AM (San Antonio).' },
      { t: 'Keep fridge and freezer closed', d: 'A closed fridge stays cold about 4 hours. A full freezer holds about 48 hours (half-full about 24).' },
      { t: 'Unplug sensitive electronics', d: 'TVs, computers, appliances: surges hit when power returns. Leave one lamp switched on so you know when it\'s back.' },
    ]},
    { name: 'First hour', items: [
      { t: 'Keep cool (or warm) now', d: 'Summer in Vegas or Texas: close blinds on the sunny side, everyone hydrates, move to the coolest room. Winter freeze: close off unused rooms and layer up before the house cools.', urgent: true },
      { t: 'Fill water containers', d: 'Long outages can drop water pressure. Fill pots, pitchers, and the bathtub (for flushing and washing).' },
      { t: 'Move essentials to battery power', d: 'Fridge first, then medical devices, then the router and this computer. Phones to 100%, then Low Power Mode.' },
      { t: 'Garage door: manual release', d: 'Pull the red cord to disengage the opener so cars aren\'t trapped. Lock the door manually afterward.' },
      { t: 'Check on neighbors', d: 'Especially older people and anyone on oxygen or other powered medical equipment.' },
    ]},
    { name: 'First day', items: [
      { t: 'Generator OUTSIDE only', d: '20+ feet from doors and windows, exhaust pointed away. Never in a garage, even with the door open. Carbon monoxide kills fast and silently. CO alarms on.', urgent: true },
      { t: 'Food safety', d: 'Fridge food above 40 °F for more than 2 hours: throw it out. Freezer food with ice crystals is safe to refreeze. When in doubt, throw it out.' },
      { t: 'Never heat with the stove, oven or grill', d: 'Gas ovens and charcoal grills indoors produce carbon monoxide.' },
      { t: 'Heat illness watch', d: 'Over 90 °F inside is dangerous for babies, older adults and pets. If the house can\'t be cooled, go to a cooling center or a cool car with A/C running outside (never in a closed garage).' },
    ]},
  ],
},
{
  id: 'water', title: 'Water Out?', sub: 'No water, or water not safe', icon: 'dropletOff', c: ['#0a84ff', '#0050b3'], topic: 'water',
  phases: [
    { name: 'Right now', items: [
      { t: 'Is it a boil-water notice or no water at all?', d: 'Boil notice: tap water is unsafe to drink without treatment. No pressure: check for a main break or your own leak first.' },
      { t: 'Stop using tap water for drinking if unsure', d: 'Use stored bottled water for drinking, formula, brushing teeth and washing produce.', urgent: true },
      { t: 'Report it', d: 'Las Vegas Valley Water District customer care: 702-870-4194. SAWS (San Antonio) water emergencies, 24/7: 210-704-7297.' },
      { t: 'Shut the main valve if a pipe burst', d: 'See Our House for where the shutoff is. Turn clockwise until it stops.' },
    ]},
    { name: 'Make water safe', items: [
      { t: 'Boil', d: 'Rolling boil for 1 minute (3 minutes above 6,500 ft). Let it cool. This is the most reliable method.' },
      { t: 'Bleach if you can\'t boil', d: 'Plain unscented household bleach: 8 drops per gallon of clear water for 6% bleach, 6 drops for 8.25%. Stir, wait 30 minutes; it should smell faintly of chlorine. Double the drops if the water is cloudy, after letting it settle and filtering through a cloth.' },
      { t: 'Hidden water in the house', d: 'Water heater tank (turn off power or gas first, drain from the bottom valve), ice cubes, toilet tank (not the bowl; untreated, so boil it), canned fruit and vegetable liquid.' },
      { t: 'Ration sensibly, don\'t under-drink', d: 'At least 1 gallon per person per day; more in desert heat, for nursing mothers, and for children. Drink what you need today and look for more tomorrow.' },
    ]},
    { name: 'Hygiene without running water', items: [
      { t: 'Flush with a bucket', d: 'Pour about a gallon of non-drinking water fast into the bowl. Or line the toilet with a heavy trash bag and add kitty litter.' },
      { t: 'Hand sanitizer and wipes', d: 'Wash hands before food and after the toilet. Diarrhea spreads fast when water is short.' },
    ]},
  ],
},
{
  id: 'quake', title: 'Earthquake!', sub: 'During and right after the shaking', icon: 'activity', c: ['#8e7a5e', '#5c4d38'], topic: 'home',
  phases: [
    { name: 'While it shakes', items: [
      { t: 'Drop, Cover, Hold On', d: 'Get down, get under a sturdy table or against an inside wall, cover your head and neck, hold on until it stops. Don\'t run outside.', urgent: true },
      { t: 'In bed: stay there', d: 'Cover your head with a pillow. Grab small children if they\'re within reach; don\'t cross a moving room.' },
      { t: 'Driving: pull over', d: 'Away from overpasses, bridges and power lines. Stay in the car with the seatbelt on.' },
    ]},
    { name: 'When it stops', items: [
      { t: 'Check for injuries', d: 'Treat bleeding first. Don\'t move seriously injured people unless they\'re in danger.' },
      { t: 'Shoes on', d: 'Broken glass everywhere. Keep shoes and a flashlight by the bed.' },
      { t: 'Smell gas? Get out', d: 'Leave the door open, don\'t touch switches, call from outside. See Gas Leak.', urgent: true },
      { t: 'Check the house', d: 'Cracks in walls, chimney, foundation; water leaks. If it looks unsafe, get everyone out.' },
      { t: 'Expect aftershocks', d: 'Drop, Cover, Hold On again each time.' },
      { t: 'Text, don\'t call', d: 'Networks jam. Texts get through more often. Check in with your out-of-area contact.' },
    ]},
  ],
},
{
  id: 'evacuate', title: 'Wildfire / Evacuate?', sub: 'Leave fast, with the right things', icon: 'flame', c: ['#ff5e3a', '#c1270d'], topic: 'home',
  phases: [
    { name: 'If you\'re told to go: GO', items: [
      { t: 'Leave immediately when ordered', d: 'Don\'t wait to see the fire. Roads clog fast. If you feel unsafe, leave before the order.', urgent: true },
      { t: 'People and pets first', d: 'Car seats, leashes, carriers. Then the go-bags.' },
      { t: 'The 6 P\'s', d: 'People and pets · Papers (IDs, insurance, the encrypted vault drive) · Prescriptions, glasses, hearing aids · Pictures and irreplaceables · Personal computers and phones (this laptop and SSD) · Plastic (cards, cash).' },
      { t: 'Chargers and power bank', d: 'Phone, radio and laptop chargers. Fill the gas tank or charge the car on the way out if lines allow.' },
    ]},
    { name: 'If you have 10 more minutes', items: [
      { t: 'Close all windows and doors, don\'t lock', d: 'Firefighters may need in. Leave lights on so the house is visible in smoke.' },
      { t: 'Shut off gas at the meter', d: 'Only if instructed or you know how. Turn off the A/C so it doesn\'t pull smoke in.' },
      { t: 'Move flammables away from the house', d: 'Patio furniture, doormats, propane tanks.' },
      { t: 'Tell your contact where you\'re going', d: 'Text your out-of-area contact your destination and route.' },
    ]},
    { name: 'Smoke, not fire', items: [
      { t: 'Stay inside, windows shut', d: 'A/C on recirculate. A box fan with a MERV-13 filter taped on makes a cheap air purifier.' },
      { t: 'N95 outdoors', d: 'Cloth and surgical masks don\'t stop smoke particles.' },
    ]},
  ],
},
{
  id: 'medical', title: 'Medical Emergency', sub: 'Someone is badly sick or hurt', icon: 'heartPulse', c: ['#ff375f', '#c2002e'], topic: 'medical',
  phases: [
    { name: 'Right now', items: [
      { t: 'Call 911', d: 'Give the address first, then what happened. Put the phone on speaker and follow their instructions. If cell service is down, try text-to-911 or send someone to find help.', urgent: true },
      { t: 'Not breathing or no pulse → CPR', d: 'Go to the CPR / Choking card.' },
      { t: 'Heavy bleeding → pressure', d: 'Go to the Bleeding / Trauma card.' },
      { t: 'Stroke signs: BE FAST', d: 'Balance loss, Eyes (vision loss), Face drooping, Arm weakness, Speech slurred, Time: note when it started and call 911.' },
      { t: 'Heart attack signs', d: 'Chest pressure, pain in arm, jaw or back, short of breath, cold sweat. Call 911. The 911 dispatcher may tell them to chew one regular 325 mg aspirin (not if allergic).' },
      { t: 'Severe allergic reaction', d: 'Swelling of lips or tongue, trouble breathing, hives: use an epinephrine auto-injector in the outer thigh if there is one, then call 911.' },
    ]},
    { name: 'While you wait', items: [
      { t: 'Unconscious but breathing: recovery position', d: 'On their side, top knee bent, head tilted back so they can\'t choke on vomit.' },
      { t: 'Poison or overdose', d: 'Poison Control: 1-800-222-1222 (24/7). Don\'t make them vomit unless told to.' },
      { t: 'Gather their medications', d: 'And allergies, conditions, and when symptoms started. Write it down for the paramedics.' },
      { t: 'Unlock the door, light the house', d: 'Porch light on; someone outside to wave the ambulance in.' },
    ]},
    { name: 'If help can\'t come', items: [
      { t: 'Use the offline references', d: 'Army first-aid manual (ATP 4-02.11), MDWiki and the Medical Library in the Library tab, and the AI assistant. These guide care; they don\'t replace a doctor.' },
      { t: 'Find the nearest ER on the map', d: 'Near Home shows hospitals and fire stations, offline.' },
    ]},
  ],
},
{
  id: 'child', title: 'Child Sick or Hurt', sub: 'Fever, falls, swallowed something', icon: 'child', c: ['#bf5af2', '#7d2ab8'], topic: 'kids',
  phases: [
    { name: 'Call 911 now if', items: [
      { t: 'Trouble breathing, blue lips, or won\'t wake up', d: 'Also: seizure longer than 5 minutes, severe bleeding, a baby under 3 months with a fever of 100.4 °F (38 °C) or higher.', urgent: true },
      { t: 'Swallowed a button battery or magnets', d: 'Go to the ER immediately even if they seem fine. If over 1 year old and it was within 12 hours, 2 teaspoons of honey every 10 minutes on the way (up to 6 doses) can slow damage.', urgent: true },
      { t: 'Swallowed medicine, chemicals or plants', d: 'Poison Control: 1-800-222-1222. Have the bottle in hand.' },
    ]},
    { name: 'Fever', items: [
      { t: 'Fever is a symptom, not the illness', d: 'Watch how the child acts. Playful and drinking is reassuring; limp, very sleepy or not drinking is not.' },
      { t: 'Dose by weight, not age', d: 'Use the package chart and the syringe that came with that bottle. Acetaminophen from birth only on a doctor\'s advice under 3 months; ibuprofen only from 6 months. Never aspirin for children. See the Kids card.' },
      { t: 'Fluids, fluids, fluids', d: 'Small sips often. Signs of dehydration: no wet diaper in 8 hours, no tears, dry mouth, sunken soft spot.' },
    ]},
    { name: 'Falls and bumps', items: [
      { t: 'After a head bump, watch for', d: 'Vomiting more than once, unusual sleepiness, confusion, unequal pupils, clear fluid from nose or ears, worsening headache. Any of these: ER.' },
      { t: 'Cuts', d: 'Pressure with a clean cloth for 10 minutes without peeking. Gaping or won\'t stop: needs stitches.' },
      { t: 'Burns', d: 'Cool running water for 20 minutes. No ice, butter or creams. Cover loosely with plastic wrap.' },
    ]},
  ],
},
{
  id: 'bleeding', title: 'Bleeding / Trauma', sub: 'Stop the bleed', icon: 'bleed', c: ['#ff3b30', '#a50f06'], topic: 'medical',
  phases: [
    { name: 'Stop the bleed', items: [
      { t: 'Call 911', d: 'Or have someone else call while you work.', urgent: true },
      { t: 'Find the source and press hard', d: 'Direct, firm pressure with a cloth or gauze, both hands, your body weight. Don\'t lift to check.', urgent: true },
      { t: 'Arm or leg still spurting or soaking through? Tourniquet', d: 'Place it 2–3 inches above the wound (not on a joint), tighten until bleeding stops; it will hurt. Write the time on it. Don\'t loosen it.' },
      { t: 'Wound in the torso or groin: pack it', d: 'Stuff gauze (hemostatic if you have it) deep into the wound and press for at least 3 minutes.' },
    ]},
    { name: 'Then', items: [
      { t: 'Keep them warm and lying down', d: 'Shock signs: pale, cold, clammy skin, fast breathing, confusion. Cover with a blanket; raise legs only if no leg or spine injury.' },
      { t: 'Don\'t remove impaled objects', d: 'Pad around them and keep them still.' },
      { t: 'Possible neck or back injury', d: 'Don\'t move them unless they\'re in danger. Keep the head in line with the body.' },
    ]},
  ],
},
{
  id: 'cpr', title: 'CPR / Choking', sub: 'Hands-only CPR, back blows, thrusts', icon: 'heartPlus', c: ['#ff375f', '#d1004a'], topic: 'medical',
  phases: [
    { name: 'Not responding, not breathing normally', items: [
      { t: 'Call 911 and get an AED', d: 'Speaker on. Send someone for an AED if there is one nearby.', urgent: true },
      { t: 'Adult: push hard and fast', d: 'Center of the chest, 2 inches deep, 100–120 per minute (beat of "Stayin\' Alive"). Let the chest come back up. Don\'t stop until help or an AED arrives.', urgent: true },
      { t: 'Child (1 year to puberty)', d: 'One or two hands, about 2 inches deep. If trained: 30 compressions, 2 breaths.' },
      { t: 'Infant (under 1)', d: 'Two fingers (or two thumbs) just below the nipple line, 1.5 inches deep, 100–120 per minute. 30 compressions, 2 small puffs covering mouth and nose.' },
      { t: 'AED arrives: turn it on and follow the voice', d: 'Pads on bare chest. Everyone clear when it says to shock. Resume compressions right after.' },
    ]},
    { name: 'Choking (can\'t cough, talk or breathe)', items: [
      { t: 'Adult or child over 1: 5 back blows + 5 abdominal thrusts', d: 'Back blows between the shoulder blades with the heel of your hand. Then fist above the navel, pull in and up. Repeat until it comes out.', urgent: true },
      { t: 'Infant: 5 back blows + 5 chest thrusts', d: 'Face down along your forearm, head lower than chest, 5 firm back blows. Turn face up, 5 two-finger chest thrusts. Repeat. No blind finger sweeps.', urgent: true },
      { t: 'They go unresponsive', d: 'Lower them to the floor, call 911, start CPR. Look in the mouth before breaths and remove the object only if you can see it.' },
      { t: 'Coughing hard? Let them cough', d: 'Strong coughing clears it best. Stay with them.' },
    ]},
  ],
},
{
  id: 'gas', title: 'Gas Leak?', sub: 'Rotten-egg smell or hissing', icon: 'fuel', c: ['#e6b800', '#9c7a00'], topic: 'home',
  phases: [
    { name: 'Get out first', items: [
      { t: 'Everyone and pets out now', d: 'Leave the door open behind you. Go upwind, well away from the house.', urgent: true },
      { t: 'No sparks', d: 'Don\'t flip light switches, use phones, start cars, ring doorbells or light anything inside or near the house.', urgent: true },
      { t: 'Call from outside', d: '911, then the gas company. Southwest Gas (Nevada) 24/7: 877-860-6020. CPS Energy (San Antonio): 210-353-4357.' },
    ]},
    { name: 'Then', items: [
      { t: 'Shut off at the meter only if safe', d: 'Quarter turn with a wrench so the valve tab is crosswise to the pipe. Only the gas company should turn it back on.' },
      { t: 'Don\'t go back in until cleared', d: 'Wait for the fire department or gas company to say it\'s safe.' },
      { t: 'CO alarm going off?', d: 'Different danger, same move: everyone out, call 911. Headache, dizziness and nausea in several people at once points to carbon monoxide.' },
    ]},
  ],
},
{
  id: 'shelter', title: 'Shelter in Place', sub: 'Chemical release, unsafe air, lockdown', icon: 'shelter', c: ['#8e8e93', '#48484a'], topic: 'home',
  phases: [
    { name: 'Now', items: [
      { t: 'Get everyone inside', d: 'Pets too. Close and lock all doors and windows.', urgent: true },
      { t: 'Turn off HVAC and fans', d: 'A/C, heating, bathroom and kitchen fans. Close fireplace dampers.' },
      { t: 'Pick an interior room', d: 'Few or no windows, above ground level (chemicals sink). Take water, phones, chargers, radio, meds.' },
      { t: 'Seal it', d: 'Wet towels along the door gap. Plastic sheeting and duct tape over vents and windows if you have them.' },
    ]},
    { name: 'Wait it out', items: [
      { t: 'Listen for the all-clear', d: 'Radio or official alerts. Shelter-in-place usually lasts hours, not days.' },
      { t: 'When cleared: air out', d: 'Open windows, turn HVAC back on, go outside if instructed.' },
    ]},
  ],
},
{
  id: 'heat', title: 'Extreme Heat', sub: 'Over 110 °F, or no A/C', icon: 'heat', c: ['#ff9500', '#c93400'], topic: 'home', more: true,
  phases: [
    { name: 'Danger signs', items: [
      { t: 'Heat stroke is a 911 emergency', d: 'Hot skin, confusion, slurred speech, fainting, body temp over 103 °F. Call 911 and cool them fast: cold water, ice packs to neck, armpits and groin, fan them.', urgent: true },
      { t: 'Heat exhaustion', d: 'Heavy sweating, cold clammy skin, weakness, nausea, headache. Move to cool air, loosen clothes, sip water. Getting worse or over an hour: medical help.' },
    ]},
    { name: 'Stay cool', items: [
      { t: 'Never leave anyone in a car', d: 'A parked car turns deadly within 10–15 minutes in Las Vegas or Texas summers and can pass 120 °F. Check the back seat every time.', urgent: true },
      { t: 'Cool the house', d: 'Blinds shut on sunny sides, ceiling fans counter-clockwise, cook outside or not at all.' },
      { t: 'Drink before you\'re thirsty', d: 'Water every 15–20 minutes when outside. Avoid alcohol. Electrolytes if sweating a lot.' },
      { t: 'Cooling centers', d: 'Clark County and San Antonio open cooling stations in heat warnings; libraries and malls work too. Clark County guide is in Docs.' },
      { t: 'Outdoor work: early or not at all', d: 'Before 10 a.m. Pavement burns paws and bare feet.' },
    ]},
  ],
},
{
  id: 'flood', title: 'Flash Flood / Storm', sub: 'Monsoon, thunderstorm, hurricane remnants', icon: 'flood', c: ['#30b0c7', '#0e6f85'], topic: 'home', more: true,
  phases: [
    { name: 'Now', items: [
      { t: 'Turn around, don\'t drown', d: '6 inches of moving water can knock you down; 12 inches can float a car. Never drive into a flooded road, wash or low-water crossing.', urgent: true },
      { t: 'Get to higher ground', d: 'Away from washes, channels and drainage tunnels. Flash floods can arrive under a clear sky from storms miles away.' },
      { t: 'Lightning: go inside', d: 'When thunder roars, go indoors. Not under trees, not in open fields.' },
    ]},
    { name: 'After', items: [
      { t: 'Stay out of floodwater', d: 'It carries sewage, chemicals and hidden debris. Downed power lines can energize it.' },
      { t: 'Photograph damage for insurance', d: 'Before cleaning up. Insurance papers are in the vault.' },
      { t: 'Tap water after flooding', d: 'Wait for the utility to say it\'s safe; boil until then.' },
    ]},
  ],
},
{
  id: 'freeze', title: 'Winter Freeze', sub: 'Ice storm, grid outage in the cold', icon: 'snow', c: ['#64d2ff', '#2a7fb8'], topic: 'home', more: true,
  phases: [
    { name: 'Before it hits', items: [
      { t: 'Protect pipes', d: 'Drip indoor faucets, open sink cabinets, cover outdoor faucets, disconnect hoses. Know where the main water shutoff is.' },
      { t: 'Fill water and fuel', d: 'Fill water containers and the car. Charge every battery.' },
      { t: 'Bring pets and plants in', d: '' },
    ]},
    { name: 'Power out in the cold', items: [
      { t: 'One warm room', d: 'Close it off, cover windows with blankets, everyone together. Hats on, layers, sleeping bags.' },
      { t: 'No grills, generators or ovens indoors', d: 'Carbon monoxide deaths spike in every winter outage (Texas, Feb 2021).', urgent: true },
      { t: 'Hypothermia signs', d: 'Shivering, slurred speech, fumbling hands, confusion, drowsiness. Warm the core first (chest, neck, groin), warm drinks if awake. Call 911.' },
      { t: 'Burst pipe', d: 'Shut the main water valve immediately, then the water heater.' },
    ]},
  ],
},
{
  id: 'nocomms', title: 'No Phones / Internet', sub: 'Cell network down', icon: 'phoneOff', c: ['#5e5ce6', '#3634a3'], topic: 'comms', more: true,
  phases: [
    { name: 'Get information', items: [
      { t: 'Radio first', d: 'NOAA weather radio on the Baofeng or BTECH (WX channels). AM/FM in the car: KNPR 88.9 FM (Las Vegas), WOAI 1200 AM (San Antonio).' },
      { t: 'Try a text', d: 'SMS often works when calls fail. One short message to your out-of-area contact.' },
      { t: 'Wi-Fi calling', d: 'If home internet works but cell doesn\'t, turn on Wi-Fi calling.' },
    ]},
    { name: 'Reach people', items: [
      { t: 'Go to the meet-up point', d: 'Family Plan lists the primary and backup meeting places, and when to go.' },
      { t: 'Ham radio', d: 'Licensed: call on 146.520 MHz (2 m national simplex calling) or a local repeater. In a life-threatening emergency anyone may transmit on any frequency to get help.' },
      { t: 'GMRS / FRS', d: 'Family radios: agree on a channel ahead of time (Family Plan). Channel 20 (462.675 MHz) is a common GMRS emergency channel.' },
      { t: 'APRS on the UV-PRO', d: 'Licensed: position and short text messages on 144.390 MHz. See the BTECH app manual in Docs.' },
    ]},
  ],
},
{
  id: 'unrest', title: 'Civil Unrest', sub: 'Riots, curfews, nearby violence', icon: 'users', c: ['#636366', '#3a3a3c'], topic: 'security', more: true,
  phases: [
    { name: 'Stay safe', items: [
      { t: 'Stay home, stay away', d: 'Avoid crowds, protests and police lines, even peaceful ones. Things change fast.', urgent: true },
      { t: 'Active threat nearby: Run, Hide, Fight', d: 'Run if there\'s a safe way out. Otherwise hide: lock and barricade, lights off, phones silent. Fight only as a last resort.' },
      { t: 'Follow curfews and official alerts', d: 'Radio and phone alerts.' },
    ]},
    { name: 'At home', items: [
      { t: 'Lock up, lights low', d: 'Doors locked, garage closed, cars in. Don\'t draw attention to supplies.' },
      { t: 'Be ready to leave', d: 'Go-bags by the door, car fueled or charged, a route that avoids the trouble.' },
    ]},
  ],
},
];
