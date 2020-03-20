/* eslint-env detox/detox, mocha */

function getRandomTime() {
  return Math.random() * 3000;
}

async function awaitRandomTime() {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, getRandomTime());
  });
}

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await device.reloadReactNative();
  });

  const names = [
    'detoxMidoriya',
    'detoxAllMight',
    'detoxDavidShield',
    'detoxFatGum',
    'detoxRedRiot',
    'detoxLemillion',
    'detoxShoto',
    'detoxTomuraShigaraki',
    'detoxOverhaul',
    'detoxFroppy',
    'detoxUravity',
    'detoxNighteye',
  ];

  for (let i = 0; i < names.length; i++) {
    it(`should be able to login and logout - ${names[i]}`, async () => {
      await element(by.id('UsernameInput')).typeText(names[i]);
      await awaitRandomTime();
      await expect(element(by.id('LoginButton'))).toBeVisible();
      await element(by.id('LoginButton')).tap();
      await awaitRandomTime();
      await expect(element(by.id('BuyTab'))).toBeVisible();
      await element(by.id('BuyTab')).tap();
      const numTimesToTapIncrease = Math.floor(Math.random() * 10);
      const numTimesToTapDecrease = Math.floor(Math.random() * 5);
      for (let j = 0; j < numTimesToTapIncrease; j++) {
        await element(by.id('IncreaseQuantityButton')).tap();
        await awaitRandomTime();
      }
      for (let k = 0; k < numTimesToTapDecrease; k++) {
        await element(by.id('DecreaseQuantityButton')).tap();
        await awaitRandomTime();
      }
      await element(by.id('BuyButton')).tap();
      await awaitRandomTime();
      await expect(element(by.id('SettingsTab'))).toBeVisible();
      await element(by.id('SettingsTab')).tap();
      await awaitRandomTime();
      await expect(element(by.id('LogoutButton'))).toBeVisible();
      await element(by.id('LogoutButton')).tap();
    });
  }
});
