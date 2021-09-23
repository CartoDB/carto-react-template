var browserRegex =
  /((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(12[_.]2|12[_.]([3-9]|\d{2,})|12[_.]4|12[_.]([5-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})[_.]\d+|13[_.]3|13[_.]([4-9]|\d{2,})|13[_.]7|13[_.]([8-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})[_.]\d+|14[_.]0|14[_.]([1-9]|\d{2,})|14[_.]5|14[_.]([6-9]|\d{2,})|(1[5-9]|[2-9]\d|\d{3,})[_.]\d+)(?:[_.]\d+)?)|(SamsungBrowser\/(13\.0|13\.([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+))|(Edge\/(88(?:\.0)?|88(?:\.([1-9]|\d{2,}))?|(89|9\d|\d{3,})(?:\.\d+)?))|((Chromium|Chrome)\/(49\.0|49\.([1-9]|\d{2,})|([5-9]\d|\d{3,})\.\d+|85\.0|85\.([1-9]|\d{2,})|(8[6-9]|9\d|\d{3,})\.\d+)(?:\.\d+)?)|(Version\/(8\.0|8\.([1-9]|\d{2,})|(9|\d{2,})\.\d+|13\.1|13\.([2-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+|14\.0|14\.([1-9]|\d{2,})|(1[5-9]|[2-9]\d|\d{3,})\.\d+)(?:\.\d+)? Safari\/)|(Firefox\/(85\.0|85\.([1-9]|\d{2,})|(8[6-9]|9\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(85\.0|85\.([1-9]|\d{2,})|(8[6-9]|9\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)/;