const roleTranslator = (instrument) => {
  if (instrument === 'Drums') {
    return 'Drummer';
  } if (instrument === 'Vocals') {
    return 'Vocalist';
  } return `${instrument}ist`;
};

export default roleTranslator;
