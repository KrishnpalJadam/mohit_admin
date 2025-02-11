const FormatLink = (value) => {
  return value?.toLowerCase().replaceAll(" ", "-");
};

export default FormatLink;
