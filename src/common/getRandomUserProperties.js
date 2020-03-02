const userPropertiesTemplate = {
  id_type: ['nric', 'nric_pr', 'e_pass', 'work_permit', null],
  nationality: ['singaporean', 'malaysian', 'thai', 'japanese', null],
  gender: ['male', 'female', null],
  race: ['chinese', 'malay', 'indian', 'others', null],
  address_region: ['north', 'south', 'east', 'west', null],
  smoking_status: ['smoker', 'non_smoker', null],
  occupation: ['actuary', 'dentist', 'magician', 'teacher', null],
};

function getRandomUserProperties() {
  const userProperties = {};

  for (let key in userPropertiesTemplate) {
    const loginDetail = userPropertiesTemplate[key];
    const randomItemIndex = Math.floor(Math.random() * loginDetail.length);
    userProperties[key] = loginDetail[randomItemIndex];
  }
  return userProperties;
}

export default getRandomUserProperties;
