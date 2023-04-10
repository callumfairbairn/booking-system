const bobDole = {
  email: 'bob.dole@cleaner.com',
  name: 'Bob Dole',
  phone_number: '0123456789',
}

const markCook = {
  email: 'mark.cook@cleaner.com',
  name: 'Mark Cook',
  phone_number: '1234567890',
}

const jimboJonesSlot = {
  date: new Date('2023-04-23'),
  from: new Date('2023-04-23 06:00:00'),
  to: new Date('2023-04-23 20:00:00'),
  user_email: 'jimbo.jones@gmail.com',
  employee: {
    connect: {
      id: 1
    }
  }
}

const troyMcClureSlot = {
  date: new Date('2023-04-23'),
  from: new Date('2023-04-23 06:00:00'),
  to: new Date('2023-04-23 20:00:00'),
  user_email: 'troy.mcclure@gmail.com',
  employee: {
    connect: {
      id: 2
    }
  }
}

const bumblebeeGuySlot = {
  date: new Date('2023-04-24'),
  from: new Date('2023-04-24 06:00:00'),
  to: new Date('2023-04-24 12:00:00'),
  user_email: 'bumblebee.guy@gmail.com',
  employee: {
    connect: {
      id: 1
    }
  }
}

const hankScorpioSlot = {
  date: new Date('2023-04-24'),
  from: new Date('2023-04-24 06:00:00'),
  to: new Date('2023-04-24 12:00:00'),
  user_email: 'hank.scorpio@gmail.com',
  employee: {
    connect: {
      id: 2
    }
  }
}

module.exports = {
  bobDole,
  markCook,
  jimboJonesSlot,
  troyMcClureSlot,
  bumblebeeGuySlot,
  hankScorpioSlot,
}