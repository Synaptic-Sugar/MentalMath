const defaultProfile = {
  name: 'default',
  timeToAnswer: 5,
  description: undefined
};

const profiles = [
  defaultProfile
];

export const createProfile = (newName, newTimeToAnswer, newDescription)=>{
  let {name, timeToAnswer, description} = defaultProfile;
  if(newName) name = newName;
  if(newTimeToAnswer) timeToAnswer = newTimeToAnswer;
  if(newDescription) description = newDescription;
  const newProfile = {
    name: name,
    timeToAnswer: timeToAnswer,
    description: description
  };
  profiles.push(newProfile);
};



export default profiles;