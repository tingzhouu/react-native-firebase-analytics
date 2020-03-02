/* eslint-env detox/detox, mocha */

describe('Example', () => {
  beforeEach(async () => {
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

  it('should be able to login and logout', async () => {
    for (let i = 0; i < names.length; i++) {
      await expect(element(by.id('UsernameInput'))).toExist();
      await element(by.id('UsernameInput')).typeText(names[i]);
      await expect(element(by.id('LoginButton'))).toExist();
      await element(by.id('LoginButton')).tap();
      await expect(element(by.id('SettingsTab'))).toExist();
      await element(by.id('SettingsTab')).tap();
      await expect(element(by.id('LogoutButton'))).toExist();
      await element(by.id('LogoutButton')).tap();
    }
  });
});
