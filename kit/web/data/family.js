// Your family's details for the "Our family" pages. Edit this file (or ask Claude to), then reload.
// Anything left as null shows as "add this" on the page. Keep secrets (passwords, account numbers,
// SSNs) in the encrypted vault, not here: this file sits unencrypted on the drive and the NAS.
window.FAMILY = {
  home: null,                 // e.g. 'Springfield, NV' (shown on checklists)
  people: [],                 // e.g. [{ name: 'Alex', role: 'Parent', born: 1985, meds: 'none', allergies: 'penicillin' }]
  contacts: [
    // { name: 'Out-of-area contact', who: 'Aunt Sam (Phoenix)', phone: '602-555-0100', note: 'Everyone texts here' },
  ],
  meetups: {
    near: null,               // just outside, e.g. 'Mailbox at the end of the driveway'
    neighborhood: null,       // e.g. 'Park entrance on Main St'
    outOfTown: null,          // e.g. 'Grandma\'s house, two states away'
  },
  radio: {
    gmrs: null,               // agreed family channel, e.g. 'GMRS 15 (462.550), PL 141.3'
    ham: null,                // callsigns and a simplex frequency
  },
  house: {
    water: null,              // main water shutoff location
    gas: null,                // gas meter location + where the wrench is
    power: null,              // breaker panel location
    waterHeater: null,
    supplies: null,           // where the water, food, first-aid kit, go-bags are
  },
  doctors: [
    // { name: 'Pediatrician', phone: '' },
  ],
  insurance: null,            // insurer and policy name only; documents go in the vault
  pets: [
    // { name: 'Biscuit', breed: 'Lab mix', weight: '60 lb', meds: 'none', microchip: 'HomeAgain',
    //   vet: 'Main St Animal Hospital 555-0100', erVet: 'nearest 24/7 ER vet and phone' },
  ],
};
