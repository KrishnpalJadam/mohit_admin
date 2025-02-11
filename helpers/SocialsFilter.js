const SocialsFilter = (socialsData) => {
  const socials = socialsData || [];

  const initialValues = {
    email: "",
    youtubeUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    mobileNumber: "",
  };

  for (let i = 0; i < socials.length; i++) {
    const item = socials[i];

    if (item.match("@") && item.match("@").index > 1) {
      initialValues.email = item.match("@").input;
    }

    if (item.match("youtube") && item.match("youtube").index > 1) {
      initialValues.youtubeUrl = item.match("youtube").input;
    }

    if (item.match("instagram") && item.match("instagram").index > 1) {
      initialValues.instagramUrl = item.match("instagram").input;
    }

    if (item.match("facebook") && item.match("facebook").index > 1) {
      initialValues.facebookUrl = item.match("facebook").input;
    }

    if (item.match("twitter") && item.match("twitter").index > 1) {
      initialValues.twitterUrl = item.match("twitter").input;
    }

    if (item.length && item.length === 10) {
      initialValues.mobileNumber = item;
    }
  }

  return initialValues;
};

export default SocialsFilter;
