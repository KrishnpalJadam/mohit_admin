const CapitalizeText = (value) => {
  const text = value?.charAt(0).toUpperCase() + value?.slice(1);

  return text;
};

export default CapitalizeText;
